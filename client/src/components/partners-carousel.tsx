import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Building, Factory, Globe, Ship } from "lucide-react";

const partners = [
  {
    name: "Global Corp",
    type: "Trading Partner",
    icon: Building,
  },
  {
    name: "TradeTech Ltd",
    type: "Strategic Partner",
    icon: Factory,
  },
  {
    name: "International Markets",
    type: "Global Partner",
    icon: Globe,
  },
  {
    name: "Maritime Solutions",
    type: "Logistics Partner",
    icon: Ship,
  },
];

export function PartnersCarousel() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Create an infinite loop by duplicating the partners array multiple times
  const infinitePartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-20 bg-white dark:bg-makmar-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("partners.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t("partners.subtitle")}
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex"
            style={{ 
              transform: `translateX(-${(currentIndex * 272) % (partners.length * 272)}px)`,
              transition: 'transform 0.5s ease-in-out',
              width: `${infinitePartners.length * 272}px`
            }}
          >
            {infinitePartners.map((partner, index) => {
              const IconComponent = partner.icon;
              return (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 w-64 mx-4 bg-makmar-light dark:bg-gray-800 p-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-white h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-makmar-gold text-lg">{partner.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {partner.type}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
