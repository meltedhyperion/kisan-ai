'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { summarizeFarmAnalytics } from '@/ai/flows/farm-analytics-summary';
import { Bot } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface FarmAnalyticsSummaryProps {
  farmId: string;
  crop: string;
}

export default function FarmAnalyticsSummary({ farmId, crop }: FarmAnalyticsSummaryProps) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const result = await summarizeFarmAnalytics({ farmId, crop, language });
        setSummary(result.summary);
      } catch (e) {
        setError('Failed to generate AI summary. Please try again later.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [farmId, crop, language]);

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary"/>
            {t('aiSummaryTitle')}
        </CardTitle>
        <CardDescription>{t('aiSummaryDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {!loading && !error && <p className="text-sm text-foreground/80">{summary}</p>}
      </CardContent>
    </Card>
  );
}
