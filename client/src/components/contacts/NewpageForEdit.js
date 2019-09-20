import React, { useContext, Fragment } from "react";
import ContactContext from "./../../context/contacts/contactContext";
import ContactForm from "./ContactForm";
import { Link } from "react-router-dom";

const NewpageForEdit = ({ match,props }) => {
  const contactContext = useContext(ContactContext);
  const { contacts, newPage } = contactContext;
  console.log("edit", match.params.edit);
  console.log("props", props);
  console.log("new page data", newPage);
  const data = contacts.filter(contact => contact.id == match.params.edit );
  console.log("filter data", data);

  if (newPage !== null) {
    return <div> Welcome to New Page</div>;
  } else {
    return (
      <Fragment>
        <div>
          <ContactForm />
        </div>
        <div>
          <Link to="/">Back To home</Link>
        </div>
      </Fragment>
    );
  }
};

export default NewpageForEdit;
