
"use client";

import { useState, useEffect } from 'react';
import { formatRelative } from 'date-fns';
import { hi } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { Alert } from '@/lib/types';
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { AlertTriangle, Info, BellDot, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useLanguage } from '@/hooks/use-language';

interface AlertCardProps {
    alert: Alert;
    onMarkAsRead: (alertId: string) => void;
}

const severityConfig = {
    critical: {
        icon: BellDot,
        className: "border-red-500 text-red-500",
        bgClassName: "bg-red-50"
    },
    warning: {
        icon: AlertTriangle,
        className: "border-yellow-500 text-yellow-500",
        bgClassName: "bg-yellow-50"
    },
    info: {
        icon: Info,
        className: "border-blue-500 text-blue-500",
        bgClassName: "bg-blue-50"
    }
}

export function AlertCard({ alert, onMarkAsRead }: AlertCardProps) {
    const { icon: Icon, className, bgClassName } = severityConfig[alert.severity];
    const isUnread = alert.status === 'unread';
    const [relativeTime, setRelativeTime] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const { t, language } = useLanguage();

    useEffect(() => {
        setIsMounted(true);
        const locale = language === 'हिन्दी' ? hi : undefined;
        setRelativeTime(formatRelative(new Date(alert.createdAt), new Date(), { locale }));
    }, [alert.createdAt, language]);

    const title = language === 'English' ? alert.title : alert.title_hi;
    const message = language === 'English' ? alert.message : alert.message_hi;

    return (
        <Card className={cn(
            "border-l-4 transition-all overflow-hidden",
            className,
            isUnread ? `shadow-md ${bgClassName}` : "shadow-sm bg-background/70 opacity-80"
        )}>
             <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-b-0">
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div className='flex-1'>
                                <AccordionTrigger className="p-0 hover:no-underline">
                                    <CardTitle className="flex items-center gap-2 text-lg text-left">
                                    <Icon className={cn("h-5 w-5 flex-shrink-0", className)} />
                                    <span className={isUnread ? "font-bold" : ""}>{title}</span>
                                    </CardTitle>
                                </AccordionTrigger>
                                {isMounted ? (
                                    <p className="mt-1 text-xs text-muted-foreground whitespace-nowrap">
                                        {relativeTime}
                                    </p>
                                ) : (
                                    <Skeleton className="h-4 w-20 mt-1" />
                                )}
                            </div>
                           
                        </div>
                    </CardHeader>
                    <AccordionContent>
                        <CardContent className='pt-0'>
                            <CardDescription>{message}</CardDescription>
                        </CardContent>
                         <CardFooter>
                            {isUnread && (
                                <Button variant="outline" size="sm" onClick={() => onMarkAsRead(alert.id)}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {t('markAsRead')}
                                </Button>
                            )}
                        </CardFooter>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}
