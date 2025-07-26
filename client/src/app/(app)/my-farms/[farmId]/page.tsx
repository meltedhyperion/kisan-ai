
import { notFound } from 'next/navigation';
import { getFarmById } from '@/lib/data';
import FarmAnalyticsClientPage from '@/components/dashboard/farm-analytics-client-page';

export default async function FarmAnalyticsPage({ params }: { params: { farmId: string } }) {
    const farm = await getFarmById(params.farmId);

    if (!farm) {
        notFound();
    }
    
    return <FarmAnalyticsClientPage farm={farm} />;
}
