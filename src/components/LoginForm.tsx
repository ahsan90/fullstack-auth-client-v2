"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/_lib/validateSchemas";
import { loggedInRedirectPath, login } from "@/actions/authActions";
import { FormError } from "@/components/form-error";
import { z } from "zod";
import { toast } from "react-toastify";
import ForgotPasswordButton from "./buttons/ForgotPasswordButton";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    startTransition(async () => {
      const email = data.email;
      const password = data.password;

      const response = await login({ email, password });
      if (response?.error) {
        setServerError(response.error);
        toast.error(response.error);
      }
      if (response?.success) {
        toast.success("Login successful");
        const res = await loggedInRedirectPath();
        if (res?.success) {
          router.push(res.path);
          //redirect(res.path);
        }
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 px-6 bg-yellow-50 shadow-md rounded-lg sm:max-w-lg lg:max-w-xl py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-1 text-center">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="john.doe@mail.com"
            className={`mt-1 p-2 block w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            {...register("email")}
            disabled={isPending}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            className={`mt-1 p-2 block w-full border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            {...register("password")}
            disabled={isPending}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <FormError message={serverError} />

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-indigo-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="mt-2 flex justify-between">
        <ForgotPasswordButton />

        <p className="text-center text-gray-500 transition-colors duration-200">
          <Link
            href="/register"
            className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200 hover:underline"
          >
            Don&apos;t have an account?
          </Link>
        </p>
      </div>
    </div>
  );
}
