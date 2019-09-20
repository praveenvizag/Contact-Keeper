import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contacts/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;
  console.log("contacts", contacts,'filtered contacts',filtered);
  if (contacts.length === 0) {
    return <div>Please Add Contacts</div>;
  }
  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
    </Fragment>
  );
};
export default Contacts;
