"use client";

import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import UpdateUserProfile from "./UpdateUserProfile";
import { deleteUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  profile: any;
};

export default function UserSettings({ profile }: Props) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteProfile = async () => {
    const res = await deleteUser();
    if (res?.success) {
      closeDeleteModal();
      window.location.href = "/login";
    } else {
      toast.error(res?.error! || "An error occurred");
    }
  };
  return (
    <div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={openUpdateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300"
        >
          Update Profile
        </button>
        {profile?.role !== "ADMIN" && (
          <button
            onClick={openDeleteModal}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300"
          >
            Delete Profile
          </button>
        )}
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Profile"
      >
        <p>
          Are you sure you want to delete your profile? This action cannot be
          undone and you will be logged out!
        </p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300 mr-4"
            onClick={closeDeleteModal}
          >
            Cancel
          </button>
          <button
            className={`${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            } bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300}`}
            onClick={handleDeleteProfile}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
      {/* {isUpdateModalOpen && (
        <UpdateProfileModal profile={profile} onClose={closeUpdateModal} />
      )} */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        title="Update Profile"
      >
        <UpdateUserProfile profile={profile} onClose={closeUpdateModal} />
      </Modal>
    </div>
  );
}
