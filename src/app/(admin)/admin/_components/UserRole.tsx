import React, { useEffect, useState } from "react";
import { getUserRoles } from "@/actions/adminActions";
import { getSession } from "next-auth/react";

export default function UserRole({
  register,
  errors,
  isPending,
  role,
  userId,
}: any) {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [roles, setRoles] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const session = async () => {
      const session = await getSession();
      //console.log(session?.user!);
      setCurrentUser(session?.user!);
      //console.log("session: ", session?.user!);
      if (session?.user?.role === "ADMIN" && userId !== session?.user?.id) {
        const res = await getUserRoles();
        if (res.success) {
          //console.log(res.roles);
          setRoles(res.roles || {});
        }
        if (!res.success) {
          console.log(res.error);
        }
      }
    };
    session();
  }, []);
  if (currentUser?.role !== "ADMIN") return null;
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        User Role{" "}
        {currentUser?.id === userId && role && (
          <span className="text-gray-500 text-xs">
            (You can&quot;t change your own role)
          </span>
        )}
      </label>
      {currentUser?.id === userId && role ? (
        <>
          <input
            {...register("role", { required: "Role is required" })}
            value={role}
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-500 cursor-not-allowed"
            readOnly
          />
        </>
      ) : (
        <>
          <select
            {...register("role", { required: "Role is required" })}
            defaultValue={role || ""} // Ensure the value is still controlled
            disabled={isPending}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${
              errors.role ? "border-red-500 text-red-600" : "border-gray-300"
            }`}
          >
            {/* Always render the selected role */}
            {role && <option value={role}>{role}</option>}

            {/* If no role is selected, show "Select Role" */}
            {!role && <option value="">Select Role</option>}

            {/* Render other role options when the field is not disabled */}
            {Object.entries(roles).map(([key, value]) =>
              key === role ? null : (
                <option key={key} value={key}>
                  {value}
                </option>
              )
            )}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </>
      )}
    </div>
  );
}
