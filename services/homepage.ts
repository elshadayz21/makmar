import { HomePageItems } from "types/strapi-types";
import "dotenv";
// import axios from "axios";

export const HomePageItemFetch = async () => {
  const res = await fetch(
    `${
      import.meta.env.VITE_STRAPI_IP_DEV
    }/api/homepage?populate=partners_header&populate=header_logo&populate=navigation_bar_logo&populate=About_section_Globe_Image&populate=partners_slider_images&populate=statsSection&populate=Get_In_Touch_CTA`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  const new_data = data.data;

  console.log("new about items data", new_data);

  //   const data = res.data;

  const homepageItems = {
    //   about_header: data?.about_page_header?.map((header) => ({
    //     id: header?.id || "",
    //     title: header?.page_title || "",
    //     description: header?.page_desc || "",
    //   })),
    // };
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
      ? [
          {
            id: new_data.header_logo.id || "",
            name: new_data.header_logo.name || "",
            alternativeText: new_data.header_logo.alternativeText || "",
            url: new_data.header_logo.url || "",
            formats: new_data.header_logo
              ? {
                  thumbnail: new_data.header_logo?.formats
                    ? {
                        name:
                          new_data.header_logo?.formats?.thumbnail?.name || "",
                        url:
                          new_data.header_logo?.formats?.thumbnail?.url || "",
                        height:
                          new_data.header_logo?.formats?.thumbnail?.height || 0,
                        width:
                          new_data.header_logo?.formats?.thumbnail.width || 0,
                      }
                    : {},
                  large: new_data.header_logo?.formats
                    ? {
                        name: new_data.header_logo?.formats?.large?.name || "",
                        url: new_data.header_logo?.formats?.large?.url || "",
                        height:
                          new_data.header_logo?.formats?.large?.height || 0,
                        width: new_data.header_logo?.formats?.large?.width || 0,
                      }
                    : {},
                  medium: new_data.header_logo?.formats
                    ? {
                        name: new_data.header_logo?.formats?.medium?.name || "",
                        url: new_data.header_logo?.formats?.medium?.url || "",
                        height:
                          new_data.header_logo?.formats?.medium?.height || 0,
                        width: new_data.header_logo?.formats?.medium?.width || 0,
                      }
                    : {},
                  small: new_data.header_logo?.formats
                    ? {
                        name: new_data.header_logo?.formats?.small?.name || "",
                        url: new_data.header_logo?.formats?.small?.url || "",
                        height:
                          new_data.header_logo?.formats?.small?.height || 0,
                        width: new_data.header_logo?.formats?.small?.width || 0,
                      }
                    : {},
                }
              : {},
          },
        ]
      : [],

    navigation_bar_logo: new_data?.navigation_bar_logo
      ? [
          {
            id: new_data.navigation_bar_logo.id || "",
            navigation_logo: new_data.navigation_bar_logo.navigation_logo
              ? {
                  id: new_data.navigation_bar_logo.navigation_logo.id || "",
                  formats: new_data.navigation_bar_logo.navigation_logo.formats
                    ? {
                        thumbnail: new_data.navigation_bar_logo.navigation_logo
                          .formats.thumbnail
                          ? {
                              name:
                                new_data.navigation_bar_logo.navigation_logo
                                  .formats.thumbnail.name || "",
                              url:
                                new_data.navigation_bar_logo.navigation_logo
                                  .formats.thumbnail.url || "",
                            }
                          : {},
                   
                        large: new_data.header_logo?.formats
                          ? {
                              name:
                                new_data.header_logo?.formats?.large?.name ||
                                "",
                              url:
                                new_data.header_logo?.formats?.large?.url || "",
                              height:
                                new_data.header_logo?.formats?.large?.height ||
                                0,
                              width:
                                new_data.header_logo?.formats?.large?.width || 0,
                            }
                          : {},
                        medium: new_data.header_logo?.formats
                          ? {
                              name:
                                new_data.header_logo?.formats?.medium?.name ||
                                "",
                              url:
                                new_data.header_logo?.formats?.medium?.url ||
                                "",
                              height:
                                new_data.header_logo?.formats?.medium?.height ||
                                0,
                              width:
                                new_data.header_logo?.formats?.medium?.width ||
                                0,
                            }
                          : {},
                      }
                    : {},
                  small: new_data.header_logo?.formats
                    ? {
                        name: new_data.header_logo?.formats?.small?.name || "",
                        url: new_data.header_logo?.formats?.small?.url || "",
                        height:
                          new_data.header_logo?.formats?.small?.height || 0,
                        width: new_data.header_logo?.formats?.small?.width || 0,
                      }
                    : {},
                }
              : {},
          },
        ]
      : [],

    About_section_Globe_Image: new_data?.About_section_Globe_Image
      ? [
          {
            id: new_data.About_section_Globe_Image.id || "",
            name: new_data.About_section_Globe_Image.name || "",
            alternativeText:
              new_data.About_section_Globe_Image.alternativeText || "",
            formats: new_data.About_section_Globe_Image
              ? {
                  thumbnail: new_data.About_section_Globe_Image?.formats
                    ? {
                        name:
                          new_data.About_section_Globe_Image?.formats?.thumbnail
                            ?.name || "",
                        url:
                          new_data.About_section_Globe_Image?.formats?.thumbnail
                            ?.url || "",
                      }
                    : {},
                  large: new_data.header_logo?.formats
                    ? {
                        name: new_data.header_logo?.formats?.large?.name || "",
                        url: new_data.header_logo?.formats?.large?.url || "",
                        height:
                          new_data.header_logo?.formats?.large?.height || 0,
                        width: new_data.header_logo?.formats?.large?.width || 0,
                      }
                    : {},
                  medium: new_data.header_logo?.formats
                    ? {
                        name: new_data.header_logo?.formats?.medium?.name || "",
                        url: new_data.header_logo?.formats?.medium?.url || "",
                        height:
                          new_data.header_logo?.formats?.medium?.height || 0,
                        width: new_data.header_logo?.formats?.medium?.width || 0,
                      }
                    : {},
                  small: new_data.header_logo?.formats
                    ? {
                        name: new_data.header_logo?.formats?.small?.name || "",
                        url: new_data.header_logo?.formats?.small?.url || "",
                        height:
                          new_data.header_logo?.formats?.small?.height || 0,
                        width: new_data.header_logo?.formats?.small?.width || 0,
                      }
                    : {},
                }
              : {},
          },
        ]
      : [],
    partners_slider_images: Array.isArray(new_data?.partners_slider_images)
      ? new_data.partners_slider_images.map((image: any) => ({
          id: image.id || "",
          name: image.name || "",
          alternativeText: image.alternativeText || "",
          formats: image.formats
            ? {
                thumbnail: image.formats.thumbnail
                  ? {
                      name: image.formats.thumbnail.name || "",
                      url: image.formats.thumbnail.url || "",
                    }
                  : {},
                large: new_data.header_logo?.formats
                  ? {
                      name: new_data.header_logo?.formats?.large?.name || "",
                      url: new_data.header_logo?.formats?.large?.url || "",
                      height: new_data.header_logo?.formats?.large?.height || 0,
                      width: new_data.header_logo?.formats?.large?.width || 0,
                    }
                  : {},
                medium: new_data.header_logo?.formats
                  ? {
                      name: new_data.header_logo?.formats?.medium?.name || "",
                      url: new_data.header_logo?.formats?.medium?.url || "",
                      height:
                        new_data.header_logo?.formats?.medium?.height || 0,
                      width: new_data.header_logo?.formats?.medium?.width || 0,
                    }
                  : {},
                small: new_data.header_logo?.formats
                  ? {
                      name: new_data.header_logo?.formats?.small?.name || "",
                      url: new_data.header_logo?.formats?.small?.url || "",
                      height: new_data.header_logo?.formats?.small?.height || 0,
                      width: new_data.header_logo?.formats?.small?.width || 0,
                    }
                  : {},
              }
            : {},
        }))
      : [],
  };

  return homepageItems;
};
