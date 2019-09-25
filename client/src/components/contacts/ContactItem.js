import React ,{useContext} from "react";
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types'
import ContactContext from './../../context/contacts/contactContext';
import { SET_CURRENT } from "../../context/types";

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;
  const contactContext = useContext(ContactContext);
  const {deleteContact,setCurrent,clearCurrent,setNewPage} = contactContext;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();

  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : " badge-primary")
          }
        >
          {" "}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open">{email}</i>
          </li>
        )}
        {phone && <li className="fas fa-phone">{phone}</li>}
      </ul>
      <p>

          <button className = "btn btn-dark btn-sm" onClick = {() => setCurrent(contact)}>Edit</button>
          <button className = "btn btn-danger btn-sm" onClick = {onDelete}>Delete</button>
          <Link to  = {`newPage/${_id}`} >New Page</Link>
          <button className = "btn btn-dark btn-sm" onClick = {() => setNewPage(contact)}>New Page</button>
      </p>
    </div>
  );
};
ContactItem.prototype = {
    contact:PropTypes.object.isRequired,
}
export default ContactItem;
