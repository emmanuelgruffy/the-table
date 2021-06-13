import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTotalChips } from "../actions/table";
import SetPlayer from "./SetPlayer";
import Player from "./Player";

const Table = ({
  players,
  minimalBuyIn,
  history,
  setTotalChips,
  totalPlayersBalance,
}) => {
  let totalBuyIns = 0;
  if (players.length > 0) {
    totalBuyIns = players.reduce(
      (accumulator, player) => accumulator + player.rebuyCount + 1,
      0
    );
  }
  let totalChips = totalBuyIns * minimalBuyIn;

  useEffect(() => {
    setTotalChips(totalChips);
    checkIfAllOut();
  });

  const [newPlayerButton, setNewPlayerButton] = useState(false);
  const [allOut, setAllout] = useState(false);

  const checkIfAllOut = () => {
    const playersInTheTable = players.filter((player) => !player.isOut);
    if (playersInTheTable.length === 0 && players.length > 0) {
      setAllout(true);
    }
  };

  const handleClick = () => {
    history.push("/end-game");
  };

  //TODO: show current time

  return (
    <div className="table">
      <div className="navbar-container">
        <div className="navbar-section start">
          <div className="nav-item chips">Total Chips: {totalChips}</div>
          <div className="nav-item buys">Total Buy-In: {totalBuyIns}</div>
        </div>
        <div className="navbar-section end">
          <div className="nav-item">
            {allOut && totalPlayersBalance === totalChips ? (
              <button className="btn-end-game-on" onClick={handleClick}>
                End Game
              </button>
            ) : (
              <button className="btn-end-game-off" disabled>
                End Game
              </button>
            )}
          </div>
        </div>
      </div>
      {allOut && totalPlayersBalance !== totalChips && (
        <div className="warning-popup">
          <p>
            Current balance is {totalPlayersBalance - totalChips}. Must be 0.
          </p>
        </div>
      )}
      <section className="content">
        {players.map(
          ({ playerId, rebuyCount, playerName, rebuyTimes, isOut }, index) => (
            <Player
              key={index}
              playerId={playerId}
              playerName={playerName}
              rebuyTimes={rebuyTimes}
              rebuyCount={rebuyCount}
              isOut={isOut}
              checkIfAllOut={checkIfAllOut}
            />
          )
        )}
        {newPlayerButton ? (
          <Fragment>
            <SetPlayer
              submitted={() => {
                setNewPlayerButton(false);
                setAllout(false);
              }}
            />
            <button className="btn-add-player-disabled" disabled>
              <i className="fas fa-user-plus"></i>
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button
              className="btn-add-player"
              onClick={() => setNewPlayerButton("true")}
            >
              <i className="fas fa-user-plus"></i>
            </button>
          </Fragment>
        )}
      </section>
    </div>
  );
};

Table.propTypes = {
  minimalBuyIn: PropTypes.number.isRequired,
  players: PropTypes.array.isRequired,
  setTotalChips: PropTypes.func.isRequired,
  totalPlayersBalance: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  minimalBuyIn: state.table.minimalBuyIn,
  players: state.table.players,
  totalPlayersBalance: state.table.totalPlayersBalance,
});

export default connect(mapStateToProps, { setTotalChips })(Table);
