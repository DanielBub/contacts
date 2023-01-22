import { Contact } from "../Contact/Contact";
import { useState, useEffect, useRef } from "react";
import { ContactInfo } from "../ContactInfo/ContactInfo";
import "./ContactsList.css";

export function ContactsList({ contactsList }) {
  const [contacts, setContacts] = useState(contactsList);
  const [contactShown, setContactShown] = useState(null); // can you teach me about useState of null? why do we need both this nad isContactInfoShown?
  const [isContactInfoShown, setIsContactInfoShown] = useState(false);

  const CONTACT_INFO_REF = useRef();

  const CONTACT_INFO_CLASS = ".contact-info";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(CONTACT_INFO_CLASS)) { // why not contains/ischildof?
        setIsContactInfoShown(false);
        setContactShown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // why is this returned and is also listened on before the return? what am I missing
    };
  }, [CONTACT_INFO_REF]);

  const onContactClicked = (contact) => {
    setIsContactInfoShown(true);
    setContactShown(contact);
  };

  
  // can you think of an O(1) solution for this?
  const updateContactInfo = (firstName, lastName, number, oldContact) => {
    let contactToUpdate = contacts.find(
      (contact) => contact.Number === oldContact.Number //consider adding an ID, or passing the contact itself
    );
    contactToUpdate.FirstName = firstName;
    contactToUpdate.LastName = lastName;
    contactToUpdate.Number = number;
  };

  // does this really need to be a function?
  const openNewContactInfo = () => {
    setIsContactInfoShown(true);
  };

  const addNewContact = (firstName, lastName, number) => {
    let newContact = {
      FirstName: firstName,
      LastName: lastName,
      Number: number,
    };
    contacts.push(newContact);
  };

  // can you think of an O(1) solution for this?
  const deleteContact = (event, contactToDelete) => {
    setContacts(
      contacts.filter((contact) => contact.Number !== contactToDelete.Number)
    );
    event.stopPropagation();
  };

  return (
    <div>
      <div className="contacts-list">
        <button className="add-new-contact" onClick={openNewContactInfo}>
          +
        </button>
        {contacts.map((contact) => (
          <Contact
            key={contact.Number}
            contact={contact}
            onContactClicked={() => onContactClicked(contact)}
            deleteContact={deleteContact} //consider using arrow methods all around for cinsistency, passing the contact here as well
          />
        ))}
      </div>
      {isContactInfoShown && (
        <ContactInfo
          ref={CONTACT_INFO_REF}
          contact={contactShown}
          setIsContactInfoShown={setIsContactInfoShown}
          updateContactInfo={contactShown ? updateContactInfo : addNewContact} //seems like this prop should be called "commitCallback" or something
          setContactShown={setContactShown} 
        />
      )}
    </div>
  );
}
