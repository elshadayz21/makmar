import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

interface StatItemProps {
  target: number;
  label: string;
}

interface StatsSectionProps {
  statValues: StatItemProps[];
}

function StatItem({ target, label }: StatItemProps) {
  const { count, setIsVisible } = useCounterAnimation(target, 2000);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [setIsVisible]);
// console.log("count", count);
  return (
    <div ref={ref} className="text-center text-white">
      <div className="text-4xl font-bold mb-2">{count}</div>
      <div className="text-lg">{label}</div>
    </div>
  );
}

// export function StatsSection() {
//   const { t } = useLanguage();

//   return (
//     <section className="py-20 bg-makmar-gold">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <StatItem target={500} label={t("stats.clients")} />
//           <StatItem target={1000} label={t("stats.trades")} />
//           <StatItem target={50} label={t("stats.partners")} />
//           <StatItem target={15} label={t("stats.experience")} />
//         </div>
//       </div>
//     </section>
//   );
// }
export function StatsSection({ statValues }: StatsSectionProps) {
  return (
    <section className="py-20 bg-makmar-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {statValues.map((stat, index) => (
            <StatItem key={index} target={stat.target} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}