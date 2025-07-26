
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExploreCard as ExploreCardType } from "@/lib/types";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";

interface ExploreCardProps {
    item: ExploreCardType;
    isRead: boolean;
    onMarkAsRead: () => void;
}

export function ExploreCard({ item, isRead, onMarkAsRead }: ExploreCardProps) {
    const { t, language } = useLanguage();

    const headline = language === 'English' ? item.headline : item.headline_hi;
    const summary = language === 'English' ? item.summary : item.summary_hi;

  return (
    <Card className={cn(
        "overflow-hidden shadow-md transition-all hover:shadow-lg",
        isRead && "opacity-60"
    )}>
      <Link href={item.redirectUrl} target="_blank" rel="noopener noreferrer" className="block">
        <CardHeader>
            <CardTitle className="font-headline text-xl">{headline}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{summary}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {t('source').replace('{source}', item.source)}
        </p>
        {!isRead && (
            <Button variant="ghost" size="sm" onClick={onMarkAsRead}>
                <CheckCircle className="h-4 w-4 mr-2" />
                {t('markAsRead')}
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
