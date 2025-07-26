
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Plus, Tractor } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { AddFarmDialog } from './add-farm-dialog';
import type { Farm } from '@/lib/types';
import { useLanguage } from '@/hooks/use-language';

interface MyFarmsClientPageProps {
  initialFarms: Farm[];
}

export function MyFarmsClientPage({ initialFarms }: MyFarmsClientPageProps) {
  const [farms, setFarms] = useState<Farm[]>(initialFarms);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t, language } = useLanguage();

  const handleFarmAdded = (newFarm: Farm) => {
    setFarms((prevFarms) => [...prevFarms, newFarm]);
  };

  return (
    <>
      <div className="container relative mx-auto max-w-3xl p-4 min-h-screen">
        <Header title={t('myFarmsPageTitle')} description={t('myFarmsPageDescription')} />
        <div className="space-y-4">
          {farms.length > 0 ? (
            farms.map((farm) => {
              const farmName = language === 'English' ? farm.farmName : farm.farmName_hi;
              const cropName = language === 'English' ? farm.crop : farm.crop_hi;
              const areaUnit = t('areaAcres').split('(')[1].replace(')', '');

              return (
              <Link href={`/my-farms/${farm.id}`} key={farm.id}>
                <Card className="transition-all hover:shadow-md hover:border-primary/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Tractor className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle>{farmName}</CardTitle>
                        <CardDescription>{`${cropName} | ${farm.area} ${areaUnit}`}</CardDescription>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                  </CardHeader>
                </Card>
              </Link>
            )})
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>{t('noFarmsFound')}</CardTitle>
                <CardDescription>{t('addFirstFarm')}</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>

        <Button
          onClick={() => setIsDialogOpen(true)}
          className="fixed bottom-40 right-6 h-16 w-16 rounded-full bg-accent shadow-lg hover:bg-accent/90"
          size="icon"
          aria-label={t('addNewFarm')}
        >
          <Plus className="h-8 w-8" />
        </Button>
      </div>
      <AddFarmDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onFarmAdded={handleFarmAdded}
      />
    </>
  );
}
