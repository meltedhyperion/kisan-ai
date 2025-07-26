import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/icons/logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-sm flex-col items-center space-y-8">
        <div className="flex items-center gap-4 text-primary">
          <Logo className="h-16 w-16" />
          <h1 className="font-headline text-5xl font-bold">
            Kisan Saathi
          </h1>
        </div>
        <p className="text-center text-lg text-muted-foreground">
          Your AI-powered companion for smart farming.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
