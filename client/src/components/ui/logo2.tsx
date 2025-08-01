import { useLanguage } from "@/components/language-provider";
import { Link } from "wouter";

interface StatItemProps {
  id: number;
  url: string;
  alternativeText: string;
}

interface LogoProps {
  showText?: boolean;
  className?: string;

  url: string;
  alternativeText: string;
}

export function Logo2({
  showText = true,
  className = "",
  url,
  alternativeText,
}: LogoProps) {
  const { language } = useLanguage();

  return (
    <div className={`flex items-center ${className}`}>
      <div className=" w-20 h-12 rounded-lg flex items-center justify-center mr-3">
        {/* <img src="/public/makmar-logo-mobile-removebg-preview_1752843572455.png" alt="MakMar Logo" className="w-36 h-36 justify-center" /> */}

        <Link
          to="/"
          replace
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {/* <img
            src="/public/makmar-Web-logo-removebg-preview.png"
            alt="MakMar Logo"
            className=" justify-center"
          /> */}
         <img
            src={url || "/public/makmar-Web-logo-removebg-preview.png"}
            alt={alternativeText || "MakMar Logo"}
            className=" justify-center"
          />
        </Link>

        {/* <span className="text-white font-bold text-xl">M</span> */}
      </div>
    </div>
  );
}
