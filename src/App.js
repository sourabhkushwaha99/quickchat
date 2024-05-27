
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainForm from "./components/MainForm";
import SavedContactsPage from "./components/SavedContactsPage";
import HistoryPage from "./components/HistoryPage";
import "./App.css";

function App() {
  const [contactHistory, setContactHistory] = useState([]);
  const [yourContacts, setYourContacts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("history")) {
      setContactHistory(JSON.parse(localStorage.getItem("history")));
    }
    if (localStorage.getItem("savedContacts")) {
      setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="row py-5 my-5 text-center bg-white bg-opacity-50 rounded justify-content-center">
                <div className="col-lg-6 py-3">
                  <MainForm
                    setContactHistory={setContactHistory}
                    setYourContacts={setYourContacts}
                  />
                </div>
              </div>
            } 
          />
          <Route 
            path="/saved-contacts" 
            element={
              <SavedContactsPage
                yourContacts={yourContacts}
                setYourContacts={setYourContacts}
                setContactHistory={setContactHistory}
              />
            } 
          />
          <Route 
            path="/history" 
            element={
              <HistoryPage
                contactHistory={contactHistory}
                setContactHistory={setContactHistory}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
