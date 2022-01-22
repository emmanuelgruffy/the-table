import React from "react";

const ResultItem = ({ playerName, balancedFinalResult, place }) => {
  return (
    <div className="result-row">
      <div className="result-item">
        <h1>
          #{place}
          {" " + playerName}
        </h1>
      </div>
      <div className="result-item balance-coins">
        <h1>{balancedFinalResult}</h1>
        <i className="fas fa-coins coins"></i>
      </div>
    </div>
  );
};

export default ResultItem;
