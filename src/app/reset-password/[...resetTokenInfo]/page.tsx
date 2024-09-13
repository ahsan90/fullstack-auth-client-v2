"use client";

import React, { ReactNode, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/_utils/isTokenExpired";
import { useParams } from "next/navigation";
import { passwordResetSchema } from "@/_lib/validateSchemas";
import * as z from "zod";
import { FormError } from "@/components/form-error";
import { resetPassword, varifyResetToken } from "@/actions/authActions";

type PasswordResetData = z.infer<typeof passwordResetSchema>;

function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.resetTokenInfo[0];
  const userId = params.resetTokenInfo[1];
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isValidResetToken, setIsValidResetToken] = useState<boolean>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetData>({
    resolver: zodResolver(passwordResetSchema),
  });

  useEffect(() => {
    const isValid = async () => {
      const res = await varifyResetToken({ resetToken: token, userId: userId });
      console.log(res);
      if (res.success) {
        setIsValidResetToken(res.isValid);
      }
      if (!res.success) setIsValidResetToken(false);
    };
    Promise.all([isValid()]);
  }, []);
  
  const onSubmit = async (data: PasswordResetData) => {
    setServerError(null);
    startTransition(async () => {
      const resetPayload = {
        resetToken: token,
        id: userId,
        newPassword: data.password,
      };
      const res = await resetPassword(resetPayload);
      if (!res.success) {
        setServerError(res.message);
      } else {
        toast.success(res.message);
        router.push("/login");
      }
    });
  };

  console.log("isValidResetToken: ", isValidResetToken);

  if(isValidResetToken === undefined) {
    return (
      <></>
    );
  }

  if (!isValidResetToken) {
    return (
      <div className="flex justify-center text-2xl text-center font-bold">
        <p className="text-red-600 mt-32">
          The reset link is expired or invalid! Please try again by sending a new password
          reset request.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h1 className="flex justify-center text-2xl text-center font-bold mb-2">
        Reset Password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter a new password"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 ${
              errors.password
                ? "border-red-500 text-red-600"
                : "border-gray-300"
            }`}
          />
          {errors.password && (
            <span className="text-red-600">
              {errors.password?.message as ReactNode}
            </span>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("confirm_password")}
            type="password"
            id="confirm_password"
            placeholder="Confirm new password"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 ${
              errors.confirm_password
                ? "border-red-500 text-red-600"
                : "border-gray-300"
            }`}
          />
          {errors.confirm_password && (
            <span className="text-red-600">
              {errors.confirm_password?.message}
            </span>
          )}
        </div>

        {serverError && <FormError message={serverError} />}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={isPending}
        >
          {isPending ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
