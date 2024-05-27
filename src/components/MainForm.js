

import React, { useState, useContext } from "react";
import { saveHistory } from "../utils/contactUtils";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeContext } from "../context/ThemeContext";
import './MainForm.css';



const countryCodes = [
  { name: "United States", code: "1" },
  { name: "India", code: "91" },
  { name: "United Kingdom", code: "44" },
  { name: "Canada", code: "1" },
  { name: "Australia", code: "61" },
  { name: "Germany", code: "49" },
  { name: "France", code: "33" },
  { name: "Italy", code: "39" },
  { name: "Spain", code: "34" },
  { name: "Brazil", code: "55" },
  { name: "Mexico", code: "52" },
  { name: "Russia", code: "7" },
  { name: "China", code: "86" },
  { name: "Japan", code: "81" },
  { name: "South Korea", code: "82" },
  { name: "South Africa", code: "27" },
  { name: "Nigeria", code: "234" },
  { name: "Egypt", code: "20" },
  { name: "Turkey", code: "90" },
  { name: "Argentina", code: "54" },
  { name: "Colombia", code: "57" },
  { name: "Chile", code: "56" },
  { name: "Peru", code: "51" },
  { name: "Venezuela", code: "58" },
  { name: "Indonesia", code: "62" },
  { name: "Malaysia", code: "60" },
  { name: "Singapore", code: "65" },
  { name: "Thailand", code: "66" },
  { name: "Vietnam", code: "84" },
  { name: "Philippines", code: "63" },
  { name: "Pakistan", code: "92" },
  { name: "Bangladesh", code: "880" },
  { name: "Sri Lanka", code: "94" },
  { name: "Nepal", code: "977" },
  { name: "New Zealand", code: "64" },
  { name: "Saudi Arabia", code: "966" },
  { name: "United Arab Emirates", code: "971" },
  { name: "Qatar", code: "974" },
  { name: "Kuwait", code: "965" },
  { name: "Israel", code: "972" },
  { name: "Iran", code: "98" },
  { name: "Iraq", code: "964" },
  { name: "Afghanistan", code: "93" },
  { name: "Morocco", code: "212" },
  { name: "Algeria", code: "213" },
  { name: "Kenya", code: "254" },
  { name: "Ethiopia", code: "251" },
  { name: "Ghana", code: "233" },
  { name: "Ivory Coast", code: "225" },
];

const MainForm = ({ setContactHistory, setYourContacts }) => {
  const [countryCode, setCountryCode] = useState("91");
  const [number, setNumber] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleCountryCode = (event) => {
    setCountryCode(event.target.value);
  };

  const now = () => {
    const now = new Date();
    return `Contacted on: ${now.toUTCString()}`;
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    const phoneNumber = value.replace(/[^0-9]/g, "");
    setNumber(phoneNumber);
    setValidNumber(validatePhoneNumber(phoneNumber));
  };

  const saveContact = () => {
    const phoneNumber = countryCode + number;
    const savedContacts = JSON.parse(localStorage.getItem("savedContacts") || "[]");
    const nameExists = savedContacts.some(contact => contact.name === name);
    const numberExists = savedContacts.some(contact => contact.number === phoneNumber);

    if (nameExists || numberExists) {
      setError(true);
    } else {
      setError(false);
      const newContact = { name, number: phoneNumber };
      savedContacts.push(newContact);
      localStorage.setItem("savedContacts", JSON.stringify(savedContacts));
      updateHistoryNames(savedContacts);
      setYourContacts(savedContacts);
    }
  };

  const updateHistoryNames = (savedContacts) => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.forEach(historyItem => {
      const contact = savedContacts.find(contact => contact.number === historyItem.number);
      if (contact) {
        historyItem.name = contact.name;
      }
    });
    localStorage.setItem("history", JSON.stringify(history));
    setContactHistory(history);
  };

  return (
    <div className={`main-form-container p-4 border rounded shadow-sm bg-${theme}`}>
      <div className="main-form-header mb-4 text-center">
        <h4>Start a New Chat</h4>
      </div>
      <div className="main-form-group mb-3">
        <label htmlFor="countryCode">Country Code</label>
        <select
          id="countryCode"
          onChange={handleCountryCode}
          value={countryCode}
          className="form-control"
        >
          {countryCodes.map((country, index) => (
            <option key={index} value={country.code}>
              {country.name} (+{country.code})
            </option>
          ))}
        </select>
      </div>
      <div className="main-form-group mb-3">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          onChange={handleOnChange}
          value={number}
          type="tel"
          className="form-control"
          placeholder="Enter valid number (10 digits)"
        />
      </div>
      <div className="main-form-group mb-3">
        <label htmlFor="contactName">Contact Name</label>
        <input
          id="contactName"
          onChange={(event) => setName(event.target.value)}
          value={name}
          type="text"
          className="form-control"
          placeholder="Enter name to save contact in browser"
        />
      </div>
      <div className="main-form-actions">
        <a
          onClick={() => {
            saveHistory(countryCode + number, now());
            setContactHistory(JSON.parse(localStorage.getItem("history")));
          }}
          href={`http://wa.me/${countryCode + number}`}
          target="_blank"
          rel="noreferrer"
          className={`btn btn-success my-3 w-100 ${validNumber ? "" : "disabled"}`}
        >
          <i className="fab fa-whatsapp" /> Chat on WhatsApp
        </a>
        <button
          onClick={saveContact}
          className={`btn btn-primary w-100 ${validNumber && name ? "" : "disabled"}`}
        >
          Save Contact
        </button>
      </div>
      {error && (
        <div className="error-message alert alert-danger mt-3">
          Error: The name or number already exists
        </div>
      )}
    </div>
  );
};

export default MainForm;
