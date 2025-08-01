import { FooterItems } from "types/strapi-types";
import { env } from "@shared/env";
import { processImageFormats, processImageArray } from "@shared/imageUtils";
import "dotenv";

export const FooterItemFetch = async () => {
  const baseUrl = env.getStrapiUrl();
  const res = await fetch(
    `${baseUrl}/api/footer?populate=footer_links.link&populate=footer_logo&populate=about_section_in_footer&populate=rights_owned_by&populate=website_is_designed_by`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  const new_data = data.data;

  console.log("new footer items data", new_data);

  const footerItems = {
    about_section_in_footer: new_data?.about_section_in_footer
      ? [
          {
            id:
              new_data.about_section_in_footer.id || "",
              title:
              new_data.about_section_in_footer.footer_desc || "",
          },
        ]
      : [],
 rights_owned_by: new_data?.rights_owned_by
      ? [
          {
            id: new_data.rights_owned_by.id || "",
            title: new_data.rights_owned_by.footer_desc || "",
            // description: new_data.partners_header.page_desc || "",
          },
        ]
      : [],
    website_is_designed_by: new_data?.website_is_designed_by
      ? [
          {
            id: new_data.website_is_designed_by.id || "",
            title: new_data.website_is_designed_by.title || "",
            socialLink: new_data.website_is_designed_by.socialLink || "",
          },
        ]
      : [],

    // footer_links: new_data?.footer_links
    //   ? [
    //       {
    //         id: new_data.footer_links.id || "",
    //         title: new_data.footer_links.title || "",
    //         link: new_data.footer_links.link
    //           ? new_data.footer_links.link.map((link: any) => ({
    //               id: link.id || "",
    //               title: link.title || "",
    //               socialLink: link.socialLink || "",
    //             }))
    //           : [],
    //       },
    //     ]
    //   : [],
    footer_links: new_data?.footer_links
  ? new_data.footer_links.map((link: any) => ({
      id: link.id || "",
      title: link.title || "",
      link: link.link
        ? link.link.map((subLink: any) => ({
            id: subLink.id || "",
            title: subLink.title || "",
            socialLink: subLink.socialLink || "",
          }))
        : [],
    }))
  : [],

    footer_logo: new_data?.footer_logo
      ? [processImageFormats(new_data.footer_logo)]
      : [],

    
  };
console.log("footerItems for footer.ts", footerItems);
  return footerItems;
};
