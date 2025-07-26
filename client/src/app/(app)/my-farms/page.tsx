import { getFarms, mockUser } from '@/lib/data';
import { MyFarmsClientPage } from '@/components/dashboard/my-farms-client-page';

export default async function MyFarmsPage() {
    const farms = await getFarms(mockUser.uid);

    return <MyFarmsClientPage initialFarms={farms} />;
}
