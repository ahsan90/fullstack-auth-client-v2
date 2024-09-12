import formatDate from "@/_utils/getFormatedDate";

const UserDetail = ({
  user,
}: {
  user: any;
}) => {
  return (
    <div className="inset-0 flex items-center justify-center">
      <div className="p-6 rounded-lg max-w-md w-full">
        <div className="mb-2">
          <label className="block text-gray-600 font-bold mb-1">Name</label>
          <div className="bg-gray-100 p-3 rounded-md">{user.name}</div>
        </div>
        <div className="mb-2">
          <label className="block text-gray-600 font-bold mb-1">Email</label>
          <div className="bg-gray-100 p-3 rounded-md">{user.email}</div>
        </div>
        <div className="mb-2">
          <label className="block text-gray-600 font-bold mb-1">
            User Role
          </label>
          <div className="bg-gray-100 p-3 rounded-md">{user?.role!}</div>
        </div>
        <div className="mb-2">
          <label className="block text-gray-600 font-bold mb-1">
            Profile Created On
          </label>
          <div className="bg-gray-100 p-3 rounded-md">
            {formatDate(user?.createdAt!)}
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-gray-600 font-bold mb-1">
            Last Updated
          </label>
          <div className="bg-gray-100 p-3 rounded-md">
            {formatDate(user?.updatedAt!)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
