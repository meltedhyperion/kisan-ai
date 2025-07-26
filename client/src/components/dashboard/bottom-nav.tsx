
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Bell, Tractor, User, Mic } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "../ui/button";

const navItemsConfig = [
  { href: "/explore", labelKey: "explore" as const, icon: Compass },
  { href: "/alerts", labelKey: "alerts" as const, icon: Bell },
  { type: "spacer" as const }, // Placeholder for the AI button
  { href: "/my-farms", labelKey: "myFarms" as const, icon: Tractor },
  { href: "/profile", labelKey: "profile" as const, icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const handleAiClick = () => {
    // We trigger the hidden button in agent-chat.tsx
    const trigger = document.getElementById('agent-chat-trigger');
    if (trigger) {
      trigger.click();
    }
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-transparent pointer-events-none">
      <div className="relative mx-auto h-full max-w-md">

        {/* Central AI Button */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 pointer-events-auto">
            <Button
                onClick={handleAiClick}
                className="h-20 w-20 rounded-full bg-primary shadow-lg hover:bg-primary/90"
                size="icon"
                aria-label={t('askAgent')}
            >
                <Mic className="h-10 w-10" />
            </Button>
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 border-t bg-background/80 backdrop-blur-sm pointer-events-auto">
            <div className="grid h-full grid-cols-5">
            {navItemsConfig.map((item, index) => {
                if (item.type === 'spacer') {
                    // This is the empty space where the AI button sits, it does not need to be interactive.
                    return <div key={`spacer-${index}`} />;
                }

                const isActive = pathname.startsWith(item.href);
                return (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "group inline-flex flex-col items-center justify-center px-2 text-center font-medium",
                        isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                    )}
                    >
                    <item.icon className="mb-1 h-6 w-6" />
                    <span className="text-[10px] leading-tight">{t(item.labelKey)}</span>
                    </Link>
                );
            })}
            </div>
        </div>
      </div>
    </footer>
  );
}
