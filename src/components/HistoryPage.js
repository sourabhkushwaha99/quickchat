


import React, { useContext } from "react";
import History from "./History";
import { ThemeContext } from "../context/ThemeContext";

const HistoryPage = ({ contactHistory, setContactHistory }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`history-page p-4 bg-${theme}`}>
      <h2 className="text-center">Contact History</h2>
      <History contactHistory={contactHistory} setContactHistory={setContactHistory} />
    </div>
  );
};

export default HistoryPage;
