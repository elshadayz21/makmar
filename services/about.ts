import { AboutItems } from "types/strapi-types";
import { env } from "@shared/env";
import "dotenv";

export const AboutItemFetch = async () => {
  const baseUrl = env.getStrapiUrl();
  const res = await fetch(
    `${baseUrl}/api/about?populate=about_page_header&populate=why_MakMar&populate=vision_mission_card.icon&populate=Global_Trading_Network.icon&populate=why_chose_MakMar_Card.icon`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  const new_data = data.data;

  console.log("✅ About Service - Base URL:", baseUrl);
  console.log("✅ About Service - NODE_ENV:", env.NODE_ENV);
  console.log("✅ About Service - STRAPI_PROD:", env.STRAPI_IP_PROD);
  console.log("new about items data", new_data);

  //   const data = res.data;

  const aboutItems = {
    //   about_header: data?.about_page_header?.map((header) => ({
    //     id: header?.id || "",
    //     title: header?.page_title || "",
    //     description: header?.page_desc || "",
    //   })),
    // };
    about_header: new_data?.about_page_header
      ? [
          {
            id: new_data.about_page_header.id || "",
            title: new_data.about_page_header.page_title || "",
            description: new_data.about_page_header.page_desc || "",
          },
        ]
      : [],
    why_MakMar: new_data?.why_MakMar
      ? [
          {
            id: new_data.why_MakMar.id || "",
            title: new_data.why_MakMar.title || "",
            description: new_data.why_MakMar.desc || "",
          },
        ]
      : [],
    Global_Trading_Network: new_data?.Global_Trading_Network
      ? [
          {
            id: new_data.Global_Trading_Network.id || "",
            title: new_data.Global_Trading_Network.title || "",
            description: new_data.Global_Trading_Network.desc || "",
          },
        ]
      : [],
    vision_mission_card: Array.isArray(new_data?.vision_mission_card)
      ? new_data.vision_mission_card.map((card: any) => ({
          id: card.id || "",
          title: card.title || "",
          icon: card.icon || "",
          desc: card.desc || "",
          step: card.step || "",
          
        }))
      : [],
      why_chose_MakMar_Card: Array.isArray(new_data?.why_chose_MakMar_Card)
      ? new_data.why_chose_MakMar_Card.map((card: any) => ({
          id: card.id || "",
          title: card.title || "",
          icon: card.icon || "",
          desc: card.desc || "",
          step: card.step || "",
          
        }))
      : [],
  }

  return aboutItems;
};
