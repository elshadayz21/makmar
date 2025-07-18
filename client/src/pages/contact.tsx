import { Navigation } from "@/components/navigation";
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
  Instagram 
} from "lucide-react";
import { z } from "zod";

type ContactForm = z.infer<typeof insertContactSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();

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
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. We will get back to you soon.",
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="bg-makmar-light dark:bg-gray-800 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-makmar-gold">
                    {t("contact.info")}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 text-makmar-gold mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {t("contact.address")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-6 w-6 text-makmar-gold mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {t("contact.phone")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-6 w-6 text-makmar-gold mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {t("contact.email")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-6 w-6 text-makmar-gold mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {t("contact.hours")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-makmar-light dark:bg-gray-800 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-makmar-gold">
                    {t("contact.followUs")}
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
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
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-makmar-light dark:bg-gray-800 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-makmar-gold">
                  {t("contact.sendMessage")}
                </h3>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t("contact.firstName")}</Label>
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
                    {contactMutation.isPending ? "Sending..." : t("contact.sendButton")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-makmar-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-makmar-gold rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-makmar-gold">MAKMAR</h3>
                  <p className="text-sm text-gray-300">TRADING PLC</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                {t("footer.description")}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="text-gray-400 hover:text-makmar-gold transition-colors"
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-makmar-gold">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("nav.home")}</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("nav.about")}</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("nav.services")}</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("nav.contact")}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-makmar-gold">
                {t("services.title")}
              </h4>
              <ul className="space-y-2">
                <li><a href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("services.importExport")}</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("services.partnerships")}</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("services.analysis")}</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("services.consultation")}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
