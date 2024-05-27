


import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeContext } from "../context/ThemeContext";
import './History.css';  // Ensure the CSS file is imported

const History = ({ contactHistory, setContactHistory }) => {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const { theme } = useContext(ThemeContext);
  let limitedContactHistory = contactHistory;
  let loadMoreButton = null;

  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    const options = { timeZone: 'Asia/Kolkata', hour12: true, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('en-IN', options);
  };

  const clearHistory = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete the history?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("history", "[]");
        setContactHistory([]);
        Swal.fire("Deleted!", "Deleted Contact History!", "success");
      } else {
        Swal.fire("Cancelled", "History is safe!", "info");
      }
    });
  };

  const clearIndividualChatHistory = (individual) => {
    let modifiedHistory = contactHistory.filter((history) => {
      return history.timedate !== individual.timedate;
    });
    localStorage.setItem("history", JSON.stringify(modifiedHistory));
    setContactHistory(JSON.parse(localStorage.getItem("history")));
  };

  if (!showAllHistory) {
    limitedContactHistory = contactHistory.slice(0, 5);

    if (contactHistory.length > 5) {
      loadMoreButton = (
        <button
          onClick={() => {
            setShowAllHistory(true);
          }}
          className="btn btn-success w-100 my-3"
        >
          Load More
        </button>
      );
    }
  }

  return (
    <div className={`history-container bg-${theme}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="h4">History</span>
        <button onClick={clearHistory} className="btn btn-outline-danger mx-1">
          <i className="fas fa-trash-alt" />
        </button>
      </div>

      <div>
        {limitedContactHistory.map((element, index) => (
          <div key={index} className={`card mb-3 bg-${theme} history-item history-item-${theme}`}>
            <div className="card-body d-flex justify-content-between">
              <a
                href={`http://wa.me/${element.number}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-success btn-sm w-75"
              >
                <i className="fab fa-whatsapp mx-3" />
                <span>{element.name ? element.name : element.number}</span>
              </a>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearIndividualChatHistory(element);
                }}
                className="btn btn-outline-danger btn-sm w-25"
              >
                <i className="fas fa-trash-alt" />
              </button>
            </div>
            <div className={`card-footer history-item-${theme} text-secondary`} style={{ fontSize: "12px" }}>
              {convertToIST(element.timedate)}
            </div>
          </div>
        ))}
        {loadMoreButton}
      </div>
    </div>
  );
};

export default History;
