import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updatePlayerCheckout,
  updatePlayerFinalResult,
} from "../actions/table";

const CheckoutForm = ({
  playerId,
  setCheckoutFormIsOn,
  updatePlayerCheckout,
  updatePlayerFinalResult,
  editFinalResult = false,
}) => {
  const [finalAmount, setFinalAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editFinalResult) {
      updatePlayerFinalResult(playerId, finalAmount);
      setCheckoutFormIsOn(false);
    } else {
      updatePlayerCheckout(playerId, finalAmount);
      setCheckoutFormIsOn(false);
    }

    setFinalAmount("");
  };

  return (
    <div className="row-item form-popup">
      <form className="form-popup-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <input
            className="final-amount-input"
            type="number"
            min={!editFinalResult && "0"}
            placeholder={editFinalResult ? "final result" : "final amount"}
            value={
              editFinalResult ? finalAmount : finalAmount < 0 ? "" : finalAmount
            }
            onChange={(e) => {
              if (e.target.value === "" || isNaN(e.target.value)) {
                setFinalAmount(-1);
              } else {
                setFinalAmount(parseInt(e.target.value));
              }
            }}
          />
          <div className="btns-popup">
            <button
              className="btn-submit leave"
              type="submit"
              name="leave"
              disabled={
                !editFinalResult && (finalAmount === "" || finalAmount < 0)
                  ? true
                  : false
              }
            >
              <i className="fas fa-check-square check-icon"></i>
            </button>
            <button
              className="btn-submit stay"
              onClick={() => setCheckoutFormIsOn(false)}
              name="stay"
            >
              <i className="fas fa-window-close times-icon"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  updatePlayerCheckout: PropTypes.func.isRequired,
};

export default connect(null, { updatePlayerCheckout, updatePlayerFinalResult })(
  CheckoutForm
);
