import React, { Fragment, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import {
  updatePlayerRebuy,
  updatePlayerUndoRebuy,
  updatePlayerCheckout,
} from "../actions/table";
import CheckedOutPlayer from "./CheckedOutPlayer";
import CheckoutForm from "./CheckoutForm";
import SetPlayerForm from "./SetPlayerForm";
import "./styles/Player.scss";

const Player = ({
  checkIfAllOut,
  updatePlayerUndoRebuy,
  updatePlayerRebuy,
  minimalBuyIn,
  playerId,
  playerName,
  rebuyTimes,
  rebuyCount,
  isOut,
  submitted,
}) => {
  const [checkoutFormIsOn, setCheckoutFormIsOn] = useState(false);
  const [isLastTwoMinutes, setIsLastTwoMinutes] = useState("");
  const [editPlayerNameOn, setEditPlayerNameOn] = useState(false);
  // const [isTaxCollector, setIsTaxCollector] = useState(false);
  // const [taxCollection, setTaxCollection] = useState("");

  if (rebuyCount) {
    var chips = [];
    for (let i = 0; i < rebuyCount; i++) {
      chips[i] = i;
    }
  }

  let lastRebuy;
  if (rebuyTimes) {
    lastRebuy =
      rebuyTimes.length > 0 ? rebuyTimes[rebuyTimes.length - 1] : null;
  }

  const playerRebuy = () => {
    setIsLastTwoMinutes("-lastTwoMinutes");
    let rebuyAudio = new Audio("/audio/cashmachine.mp3");
    rebuyAudio.play();
    rebuyCount += 1;
    let newRebuyTime = Date.now();
    setTimeout(() => {
      setIsLastTwoMinutes("");
    }, 120000);
    updatePlayerRebuy(playerId, rebuyCount, newRebuyTime);
  };

  const playerUndoRebuy = () => {
    rebuyCount -= 1;
    rebuyTimes.pop();
    let updatedRebuyTimes = rebuyTimes;
    updatePlayerUndoRebuy(playerId, rebuyCount, updatedRebuyTimes);
  };

  const showCheckoutForm = () => {
    setCheckoutFormIsOn(true);
  };

  return (
    <Fragment>
      {isOut ? (
        <CheckedOutPlayer
          chips={chips}
          buyIns={minimalBuyIn + minimalBuyIn * rebuyCount}
          lastRebuy={lastRebuy}
          playerName={playerName}
          playerId={playerId}
        />
      ) : (
        <div className="player-row">
          <div className="row-item player-name">
            {editPlayerNameOn ? (
              <SetPlayerForm
                editMode={true}
                setEditPlayerNameOn={setEditPlayerNameOn}
                playerId={playerId}
                submitted={() => submitted()}
              />
            ) : (
              <>
                {playerName}
                <button
                  className="btn-edit-name"
                  onClick={() => setEditPlayerNameOn(true)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </>
            )}
          </div>
          <div className="row-item buy-ins">
            <button className="btn-rebuy" onClick={playerRebuy}>
              <i class="fas fa-redo"></i>
            </button>

            <div>{minimalBuyIn + minimalBuyIn * rebuyCount}</div>
          </div>
          <div className="row-item-chips">
            <i className="poker-chip chip-icon-1" />
            {chips &&
              chips.map((chip, index, arr) =>
                index < arr.length - 1 ? (
                  <i
                    key={chip} // 0 -> 2 1 -> 3 2 -> 4 3 -> 5 4 -> 6 5 -> 7
                    className={`poker-chip chip-icon-${(index + 2) % 6}`}
                  />
                ) : (
                  <i
                    key={chip}
                    className={`poker-chip${isLastTwoMinutes} chip-icon-${
                      (index + 2) % 6
                    }`}
                  />
                )
              )}
            {rebuyCount > 0 ? (
              <span>
                <button className="btn-undo" onClick={playerUndoRebuy}>
                  <i className="fas fa-undo"></i>
                </button>
              </span>
            ) : (
              <span>
                <button className="btn-undo-hidden">
                  <i className="fas fa-undo"></i>
                </button>
              </span>
            )}
          </div>
          {/*<div className="row-item-undo">
            {rebuyCount > 0 ? (
              <button className="btn-undo" onClick={playerUndoRebuy}>
                <i className="fas fa-undo"></i>
              </button>
            ) : (
              <button className="btn-undo-hidden">
                <i className="fas fa-undo"></i>
              </button>
            )}
          </div>*/}
          <div className="row-item last-rebuy">
            {lastRebuy && <Moment format="HH:mm">{lastRebuy}</Moment>}
          </div>
          {checkoutFormIsOn ? (
            <Fragment>
              <CheckoutForm
                playerId={playerId}
                setCheckoutFormIsOn={setCheckoutFormIsOn}
              />
            </Fragment>
          ) : (
            <div className="row-item checkout">
              <button className="btn-checkout" onClick={showCheckoutForm}>
                {" "}
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

Player.propTypes = {
  updatePlayerRebuy: PropTypes.func.isRequired,
  updatePlayerUndoRebuy: PropTypes.func.isRequired,
  updatePlayerCheckout: PropTypes.func.isRequired,
  minimalBuyIn: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  minimalBuyIn: state.table.minimalBuyIn,
});

export default connect(mapStateToProps, {
  updatePlayerRebuy,
  updatePlayerUndoRebuy,
  updatePlayerCheckout,
})(Player);

{
  /*{taxFee > 0 && (*/
}
{
  /*<div className="column checkboxes">
                    <div className="tax-checkboxes">
                      <input
                        className="tax"
                        type="checkbox"
                        name="tax"
                        checked={includeTax}
                        onChange={(e) => setIncludeTax(e.target.checked)}
                      />
                      <label className="tax-label-text" htmlFor="tax">
                        Include Tax
                      </label>
                      <input
                        className="collector"
                        type="checkbox"
                        name="tax"
                        checked={isTaxCollector}
                        onChange={(e) => setIsTaxCollector(e.target.checked)}
                      />
                      <label className="tax-label-text" htmlFor="tax">
                        Tax Collector
                      </label>
                    </div>
                    {isTaxCollector && (
                      <div className="tax-collector-input">
                        <input
                          type="number"
                          name="collection"
                          min="0"
                          value={taxCollection < 0 ? "" : taxCollection}
                          onChange={(e) => {
                            if (e.target.value === "" || e.target.value === NaN) {
                              setTaxCollection(-1);
                            } else {
                              setTaxCollection(parseInt(e.target.value));
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>*/
}
{
  /*)}*/
}
