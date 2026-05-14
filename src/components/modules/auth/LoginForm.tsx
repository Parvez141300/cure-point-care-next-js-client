/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { AlertCircleIcon, Eye, EyeOff, LogInIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface loginFormProps {
  redirectPath?: string;
}

const LoginForm = ({ redirectPath }: loginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutateAsync } = useMutation({
    mutationFn: async (payload: ILoginPayload) => {
      const result = await loginAction(payload, redirectPath);
      return result;
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // validators: {
    //   onChange: loginZodSchema,
    // },
    onSubmit: async ({ value }) => {
      setServerError(null); // Reset server error before submission
      try {
        const result = (await mutateAsync(value)) as any;
        if (!result.success) {
          setServerError(result.message || "Login failed");
          return;
        }
      } catch (error: any) {
        console.log(`Login Failed: ${error.message}`);
        setServerError(`Login Failed: ${error.message}`);
      }
    },
  });
  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold mb-4">Wecome Back</CardTitle>
        <CardDescription>
          Please enter your credentials to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* email field */}
          <form.Field
            name="email"
            validators={{ onBlur: loginZodSchema.shape.email }}
          >
            {(field) => {
              return (
                <AppField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="Please Enter email"
                />
              );
            }}
          </form.Field>
          {/* password field */}
          <form.Field
            name="password"
            validators={{ onBlur: loginZodSchema.shape.password }}
          >
            {(field) => {
              return (
                <AppField
                  field={field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Please Enter Password"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  append={
                    <Button
                      onClick={() => setShowPassword((prev) => !prev)}
                      variant={"ghost"}
                      size={"icon"}
                      type="button"
                      className="cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" aria-hidden={true} />
                      ) : (
                        <Eye className="size-4" aria-hidden={true} />
                      )}
                    </Button>
                  }
                />
              );
            }}
          </form.Field>
          {/* forgot password redirect link */}
          <div className="text-right mt-2">
            <Link
              href="/forgot-password"
              className="hover:underline underline-offset-4 text-sm text-primary"
            >
              Forgot Password
            </Link>
          </div>
          {/* if error then show error message */}
          {serverError && (
            <Alert variant="destructive" className="max-w-md">
              <AlertCircleIcon />
              <AlertTitle>Failed to Login</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting}
                disabled={!canSubmit}
                pendingLablel="Logging in..."
              >
                <LogInIcon /> Login
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>

        {/* divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-2 border-gray-100"></div>
          </div>
          <div className="relative flex justify-center items-center">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        {/* social login */}
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            // TODO: redirect path after login in frontend
            window.location.href = `${baseUrl}/auth/login/google`;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter>
        <p className="w-full flex gap-2 justify-center items-center text-sm border-t pt-4">
          <span>Don&apos;t have an account? </span>
          <Link href="/register" className="hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
