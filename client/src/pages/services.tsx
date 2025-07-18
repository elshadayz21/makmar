import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Building, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe,
  Ship,
  BarChart3,
  FileText,
  Handshake,
  Clock,
  CheckCircle,
  Truck
} from "lucide-react";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Building,
      title: t("services.importExport"),
      description: t("services.importExportDesc"),
      features: [
        "Global shipping coordination",
        "Customs clearance assistance",
        "Documentation handling",
        "Quality assurance"
      ]
    },
    {
      icon: Users,
      title: t("services.partnerships"),
      description: t("services.partnershipsDesc"),
      features: [
        "Strategic alliance development",
        "Market entry support",
        "Joint venture facilitation",
        "Network expansion"
      ]
    },
    {
      icon: TrendingUp,
      title: t("services.analysis"),
      description: t("services.analysisDesc"),
      features: [
        "Market intelligence reports",
        "Price trend analysis",
        "Competitive landscape mapping",
        "Risk assessment"
      ]
    },
    {
      icon: Shield,
      title: t("services.risk"),
      description: t("services.riskDesc"),
      features: [
        "Financial risk evaluation",
        "Political risk assessment",
        "Insurance coordination",
        "Hedging strategies"
      ]
    },
    {
      icon: Truck,
      title: t("services.supply"),
      description: t("services.supplyDesc"),
      features: [
        "Logistics optimization",
        "Inventory management",
        "Supplier verification",
        "Delivery tracking"
      ]
    },
    {
      icon: Globe,
      title: t("services.consultation"),
      description: t("services.consultationDesc"),
      features: [
        "Strategic planning",
        "Market entry advice",
        "Regulatory compliance",
        "Business development"
      ]
    },
  ];

  const processSteps = [
    {
      icon: FileText,
      title: "Initial Consultation",
      description: "We analyze your needs and develop a customized trading strategy."
    },
    {
      icon: BarChart3,
      title: "Market Research",
      description: "Comprehensive market analysis to identify opportunities and risks."
    },
    {
      icon: Handshake,
      title: "Partnership Development",
      description: "Connect with verified partners and establish trading relationships."
    },
    {
      icon: Ship,
      title: "Execution & Delivery",
      description: "Seamless execution of trades with end-to-end logistics support."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t("services.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-makmar-light dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-makmar-gold rounded-lg flex items-center justify-center mb-6">
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-makmar-gold mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-makmar-light dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="text-makmar-gold">Process</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A systematic approach to ensure successful trading partnerships and outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-makmar-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-white h-6 w-6" />
                    </div>
                    <div className="w-8 h-8 bg-makmar-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-makmar-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-makmar-gold rounded-2xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help expand your business into global markets.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-makmar-gold hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
