import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Building,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Ship,
  BarChart3,
  FileText,
  Handshake,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";
import { ServiceItems } from "types/strapi-types";
import { ServiceItemFetch } from "../../../services/service";
import React, { useState, useEffect } from "react";
export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Building,
      title: t("services.importExport"),
      description: t("services.importExportDesc"),
      features: [
        "Global shipping coordination",
        "Customs clearance assistance",
        "Documentation handling",
        "Quality assurance",
      ],
    },
    {
      icon: Users,
      title: t("services.partnerships"),
      description: t("services.partnershipsDesc"),
      features: [
        "Strategic alliance development",
        "Market entry support",
        "Joint venture facilitation",
        "Network expansion",
      ],
    },
    {
      icon: TrendingUp,
      title: t("services.analysis"),
      description: t("services.analysisDesc"),
      features: [
        "Market intelligence reports",
        "Price trend analysis",
        "Competitive landscape mapping",
        "Risk assessment",
      ],
    },
    {
      icon: Shield,
      title: t("services.risk"),
      description: t("services.riskDesc"),
      features: [
        "Financial risk evaluation",
        "Political risk assessment",
        "Insurance coordination",
        "Hedging strategies",
      ],
    },
    {
      icon: Truck,
      title: t("services.supply"),
      description: t("services.supplyDesc"),
      features: [
        "Logistics optimization",
        "Inventory management",
        "Supplier verification",
        "Delivery tracking",
      ],
    },
    {
      icon: Globe,
      title: t("services.consultation"),
      description: t("services.consultationDesc"),
      features: [
        "Strategic planning",
        "Market entry advice",
        "Regulatory compliance",
        "Business development",
      ],
    },
  ];

  const processSteps = [
    {
      icon: FileText,
      title: "Initial Consultation",
      description:
        "We analyze your needs and develop a customized trading strategy.",
    },
    {
      icon: BarChart3,
      title: "Market Research",
      description:
        "Comprehensive market analysis to identify opportunities and risks.",
    },
    {
      icon: Handshake,
      title: "Partnership Development",
      description:
        "Connect with verified partners and establish trading relationships.",
    },
    {
      icon: Ship,
      title: "Execution & Delivery",
      description:
        "Seamless execution of trades with end-to-end logistics support.",
    },
  ];

  const [ServiceItemsData, setServiceItemsData] = useState<ServiceItems>();

  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await ServiceItemFetch();
      console.log("data.service_header", data); // Log fetched data directly
      setServiceItemsData(data); // Update state
    };

    fetchMenuItems();
    // console.log("Fetched ServiceItemsData", ServiceItemsData);
  }, []);

  console.log("Fetched ServiceItemsData", ServiceItemsData);
  // console.log("ServiceItemsData?.data?.serviceHeader?.page_desc", ServiceItemsData?.data?.serviceHeader?.page_desc);
  //   console.log("ServiceItemsData.data?.serviceCTA?.title}",ServiceItemsData);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-36 pb-0 bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {ServiceItemsData &&
            ServiceItemsData?.service_header?.map((header) => {
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

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ServiceItemsData &&
              ServiceItemsData?.service_Card?.map((card) => {
                const IconComponent = card?.icon;
                return (
                  <Card
                    key={card.id}
                    className="bg-makmar-light dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mb-6">
                        {/* <IconComponent className="text-white h-8 w-8" /> */}
                      </div>
                      <h3 className="text-xl font-semibold mb-4">
                        {card?.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {card?.desc}
                      </p>
                      <ul className="space-y-2">
                        {Array.isArray(card?.list_values) &&
                          card?.list_values.map((feature) => (
                            <li
                              key={feature.id}
                              className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                            >
                              <CheckCircle className="h-4 w-4 text-makmar-gold mr-2 mt-1 flex-shrink-0" />
                              <div>
                                <span className="font-medium">
                                  {feature.values || "Default Feature"}
                                </span>
                                {/* {feature.description && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {feature.description}
                                  </p>
                                )} */}
                                {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {feature?.values}
                                  </p> */}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-makmar-light dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {ServiceItemsData &&
            ServiceItemsData?.service_Process_Header?.map((header) => {
              return (
                <div className="text-center mb-16" key={header.id}>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    {header.title.split(" ")[0]} {/* First part */}
                    <span className="text-makmar-gold">
                      {header.title.split(" ").slice(1).join(" ")}{" "}
                      {/* Remaining part */}
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                   {header.description}
                  </p>
                </div>
              );
            })}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ServiceItemsData &&
              ServiceItemsData?.service_process_card?.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card
                  key={step.id}
                  className="bg-white dark:bg-gray-800 shadow-lg"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-makmar-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                      {/* <IconComponent className="text-white h-6 w-6" /> */}
                    </div>
                    <div className="w-8 h-8 bg-makmar-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {ServiceItemsData &&
            ServiceItemsData?.service_CTA.map((cta) => {
              return (
                <div className="bg-makmar-gold rounded-2xl p-12" key={cta?.id}>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                    {cta.title}
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    {cta.desc}
                  </p>
                  <Link
                    href={cta.cta_button?.link}
                    replace
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <Button className="bg-white text-makmar-gold hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg">
                      {cta.cta_button?.title || "Contact Us"}
                    </Button>
                  </Link>
                </div>
              );
            })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
