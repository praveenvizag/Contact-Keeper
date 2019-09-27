import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import axios from "axios";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  NEW_PAGE,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  REST_DATA
} from "../types";
import setAuthToken from './../../utils/setAuthToken';

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    newPage: null,
    filtered: null,
    error:null,
    resData:[]
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);
  //Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      console.log('add Contact',res.data);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        dispatch:CONTACT_ERROR,
        payload:error.response.msg
      })
    }
  };

  //Get Contact

  const getContacts = async () => {
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }
   
    try {
      const res = await axios.get("/api/contacts");
      console.log('add Contact',res.data);
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        dispatch:CONTACT_ERROR
      })
    }
  };

  //Delete COntact

  const deleteContact = async id => {
    console.log('delete id' , id);
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (error) {
      
    }
    
  };

  //Clear contacts
  const clearContatcs = () => {
    dispatch({
      type:CLEAR_CONTACTS
    })
    
  }
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
      type: CLEAR_FILTER
    });
  };
  //setNew PAge
  const setNewPage = contact => {
    dispatch({
      type: NEW_PAGE,
      payload: contact
    });
  };

  const getRestData = async () =>{
    try {
      const restRes = await axios.get("http://localhost:8081/getStudents");
      console.log("rest data " , restRes.data);
      dispatch({
        type:REST_DATA,
        payload:restRes.data
      })
    } catch (error) {
      
    }
  }
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        error:state.error,
        addContact,
        getContacts,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        newPage: state.newPage,
        setNewPage,
        filterContacts,
        clearFilter,
        filtered: state.filtered,
        resData:state.resData,
        getRestData,
        clearContatcs
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
