import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "./form-error";
import { requestPasswordSchema } from "@/_lib/validateSchemas";
import { z } from "zod";
import { toast } from "react-toastify";
import { sendPassResetLink } from "@/actions/authActions";
import { zodResolver } from "@hookform/resolvers/zod";

type formData = z.infer<typeof requestPasswordSchema>;

function RequestPasswordResetModal({ onClose }: { onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(requestPasswordSchema),
  });
  const onSubmit = async (data: formData) => {
    setServerError(null);
    setSuccess(false);
    setSuccessMessage(null);
    startTransition(async () => {
      //const formData = new FormData();
      //   formData.append("email", data.email);
      //   formData.append("password", data.password);
      const email = data.email;

      const response = (await sendPassResetLink({ email })) as any;
      if (!response.success) {
        if (response.errors) {
          Object.entries(response.errors).forEach(([key, message]) => {
            errors[key as keyof formData] = { message } as any;
          });
        } else if (response.error) {
          setServerError(response.error);
          toast.error(response.error);
        } else {
          setServerError("An unexpected error occurred");
        }
      }
      setSuccess(response.success);
      setSuccessMessage(response.message || null);
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          className="float-right text-gray-600 font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {success ? (
          <p className="text-lg font-bold mb-4">{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold mb-4">Request Password Reset</h2>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email associated with your account"
                className={`mt-1 p-2 block w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                {...register("email")}
                disabled={isPending}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <FormError message={serverError} />

            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {isPending ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                "Send Link"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RequestPasswordResetModal;
