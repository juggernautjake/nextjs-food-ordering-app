import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  isOpen && (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
);

export default Modal;
