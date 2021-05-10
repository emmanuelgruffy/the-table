import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { updatePlayerRebuy, updatePlayerCheckout } from "../actions/table";

const Player = ({
  checkIfAllOut,
  updatePlayerCheckout,
  updatePlayerRebuy,
  minimalBuyIn,
  taxFee,
  playerId,
  playerName,
  lastRebuy,
  rebuyCount,
  isOut,
}) => {
  const [checkoutFormIsOn, setCheckoutFormIsOn] = useState(false);
  const [finalAmount, setFinalAmount] = useState("");
  const [includeTax, setIncludeTax] = useState(false);
  const [isTaxCollector, setIsTaxCollector] = useState(false);

  var chips = [];
  for (let i = 0; i < rebuyCount; i++) {
    chips[i] = i;
  }

  const playerRebuy = () => {
    rebuyCount += 1;
    lastRebuy = Date.now();
    updatePlayerRebuy(playerId, rebuyCount, lastRebuy);
  };

  const showCheckoutForm = () => {
    setCheckoutFormIsOn(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let action = e.target.ownerDocument.activeElement.name;
    if (action === "leave") {
      if (includeTax) {
        updatePlayerCheckout(playerId, finalAmount, taxFee, includeTax, false);
      } else if (isTaxCollector) {
        updatePlayerCheckout(
          playerId,
          finalAmount,
          0,
          includeTax,
          isTaxCollector
        );
      } else {
        updatePlayerCheckout(playerId, finalAmount, 0, includeTax, false);
      }
      setCheckoutFormIsOn(false);
      checkIfAllOut();
    } else {
      setCheckoutFormIsOn(false);
    }
    setFinalAmount("");
    setIncludeTax(false);
    setIsTaxCollector(false);
  };

  return (
    <div className="player-row">
      <div className="row-item player-name">
        {playerName}
        <button className="btn-rebuy" onClick={playerRebuy}>
          <i className="fas fa-redo"></i>
          <span className="tooltip-rebuy">Rebuy</span>
        </button>
      </div>
      <div className="row-item buy-ins">
        Buy In: {minimalBuyIn + minimalBuyIn * rebuyCount}
      </div>
      <div className="row-item">
        {chips.map((chip) => (
          <i key={chip} className="poker-chip-icons" />
        ))}
      </div>
      <div className="row-item">
        Last Rebuy: {lastRebuy && <Moment format="HH:mm">{lastRebuy}</Moment>}
      </div>
      {checkoutFormIsOn ? (
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
                  disabled={
                    finalAmount === "" || finalAmount < 0 ? true : false
                  }
                >
                  <i className="fas fa-check-square check-icon"></i>
                </button>
                <button className="btn-submit stay" type="submit" name="stay">
                  <i className="fas fa-window-close times-icon"></i>
                </button>
              </div>
            </div>
            {taxFee > 0 && (
              <div className="row radios">
                <div className="tax-radios">
                  <input
                    className="tax"
                    type="radio"
                    name="tax"
                    checked={includeTax}
                    onChange={(e) => setIncludeTax(e.target.checked)}
                  />
                  <label className="tax-label-text" htmlFor="tax">
                    Include Tax
                  </label>
                  <input
                    className="collector"
                    type="radio"
                    name="tax"
                    checked={isTaxCollector}
                    onChange={(e) => setIsTaxCollector(e.target.checked)}
                  />
                  <label className="tax-label-text" htmlFor="tax">
                    Tax Collector
                  </label>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="row-item">
          <button className="btn-checkout" onClick={showCheckoutForm}>
            {" "}
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

Player.propTypes = {
  updatePlayerRebuy: PropTypes.func.isRequired,
  updatePlayerCheckout: PropTypes.func.isRequired,
  rebuyCount: PropTypes.number.isRequired,
  minimalBuyIn: PropTypes.number.isRequired,
  taxFee: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  minimalBuyIn: state.table.minimalBuyIn,
  taxFee: state.table.taxFee,
});

export default connect(mapStateToProps, {
  updatePlayerRebuy,
  updatePlayerCheckout,
})(Player);
