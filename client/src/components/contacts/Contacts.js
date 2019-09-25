import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contacts/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layouts/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts ,loading} = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);
  if (contacts.length === 0) {
    return <div>Please Add Contacts</div>;
  }
  return (
    <Fragment>
      {loading && <Spinner/>}
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        : contacts.map(contact => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
    </Fragment>
  );
};
export default Contacts;
