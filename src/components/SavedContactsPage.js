


import React, { useContext } from "react";
import Contacts from "./Contacts";
import { ThemeContext } from "../context/ThemeContext";

const SavedContactsPage = ({ yourContacts, setYourContacts, setContactHistory }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`saved-contacts-page p-4 bg-${theme}`}>
      <h2 className="text-center">Saved Contacts</h2>
      <Contacts yourContacts={yourContacts} setYourContacts={setYourContacts} setContactHistory={setContactHistory} />
    </div>
  );
};

export default SavedContactsPage;
