'use client'
import React, { useState } from 'react'
import Modal from '@/components/Modal';
import { FaEye } from "react-icons/fa";
import UserDetail from './UserDetails';

export default function UserViewButton({ aUser }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleViewUser = () => {
      openModal()
  }
  return (
    <>
      <button
        onClick={handleViewUser}
        className="text-green-600 hover:text-green-800 text-xl"
        data-tip="View User"
      >
        <FaEye />
      </button>
      <Modal title="User Details" isOpen={isModalOpen} onClose={closeModal}>
        <UserDetail user={aUser}/>
      </Modal>
    </>
  );
}
