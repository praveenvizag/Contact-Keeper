import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "./../../context/contacts/contactContext";

const FilterContacts = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef("");

  useEffect(() => {
    console.log("in ref");
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const onChange = e => {
    if (text.current.value !== "") {
      console.log("filtere text", e.target.value);
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <div>
      <input
        type="text"
        ref={text}
        placeholder="Filter Contacts"
        onChange={onChange}
      ></input>
    </div>
  );
};

export default FilterContacts;
