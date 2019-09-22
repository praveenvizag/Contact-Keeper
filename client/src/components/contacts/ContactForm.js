import React, { useState, useContext ,useEffect} from "react";
import ContactContext from './../../context/contacts/contactContext';
import AlertContext from './../../context/alert/alertContext';


const ContactForm = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);
  const {addContact,current,clearCurrent,updateContact} = contactContext;
  const {setAlert} = alertContext;
  
  useEffect (() => {
    if(current !== null) {
      setContact(current)
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  },[current,contactContext]);
  const { email, phone, type, name } = contact;
  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    if(name === "" || email === "" || phone === "") {
      setAlert('Enter all Fields','danger');
    } else {
      if(current === null) {
        addContact(contact);
      } else {
        updateContact(contact);
      }
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
      clearCurrent();
    };

    }
    
  const clearAll = () => {
    clearCurrent();
  }
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChange}
        checked={type === "personal"}
      />
      Personal
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Edit Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && <div>
        <button className = "btn btn-light btn-block" onClick = {clearAll}>Clear</button>
      </div>}
    </form>
  );
};

export default ContactForm;
 