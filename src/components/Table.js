import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTotalChips, setMinimal, setResultsList } from "../actions/table";
import SetPlayer from "./SetPlayer";
import Player from "./Player";

const Table = ({
  players,
  minimalBuyIn,
  history,
  setTotalChips,
  setMinimal,
  resultsList,
  setResultsList,
  totalPlayersFinalAmount,
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
      if (totalPlayersBalance === 0 && resultsList.length !== players.length) {
        setResultsList(); // only when end-game is enabled -> we copy from players list the playerName and finalAmount of each player and
        //move it onto resultList.
      }
    }
  };

  const handleClick = () => {
    setMinimal(0);
    history.push("/end-game");
  };

  //TODO: show current time

  return (
    <div className="table page-section">
      <div className="navbar-container">
        <div className="navbar-section start">
          <div className="nav-item chips">Total Chips: {totalChips}</div>
          <div className="nav-item buys">Total Buy-In: {totalBuyIns}</div>
        </div>
        <div className="navbar-section end">
          <div className="nav-item">
            {allOut && totalPlayersBalance === 0 ? (
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
      {allOut && totalPlayersBalance !== 0 && (
        <div className="warning-popup">
          <p>Current balance is {totalPlayersBalance}. Must be 0.</p>
        </div>
      )}
      <section className="content">
        {/* TODO: - column headlines*/}
        {players
          .map(
            (
              { playerId, rebuyCount, playerName, rebuyTimes, isOut },
              index
            ) => (
              <Player
                key={index}
                playerId={playerId}
                playerName={playerName}
                rebuyTimes={rebuyTimes}
                rebuyCount={rebuyCount}
                isOut={isOut}
                checkIfAllOut={checkIfAllOut}
                submitted={() => {
                  setNewPlayerButton(false);
                  setAllout(false);
                }}
              />
            )
          )
          .sort((p1, p2) => p2.props.rebuyCount - p1.props.rebuyCount)}
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
  resultsList: PropTypes.array.isRequired,
  setTotalChips: PropTypes.func.isRequired,
  setMinimal: PropTypes.func.isRequired,
  setResultsList: PropTypes.func.isRequired,
  totalPlayersFinalAmount: PropTypes.number.isRequired,
  totalPlayersBalance: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  minimalBuyIn: state.table.minimalBuyIn,
  players: state.table.players,
  totalPlayersFinalAmount: state.table.totalPlayersFinalAmount,
  totalPlayersBalance: state.table.totalPlayersBalance,
  resultsList: state.table.resultsList,
});

export default connect(mapStateToProps, {
  setTotalChips,
  setMinimal,
  setResultsList,
})(Table);
