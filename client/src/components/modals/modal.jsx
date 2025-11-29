// PrivacyModal.jsx
import React from "react";
import "./modal.css";

export function Modal({ isOpen, onClose, privacy, onChange }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div onClick={onClose} className="overlay"></div>

      <div className="modal-content">
        <h2>Manage Plan Privacy</h2>

        <label htmlFor="privacy-select">Access Level</label>

        <select
          id="privacy-select"
          value={privacy}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="restricted">Restricted</option>
          <option value="withLink">Anyone with the link</option>
        </select>

        <button className="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
