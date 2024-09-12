import { getAllUsers } from '@/actions/adminActions';
import UserViewButton from './UserViewButton';
import UpdateUserButton from './UpdateUserButton';
import AddUserButton from './AddUserButton';
import DeleteUserButton from './DeleteUserButton';

export default async function UserList() {

    const res = await getAllUsers();
    if (!res.success) {
      console.log(res.error);
      return <div>{res.error}!</div>;
    }
  return (
    <div className="max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Users List</h1>
      <AddUserButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {res.users?.users?.length > 0 ? (
          res.users.users.map((aUser: any) => (
            <div
              key={aUser.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {aUser.name.charAt(0)}
                </div>
                <div className="ml-4 overflow-hidden">
                  <h2 className="text-xl font-semibold truncate">
                    {aUser.name}
                  </h2>
                </div>
              </div>

              <p className="text-gray-600">Email: {aUser.email}</p>
              <div className="flex flex-col justify-between h-full mt-5">
                {/* Content above the buttons */}
                <div className="flex justify-between items-center">
                  <div className="flex justify-between w-full">
                    {/* Buttons spaced at the bottom */}
                    <UserViewButton aUser={aUser} />

                    <UpdateUserButton aUser={aUser} />

                    <DeleteUserButton aUser={aUser} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}
