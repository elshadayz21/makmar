import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
interface headerImageValues {
  id: number;
  url: string;
  alternativeText: string;
}

interface headerContent {
  title: string;
  description: string;
}
interface headerCTAvalues {
  id: number
  link: string;
  title: string;
  icon: string;
}
interface StatsSectionProps {
  headerImageValues: headerImageValues[];
  headerContent: headerContent[];
  headerCTAvalues: headerCTAvalues[];
}
export function HeroSection({
  headerContent,
  headerCTAvalues,
  headerImageValues,
}: StatsSectionProps) {
  const { t } = useLanguage();
 console.log("headerCTAvalues", headerCTAvalues);
 console.log("headerContent", headerContent);
  return (
    <section className="pt-20  flex items-center bg-gradient-to-br from-makmar-light to-white dark:from-makmar-dark dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              {headerContent &&
                headerContent.map((header, index) => {
                  return (
                    <>
                      {/* <span>{header.title}</span>{" "}
                      <span>{header.description}</span> */}
                    </>
                  );
                })}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-makmar-gold">Excellence</span> in
                <br />
                Global Trading
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                {t("hero.subtitle")}
              </p>
            </div>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                replace
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Button className="bg-makmar-gold hover:bg-makmar-gold-dark text-white px-8 py-3 rounded-lg font-semibold">
                  {t("hero.getStarted")}
                </Button>
              </Link>
              <Link
                href="/about"
                replace
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Button
                  variant="outline"
                  className="border-makmar-gold text-makmar-gold hover:bg-makmar-gold hover:text-white px-8 py-3 rounded-lg font-semibold"
                >
                  {t("hero.learnMore")}
                </Button>
              </Link>
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4">
              {headerCTAvalues &&
                headerCTAvalues.map((header, index) => {
                 
                  return (
                    <Link
                      href={header.link}
                      replace
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Button className="bg-makmar-gold hover:bg-makmar-gold-dark text-white px-8 py-3 rounded-lg font-semibold">
                        {/* {t("hero.getStarted")} */}
                        {header.title}
                      </Button>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className=" w-full h-96 bg-gradient-to-br from-makmar-gold/20 to-makmar-gold/10 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                {/* <div className="w-32 h-32 bg-makmar-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-6xl">M</span>
                </div> */}
                {/* <h3 className="text-2xl font-bold text-makmar-gold mb-2">MAKMAR</h3> */}
                {/* <p className="text-makmar-gold font-medium">TRADING PLC</p> */}
                {/* <img
                  src="/public/makmar-Web-logo-removebg-preview.png"
                  alt="MakMar Logo"
                  className=" justify-center"
                /> */}
                  {headerImageValues && headerImageValues.map((item, index) => (
              <div
                key={`image-${item.id}-${index}`}
                // className="flex-shrink-0 w-64 mx-4 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.url}
                  alt={item.alternativeText}
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
            ))}
          
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
