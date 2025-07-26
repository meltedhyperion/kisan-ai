
"use client";

import { useState, useEffect } from 'react';
import { ExploreCard } from "@/components/dashboard/explore-card";
import { Header } from "@/components/dashboard/header";
import { getExploreFeed } from "@/lib/data";
import type { ExploreCard as ExploreCardType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/hooks/use-language';

export default function ExplorePage() {
    const [feedItems, setFeedItems] = useState<ExploreCardType[]>([]);
    const [readItems, setReadItems] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchFeed = async () => {
            const items = await getExploreFeed();
            setFeedItems(items);
            setLoading(false);
        };
        fetchFeed();
    }, []);

    const handleMarkAsRead = (itemId: string) => {
        setReadItems(prev => new Set(prev).add(itemId));
    };
    
    const unreadItems = feedItems.filter(item => !readItems.has(item.id));
    const readItemsList = feedItems.filter(item => readItems.has(item.id));
    const sortedFeed = [...unreadItems, ...readItemsList];

    return (
        <div className="container mx-auto max-w-3xl p-4">
            <Header title={t('explorePageTitle')} description={t('explorePageDescription')} />
            <div className="space-y-6">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className='space-y-2'>
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ))
                ) : (
                    sortedFeed.map((item) => (
                        <ExploreCard 
                            key={item.id} 
                            item={item}
                            isRead={readItems.has(item.id)}
                            onMarkAsRead={() => handleMarkAsRead(item.id)} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}
