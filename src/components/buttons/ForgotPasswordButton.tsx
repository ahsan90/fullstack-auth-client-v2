
import React, { useState } from 'react'
import RequestPasswordResetModal from '@/components/RequestPasswordResetModal';

function ForgotPasswordButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleForgotPassword = () => {
        setIsModalOpen(true);
    }
  return (
    <div>
      <button className="text-blue-500 float-left hover:underline text-sm py-1" onClick={handleForgotPassword}>
        Forgot Password?
      </button>
      {isModalOpen && <RequestPasswordResetModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default ForgotPasswordButton