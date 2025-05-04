
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Languages className="h-5 w-5" />
          <span className="sr-only">{t("app.language")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40">
        <div className="space-y-1">
          <Button
            variant={language === "en" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setLanguage("en")}
          >
            English
          </Button>
          <Button
            variant={language === "sv" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setLanguage("sv")}
          >
            Svenska
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
