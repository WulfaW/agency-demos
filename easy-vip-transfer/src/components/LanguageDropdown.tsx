'use client';

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "zh-CN", label: "简体中文", flag: "🇨🇳" },
  { code: "zh-TW", label: "繁體中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt-BR", label: "Português (BR)", flag: "🇧🇷" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
];

export const LanguageDropdown = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected language object based on Context state. 
  // Fallback to EN if the current Context lang isn't in our array (due to casing etc).
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
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-sans tracking-wide",
          "bg-white/[0.04] backdrop-blur-md shadow-sm",
          "border-white/10",
          "text-zinc-200",
          "hover:bg-white/10 transition-all"
        )}
      >
        <span>{selected.flag}</span>
        <span className="hidden sm:inline-block">{selected.label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-zinc-400 transition-transform", open && "rotate-180")} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className={cn(
            "absolute right-0 mt-3 w-48 rounded-xl overflow-hidden",
            "bg-[#0a0a0a]/95 backdrop-blur-2xl",
            "shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10",
            "animate-in fade-in zoom-in-95 duration-200"
          )}
        >
          <div className="max-h-[300px] overflow-y-auto subtle-scrollbar py-1">
            {languages.map((l) => {
              const isSelected = selected.code === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    // Update the global context. (It expects 'EN', 'TR', 'RU' currently, but we will adjust it to handle everything)
                    setLang(l.code.toUpperCase() as Language);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left transition-colors",
                    isSelected
                      ? "font-medium text-[#E5D3B3] bg-white/[0.04]"
                      : "text-zinc-300 hover:bg-white/[0.08] hover:text-white"
                  )}
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="flex-1 font-sans">{l.label}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-[#E5D3B3]" />
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
