import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, Users, MessageSquare, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import type { Contact } from "@shared/schema";

export default function Admin() {
  const { t } = useLanguage();

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
      title: "Growth Rate",
      value: "+12%",
      icon: TrendingUp,
      color: "bg-makmar-gold",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="pt-24 pb-8 bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
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
                  {contacts.map((contact) => (
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
                      <TableCell className="max-w-xs truncate">
                        {contact.message}
                      </TableCell>
                      <TableCell>
                        {format(new Date(contact.createdAt), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-makmar-gold border-makmar-gold">
                          New
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">No contact messages yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}