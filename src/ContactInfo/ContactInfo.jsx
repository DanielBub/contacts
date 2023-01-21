import { useState } from "react";
import "./ContactInfo.css";

const ENTER_KEY_CODE = 13;

export function ContactInfo({
  contact,
  setIsContactInfoShown,
  updateContactInfo,
  setContactShown,
}) {
  const [firstName, setFirstName] = useState(contact?.FirstName);
  const [lastName, setLastName] = useState(contact?.LastName);
  const [number, setNumber] = useState(contact?.Number);

  const saveContactInfo = () => {
    updateContactInfo(firstName, lastName, number, contact);
    setIsContactInfoShown(false);
    setContactShown(null);
  };

  const onContactInfoKey = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      saveContactInfo();
    }
  };

  return (
    <div className="contact-info" onKeyDown={(e) => onContactInfoKey(e)}>
      <div
        className="close-contact-info"
        onClick={() => setIsContactInfoShown(false)}
      >
        X
      </div>
      <div>
        <input
          className="contact-first-name contact-info-element"
          placeholder={contact?.FirstName}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        ></input>
        <input
          className="contact-last-name contact-info-element"
          placeholder={contact?.LastName}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        ></input>
        <input
          className="contact-number contact-info-element"
          placeholder={contact?.Number}
          value={number}
          onChange={(event) => setNumber(event.target.value)}
        ></input>
      </div>
      <div className="save-contact-info" onClick={saveContactInfo}>
        Save
      </div>
    </div>
  );
}
