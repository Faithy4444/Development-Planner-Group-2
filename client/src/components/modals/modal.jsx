import React, { useState } from "react";
import "./modal.css";

export function Modal({ handlePrivacy }) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Make plan open to public</h2>

            <label htmlFor="privacy-select">Manage access</label>

            <select
              name="privacySetting"
              id="privacy-select"
              onChange={handlePrivacy}
            >
              <option value="restricted">Restricted</option>
              <option value="withLink">Anyone with the link</option>
            </select>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
