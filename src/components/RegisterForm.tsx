"use client";

import { useState, useTransition } from "react";

import { registerUser } from "@/actions/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { registerUserSchema } from "@/lib/validateSchemas";
import { FormError } from "@/components/form-error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

type FormRegisterData = z.infer<typeof registerUserSchema>;

export default function RegistrationForm() {
  //const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterData>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = async (formData: FormRegisterData) => {
    //setErrors({});
    setServerError(null);
    startTransition(async () => {
      const response = await registerUser(formData);
      if (!response?.success) {
        if (response?.error) {
          console.log(
            "API server error while registering user:",
            response?.error
          );
          setServerError(response?.error);
          toast.error(response?.error);
        }
      }
      if (response?.success) {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      }
    });
  };
  return (
    <div className="w-full max-w-md mx-auto mt-8 px-6 bg-gray-200 shadow-md rounded-lg sm:max-w-lg lg:max-w-xl py-8">
      <form
        className="w-full max-w-lg mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-1 text-center">Register</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            disabled={isPending}
            placeholder="John Doe"
            {...register("name")}
            className={`mt-1 p-2 block w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="john.doe@mail.com"
            id="email"
            disabled={isPending}
            className={`mt-1 p-2 block w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
            {...register("password")}
            placeholder="********"
            disabled={isPending}
            id="password"
            className={`mt-1 p-2 block w-full border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            disabled={isPending}
            placeholder="********"
            id="confirmPassword"
            className={`mt-1 p-2 block w-full border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <FormError message={serverError} />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-indigo-400 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting..." : "Register"}
        </button>
      </form>
      <div className="text-center mt-3 text-gray-500 transition-colors duration-200">
        <Link
          href="/login"
          className="text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
