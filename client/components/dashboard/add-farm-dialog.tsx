
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Farm } from '@/lib/types';
import { mockUser } from '@/lib/data';
import { useLanguage } from '@/hooks/use-language';

interface AddFarmDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onFarmAdded: (newFarm: Farm) => void;
}

export function AddFarmDialog({ isOpen, onOpenChange, onFarmAdded }: AddFarmDialogProps) {
  const [farmName, setFarmName] = useState('');
  const [crop, setCrop] = useState('');
  const [area, setArea] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAddFarm = () => {
    if (!farmName.trim() || !crop.trim() || !area.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill out all fields.',
      });
      return;
    }

    // In a real app, this would be a server action to save to Firestore.
    // We add dummy translations for the new farm.
    const newFarm: Farm = {
      id: `farm-${Date.now()}`, // temp unique id
      ownerId: mockUser.uid,
      farmName,
      farmName_hi: `${farmName} (हिन्दी)`,
      crop,
      crop_hi: `${crop} (हिन्दी)`,
      area: parseFloat(area),
      address: `${mockUser.location.village}, ${mockUser.location.district}`,
    };

    onFarmAdded(newFarm);
    toast({
      title: 'Farm Added!',
      description: `${farmName} has been added to your farms.`,
    });

    // Reset form and close dialog
    setFarmName('');
    setCrop('');
    setArea('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('addFarmDialogTitle')}</DialogTitle>
          <DialogDescription>
            {t('addFarmDialogDescription')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="farm-name" className="text-right">
              {t('farmName')}
            </Label>
            <Input
              id="farm-name"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Sunrise Fields"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="crop" className="text-right">
              {t('crop')}
            </Label>
            <Input
              id="crop"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Wheat"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              {t('areaAcres')}
            </Label>
            <Input
              id="area"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 5.5"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('cancel')}</Button>
          <Button onClick={handleAddFarm}>{t('addFarm')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
