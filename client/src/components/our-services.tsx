import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { ServiceItems } from "types/strapi-types";
import { ServiceItemFetch } from "../../../services/service";
import React, { useState, useEffect } from "react";

// export default function OurServices() {
//   const { t } = useLanguage();
//   const [ServiceItemsData, setServiceItemsData] = useState<ServiceItems>();

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       const data = await ServiceItemFetch();
//       console.log("Fetched ServiceItemsData", data);
//       setServiceItemsData(data);
//     };

//     fetchMenuItems();
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="pt-36 pb-0 bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {ServiceItemsData?.service_header?.map((header) => (
//             <div className="text-center" key={header.id}>
//               <h1 className="text-4xl sm:text-5xl font-bold mb-4">
//                 {header.title}
//               </h1>
//               <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//                 {header.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-20 bg-white dark:bg-makmar-dark">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {ServiceItemsData?.service_Card?.map((card) => (
//               <Card
//                 key={card.id}
//                 className="bg-makmar-light dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <CardContent className="p-8">
//                   <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mb-6">
//                     {/* Render Icon if available */}
//                     {card.icon && (
//                       <CheckCircle className="text-white h-8 w-8" />
//                     )}
//                   </div>
//                   <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
//                   <p className="text-gray-600 dark:text-gray-300 mb-6">
//                     {card.desc}
//                   </p>
//                   <ul className="space-y-2">
//                     {Array.isArray(card.list_values) &&
//                       card.list_values.map((feature) => (
//                         <li
//                           key={feature.id}
//                           className="flex items-start text-sm text-gray-600 dark:text-gray-300"
//                         >
//                           <CheckCircle className="h-4 w-4 text-makmar-gold mr-2 mt-1 flex-shrink-0" />
//                           <div>
//                             <span className="font-medium">
//                               {feature.values || "Default Feature"}
//                             </span>
//                           </div>
//                         </li>
//                       ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
interface ImageData { url: string; alternativeText: string };
interface OurServicesProps {
  services: {
    id: string;
    icon?:ImageData | ImageData[];
    title: string;
    desc: string;
    list_values?: { id: string; values: string }[];
  }[];
  header: {
    title: string;
    description: string;
  }[];
}

export default function OurServices({ services, header }: OurServicesProps) {
  console.log("OurServices Data:", services);
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-36 pb-0 bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Array.isArray(header) &&
            header.map((item, index) => (
              <div className="text-center" key={index}>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                  {item.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((card, index) => (
              <Card
                key={card.id}
                className="bg-makmar-light dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mb-6">
                    {/* {card.icon && <card.icon className="text-white h-8 w-8" />} */}
                       
                                               {Array.isArray(card.icon) &&
                      card?.icon?.map((icon) => (
                        <img
                                            key={index}
                                            src={icon?.url}
                                            alt={icon?.alternativeText}
                                            className="h-16 w-16"
                                          />
                      ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {card.desc}
                  </p>
                  <ul className="space-y-2">
                    {Array.isArray(card.list_values) &&
                      card.list_values.map((feature) => (
                        <li
                          key={feature.id}
                          className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                        >
                          <CheckCircle className="h-4 w-4 text-makmar-gold mr-2 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">
                              {feature.values || "Default Feature"}
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
