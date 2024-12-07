import React from 'react';
import '../../styles/ConfirmModal.css'; // Add custom styles

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="confirm-btn">Yes</button>
                    <button onClick={onCancel} className="cancel-btn">No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
