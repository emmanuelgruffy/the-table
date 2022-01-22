import React from "react";
import PropTypes from "prop-types";

const Transaction = ({ debtor, creditor, sum }) => {
  return (
    <div className="transaction-row">
      <div className="trans-row-item">
        <h1>{debtor}</h1>
      </div>
      <div className="trans-row-item">
        <i className="fas fa-hand-holding-usd fa-2x hand"></i>
      </div>
      <div className="trans-row-item">
        <h1>{creditor}</h1>
      </div>
      <div className="trans-row-item trans-money">
        <h1>{sum}</h1>
        <i className="fas fa-coins coins"></i>
      </div>
    </div>
  );
};

export default Transaction;
