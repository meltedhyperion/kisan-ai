"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [isNewUser, setIsNewUser] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, you would handle Firebase Google Sign-In here.
    // After sign-in, you'd check if the user exists in Firestore.
    if (isNewUser) {
      router.push("/complete-profile");
    } else {
      router.push("/explore");
    }
  };

  return (
    <div className="w-full space-y-6">
      <Button
        onClick={handleLogin}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        size="lg"
      >
        <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-67.4 64.8C334.3 113.8 293.7 96 248 96c-88.8 0-160.1 71.9-160.1 160.1s71.3 160.1 160.1 160.1c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path>
        </svg>
        Sign in with Google
      </Button>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="is-new-user"
          checked={isNewUser}
          onCheckedChange={(checked) => setIsNewUser(Boolean(checked))}
        />
        <Label htmlFor="is-new-user" className="text-sm text-muted-foreground">
          Simulate new user registration
        </Label>
      </div>
    </div>
  );
}
