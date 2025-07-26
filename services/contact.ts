import "dotenv";
// import axios from "axios";

export const ContactUsItemFetch = async () => {
  const res = await fetch(
    `${
      import.meta.env.VITE_STRAPI_IP_DEV
    }/api/contact-us?populate=contactHeader&populate=contactInfo&populate=socialLink&populate=findUsMap&populate=Getting_There`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  const new_data = data.data;

  console.log("new contact items data", new_data);

  //   const data = res.data;

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
        }))
      : [],
    Getting_There: Array.isArray(new_data?.Getting_There)
     ? new_data.Getting_There.map((card: any) =>
       ({id: card.id || "", reference: card.reference || ""})) : [],

    }
  return contactItems;
};
