"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema, updateUserSchema } from "@/lib/validateSchemas";
import { addUser, updateUser } from "@/actions/adminActions";
import { toast } from "react-toastify";
import { FormError } from "@/components/form-error";
import { z } from "zod";
import UserRole from "./UserRole";
import UserCredentialsInput from "./UserCredentialsInput";

type AddFormData = z.infer<typeof addUserSchema>;

type UpdateFormData = z.infer<typeof updateUserSchema>;

type UserProps = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function AddUpdateUser({
  user,
  onClose,
}: {
  user?: UserProps | null;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  // const dataForm = data ? UpdateFormData : AddFormData;
  const isUdpate = !!user;
  const schema = isUdpate ? updateUserSchema : addUserSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<typeof isUdpate extends true ? UpdateFormData : AddFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (
    data: typeof isUdpate extends true ? UpdateFormData : AddFormData
  ) => {
    setServerError(null);
    //console.log(data);
    startTransition(async () => {
      const response = (await (isUdpate
        ? updateUser(user.id, data)
        : addUser(data))) as any;
      if (!response.success) {
        toast.error(response.error);
        setServerError(response.error);
      } else {
        toast.success(response.data.message);
        onClose();
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 bg-white shadow-md rounded-lg sm:max-w-lg lg:max-w-xl py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={user?.name!}
            className={`mt-1 p-2 block w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            {...register("name")}
            disabled={isPending}
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
            id="email"
            defaultValue={user?.email!}
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

        <UserRole
          register={register}
          errors={errors}
          isPending={isPending}
          role={user?.role}
          userId={user?.id}
        />
        <UserCredentialsInput
          register={register}
          errors={errors}
          isPending={isPending}
          isUpdate={isUdpate}
          clearErrors={clearErrors}
        />

        <FormError message={serverError} />

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center w-full bg-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {isPending ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
              viewBox="0 0 24 24"
            ></svg>
          ) : isUdpate ? (
            "UPDATE"
          ) : (
            "ADD"
          )}
        </button>
      </form>
    </div>
  );
}
