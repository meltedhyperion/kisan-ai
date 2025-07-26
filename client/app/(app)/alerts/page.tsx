
"use client";

import { useState, useEffect } from 'react';
import { AlertCard } from "@/components/dashboard/alert-card";
import { Header } from "@/components/dashboard/header";
import { getAlerts, mockUser } from "@/lib/data";
import type { Alert } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/hooks/use-language';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchAlerts = async () => {
            const fetchedAlerts = await getAlerts(mockUser.uid);
            // Sort by date initially
            fetchedAlerts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setAlerts(fetchedAlerts);
            setLoading(false);
        };
        fetchAlerts();
    }, []);

    const handleMarkAsRead = (alertId: string) => {
        setAlerts(prevAlerts => {
            const alertToUpdate = prevAlerts.find(a => a.id === alertId);
            if (!alertToUpdate) return prevAlerts;

            const updatedAlert = { ...alertToUpdate, status: 'read' as const };
            const otherAlerts = prevAlerts.filter(a => a.id !== alertId);
            
            // Move the read alert to the bottom
            return [...otherAlerts, updatedAlert];
        });
    };
    
    const unreadCount = alerts.filter(a => a.status === 'unread').length;

    const sortedAlerts = [...alerts].sort((a, b) => {
        if (a.status === 'unread' && b.status === 'read') return -1;
        if (a.status === 'read' && b.status === 'unread') return 1;
        // if statuses are the same, sort by date
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div className="container mx-auto max-w-3xl p-4">
            <Header 
                title={t('alertsPageTitle')} 
                description={loading ? t('loadingAlerts') : t('alertsPageDescription').replace('{unreadCount}', unreadCount.toString())} 
            />
            <div className="space-y-4">
                {loading ? (
                     [...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
                ) : (
                    sortedAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} onMarkAsRead={handleMarkAsRead} />
                    ))
                )}
            </div>
        </div>
    );
}
