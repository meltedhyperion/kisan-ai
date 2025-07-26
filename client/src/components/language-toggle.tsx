"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { mockUser } from "@/lib/data";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        // Switches between 'English' and the user's preferred language
        if (language === 'English') {
            setLanguage(mockUser.preferredLanguage);
        } else {
            setLanguage('English');
        }
    };

    return (
        <Button variant="outline" size="icon" onClick={toggleLanguage} aria-label="Toggle Language">
            <Languages className="h-[1.2rem] w-[1.2rem]"/>
            <span className="sr-only">Toggle language</span>
        </Button>
    );
}
