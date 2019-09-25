import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  GET_CONTACTS,
  NEW_PAGE,
  CONTACT_ERROR
} from "../types";

export default (state, action) => {
  console.log("action", action.type);
  console.log("reducrer payload", action.payload);
  console.log("reducrer state", state.contacts);
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case NEW_PAGE:
      return {
        ...state,
        newPage: action.payload
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(action.payload, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
