"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const formSchema = z.object({
  email: z.email(),
});

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      // sign up with Appwrite & create plaid token

      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!,
        email: data.email,
        password: data.password,
      };
      if (type === "sign-up") {
        const newUser = await signUp(userData);

        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        console.log(response);
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account and get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                marginTop: "1rem",
              }}
            >
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <div style={{ flex: 1 }}>
                      <CustomInput
                        control={form.control}
                        name="firstName"
                        label="First Name"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <CustomInput
                        control={form.control}
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your address"
                  />

                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />

                  <div className="flex gap-4">
                    <div style={{ flex: 1 }}>
                      <CustomInput
                        control={form.control}
                        name="state"
                        label="State"
                        placeholder="Example: NY"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <CustomInput
                        control={form.control}
                        name="postalCode"
                        label="Postal Code"
                        placeholder="Example: 11101"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div style={{ flex: 1 }}>
                      <CustomInput
                        control={form.control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <CustomInput
                        control={form.control}
                        name="ssn"
                        label="SSN"
                        placeholder="Example: 1234"
                      />
                    </div>
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <Button
                type="submit"
                style={{ marginTop: "10px" }}
                className="form-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />{" "}
                    &nbsp;Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
