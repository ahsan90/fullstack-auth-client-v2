import { loggedInUser } from "@/actions/userActions";
import formatDate from "@/_utils/getFormatedDate";
import ProfileSettings from "@/app/(user)/dashboard/_components/UserSettings";

export default async function UserProfile() {
  let currentUser: any | null;

  const res = await loggedInUser();
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  if (res.success) {
    currentUser = res.user;
  }

  if (!res.success) return <p>{res.error}</p>;
  const { user } = currentUser;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Profile Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <label className="block text-gray-600 font-bold mb-1">Name</label>
          <div className="bg-gray-100 p-3 rounded-md">{user.name}</div>
        </div>
        <div className="col-span-1">
          <label className="block text-gray-600 font-bold mb-1">Email</label>
          <div className="bg-gray-100 p-3 rounded-md">{user.email}</div>
        </div>
        <div className="col-span-1">
          <label className="block text-gray-600 font-bold mb-1">
            Profile Created On
          </label>
          <div className="bg-gray-100 p-3 rounded-md">
            {formatDate(user?.createdAt)}
          </div>
        </div>
        <div className="col-span-1">
          <label className="block text-gray-600 font-bold mb-1">
            Last Updated
          </label>
          <div className="bg-gray-100 p-3 rounded-md">
            {formatDate(user?.updatedAt)}
          </div>
        </div>
      </div>
      <ProfileSettings profile={user} />
    </>
  );
}
