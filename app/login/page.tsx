"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginApi from "@/apis/loginApi";
import axios from "axios";

import { loginSchema, type LoginFormData } from "@/schemas/loginSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormData) {
    // try {
    //   const res = await loginApi(values);
    //   toast.success(res.data.message, {
    //     position: "top-center",
    //     duration: 2000,
    //   });
    //   router.push("/");
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     toast.error(error.response?.data?.message || "Something went wrong", {
    //       position: "top-center",
    //       duration: 2000,
    //     });
    //   }
    // }

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Login successfully");
    router.push("/");
  }

  return (
    <section className="container max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Login Now :</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email :</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password :</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end ">
            <Button
              className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
