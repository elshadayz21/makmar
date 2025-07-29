"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { PartnersCarousel } from "@/components/partners-carousel";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OurServices from "@/components/our-services";
import { ServiceItems } from "types/strapi-types";
import { ServiceItemFetch } from "../../../services/service";
import { HomePageItemFetch } from "../../../services/homepage";
import { HomePageItems } from "types/strapi-types";
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
import AboutMissionVision from "@/components/about";
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

  const [HomePageItemsData, setHomePageItemsData] = useState<HomePageItems>();
  // Fetch footer items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await HomePageItemFetch();
      setHomePageItemsData(data);
      // console.log("AboutItemsData", HomePageItemsData?.data?.aboutHeader?.title);
    };

    fetchMenuItems();
  }, []);

  console.log("about data items", HomePageItemsData);
  console.log("Fetched About Items Data:", HomePageItemsData);

  const [ServiceItemsData, setServiceItemsData] = useState<ServiceItems>();

  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await ServiceItemFetch();
      console.log("Fetched ServiceItemsData", data);
      setServiceItemsData(data);
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      {/* About Section */}

      {/* <AboutMissionVision /> */}

      <section className="py-16 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AboutMissionVision />
            {/* <div className="space-y-8">
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
            </div> */}
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

      {HomePageItemsData && (
        <StatsSection
          statValues={HomePageItemsData.statsSection.map((item) => ({
            label: item.label,
            target: item.value,
          }))}
        />
      )}
      {/* 
      <StatsSection
        statValues={[
          { label: t("stats.clients"), target: 500 },
          { label: t("stats.trades"), target: 1000 },
          { label: t("stats.partners"), target: 50 },
          { label: t("stats.experience"), target: 15 },
        ]}
      /> */}
      <OurServices
        services={ServiceItemsData?.service_Card?.slice(0, 3) || []} // Ensure fallback to an empty array if data is undefined
        header={ServiceItemsData?.service_header || []} // Provide a default header structure
      />

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
