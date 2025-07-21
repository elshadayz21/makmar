import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Calendar, Users, MessageSquare, TrendingUp, LogOut } from "lucide-react";
import { format } from "date-fns";
import type { Contact } from "@shared/schema";
import { useLocation } from "wouter";
import React, { useState } from "react";

const PAGE_SIZE = 10; // contacts per page

export default function Admin() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [expandedMessages, setExpandedMessages] = useState<Record<number, boolean>>({});
  const [page, setPage] = useState(1);

  // Helper to determine if a message is long
  const isLongMessage = (msg: string, limit = 100) => msg.length > limit;
  const getShortMessage = (msg: string, limit = 100) => msg.slice(0, limit) + (msg.length > limit ? "..." : "");

  const { data: contacts, isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    queryFn: async () => {
      const response = await fetch("/api/contacts");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      return response.json();
    },
  });

  // Mutation for marking a contact as read
  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/contacts/${id}/read`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to mark as read");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
  });


const calculateGrowthRate = (contacts) => {
  if (!contacts) return "+0%";

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let prevMonth, prevYear;
  if (currentMonth === 0) {
    prevMonth = 11;
    prevYear = currentYear - 1;
  } else {
    prevMonth = currentMonth - 1;
    prevYear = currentYear;
  }

  const previousMonthContacts = contacts.filter((contact) => {
    const contactDate = new Date(contact.createdAt);
    return (
      contactDate.getMonth() === prevMonth &&
      contactDate.getFullYear() === prevYear
    );
  });

  const currentMonthContacts = contacts.filter((contact) => {
    const contactDate = new Date(contact.createdAt);
    return (
      contactDate.getMonth() === currentMonth &&
      contactDate.getFullYear() === currentYear
    );
  });

  if (previousMonthContacts.length === 0) {
    // Show "N/A" if no data for previous month
    return "N/A";
  }

  const growthRate =
    ((currentMonthContacts.length - previousMonthContacts.length) /
      previousMonthContacts.length) *
    100;

  const sign = growthRate > 0 ? "+" : growthRate < 0 ? "" : "+";
  return `${sign}${growthRate.toFixed(2)}%`;
};

  const stats = [
    {
      title: "Total Contacts",
      value: contacts?.length || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "This Month",
      value: contacts?.filter(contact => {
        const contactDate = new Date(contact.createdAt);
        const now = new Date();
        return contactDate.getMonth() === now.getMonth() && contactDate.getFullYear() === now.getFullYear();
      }).length || 0,
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Total Messages",
      value: contacts?.length || 0,
      icon: MessageSquare,
      color: "bg-purple-500",
    },
    {
      title: "Growth Rate Compared to Last Month",
      value: calculateGrowthRate(contacts),
      icon: TrendingUp,
      color: "bg-makmar-gold",
    },
  ];

  const totalPages = contacts ? Math.ceil(contacts.length / PAGE_SIZE) : 1;
  const paginatedContacts = contacts
    ? contacts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : [];

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/check"] });
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin panel",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="pt-24 pb-8 bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-end mb-4">
              <Button
                onClick={() => logoutMutation.mutate()}
                variant="outline"
                className="border-makmar-gold text-makmar-gold hover:bg-makmar-gold hover:text-white"
                disabled={logoutMutation.isPending}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Admin <span className="text-makmar-gold">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Manage contacts and monitor website activity
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                      <p className="text-2xl font-bold text-makmar-gold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <IconComponent className="text-white h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-makmar-gold">
              Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-makmar-gold mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading contacts...</p>
              </div>
            ) : contacts && contacts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedContacts.map((contact) => {
                    const expanded = expandedMessages[contact.id] || false;
                    const longMsg = isLongMessage(contact.message);
                    const isRead = contact.read;
                    return (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">
                          {contact.firstName} {contact.lastName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-makmar-gold" />
                            {contact.email}
                          </div>
                        </TableCell>
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell className="max-w-xs">
                          {expanded || !longMsg ? (
                            <span>{contact.message}</span>
                          ) : (
                            <span>{getShortMessage(contact.message)}</span>
                          )}
                          {longMsg && (
                            <Button
                              size="sm"
                              variant="link"
                              className="ml-2 p-0 h-auto align-baseline text-makmar-gold"
                              onClick={() => {
                                setExpandedMessages((prev) => ({ ...prev, [contact.id]: !expanded }));
                                if (!isRead) markAsReadMutation.mutate(contact.id);
                              }}
                              disabled={markAsReadMutation.isPending}
                            >
                              {expanded ? "Show less" : "Show more"}
                            </Button>
                          )}
                          {!isRead && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="ml-2 p-0 h-auto align-baseline text-gray-500 hover:text-makmar-gold"
                              onClick={() => markAsReadMutation.mutate(contact.id)}
                              disabled={markAsReadMutation.isPending}
                            >
                              Mark as Read
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {format(new Date(contact.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          {!isRead ? (
                            <Badge variant="outline" className="text-makmar-gold border-makmar-gold">
                              New
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Read</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">No contact messages yet</p>
              </div>
            )}
          </CardContent>
          <div className="flex justify-center gap-2 mt-4">
            <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
            <span>Page {page} of {totalPages}</span>
            <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}