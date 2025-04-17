import React from 'react';
import { MdLogout, MdClose } from 'react-icons/md';
import '../styles/logoutConfirmation.scss';

const LogoutConfirmation = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-confirmation-overlay">
      <div className="logout-confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="logout-title">
        <div className="modal-header">
          <h3 id="logout-title">Confirm Logout</h3>
          <button className="close-button" onClick={onClose} aria-label="Close">
            <MdClose />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="icon-container">
            <MdLogout className="logout-icon" />
          </div>
          <p>Are you sure you want to log out?</p>
          <p className="subtext">You will need to log in again to access your account.</p>
        </div>
        
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation; 