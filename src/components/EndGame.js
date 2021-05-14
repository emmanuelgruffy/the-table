import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const EndGame = ({ players }) => {
  const winnersArray = players.filter((player) => player.balance > 0);
  const losersArray = players.filter((player) => player.balance < 0);

  // TODO: form reuslts array which is copy of players.

  // TODO: form all possible groups, i.e (A,B) ... , (A,B,C) .... , etc..
  // do group validation - i.e group that has only one winner, and losers array is > 0.
  // sort all valid groups by the players sums ascending (smallest to largest).

  //groups with sum 0 => perfect - calculate debtors and winner from that and remove players from results
  // recalculate valid groups (now without above groups)
  // repeat... untill results array is empty.

  return (
    <div className="end-game">
      <div className="end-game-header">
        <h1 className="end-game-title">GOOD GAME EVERYONE!</h1>
        <h3 className="end-game-sub-title-one">
          Now time to pay your debts...
        </h3>
      </div>
    </div>
  );
};

EndGame.propTypes = {
  players: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.table.players,
});

export default connect(mapStateToProps)(EndGame);
