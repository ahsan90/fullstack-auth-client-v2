"use client";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import AddUpdateUser from "./AddUpdateUser";

export default function UserUpdateButton({ aUser }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUpdateUser = (aUser: any) => {
    openModal()
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button
        onClick={() => handleUpdateUser(aUser)}
        className="text-yellow-600 hover:text-yellow-800 text-xl"
        data-tip="View User"
      >
        <FaEdit />
      </button>
      <Modal title="Update User" isOpen={isModalOpen} onClose={closeModal}>
        <AddUpdateUser user={aUser} onClose={closeModal}/>
      </Modal>
    </>
  );
}
