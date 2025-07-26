"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockUser } from "@/lib/data";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  age: z.coerce.number().min(18, "You must be at least 18 years old.").max(120),
  preferredLanguage: z.enum(["English", "हिन्दी", "मराठी"]),
  village: z.string().min(2, "Village name is required."),
  district: z.string().min(2, "District is required."),
  state: z.string().min(2, "State is required."),
  pincode: z.string().length(6, "Pincode must be 6 digits."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const router = useRouter();
  const { toast } = useToast();

  // In a real app, pre-filled data would come from props or a user context
  const defaultValues: Partial<ProfileFormValues> = {
    name: mockUser.name,
    age: mockUser.age,
    preferredLanguage: mockUser.preferredLanguage,
    village: mockUser.location.village,
    district: mockUser.location.district,
    state: mockUser.location.state,
    pincode: mockUser.location.pincode,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, you would save this data to Firestore
    console.log("Profile submitted", data);
    toast({
      title: "Profile Saved!",
      description: "Your information has been updated successfully.",
    });
    router.push("/explore");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="Your age" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="preferredLanguage"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Preferred Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="हिन्दी">हिन्दी</SelectItem>
                    <SelectItem value="मराठी">मराठी</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <fieldset className="space-y-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Location</legend>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <FormField
                    control={form.control}
                    name="village"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Village / Town</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Anandvan" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>District</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Pune" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Maharashtra" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 411001" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
        </fieldset>
        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
      </form>
    </Form>
  );
}
