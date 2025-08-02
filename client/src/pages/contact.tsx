"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { z } from "zod";
import { ContactUsItemFetch } from "../../../services/contact";
import { ContactUsItems } from "types/strapi-types";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type ContactForm = z.infer<typeof insertContactSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [ContactItemsData, setContactItemsData] = useState<ContactUsItems>();

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 9.03, // Latitude for Addis Ababa
    lng: 38.74, // Longitude for Addis Ababa
  };

  const form = useForm<ContactForm>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    //   onSuccess: () => {
    //     toast({
    //       title: "Message Sent Successfully!",
    //       description: "Thank you for your message. We will get back to you soon.",
    //     });
    //     form.reset();
    //   },
    //   onError: (error) => {
    //     toast({
    //       title: "Error",
    //       description: "Failed to send message. Please try again.",
    //       variant: "destructive",
    //     });
    //   },
    // }
    onSuccess: (data) => {
      toast({
        title: "Message Sent Successfully!",
        description: data.emailSent
          ? "Your message has been sent to our team via email. We will get back to you soon."
          : "Your message has been saved. We will get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Instagram, href: "#" },
  ];
  // Fetch footer items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await ContactUsItemFetch();
      setContactItemsData(data);
      console.log("ContactItemsData in UseEffect", ContactItemsData);
    };

    fetchMenuItems();
  }, []);

  console.log("Fetched Contact Items Data:", ContactItemsData);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24  bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div> */}
          {ContactItemsData &&
            ContactItemsData?.contactHeader?.map((header) => {
              return (
                <div className="text-center" key={header.id}>
                  {/* {t("services.title")} */}

                  <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                    {header.title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {/* {t("services.subtitle")} */}
                    {header.description}
                  </p>
                </div>
              );
            })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-makmar-light dark:bg-gray-800 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-makmar-gold">
                  {t("contact.sendMessage")}
                </h3>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">
                        {t("contact.firstName")}
                      </Label>
                      <Input
                        id="firstName"
                        {...form.register("firstName")}
                        className="mt-1"
                        disabled={contactMutation.isPending}
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t("contact.lastName")}</Label>
                      <Input
                        id="lastName"
                        {...form.register("lastName")}
                        className="mt-1"
                        disabled={contactMutation.isPending}
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="mt-1"
                      disabled={contactMutation.isPending}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="subject">{t("contact.subject")}</Label>
                    <Input
                      id="subject"
                      {...form.register("subject")}
                      className="mt-1"
                      disabled={contactMutation.isPending}
                    />
                    {form.formState.errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="message">{t("contact.message")}</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      {...form.register("message")}
                      className="mt-1"
                      disabled={contactMutation.isPending}
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-makmar-gold hover:bg-makmar-gold-dark text-white py-3 px-6 rounded-lg font-semibold"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending
                      ? "Sending..."
                      : t("contact.sendButton")}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-8">
              {ContactItemsData &&
                ContactItemsData?.contactInfo.map((map) => {
                  return (
                    <Card className="bg-makmar-light dark:bg-gray-800 shadow-lg">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-semibold mb-6 text-makmar-gold">
                          {/* {t("contact.info")} */}
                          {map.location}
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <MapPin className="h-6 w-6 text-makmar-gold mr-3 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {/* {t("contact.address")} */}
                              {map.location}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-6 w-6 text-makmar-gold mr-3 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {/* {t("contact.phone")} */}
                              {map.phone_number}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-6 w-6 text-makmar-gold mr-3 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {/* {t("contact.email")} */}
                              {map.email}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-6 w-6 text-makmar-gold mr-3 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {/* {t("contact.hours")} */}
                              {map.openHours}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

              <Card className="bg-makmar-light dark:bg-gray-800 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-makmar-gold">
                    {t("contact.followUs")}
                  </h3>
                  <div className="flex space-x-4">
                    {/* {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          className="w-10 h-10 bg-makmar-gold rounded-lg flex items-center justify-center text-white hover:bg-makmar-gold-dark transition-colors"
                        >
                          <IconComponent className="h-5 w-5" />
                        </a>
                      );
                    })} */}
                    {ContactItemsData &&
                      ContactItemsData?.socialLink.map((link, index) => {
                        return (
                      <>
                          <a
                            key={index}
                            href={link.href}
                            className="w-10 h-10 bg-makmar-gold rounded-lg flex items-center justify-center text-white hover:bg-makmar-gold-dark transition-colors"
                          >
                            {/* <IconComponent className="h-5 w-5" /> */}
                            <img 
                              src={link.icon}
                              alt={link.title}
                              className="w-6 h-6" />
                          </a>
                      </>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-makmar-light dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {ContactItemsData &&
            ContactItemsData?.findUsMap.map((map) => {
              return (
                <div className="text-center mb-12" key={map.id}>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    {map.title.split(" ").slice(0, 2).join(" ")}{" "}
                    <span className="text-makmar-gold">
                      {map.title.split(" ").slice(2).join("")}
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {/* Visit our offices in Addis Ababa, Ethiopia. We're conveniently
              located in the heart of the business district. */}
                    {map.description}
                  </p>
                </div>
              );
            })}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {ContactItemsData &&
              ContactItemsData?.contactInfo?.map((info) => {
                return (
                  <div className="space-y-6" key={info.id}>
                    <Card className="bg-white dark:bg-gray-800 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <MapPin className="h-6 w-6 text-makmar-gold mr-3" />
                          <h3 className="text-lg font-semibold">
                            Office Address
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {/* {t("contact.address")} */}
                          {info.location}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-makmar-gold mr-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {/* {t("contact.hours")} */}
                              {info.openHours}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-makmar-gold mr-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {/* {t("contact.phone")} */}
                              {info.phone_number}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-makmar-gold mr-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {/* {t("contact.email")} */}

                              {info.email}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Getting Here
                        </h3>
                        {ContactItemsData &&
                          ContactItemsData?.Getting_There.map(
                            (reference, index) => {
                              return (
                                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                  <div className="flex items-start">
                                    <div className="w-6 h-6 bg-makmar-gold rounded-full flex items-center justify-center mr-3 mt-0.5">
                                      <span className="text-white text-xs">
                                        {index + 1}
                                      </span>
                                    </div>
                                    <p>
                                      {/* Located in the central business district of Addis
                              Ababa */}
                                      {reference.reference}
                                    </p>
                                  </div>
                                  {/* <div className="flex items-start">
                            <div className="w-6 h-6 bg-makmar-gold rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs">2</span>
                            </div>
                            <p>5 minutes walk from Meskel Square</p>
                          </div>
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-makmar-gold rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs">3</span>
                            </div>
                            <p>
                              Accessible by public transport and taxi services
                            </p>
                          </div> */}
                                </div>
                              );
                            }
                          )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}

            <div className="relative">
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019123456789!2d-122.419415484681!3d37.7749297797596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c1234567%3A0xabcdef1234567890!2sYour+Business+Name!5e0!3m2!1sen!2sus!4v1681234567890!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  // allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
