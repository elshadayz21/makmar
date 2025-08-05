import { ServiceItems } from "../types/strapi-types";
import { env } from "@shared/env";
import { processImageFormats } from "@shared/imageUtils";
import "dotenv";

export const ServiceItemFetch = async () => {
  const baseUrl = env.getStrapiUrl();
  const res = await fetch(
    `${baseUrl}/api/service?populate=service_header&populate=services_CTA.cta_button&populate=services_Card.list_values&populate=services_Card.icon&populate=service_Process_Header&populate=service_process_card.icon`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  const new_data = data.data;

  console.log("new service items data", new_data);

  const serviceItems = {
    service_header: new_data?.service_header
      ? [
          {
            id: new_data.service_header.id || "",
            title: new_data.service_header.page_title || "",
            description: new_data.service_header.page_desc || "",
          },
        ]
      : [],
    service_Process_Header: new_data?.service_Process_Header
      ? [
          {
            id: new_data.service_Process_Header.id || "",
            title: new_data.service_Process_Header.title || "",
            description: new_data.service_Process_Header.desc || "",
          },
        ]
      : [],
    service_CTA: new_data?.services_CTA
      ? [
          {
            id: new_data.services_CTA.id || "",
            title: new_data.services_CTA.title || "",
            desc: new_data.services_CTA.desc || "",
            phone_number: new_data.services_CTA.phone_number || "",
            cta_button: new_data.services_CTA.cta_button
              ? {
                  icon: new_data.services_CTA.cta_button.icon || "",
                  id: new_data.services_CTA.cta_button.id || "",
                  link: new_data.services_CTA.cta_button.link || "",
                  title: new_data.services_CTA.cta_button.title || "",
                }
              : {},
          },
        ]
      : [],
    // service_Card: Array.isArray(new_data?.services_Card)
    //   ? new_data.services_Card.map((card: any) => ({
    //       id: card.id || "",
    //       title: card.title || "",
    // icon: card.icon || "",
    // desc: card.desc || "",
    // list_values: Array.isArray(card.list_values)
    //   ? card.list_values.map((item: any) => ({
    //       id: item.id || "",
    //       values: item.values || "",
    //     }))
    //   : [],
    //     }))
    //   : [],
    service_Card: Array.isArray(new_data?.services_Card)
      ? new_data.services_Card.map((card: any) => ({
          id: card.id || "",
          title: card.title || "",
          desc: card.desc || "",
          icon: Array.isArray(card?.icon)
            ? card.icon.map((icon: any) => processImageFormats(icon))
            : processImageFormats(card?.icon),
          list_values: Array.isArray(card.list_values)
            ? card.list_values.map((item: any) => ({
                id: item.id || "",
                values: item.values || "",
              }))
            : [],
        }))
      : [],
    // service_process_card: Array.isArray(new_data?.service_process_card)
    //   ? new_data.service_process_card.map((card: any) => ({
    //       id: card.id || "",
    //       title: card.title || "",
    //       icon: card.icon || "",
    //       desc: card.desc || "",

    //       step: card.step || "",
    //     }))
    //   : [],
    service_process_card: Array.isArray(new_data?.service_process_card)
      ? new_data.service_process_card.map((card: any) => ({
          id: card.id || "",
          title: card.title || "",
          icon: Array.isArray(card?.icon)
            ? card.icon.map((icon: any) => processImageFormats(icon))
            : processImageFormats(card?.icon),
          desc: card.desc || "",
          step: card.step || "",
        }))
      : [],
  };

  console.log("service.ts serviceItems", serviceItems);

  return serviceItems;
};
