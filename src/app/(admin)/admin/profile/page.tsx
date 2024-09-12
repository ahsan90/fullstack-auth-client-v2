import React, { Suspense } from "react";
import Spinner from "@/components/Spinner";
import UserProfile from "@/app/(user)/dashboard/_components/UserProfile";

export default function AdminProfilePage() {
  return (
    <div className="max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <Suspense fallback={<Spinner />}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
