"use client";

import React, { useState, useEffect } from "react";

import { Link } from "wouter";

import { useLanguage } from "@/components/language-provider";
import { Building, Globe, Users, Mail, Phone } from "lucide-react";
import { FooterItemFetch } from "../../../services/footer";
import { FooterItems } from "types/strapi-types";
export function Footer() {
  const { t } = useLanguage();

  const [FooterItemsData, setFooterItemsData] = useState<FooterItems>();

  // Fetch footer items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await FooterItemFetch();
      setFooterItemsData(data);
      console.log("useEffect Footer Items Data", data);
    };

    fetchMenuItems();
  }, []);

  console.log("footer data items", FooterItemsData?.data?.footer_logo);
  console.log("Fetched footer Items Data:", FooterItemsData);
  // FooterItemsData

  return (
    <footer className="bg-makmar-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="w-28 h-16 flex items-center mb-6">
              {/* <div className="w-10 h-10 bg-makmar-gold rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-makmar-gold">MAKMAR</h3>
                <p className="text-sm text-gray-300">TRADING PLC</p>
              </div> */}
              {/* <img
                src="/public/makmar-Web-logo-removebg-preview.png"
                alt="MakMar Logo"
                className=" justify-center"
              /> */}
                 {FooterItemsData?.footer_logo && FooterItemsData.footer_logo.length > 0 ? (
                                FooterItemsData.footer_logo.map((image: any, index: number) => (
                                  <img
                                    key={image.id || index}
                                    src={image.url}
                                    alt={image.alternativeText || "Logo"}
                                    className="w-full h-full object-cover rounded-2xl"
                                  />
                                ))
                              ) : (
                                <div className="text-center">
                                  {/* <Globe className="h-16 w-16 text-makmar-gold mx-auto mb-4" /> */}
                                  <h3 className="text-xl font-bold text-makmar-gold">
                                   MakMak Trading PLC
                                  </h3>
                                </div>
                              )}
            </div>
            <p className="text-gray-300 mb-4">
              {/* {t("footer.description")} */}
              {FooterItemsData &&
                FooterItemsData?.about_section_in_footer?.map(
                  (footer, index) => {
                    return <span key={index}>{footer?.title}</span>;
                  }
                )}

              {/* {FooterItemsData && FooterItemsData?.data?.small_about_section_in_footer.map((item, index) => (
                <span key={index}>
                  {item?.small_about_section_in_footer}
                </span>
              
))} */}
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-makmar-gold transition-colors"
              >
                <Building className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-makmar-gold transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-makmar-gold transition-colors"
              >
                <Users className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-makmar-gold transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-makmar-gold transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div> */}
          </div>

          {FooterItemsData &&
            FooterItemsData.footer_links?.map((item) => {
              return (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-makmar-gold">
                    {/* {t("footer.quickLinks")} */}
                    {item.title}
                  </h4>
                  <ul className="space-y-2">
                    {Array.isArray(item.link) &&
                      item.link.map((links) => (
                        <li>
                          <Link
                            href={links.title}
                            className="text-gray-300 hover:text-makmar-gold transition-colors"
                            replace
                            onClick={() =>
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                          >
                            {/* {t("nav.home")} */}
                            {links.socialLink}
                          </Link>
                        </li>
                      ))}

                    {/* <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-makmar-gold transition-colors"
                  replace
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-makmar-gold transition-colors"
                  replace
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-makmar-gold transition-colors"
                  replace
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {t("nav.contact")}
                </Link>
              </li> */}
                  </ul>
                </div>
              );
            })}

          {/* <div>
            <h4 className="text-lg font-semibold mb-4 text-makmar-gold">
              {t("services.title")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-makmar-gold transition-colors"
                >
                  {t("services.importExport")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-makmar-gold transition-colors"
                >
                  {t("services.partnerships")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-makmar-gold transition-colors"
                >
                  {t("services.analysis")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-makmar-gold transition-colors"
                >
                  {t("services.consultation")}
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 items-center justify-center flex-flow  gap-x-60 ">
          {FooterItemsData &&
            FooterItemsData?.rights_owned_by?.map((link) => {
              return (
                <p className="text-gray-400 text-center">
                  {/* {t("footer.copyright")}
                   */}
                  © {new Date().getFullYear()} {link.title}
                </p>
              );
            })}
          <p className="text-gray-600 text-right ">
            {" "}
            {/* <Link href={"https://google.com"} target="_blank">
              {" "}
              etegeTechs
            </Link> */}
            {FooterItemsData &&
              FooterItemsData?.website_is_designed_by?.map((link) => {
                return (
                  <span key={link.id}>
                    {/* <span key={index}>
                  {footer?.title}
                </span> */}
                    Designed By:{" "}
                    <a
                      href={link.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  </span>
                );
              })}
          </p>
          {/* <div className="justify-self-end">
           <p className="text-gray-400 text-right">
            {" "}
            Designed By:  h.wix.com" target="_blank"> etegeTech</a>
          </p>
       </div> */}

          {/* <div className=" text-center">
          <p className="text-gray-400">{t("footer.copyright")}</p>
        </div> */}
          {/* <div className="text-right">
        <p className="text-gray-400"> Designed By: <a href="etegeTech.wix.com"> etegeTech</a></p>
      </div> */}
        </div>
      </div>
    </footer>
  );
}
