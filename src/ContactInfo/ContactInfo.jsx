import { useState } from "react";
import "./ContactInfo.css";

const ENTER_KEY_CODE = 13;

export function ContactInfo({
  contact,
  setIsContactInfoShown, //in this context, seems like it should be renamed "closeCallback" 
  updateContactInfo,
  setContactShown,
}) {
  // can contact every be null? why are there question marks?
  // should we just not render if contact is null? log an error in that case
  const [firstName, setFirstName] = useState(contact?.FirstName);
  const [lastName, setLastName] = useState(contact?.LastName);
  const [number, setNumber] = useState(contact?.Number);

  const saveContactInfo = () => {
    updateContactInfo(firstName, lastName, number, contact);
    setIsContactInfoShown(false);
    setContactShown(null);
  };

   // nit: 'onContactInfoKeyDown'
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
        {/* // feels like these 3 inputs can be generalized to a component, or some re-useable code via a function/memoized function */}
        <input
          className="contact-first-name contact-info-element"
          placeholder={contact?.FirstName}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)} //this look wasteful. it will re-render the component in each keydown. How can you fix that?
        ></input>
        <input
          className="contact-last-name contact-info-element"
          placeholder={contact?.LastName}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)} // same
        ></input>
        <input
          className="contact-number contact-info-element"
          placeholder={contact?.Number}
          value={number}
          onChange={(event) => setNumber(event.target.value)} // same
        ></input>
      </div>
      <div className="save-contact-info" onClick={saveContactInfo}>
        Save
      </div>
    </div>
  );
}
