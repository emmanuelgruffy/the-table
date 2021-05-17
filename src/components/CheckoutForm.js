import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePlayerCheckout } from "../actions/table";

const CheckoutForm = ({
  playerId,
  setCheckoutFormIsOn,
  updatePlayerCheckout,
}) => {
  const [finalAmount, setFinalAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let action = e.target.ownerDocument.activeElement.name;
    if (action === "leave") {
      updatePlayerCheckout(playerId, finalAmount);
      setCheckoutFormIsOn(false);
    } else {
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
            min="0"
            placeholder="Your final amount"
            value={finalAmount < 0 ? "" : finalAmount}
            onChange={(e) => {
              if (e.target.value === "" || e.target.value === NaN) {
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
              disabled={finalAmount === "" || finalAmount < 0 ? true : false}
            >
              <i className="fas fa-check-square check-icon"></i>
            </button>
            <button className="btn-submit stay" type="submit" name="stay">
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

export default connect(null, { updatePlayerCheckout })(CheckoutForm);
