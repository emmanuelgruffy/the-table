import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import "./styles/Player.scss";

const CheckedOutPlayer = ({
  chips,
  buyIns,
  lastRebuy,
  playerName,
  playerId,
  player,
}) => {
  const [checkoutFormIsOn, setCheckoutFormIsOn] = useState(false);

  return (
    <div className="player-row-grayedOut">
      <div className="row-item-grayedOut player-name">{playerName}</div>
      <div className="row-item-grayedOut buy-ins">Buy In: {buyIns}</div>
      <div className="row-item-grayedOut">
        <i className="poker-chip chip-icon-1" />
        {chips &&
          chips.map((chip, index, arr) =>
            index < arr.length - 1 ? (
              <i
                key={chip} // 0 -> 2 1 -> 3 2 -> 4 3 -> 5 4 -> 6 5 -> 7
                className={`poker-chip chip-icon-${
                  (index + 2) % 6
                } chip-transparent`}
              />
            ) : (
              <i
                key={chip}
                className={`poker-chip chip-icon-${
                  (index + 2) % 6
                } chip-transparent`}
              />
            )
          )}
      </div>
      <div className="row-item-grayedOut">
        Last Rebuy: {lastRebuy && <Moment format="HH:mm">{lastRebuy}</Moment>}
      </div>
      <div className="row-item-grayedOut-final">
        Final Result: {player[0].balance}
      </div>
      {checkoutFormIsOn ? (
        <CheckoutForm
          playerId={playerId}
          setCheckoutFormIsOn={setCheckoutFormIsOn}
          editFinalResult={true}
        />
      ) : (
        <button
          className="btn-edit-final"
          onClick={() => setCheckoutFormIsOn(true)}
        >
          <i className="fas fa-edit"></i>
          <span className="tooltip-edit-final">Edit Final Result</span>
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  player: state.table.players.filter(
    (player) => player.playerId === ownProps.playerId
  ),
});

export default connect(mapStateToProps)(CheckedOutPlayer);
