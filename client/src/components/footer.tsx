import { Link } from "wouter";
import { useLanguage } from "@/components/language-provider";
import { Building, Globe, Users, Mail, Phone } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-makmar-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-makmar-gold rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-makmar-gold">MAKMAR</h3>
                <p className="text-sm text-gray-300">TRADING PLC</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-makmar-gold transition-colors">
                <Building className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-makmar-gold transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-makmar-gold transition-colors">
                <Users className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-makmar-gold transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-makmar-gold transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-makmar-gold">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("nav.home")}</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("nav.about")}</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("nav.services")}</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-makmar-gold">
              {t("services.title")}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("services.importExport")}</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("services.partnerships")}</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("services.analysis")}</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-makmar-gold transition-colors">{t("services.consultation")}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}