import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Target, Eye, Users, Award, TrendingUp } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Award,
      title: "Excellence in Service",
      description: "Committed to delivering the highest quality trading solutions to our clients worldwide.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our experienced professionals bring deep knowledge of international markets and trading practices.",
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description: "Over 15 years of successful trading operations with consistent growth and client satisfaction.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t("about.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("about.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-makmar-light dark:bg-gray-800 border-makmar-gold border-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-makmar-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-makmar-gold">
                  {t("about.mission")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {t("about.missionText")}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-makmar-light dark:bg-gray-800 border-makmar-gold border-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-makmar-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-makmar-gold">
                  {t("about.vision")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {t("about.visionText")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Highlights */}
      <section className="py-20 bg-makmar-light dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="text-makmar-gold">Makmar Trading</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our commitment to excellence and innovation sets us apart in the global trading industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{highlight.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-makmar-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <Globe className="text-white h-16 w-16" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Global Trading <span className="text-makmar-gold">Network</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our extensive network spans across continents, connecting African markets with global opportunities. 
              We facilitate trade relationships that drive economic growth and create lasting partnerships.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
