'use client';

import { useState, useEffect } from 'react';
import { getBandhuDevices } from '@/lib/data';
import type { BandhuDevice } from '@/lib/types';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { PlusCircle, Trash2, Wifi, WifiOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useLanguage } from '@/hooks/use-language';

interface BandhuManagerProps {
    farmId: string;
}

const statusConfig = {
    online: { icon: Wifi, className: 'text-green-500' },
    offline: { icon: WifiOff, className: 'text-muted-foreground' },
    error: { icon: WifiOff, className: 'text-destructive' }
}

export default function BandhuManager({ farmId }: BandhuManagerProps) {
    const [devices, setDevices] = useState<BandhuDevice[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [newDeviceId, setNewDeviceId] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const deviceData = await getBandhuDevices(farmId);
            setDevices(deviceData);
            setLoading(false);
        };
        fetchData();
    }, [farmId]);

    const handleRemove = (deviceId: string) => {
        // In a real app, this would be a server action to update Firestore
        setDevices(devices.filter(d => d.id !== deviceId));
        toast({
            title: 'Device Removed',
            description: `${deviceId} has been unlinked from this farm.`
        });
    };

    const handleAddDevice = () => {
        if (!newDeviceId.trim()) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please enter a valid device ID.'
            });
            return;
        }
        // In a real app, you would add the device to Firestore.
        const newDevice: BandhuDevice = {
            id: newDeviceId,
            farmId: farmId,
            status: 'offline', // New devices start as offline
        };
        setDevices([...devices, newDevice]);
        toast({
            title: 'Device Added',
            description: `${newDeviceId} has been linked to this farm.`
        });
        setNewDeviceId('');
        setIsDialogOpen(false); // Close the dialog
    }

    if (loading) {
        return (
            <div className="space-y-2">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                {devices.map(device => {
                    const { icon: Icon, className } = statusConfig[device.status];
                    return (
                        <div key={device.id} className="flex items-center justify-between rounded-md border p-3">
                            <div className="flex items-center gap-3">
                                <Icon className={cn('h-5 w-5', className)} />
                                <div className='font-mono text-sm'>
                                    <p className="font-semibold text-foreground">{device.id}</p>
                                    <p className="text-xs capitalize text-muted-foreground">{device.status}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleRemove(device.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t('remove')}
                            </Button>
                        </div>
                    )
                })}
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {t('addNewBandhuDevice')}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('addNewBandhuDevice')}</DialogTitle>
                        <DialogDescription>
                            {t('bandhuDialogDescription')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="deviceId" className="text-right">
                                {t('hardwareId')}
                            </Label>
                            <Input 
                                id="deviceId" 
                                value={newDeviceId}
                                onChange={(e) => setNewDeviceId(e.target.value)}
                                className="col-span-3"
                                placeholder="e.g., BANDHU-ABC-123"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                             <Button variant="outline">{t('cancel')}</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleAddDevice}>{t('addDevice')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
