import { HomePageItems } from "types/strapi-types";
import { env } from "@shared/env";
import { processImageFormats, processImageArray } from "@shared/imageUtils";
import "dotenv";

export const HomePageItemFetch = async () => {
   const baseUrl = env.getStrapiUrl();
  const res = await fetch(
    `${
     baseUrl
    }/api/homepage?populate=navigation_logo&populate=partners_header&populate=header_logo&populate=About_section_Globe_Image&populate=statsSection&populate=partners_slider_images&populate=Get_In_Touch_CTA.cta_button`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
console.log("✅ Homepage Service - Base URL:", baseUrl);
console.log("✅ Homepage Service - NODE_ENV:", env.NODE_ENV);
console.log("✅ Homepage Service - STRAPI_PROD:", env.STRAPI_IP_PROD);
console.log("✅ Homepage Service - DATABASE_URL:", env.DATABASE_URL);
  const data = await res.json();

  const new_data = data.data;

  console.log("new about items data", new_data);

  const homepageItems = {
    partners_header: new_data?.partners_header
      ? [
          {
            id: new_data.partners_header.id || "",
            title: new_data.partners_header.page_title || "",
            description: new_data.partners_header.page_desc || "",
          },
        ]
      : [],
    Get_In_Touch_CTA: new_data?.Get_In_Touch_CTA
      ? [
          {
            id: new_data.Get_In_Touch_CTA.id || "",
            title: new_data.Get_In_Touch_CTA.title || "",
            description: new_data.Get_In_Touch_CTA.desc || "",
            phone_number: new_data.Get_In_Touch_CTA.phone_number || "",
            cta_button: new_data.Get_In_Touch_CTA.cta_button
              ? {
                  icon: new_data.Get_In_Touch_CTA.cta_button.icon || "",
                  id: new_data.Get_In_Touch_CTA.cta_button.id || "",
                  link: new_data.Get_In_Touch_CTA.cta_button.link || "",
                  title: new_data.Get_In_Touch_CTA.cta_button.title || "",
                }
              : {},
          },
        ]
      : [],
    statsSection: Array.isArray(new_data?.statsSection)
      ? new_data.statsSection.map((stat: any) => ({
          id: stat.id || "",
          label: stat.label || "",
          value: stat.value || "",
        }))
      : [],

    header_logo: new_data?.header_logo
      ? [processImageFormats(new_data.header_logo)]
      : [],

    navigation_logo: new_data?.navigation_logo
      ? [processImageFormats(new_data.navigation_logo)]
      : [],
    // navigation_bar_logo: processImageArray(new_data?.navigation_logo || []),

    About_section_Globe_Image: new_data?.About_section_Globe_Image
      ? [processImageFormats(new_data.About_section_Globe_Image)]
      : [],

    partners_slider_images: processImageArray(new_data?.partners_slider_images || []),
  };

  return homepageItems;
};
