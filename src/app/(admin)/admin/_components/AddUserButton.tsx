"use client";
import { useState } from "react";
import Modal from "@/components/Modal";
import AddUpdateUser from "./AddUpdateUser";

export default function AddUserButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleAddUser = () => {
    openModal();
    //console.log("Add User clicked");
  };
  return (
    <>
      <button
        onClick={() => handleAddUser()}
        className="text-white hover:text-white mb-2 bg-green-600 hover:bg-green-800 p-2 rounded-md"
        data-tip="View User"
      >
        Add User
      </button>
      <Modal title="Add User" isOpen={isModalOpen} onClose={closeModal}>
        <AddUpdateUser onClose={closeModal}/>
      </Modal>
    </>
  );
}
