import { updateUser } from "@/actions/userActions";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateLoggedInUserSchema } from "@/_lib/validateSchemas";
import { FormError } from "@/components/form-error";

type UpdateFormData = z.infer<typeof updateLoggedInUserSchema>;

export default function UpdateUserProfile({
  profile,
  onClose,
}: {
  profile: any;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    resetField,
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateLoggedInUserSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const handleCheckboxChange = () => {
    //const isChecked = e.target.checked;
    setIsChecked(!isChecked);
    if (!isChecked) {
      clearErrors(["currentPassword", "newPassword", "confirmPassword"]);
      resetField("currentPassword");
      resetField("newPassword");
      resetField("confirmPassword");
    }
  };

  const onSubmit = async (data: UpdateFormData) => {
    setServerError(null);
    startTransition(async () => {
      const res = await updateUser(data);
      if (res?.success) {
        toast.success(res.message);
        onClose();
      } else {
        setServerError(res.message as string);
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              defaultValue={profile?.name}
              placeholder="Name"
              id="name"
              {...register("name")}
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${
                errors.name ? "border-red-500 text-red-600" : "border-gray-300"
              }`}
              disabled={isPending}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors?.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              defaultValue={profile?.email!}
              disabled={isPending}
              className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${
                errors.email ? "border-red-500 text-red-600" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message as React.ReactNode}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                {...register("isPasswordChangeRequested")}
                disabled={isPending}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <p>Update Password?</p>
            </label>
          </div>
          {isChecked ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  {...register("currentPassword")}
                  type="password"
                  disabled={isPending}
                  className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${
                    errors.currentPassword
                      ? "border-red-500 text-red-600"
                      : "border-gray-300"
                  }`}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  {...register("newPassword")}
                  disabled={isPending}
                  type="password"
                  className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${
                    errors.newPassword
                      ? "border-red-500 text-red-600"
                      : "border-gray-300"
                  }`}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword")}
                  disabled={isPending}
                  type="password"
                  className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${
                    errors.confirmPassword
                      ? "border-red-500 text-red-600"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </>
          ) : null}
          <FormError message={serverError} />
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full flex bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
