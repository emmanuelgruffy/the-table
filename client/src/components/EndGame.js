import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateDebtorsAndWinner,
  updateWinnersAndDebtor,
} from "../actions/table";
import * as $C from "js-combinatorics";
import Transaction from "./Transaction";
import ResultItem from "./ResultItem";

const EndGame = ({
  players,
  updateDebtorsAndWinner,
  updateWinnersAndDebtor,
  resultsList,
  transactions,
}) => {
  useEffect(() => {
    const filteredArray = players.filter(
      (player) => player.balance > 0 || player.balance < 0
    );
    const reducedFilteredArray = [];
    for (let i = 0; i < filteredArray.length; i++) {
      const reducedPlayer = {};
      reducedPlayer.playerName = filteredArray[i].playerName;
      reducedPlayer.balance = filteredArray[i].balance;
      reducedFilteredArray.push(reducedPlayer);
    }
    const arr = [];
    for (let i = 2; i <= reducedFilteredArray.length; i++) {
      let bit = new $C.Combination(reducedFilteredArray, i);
      for (const elem of bit) {
        arr.push(sortCombElem(elem));
      }
    }

    let combinationArray = [...arr];

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

    if (validatedResultsGroups.length > 0) {
      const firstDebtors = showFirstDebtors(
        sortValidated(validatedResultsGroups)
      );
      if (firstDebtors[1].balance < 0) {
        /* there are two types of arrays - one winner and many loosers, or one looser and many winners.
      so if index 1 has a looser - we know for sure there is only one winner - but if index 1 contains a winner - we know for sure there are many winners
      */
        updateDebtorsAndWinner(firstDebtors);
      } else {
        updateWinnersAndDebtor(firstDebtors);
      }
    }

    function sortCombElem(elem) {
      const sortedComb = elem.sort((arr1, arr2) => {
        return arr2.balance - arr1.balance;
      });
      return sortedComb;
    }

    function calcArrayBalanceSum(arr) {
      let arrSum = 0;
      for (let i = 0; i < arr.length; i++) {
        arrSum += arr[i].balance;
      }
      return arrSum;
    }

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

    function showFirstDebtors(sortedValidated) {
      let minBalance = calcArrayBalanceSum(sortedValidated[0]);
      let maxSizeArray = 0;
      let indexOfMax = 0;
      if (sortedValidated.length === 1) {
        return sortedValidated[0];
      }
      for (let i = 1; i < sortedValidated.length; i++) {
        if (
          calcArrayBalanceSum(sortedValidated[i]) === minBalance &&
          sortedValidated[i].length > maxSizeArray
        ) {
          maxSizeArray = sortedValidated[i].length;
          indexOfMax = i;
        } else if (calcArrayBalanceSum(sortedValidated[i]) !== minBalance) {
          return sortedValidated[indexOfMax];
          //update obj with the debtors and creditor of sortedValidated[indexOfMax];
        }
      }
    }

    //DONE:
    //groups with sum 0 => perfect - calculate debtors and winner from that and remove players from results
    // recalculate valid groups (now without above groups)
    // repeat... untill results array is empty.
  }, [players]);

  const copyResultsToClipboard = () => {
    let resultString = "";
    let transactionString = "";

    for (let i = 0; i < resultsList.length; i++) {
      resultString += `${resultsList[i].playerName}: ${resultsList[i].balancedFinalResult}\n`;
    }
    for (let i = 0; i < transactions.length; i++) {
      transactionString += `${transactions[i].debtor} --> ${transactions[i].creditor} :: ${transactions[i].sum}\n`;
    }
    window.navigator.clipboard.writeText(
      resultString + "\n" + transactionString
    );
  };

  return (
    <div className="end-game page-section">
      <div className="end-game-header">
        <button className="btn-clipboard" onClick={copyResultsToClipboard}>
          Copy results to clipboard
        </button>
      </div>
      <div className="end-game-content">
        <h1 className="end-game-title">Good game everyone!</h1>
        {transactions !== undefined && (
          <Fragment>
            <div>
              {resultsList
                .sort((a, b) => {
                  return b.balancedFinalResult - a.balancedFinalResult;
                })
                .map(({ playerName, balancedFinalResult }, index) => (
                  <ResultItem
                    key={index}
                    place={index + 1}
                    playerName={playerName}
                    balancedFinalResult={balancedFinalResult}
                  />
                ))}
            </div>
            <div></div>
            <h3 className="end-game-sub-title">Time to pay your debts...</h3>
            <div>
              {transactions.map(({ debtor, creditor, sum }, index) => (
                <Transaction
                  key={index}
                  debtor={debtor}
                  creditor={creditor}
                  sum={sum}
                />
              ))}
            </div>
          </Fragment>
        )}
      </div>
      <div className="finish-game">
        <Link to="/">Exit</Link>
      </div>
    </div>
  );
};

EndGame.propTypes = {
  players: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  updateDebtorsAndWinner: PropTypes.func.isRequired,
  updateWinnersAndDebtor: PropTypes.func.isRequired,
  resultsList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.table.players,
  transactions: state.table.transactions,
  resultsList: state.table.resultsList,
});

export default connect(mapStateToProps, {
  updateDebtorsAndWinner,
  updateWinnersAndDebtor,
})(EndGame);
