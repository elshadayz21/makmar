import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { PartnersCarousel } from "@/components/partners-carousel";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Globe, TrendingUp, Shield, Settings, Users } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Building,
      title: t("services.importExport"),
      description: t("services.importExportDesc"),
    },
    {
      icon: Users,
      title: t("services.partnerships"),
      description: t("services.partnershipsDesc"),
    },
    {
      icon: TrendingUp,
      title: t("services.analysis"),
      description: t("services.analysisDesc"),
    },
    {
      icon: Shield,
      title: t("services.risk"),
      description: t("services.riskDesc"),
    },
    {
      icon: Settings,
      title: t("services.supply"),
      description: t("services.supplyDesc"),
    },
    {
      icon: Globe,
      title: t("services.consultation"),
      description: t("services.consultationDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsSection />
      
      {/* About Section */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  {t("about.title")}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t("about.description")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="bg-makmar-light dark:bg-gray-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-makmar-gold">
                      {t("about.mission")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("about.missionText")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-makmar-light dark:bg-gray-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-makmar-gold">
                      {t("about.vision")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("about.visionText")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-makmar-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-makmar-gold">
                    Global Trading Network
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-makmar-light dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("services.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mb-6">
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <PartnersCarousel />
    </div>
  );
}
