import { useState } from "react";

export default function UserCredentialsInput({
  register,
  errors,
  isPending,
  isUpdate,
  clearErrors,
}: any) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      clearErrors(["currentPassword", "newPassword", "confirmPassword"]);
    }
  };
  return (
    <>
      {isUpdate ? (
        <>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("isPasswordChanged")}
                disabled={isPending}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <p>Update Password?</p>
            </label>
          </div>
          {isChecked && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className={`mt-1 p-2 block w-full border ${
                    errors.currentPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  {...register("currentPassword")}
                  disabled={isPending}
                />
                {errors.currentPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className={`mt-1 p-2 block w-full border ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  {...register("newPassword")}
                  disabled={isPending}
                />
                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.newPassword.message}
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
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className={`mt-1 p-2 block w-full border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  disabled={isPending}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <>
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className={`mt-1 p-2 block w-full border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              disabled={isPending}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
