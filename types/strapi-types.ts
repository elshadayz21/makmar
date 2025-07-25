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
  value: string;
}
interface Card {
  id: number;
  title: string;
  description: string;
  list_values: service_feature_lists[];
  icon: string;
}

interface serviceProcessCard {
  id: number;
  title: string; 
  desc: string;
  step: number;
  icon: string;
}


export interface AboutItems {
  data: {
    aboutHeader: PageHeader;
    why_MakMar: PageHeader;
    visionAndMission: serviceProcessCard[];
    tradingNetwork:serviceProcessCard;
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
