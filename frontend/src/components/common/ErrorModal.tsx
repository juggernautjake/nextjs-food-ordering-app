import React from 'react';

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, message }) => (
  isOpen && (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
);

export default ErrorModal;
