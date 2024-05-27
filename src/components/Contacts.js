
import React, { useContext } from "react";
import Swal from "sweetalert2";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeContext } from "../context/ThemeContext";

const Contacts = ({ yourContacts, setYourContacts, setContactHistory }) => {
  const { theme } = useContext(ThemeContext);

  const saveHistory = (number, timestamp) => {
    let history = localStorage.getItem("history");
    if (!history) {
      history = [];
    } else {
      history = JSON.parse(history);
    }

    history.push({ number, timestamp });
    localStorage.setItem("history", JSON.stringify(history));
  };

  const deleteContact = (event) => {
    let contactName = event.currentTarget.value;
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        let allContacts = localStorage.getItem("savedContacts");
        allContacts = JSON.parse(allContacts);

        let remainingContacts = allContacts.filter((contact) => {
          return contact.name !== contactName;
        });

        localStorage.setItem(
          "savedContacts",
          JSON.stringify(remainingContacts)
        );

        setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));

        Swal.fire("Deleted!", "Deleted Successfully!", "success");
      } else {
        Swal.fire("Cancelled", "Contact Not deleted.", "info");
      }
    });
  };

  const deleteAllContacts = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete all the contacts?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("savedContacts", "[]");
        setYourContacts([]);
        Swal.fire("Deleted!", "Deleted all Contacts.", "success");
      } else {
        Swal.fire("Cancelled", "Contacts are safe!", "info");
      }
    });
  };

  function now() {
    const now = new Date();
    const formattedString = `Contacted on: ${now.toUTCString()}`;
    return formattedString;
  }

  function handleCopyToClipboard(value) {
    navigator?.clipboard
      .writeText(value)
      .then((val) => Swal.fire("Copied!", value, "success"))
      .catch((err) => Swal.fire("Oops!", "Something went wrong", "error"));
  }

  return (
    <div className={`contacts-container bg-${theme}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="h4">Contacts</span>
        <button onClick={deleteAllContacts} className="btn btn-outline-danger">
          <i className="fas fa-trash-alt" />
        </button>
      </div>

      <div>
        {yourContacts
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((element, index) => (
            <div key={index} className={`card mb-3 bg-${theme}`}>
              <div className={`card-header d-flex justify-content-between history-item-${theme}`}>
                <p className="mb-0">{element.name}</p>
                <button
                  onClick={deleteContact}
                  value={element.name}
                  className="btn btn-sm btn-outline-danger"
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
              <div className={`card-body d-flex  justify-content-between history-item-${theme}`}>
                <h5 className="card-title">
                  {element.number.slice(0, 2)}-{element.number.slice(2, 12)}
                </h5>
                <button
                  onClick={() => handleCopyToClipboard(element?.number)}
                  className="btn btn-sm btn-outline-secondary"
                >
                  <i className="fas fa-clipboard" />
                </button>
              </div>
              <div className={`card-footer history-item-${theme}`}>
                <a
                  onClick={() => {
                    saveHistory(element.number, now());
                    setContactHistory(
                      JSON.parse(localStorage.getItem("history"))
                    );
                  }}
                  href={`http://wa.me/${element.number}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-success w-100"
                >
                  Chat
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Contacts;
