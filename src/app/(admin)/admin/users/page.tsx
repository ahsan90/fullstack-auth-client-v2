import Spinner from "@/components/Spinner";
import React, { Suspense } from "react";
import UserList from "../_components/UserList";

async function UsersListPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <UserList />
    </Suspense>
  );
}

export default UsersListPage;
