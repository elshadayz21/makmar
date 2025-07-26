import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { PartnersCarousel } from "@/components/partners-carousel";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Building,
  Globe,
  TrendingUp,
  Shield,
  Users,
  Phone,
  Truck,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function Home() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Building,
      title: t("services.importExport"),
      description: t("services.importExportDesc"),
    },
    {
      icon: Users,
      title: t("services.partnerships"),
      description: t("services.partnershipsDesc"),
    },
    {
      icon: TrendingUp,
      title: t("services.analysis"),
      description: t("services.analysisDesc"),
    },
    {
      icon: Shield,
      title: t("services.risk"),
      description: t("services.riskDesc"),
    },
    {
      icon: Truck,
      title: t("services.supply"),
      description: t("services.supplyDesc"),
    },
    {
      icon: Globe,
      title: t("services.consultation"),
      description: t("services.consultationDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  {t("about.title")}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t("about.description")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="bg-makmar-light dark:bg-gray-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-makmar-gold">
                      {t("about.mission")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("about.missionText")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-makmar-light dark:bg-gray-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-makmar-gold">
                      {t("about.vision")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("about.visionText")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="hidden lg:block  relative">
              <div className="w-full h-80  from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center">
                <img
                  src="/public/global-trading-service.gif"
                  alt="MakMar Logo"
                  className="w-full h-full justify-center mb-6 rounded-2xl"
                />
                {/* <img src="/public/trade-world.gif" alt="MakMar Logo" className="w-full h-full justify-center mb-6 rounded-2xl" /> */}

                <div className="text-center">
                  {/* <Globe className="h-16 w-16 text-makmar-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-makmar-gold">
                    Global Trading Network
                  </h3> */}
                  {/* <img src="/public/global-trading-service.gif" alt="MakMar Logo" className="w-36 h-36 justify-center mb-6" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Services Section */}
      <section className="py-20 bg-makmar-light dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("services.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mb-6">
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              replace
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Button className="bg-makmar-gold hover:bg-makmar-gold-dark text-white px-8 py-3 rounded-lg font-semibold">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PartnersCarousel />

      {/* Contact Section */}
      <section className="py-20 bg-makmar-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              {t("contact.title")}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                replace
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Button className="bg-white text-makmar-gold hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold">
                  {t("contact.sendMessage")}
                </Button>
              </Link>
              <div className="flex items-center text-white space-x-2">
                <Phone className="h-5 w-5" />
                <span>{t("contact.phone")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* <footer className="bg-makmar-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-20 h-12  rounded-lg flex items-center justify-center mr-3">
                               <Link
                    to="/"
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <img
                      src="/public/makmar-Web-logo-removebg-preview.png"
                      alt="MakMar Logo"
                      className=" justify-center"
                    />
                  </Link>
                </div>
                <div className=" w-20 h-12 rounded-lg flex items-center justify-center mr-3">
                 
                </div>
              </div>
              <p className="text-gray-300 mb-4">{t("footer.description")}</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-makmar-gold transition-colors"
                >
                  <Building className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-makmar-gold transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-makmar-gold transition-colors"
                >
                  <Users className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-makmar-gold">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-makmar-gold transition-colors"
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-makmar-gold transition-colors"
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-makmar-gold transition-colors"
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {t("nav.services")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-makmar-gold transition-colors"
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-makmar-gold">
                {t("services.title")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-makmar-gold transition-colors"
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {t("services.importExport")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-makmar-gold transition-colors"
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {t("services.partnerships")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-makmar-gold transition-colors"
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {t("services.analysis")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-makmar-gold transition-colors"
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {t("services.consultation")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
