import Spinner from "@/components/Spinner";
import UserProfile from "@/app/(user)/dashboard/_components/UserProfile";
import { Suspense } from "react";

export default function UserProfilePage() {
  return (
    <div className="max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <Suspense fallback={<Spinner />}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
