import React from 'react';
import { cn } from "@/lib/utils";

export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  svgUrl: string;
  color: string;
}

export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {
    const baseIconStyles =
      "relative flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg";
    const baseSvgStyles =
      "relative z-10 w-5 h-5 transition-all duration-300 ease-in-out opacity-60 group-hover:opacity-100 group-hover:scale-110";
    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full";
    const baseTooltipStyles =
      "absolute bottom-[-30px] left-1/2 -translate-x-1/2 px-2.5 py-1.5 text-[13px] tracking-wider uppercase font-medium text-white whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-40px] z-50";

    return (
      <ul
        ref={ref}
        className={cn("flex flex-wrap items-center justify-center gap-4", className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={cn(baseIconStyles)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              <img
                src={item.svgUrl}
                alt={item.ariaLabel}
                className={cn(baseSvgStyles, item.color === '#ffffff' ? 'group-hover:invert' : '')}
              />
            </a>
            <div
              className={cn(baseTooltipStyles)}
              style={{ backgroundColor: item.color, color: item.color === '#ffffff' ? '#000000' : '#ffffff' }}
            >
              {item.tooltip}
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };
