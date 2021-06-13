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

  function calcArrayBalanceSum(arr) {
    let arrSum = 0;
    for (let i = 0; i < arr.length; i++) {
      arrSum += arr[i].balance;
    }
    return arrSum;
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

  function sortValidated(validatedResultsGroups) {
    const sortedValidated = validatedResultsGroups.sort((arr1, arr2) => {
      return (
        Math.abs(calcArrayBalanceSum(arr1)) -
        Math.abs(calcArrayBalanceSum(arr2))
      );
    });
    return sortedValidated;
  }

  //here i'm going to calculate which array to remove from filteredArray before repeating the whole process
  //the array i will remove will be the first debts to creds and will be assigend to a dedicated obj variable and updated in the redux store

  showFirstDebtors(sortValidated(validatedResultsGroups));

  function showFirstDebtors(sortedValidated) {
    let minBalance = calcArrayBalanceSum(sortedValidated[0]);
    let maxSizeArray = 0;
    let indexOfMax = -1;
    for (let i = 1; i < sortedValidated.length; i++) {
      if (
        calcArrayBalanceSum(sortedValidated[i]) === minBalance &&
        sortedValidated[i].length > maxSizeArray
      ) {
        maxSizeArray = sortedValidated[i].length;
        indexOfMax = i;
      } else if (calcArrayBalanceSum(sortedValidated[i]) !== minBalance) {
        console.log(sortedValidated[indexOfMax]);
        //update obj with the debtors and creditor of sortedValidated[indexOfMax];
      }
    }
  }

  /*
  const debts = [
    {
      debtors: ["p1"],
    },
    {
      debtors: ["p1", "p2"],
    },
    {
      debtors: ["p4", "p5"],
    },
  ];

  const beneficiers = [
    {
      beneficier: ["p3"],
    },
    {
      debtors: ["p1", "p2"],
    },
    {
      debtors: ["p4", "p5"],
    },
  ];
  */

  //TODO:
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
