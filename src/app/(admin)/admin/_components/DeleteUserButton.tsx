"use client";
import React, { useState, useTransition } from "react";
import Modal from "@/components/Modal";
import { FaTrashAlt } from "react-icons/fa";
import { deleteUser } from "@/actions/adminActions";
import { toast } from "react-toastify";

export default function DeleteUserButton({ aUser }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const openDeleteModal = () => setIsOpen(true);
  const closeDeleteModal = () => setIsOpen(false);
  const handleOpenDeleteModal = () => {
    openDeleteModal();
  };

  const handleDeleteProfile = async (aUser: any) => {
    const res = await deleteUser(aUser.id);
    if (!res.success) {
      //console.log(res.error);
      toast.error(res.error);
    } else {
      toast.success("User deleted successfully");
      closeDeleteModal();
    }
  };
  return (
    <>
      <button
        onClick={() => handleOpenDeleteModal()}
        className="text-red-600 hover:text-red-500 text-xl"
        data-tip="View User"
      >
        <FaTrashAlt />
      </button>
      <Modal title="Delete User" isOpen={isOpen} onClose={closeDeleteModal}>
        <p>
          Are you sure you want to delete this profile? This action cannot be undone!
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
              isPending ? "opacity-50 cursor-not-allowed" : ""
            } bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300}`}
            onClick={() => handleDeleteProfile(aUser)}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
}
