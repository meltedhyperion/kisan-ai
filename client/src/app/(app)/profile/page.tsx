"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserProfile, mockUser as defaultUser } from "@/lib/data";
import { User, LogOut, Pencil, Mail, MapPin, Hash, Languages } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/dashboard/header";
import { useLanguage } from "@/hooks/use-language";
import { useEffect, useState } from "react";
import type { UserProfile } from "@/lib/types";

function ProfileInfoItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) {
    return (
        <div className="flex items-start gap-4">
            <Icon className="h-5 w-5 mt-1 text-primary" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    );
}

function ProfilePageComponent() {
    const { t } = useLanguage();
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userProfile = await getUserProfile(defaultUser.uid);
            setUser(userProfile);
        }
        fetchUser();
    }, [])

    if (!user) {
        return (
            <div className="container mx-auto max-w-2xl p-4">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-2xl p-4">
             <Header title={t('myProfile')} description={t('viewAndManage')} />

            <Card className="shadow-md">
                <CardHeader className="flex-row gap-4 items-center">
                    <User className="h-16 w-16 text-primary p-3 bg-primary/10 rounded-full"/>
                    <div>
                        <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                    <Separator/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProfileInfoItem icon={Hash} label={t('age')} value={user.age} />
                        <ProfileInfoItem icon={Languages} label={t('preferredLanguage')} value={user.preferredLanguage} />
                        <ProfileInfoItem 
                            icon={MapPin} 
                            label={t('location')} 
                            value={`${user.location.village}, ${user.location.district}, ${user.location.state} - ${user.location.pincode}`} 
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col md:flex-row gap-2 pt-6">
                    <Button className="w-full md:w-auto">
                        <Pencil className="mr-2 h-4 w-4" />
                        {t('editProfile')}
                    </Button>
                    <Button variant="destructive" asChild className="w-full md:w-auto">
                        <Link href="/">
                            <LogOut className="mr-2 h-4 w-4" />
                            {t('logout')}
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}


export default function ProfilePage() {
    return <ProfilePageComponent />;
}
