"use client";

import React, { useState, useEffect } from "react";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import AboutMissionVision from "@/components/about";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Target, Eye, Users, Award, TrendingUp } from "lucide-react";
// import {AboutItemFetch} from "@../../services/about"
import { AboutItemFetch } from "../../../services/about";
import { AboutItems } from "types/strapi-types";
export default function About() {
  const { t } = useLanguage();
  const highlights = [
    {
      icon: Award,
      title: "Excellence in Service",
      description:
        "Committed to delivering the highest quality trading solutions to our clients worldwide.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our experienced professionals bring deep knowledge of international markets and trading practices.",
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description:
        "Over 15 years of successful trading operations with consistent growth and client satisfaction.",
    },
  ];

  const [AboutItemsData, setAboutItemsData] = useState<AboutItems>();

  // Fetch footer items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await AboutItemFetch();
      setAboutItemsData(data);
      console.log("AboutItemsData", AboutItemsData?.data?.aboutHeader?.title);
    };

    fetchMenuItems();
  }, []);

  console.log("about data items", AboutItemsData);
  console.log(
    "Fetched About Items Data Global_Trading_Network:",
    AboutItemsData?.data?.why_chose_MakMar_Card
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* mission and vision section */}

      <AboutMissionVision />

      {/* Company Highlights */}
      <section className="py-20 bg-makmar-light dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="text-makmar-gold">Makmar Trading</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our commitment to excellence and innovation sets us apart in the global trading industry.
            </p>
          </div> */}
          {AboutItemsData &&
            AboutItemsData?.why_MakMar?.map((header) => {
              return (
                <div className="text-center mb-16" key={header.id}>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    {/* {header.title.split(" ")[0]} First part */}
                    {header.title.split(" ").slice(0, 2).join(" ")}{" "}
                    <span className="text-makmar-gold">
                      {header.title.split(" ").slice(2).join(" ")}{" "}
                      {/* Remaining part */}
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {header.description}
                  </p>
                </div>
              );
            })}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AboutItemsData &&
              AboutItemsData?.why_chose_MakMar_Card?.map((header, index) => {
                // const IconComponent = highlight.icon;
                return (
                  <Card
                    key={header.id}
                    className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mx-auto mb-6">
                        {/* <IconComponent className="text-white h-8 w-8" /> */}
                        {/* {header?.icon?.map((icon, index) => (
                      <img
                        key={index}
                        src={icon?.url}
                        alt={icon?.alternativeText}
                        className="text-white h-16 w-16"
                      />
                    ))} */}
                     {/* {header &&
                      header?.icon?.map((icon, index) => {
                        return (
                      <>
                            <img
                        key={index}
                        src={icon?.url}
                        alt={icon?.alternativeText}
                        className="text-white h-16 w-16"
                      />
                      </>
                        );
                      })} */}
                       <img
                        key={index}
                        src={header?.icon.url}
                        alt={header?.icon?.alternativeText}
                        className="text-white h-16 w-16"
                      />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">
                        {header.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {header.desc}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {AboutItemsData &&
            AboutItemsData.Global_Trading_Network?.map((network) => {
              return (
                <div className="text-center" key={network.id}>
                  <div className="w-32 h-32 bg-makmar-gold rounded-full flex items-center justify-center mx-auto mb-8">
                    {/* <Globe className="text-white h-16 w-16" /> */}
                    {/* <img
                  src={network?.icon?.url}
                  alt={network?.icon?.alternativeText}
                  className="w-6 h-6"
                /> */}
                    {network?.icon?.map((icon, index) => (
                      <img
                        key={index}
                        src={icon?.url}
                        alt={icon?.alternativeText}
                        className="text-white h-16 w-16"
                      />
                    ))}
                  </div>
                  {/* <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Global Trading <span className="text-makmar-gold">Network</span>
            </h2> */}
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    {network.title.split(" ").slice(0, 2).join(" ")}{" "}
                    <span className="text-makmar-gold">
                      {network.title.split(" ").slice(2).join("")}
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {network?.description}
                  </p>
                </div>
              );
            })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
