import { env } from "@shared/env";
import "dotenv";
import { processImageFormats, processImageArray } from "@shared/imageUtils";
export const ContactUsItemFetch = async () => {
   const baseUrl = env.getStrapiUrl();
  const res = await fetch(
    `${baseUrl}/api/contact-us?populate=contactHeader&populate=contactInfo&populate=socialLink.icon&populate=findUsMap&populate=Getting_There`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  const new_data = data.data;



  const contactItems = {
    //   about_header: data?.about_page_header?.map((header) => ({
    //     id: header?.id || "",
    //     title: header?.page_title || "",
    //     description: header?.page_desc || "",
    //   })),
    // };
    contactHeader: new_data?.contactHeader
      ? [
          {
            id: new_data.contactHeader.id || "",
            title: new_data.contactHeader.page_title || "",
            description: new_data.contactHeader.page_desc || "",
          },
        ]
      : [],
    findUsMap: new_data?.findUsMap
      ? [
          {
            id: new_data.findUsMap.id || "",
            title: new_data.findUsMap.page_title || "",
            description: new_data.findUsMap.page_desc || "",
          },
        ]
      : [],
    contactInfo: new_data?.contactInfo
      ? [
          {
            id: new_data.contactInfo.id || "",
            location: new_data.contactInfo.location || "",
            phone_number: new_data.contactInfo.phone_number || "",
            email: new_data.contactInfo.email || "",
            openHours: new_data.contactInfo.openHours || "",
            // description: new_data.Global_Trading_Network.desc || "",
          },
        ]
      : [],

    socialLink: Array.isArray(new_data?.socialLink)
      ? new_data.socialLink.map((card: any) => ({
          id: card.id || "",
          title: card.title || "",
          socialLink: card.socialLink || "",
          icon: card?.icon
             ? [processImageFormats(card?.icon)]
             : []
        }))
      : [],
    Getting_There: Array.isArray(new_data?.Getting_There)
     ? new_data.Getting_There.map((card: any) =>
       ({id: card.id || "", reference: card.reference || ""})) : [],

    }
  console.log("✅ Contact Service -socialLink:", contactItems?.socialLink);

  return contactItems;
};
