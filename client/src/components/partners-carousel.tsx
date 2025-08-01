// import { useEffect, useState } from "react";
// import { useLanguage } from "@/components/language-provider";
// import { Building, Factory, Globe, Ship } from "lucide-react";

// const partners = [
//   {
//     name: "Global Corp",
//     type: "Trading Partner",
//     icon: Building,
//   },
//   {
//     name: "TradeTech Ltd",
//     type: "Strategic Partner",
//     icon: Factory,
//   },
//   {
//     name: "International Markets",
//     type: "Global Partner",
//     icon: Globe,
//   },
//   {
//     name: "Maritime Solutions",
//     type: "Logistics Partner",
//     icon: Ship,
//   },
// ];
// interface StatItemProps {
//   id: number;
//   url: string;
//   alternateText: string;
// }

// interface StatsSectionProps {
//   statValues: StatItemProps[];
// }

// export function PartnersCarousel({ statValues }: StatsSectionProps) {
//   const { t } = useLanguage();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => prev + 1);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // Create an infinite loop by duplicating the partners array multiple times
//   const infinitePartners = [...partners, ...partners, ...partners];

//   return (
//     <section className="py-20 bg-white dark:bg-makmar-dark">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">
//             {t("partners.title")}
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300">
//             {t("partners.subtitle")}
//           </p>
//         </div>
        
//         <div className="relative overflow-hidden">
//           <div 
//             className="flex"
//             style={{ 
//               transform: `translateX(-${(currentIndex * 272) % (partners.length * 272)}px)`,
//               transition: 'transform 0.5s ease-in-out',
//               width: `${infinitePartners.length * 272}px`
//             }}
//           >
//             {infinitePartners.map((partner, index) => {
//               const IconComponent = partner.icon;
//               return (
//                 <div
//                   key={`${partner.name}-${index}`}
//                   className="flex-shrink-0 w-64 mx-4 bg-makmar-light dark:bg-gray-800 p-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow"
//                 >
//                   <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mx-auto mb-4">
//                     <IconComponent className="text-white h-8 w-8" />
//                   </div>
//                   <h3 className="font-semibold text-makmar-gold text-lg">{partner.name}</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">
//                     {partner.type}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  id: number;
  url: string;
  alternativeText: string;
}

interface HeaderProps {
  title: string;
  description: string;
}
interface StatsSectionProps {
  statValues: StatItemProps[];
  header: HeaderProps[];
}

export function PartnersCarousel({ statValues, header }: StatsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 272; // width of each card including margin
  const scrollRef = useRef<HTMLDivElement>(null);

  // Clone slides to both sides for seamless infinite loop
  const loopedItems = [...statValues, ...statValues, ...statValues];

  useEffect(() => {
    const totalItems = statValues.length;
    const middleIndex = totalItems;

    setCurrentIndex(middleIndex); // start from the middle
  }, [statValues]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Reset scroll when reaching end
  useEffect(() => {
    const totalItems = statValues.length;
    const middleIndex = totalItems;
    const totalLength = loopedItems.length;

    if (currentIndex >= totalLength - totalItems) {
      setTimeout(() => {
        setCurrentIndex(middleIndex); // reset instantly (no animation)
        if (scrollRef.current) {
          scrollRef.current.style.transition = "none";
          scrollRef.current.style.transform = `translateX(-${middleIndex * itemWidth}px)`;
        }
      }, 500);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.transition = "transform 0.5s ease-in-out";
      scrollRef.current.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, [currentIndex]);
  console.log("partner carsaul header,", header);

  return (
    <section className="py-20 bg-white dark:bg-makmar-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
             {header &&
                header.map((header,index) => {
                  return (
                    <div className="space-y-4" key={index}>
                      <h2 className="text-3xl sm:text-4xl font-bold">
                        {/* {t("about.title")} */}
                        {header.title}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {/* {t("about.description")} */}
                        {header.description}
                      </p>
                    </div>
                  );
                })}
          {/* <h2 className="text-3xl sm:text-4xl font-bold mb-4">{header.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {header.description}
          </p> */}
        </div>
         

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex"
            style={{
              width: `${loopedItems.length * itemWidth}px`,
            }}
          >
            {loopedItems.map((item, index) => (
              <div
                key={`image-${item.id}-${index}`}
                className="flex-shrink-0 w-64 mx-4 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.url}
                  alt={item.alternativeText}
                  className="rounded-lg w-full h-40 "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

