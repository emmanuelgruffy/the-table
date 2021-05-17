import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import CheckoutForm from "./CheckoutForm";

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
        {chips.map((chip) => (
          <i key={chip} className="poker-chip-icons-transparent" />
        ))}
      </div>
      <div className="row-item-grayedOut">
        Last Rebuy: {lastRebuy && <Moment format="HH:mm">{lastRebuy}</Moment>}
      </div>
      <div className="row-item-grayedOut final">
        Final Result: {player[0].balance}
      </div>
      {checkoutFormIsOn ? (
        <CheckoutForm
          playerId={playerId}
          setCheckoutFormIsOn={setCheckoutFormIsOn}
        />
      ) : (
        <Fragment>
          <button
            className="btn-edit-final"
            onClick={() => setCheckoutFormIsOn(true)}
          >
            <i className="fas fa-edit"></i>
            <span className="tooltip-edit-final">Edit</span>
          </button>
        </Fragment>
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
