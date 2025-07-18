import { useLanguage } from "@/components/language-provider";

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export function Logo({ showText = true, className = "" }: LogoProps) {
  const { language } = useLanguage();
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-10 h-10 bg-makmar-gold rounded-lg flex items-center justify-center mr-3">
        <span className="text-white font-bold text-xl">M</span>
      </div>
      {showText && (
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold text-makmar-gold">MAKMAR</h1>
          <p className="text-xs text-gray-600 dark:text-gray-300">TRADING PLC</p>
        </div>
      )}
    </div>
  );
}
