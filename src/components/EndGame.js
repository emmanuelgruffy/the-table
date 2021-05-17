import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as $C from "js-combinatorics/combinatorics";

const EndGame = ({ players }) => {
  const winnersArray = players.filter((player) => player.balance > 0);
  const losersArray = players.filter((player) => player.balance < 0);

  const filteredArray = players.filter(
    (player) => player.balance > 0 || player.balance < 0
  );

  const combinationArray = [];

  for (let i = 2; i <= filteredArray.length; i++) {
    let it = new $C.Combination(filteredArray, i);
    for (let elem of it) {
      combinationArray.push(elem);
    }
  }

  let validatedResultsGroups = combinationArray.filter((arr) => {
    let countL = 0,
      countW = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].balance > 0) {
        countW++;
      }
      if (arr[i].balance < 0) {
        countL++;
      }
    }
    return (countW === 1 && countL > 0) || (countW > 0 && countL === 1);
  });

  //TODO: sort all valid groups by the players sums ascending (smallest to largest).
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
