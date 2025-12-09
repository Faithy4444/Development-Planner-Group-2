// PrivacyModal.jsx
import React, { useState } from "react";
import "./modal.css";

export function Modal({ isOpen, onClose, privateSetting, onChange, goalId }) {
  const [linkSaved, setLinkSaved] = useState(false);
  if (!isOpen) return null;
  const shareLink = `${window.location.origin}/api/goals/${goalId}`;
  const privacyValue = privateSetting ? "restricted" : "withLink";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setLinkSaved(true);
    setTimeout(() => setLinkSaved(false), 2000);
  };

  return (
    <div className="modal">
      <div onClick={onClose} className="overlay"></div>

      <div className="modal-content">
        <h2>Manage Plan Privacy</h2>

        <label htmlFor="privacy-select">Access Level</label>

        <select
          id="privacy-select"
          value={privacyValue}
          onChange={() => onChange()}
        >
          <option value="restricted">Restricted</option>
          <option value="withLink">Anyone with the link</option>
        </select>
        {privateSetting && <p>No sharable link</p>}
        {!privateSetting && (
          <div className="public-link-box">
            {linkSaved ? <p>Link has been copied</p> : ""}
            <p>
              <strong>Shareable Link:</strong>
            </p>
            <div className="link-row">
              <input id="shareLink" type="text" value={shareLink} readOnly />
              <button
                id="copyLink"
                onClick={copyToClipboard}
                className="btn-primary"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <button className="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
