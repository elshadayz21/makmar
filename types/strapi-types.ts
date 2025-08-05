import { intersectAll } from "drizzle-orm/mysql-core";

interface PageHeader {
  id: number;
  title: string;
  description: string;
}
// interface ServiceHeader {
//   id: number;
//   page_title: string;
//   page_desc: string;
// }

interface ctaButton {
  id: number;
  title: string;
  link: string;
  icon: string;
}
interface ServicesCTA {
  id: string;
  title: string;
  desc: string;
  phone_number: string;
  ctaButton: ctaButton;
}

interface service_feature_lists {
  id: number;
  value: string |   number;
}
interface Card {
  id: number;
  title: string;
  description: string;
  list_values: service_feature_lists[];
  // icon: string;
  icon:ImageData | ImageData[];
}

interface serviceProcessCard {
  id: number;
  title: string;
  desc: string;
  step: number;
  icon: string;
}

interface contactInfo {
  id: number;
  location: string;
  phone_number: string;
  email: string;
  openHours: string;
}

interface about_section_in_footer{
  footer_desc: string;
}
interface socialMedia {
  id: number;
  socialLink: string;
  title: string;
  icon:string;
  // instagram: string;
  // twitter: string;
  // linkedin: string;
  // telegram: string;
  // youtube: string;
}
interface ImageFormat {
  url: string;
  width: number;
  height: number;
  name: string;
}
interface ImageData {
  id: number;
  name: string;
  url: string;
  alternativeText: string;
  formats: {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    
  };
}

interface footerLinks{
  title:string;
  link: socialMedia[]
}

interface Getting_There {
  reference: string;
}

interface statsSection{
  label: string;
  value: string;
}
export interface AboutItems {
  data: {
    aboutHeader: PageHeader;
    why_MakMar: PageHeader;
    visionAndMission: serviceProcessCard[];
    tradingNetwork: serviceProcessCard;
    why_MakMarCard: Card[];
    Global_Trading_Network: serviceProcessCard;
  };
}

export interface ServiceItems {
  data: {
    serviceHeader: PageHeader;
    serviceCTA: ServicesCTA;
    serviceCard: Card[];
    serviceProcessHeader: PageHeader;
    serviceProcessCard: serviceProcessCard[];
  };
}
export interface ContactUsItems {
  data: {
    contactHeader: PageHeader;
    findUsMap: PageHeader;
    contactInfo: contactInfo;
    socialMedia: socialMedia[];
    Getting_There: Getting_There[];
  };

}
  export interface HomePageItems{
    data:{
      homePageHeader: PageHeader;
      navigationLogo: ImageData;
      headerLogo: ImageData;
      About_section_Globe_Image: ImageData;
      partners_slider_images: ImageData[];
      statsSection: statsSection[];
      homepage_cta: ServicesCTA;
      
    }

  }
  export interface FooterItems {
    data : {
      about_section_in_footer: about_section_in_footer;
      // small_about_section_in_footer:string[];
      footer_links: footerLinks[];
      footer_logo: ImageData;
      rights_owned_by: about_section_in_footer;
      // rights_reserved_by: string[]
      // designed_by: small_about_section_in_footer
      website_is_designed_by: socialMedia;
    }

  }

