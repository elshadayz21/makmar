import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Logo2 } from "@/components/ui/logo2";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatItemProps {
  id: number;
  url: string;
  alternativeText: string;
}

interface StatsSectionProps {
  statValues: StatItemProps[];
  // header: HeaderProps[];
}

export function Navigation2({ statValues }: StatsSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const isActive = (href: string) => {
    return location === href;
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 dark:bg-makmar-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {statValues &&
            statValues.map((header, index) => {
              return (
                <div>
                  <Logo2 url={header.url || " "} alternativeText={header.alternativeText|| " "} />
                </div>
              );
            })}

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${
                    isActive(item.href) ? "nav-link-active" : ""
                  }`}
                  // replace
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-16 bg-transparent border-gray-300 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="am">አማ</SelectItem>
              </SelectContent>
            </Select> */}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-makmar-dark border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 font-medium ${
                  isActive(item.href)
                    ? "text-makmar-gold"
                    : "hover:text-makmar-gold"
                }`}
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                replace
                // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
