'use client';

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, Globe } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

const languages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
  { code: "de", label: "Deutsch" },
];

export const LanguageDropdown = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = languages.find(l => l.code.toUpperCase() === lang.toUpperCase()) || languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Minimal Trigger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 text-xs font-sans tracking-[0.15em] font-medium uppercase",
          "text-zinc-400 hover:text-white transition-colors"
        )}
      >
        <Globe className="w-3.5 h-3.5 opacity-70" />
        <span className="hidden sm:inline-block pt-px">{selected.code}</span>
        <ChevronDown className={cn("h-3 w-3 opacity-50 transition-transform", open && "rotate-180")} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-40 rounded-xl overflow-hidden",
            "bg-[#0a0a0a]/95 backdrop-blur-2xl",
            "shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10",
            "animate-in fade-in zoom-in-95 duration-200"
          )}
        >
          <div className="py-1">
            {languages.map((l) => {
              const isSelected = selected.code === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code.toUpperCase() as Language);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-2.5 text-[13px] text-left transition-colors",
                    isSelected
                      ? "font-medium text-[#E5D3B3] bg-white/[0.04]"
                      : "text-zinc-400 hover:bg-white/[0.08] hover:text-white font-light"
                  )}
                >
                  <span className="font-sans tracking-wide">{l.label}</span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-[#E5D3B3]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
