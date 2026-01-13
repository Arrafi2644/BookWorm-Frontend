"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/services/auth/registerUser";

const registerFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
    bookReadingGoal: z.coerce
      .number()
      .min(1, "Book reading goal in a year is required"),

    image: z
      .any()
      .refine((file) => file instanceof File, "Profile image is required")
      .refine((file) => file?.size <= 2 * 1024 * 1024, "Max file size is 2MB")
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file?.type),
        "Only JPG, PNG or WEBP allowed"
      )
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
 const form = useForm({
  resolver: zodResolver(registerFormSchema),
  defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: undefined,
    bookReadingGoal: 5
  },
});

  const router = useRouter();

  // const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
  //   console.log({ data })
  // };
  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      const formData = new FormData();

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        bookReadingGoal: data.bookReadingGoal
      };

      formData.append("data", JSON.stringify(payload));

      if (data.image) {
        formData.append("picture", data.image);
      }

      const result = await registerUser(formData);   // ✅ THIS IS THE FIX
      console.log(result)
      if (result.success) {
        toast.success(result.message)
        router.push('/login')
      }
      else {
        toast.error(result.message)
      }

    } catch (error) {
      toast.error("Registration failed");
      console.error(error);
    }
  };

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Book reading goal */}
        <FormField
          control={form.control}
          name="bookReadingGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Reading Goal (This year)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter your book reading goal"
                  onChange={(e) => field.onChange(e.target.value)}
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Profile Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>

        <p className="text-center text-sm text-[#65758B] mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </Form>

  );
}
