import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  NEW_PAGE
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Paveen",
        email: "pk@gmail.com",
        phone: "222-333-555-999",
        type: "professional"
      },
      {
        id: 2,
        name: "Kumar",
        email: "pkumar@gmail.com",
        phone: "222-333-555-000",
        type: "personal"
      },
      {
        id: 3,
        name: "konchada",
        email: "pkumarkonchada@gmail.com",
        phone: "222-333-555-234",
        type: "personal"
      }
    ],
    current: null,
    newPage: null,
    filtered: null
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);
  //Add Contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };
  //Delete COntact

  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };
  //Set Current Contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };
  //Clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };
  //Update contact
  const updateContact = contact => {
    console.log("update contact", contact);
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };
  //FilterContact
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });
  };
  //Clear Filter
  const clearFilter = () => {
    dispatch({
      type:CLEAR_FILTER
    })
  }
  //setNew PAge
  const setNewPage = contact => {
    console.log("New Page", contact);
    dispatch({
      type: NEW_PAGE,
      payload: contact
    });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        newPage: state.newPage,
        setNewPage,
        filterContacts,
        clearFilter,
        filtered:state.filtered
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
