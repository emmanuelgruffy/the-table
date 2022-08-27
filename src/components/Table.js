import React, { useState, useEffect, Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTotalChips, setMinimal, setResultsList } from "../actions/table";
import SetPlayer from "./SetPlayer";
import Player from "./Player";
import "./styles/Table.scss";

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
  let totalBuyIns = 0; // total at stake
  if (players.length > 0) {
    totalBuyIns = players.reduce(
      (accumulator, player) => accumulator + player.rebuyCount + 1,
      0
    );
  }
  let totalChips = totalBuyIns * minimalBuyIn; // Chips
  let [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    setTotalChips(totalChips);
    checkIfAllOut();
  });

  useEffect(() => {
    setInterval(() => setCurrentTime(Date.now()), 1000);
  }, []);

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

  return (
    <>
      {allOut && totalPlayersBalance !== 0 && (
        <div className="warning-popup">
          <p>Current balance is {totalPlayersBalance}. Must be 0.</p>
        </div>
      )}
      <div className="table-page-section">
        <div className="navbar-container">
          <div className="navbar-section end">
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
        <section className="table-content">
          <div className="table-players-content">
            <div className="players-header">
              <div className="ph item-pl">Player</div>
              <div className="ph item-as">At stake</div>
              <div className="ph item-bi">Buy ins</div>
              <div className="ph item-lb">Last buy</div>
            </div>
            <hr className="players-header-underline" />
            <div className="players-content">
              {players.map(
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
              )}
              {/* DISABLING SORTING .sort((p1, p2) => p2.props.rebuyCount - p1.props.rebuyCount) */}
            </div>
            <div>
              {newPlayerButton ? (
                <Fragment>
                  <SetPlayer
                    submitted={() => {
                      setNewPlayerButton(false);
                      setAllout(false);
                    }}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <button
                    className="btn-add-player"
                    onClick={() => setNewPlayerButton("true")}
                  >
                    +
                  </button>
                </Fragment>
              )}
            </div>
          </div>
          <div className="table-stats-content">
            <div className="ts item-t">Time:</div>
            <div className="ts-box ts-first">
              <h4 className="ts-box-value">
                <Moment format="HH:mm">{currentTime}</Moment>
              </h4>
            </div>
            <div className="ts item-a">Total buy ins:</div>
            <div className="ts-box">
              <h4 className="ts-box-value">{totalBuyIns}</h4>
            </div>
            <div className="ts item-c">Chips:</div>
            <div className="ts-box">
              <h4 className="ts-box-value">{totalChips}$</h4>
            </div>
          </div>
        </section>
      </div>
    </>
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
