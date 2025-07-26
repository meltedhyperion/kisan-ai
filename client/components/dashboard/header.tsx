import { LanguageToggle } from "@/components/language-toggle";

interface HeaderProps {
    title: string;
    description: string;
}

export function Header({ title, description }: HeaderProps) {
    return (
        <header className="mb-6 flex justify-between items-start">
            <div>
                <h1 className="font-headline text-3xl font-bold text-primary">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center gap-2">
                <LanguageToggle />
            </div>
        </header>
    );
}
