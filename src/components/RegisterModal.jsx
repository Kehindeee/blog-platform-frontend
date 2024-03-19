// src/components/RegisterModal.jsx
import React from 'react';
import { createPortal } from 'react-dom';

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          {/* Your registration form goes here */}
          <h3 className="text-lg leading-6 font-medium text-gray-900">Register</h3>
          {/* ... */}
          <span className="absolute top-0 right-0 p-4">
            <button onClick={onClose}>&times;</button>
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RegisterModal;
