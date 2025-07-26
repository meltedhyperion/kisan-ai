
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import FarmAnalyticsSummary from '@/components/dashboard/farm-analytics-summary';
import FarmCharts from '@/components/dashboard/farm-charts';
import BandhuManager from '@/components/dashboard/bandhu-manager';
import { Header } from '@/components/dashboard/header';
import { useLanguage } from '@/hooks/use-language';
import type { Farm } from '@/lib/types';

interface FarmAnalyticsClientPageProps {
    farm: Farm;
}

export default function FarmAnalyticsClientPage({ farm }: FarmAnalyticsClientPageProps) {
    const { t, language } = useLanguage();

    const farmName = language === 'English' ? farm.farmName : farm.farmName_hi;
    const cropName = language === 'English' ? farm.crop : farm.crop_hi;
    const areaUnit = t('areaAcres').split('(')[1].replace(')', '');


    return (
        <div className="container mx-auto max-w-4xl p-4 space-y-6">
            <Header title={farmName} description={`${cropName} | ${farm.area} ${areaUnit}`} />

            <FarmAnalyticsSummary farmId={farm.id} crop={farm.crop} />

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{t('sensorDataHistory')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <FarmCharts farmId={farm.id} />
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline">{t('manageBandhuDevices')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <BandhuManager farmId={farm.id} />
                </CardContent>
            </Card>

        </div>
    );
}
