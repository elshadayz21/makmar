"use client";

import React, { useState, useEffect } from "react";

import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Target, Eye, Users, Award, TrendingUp } from "lucide-react";
// import {AboutItemFetch} from "@../../services/about"
import { AboutItemFetch } from "../../../services/about";
import { AboutItems } from "types/strapi-types";
export default function AboutMissionVision() {
  const { t } = useLanguage();

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
  console.log("Fetched About Items Data:", AboutItemsData);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32  pb-0 bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                      {AboutItemsData?.data?.aboutHeader?.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                      {t("about.description")}
                    </p>
                  </div>
                </div> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {AboutItemsData &&
            AboutItemsData?.about_header?.map((header) => {
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
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {AboutItemsData &&
              AboutItemsData?.vision_mission_card?.map((card) => {
                return (
                  <Card
                    className="bg-makmar-light dark:bg-gray-800 border-makmar-gold border-2"
                    key={card.id}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-makmar-gold rounded-full flex items-center justify-center mx-auto mb-6">
                        {/* <Target className="text-white h-8 w-8" /> */}
                        {/* {card.icon} */}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-makmar-gold">
                        {/* {t("about.mission")} */}
                        {card.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {/* {t("about.missionText")} */}
                        {card.desc}
                      </p>
                    </CardContent>
                  </Card>

                  // <Card className="bg-makmar-light dark:bg-gray-800 border-makmar-gold border-2">
                  //   <CardContent className="p-8 text-center">
                  //     <div className="w-16 h-16 bg-makmar-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  //       <Eye className="text-white h-8 w-8" />
                  //     </div>
                  //     <h3 className="text-2xl font-bold mb-4 text-makmar-gold">
                  //       {t("about.vision")}
                  //     </h3>
                  //     <p className="text-gray-600 dark:text-gray-300 text-lg">
                  //       {t("about.visionText")}
                  //     </p>
                  //   </CardContent>
                  // </Card>
                );
              })}
          </div>
        </div>
      </section>{" "}
    </div>
  );
}
