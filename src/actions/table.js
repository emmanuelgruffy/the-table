import {
  NEW_GAME,
  MINIMAL,
  NEW_PLAYER,
  REBUY_PLAYER,
  UNDO_REBUY_PLAYER,
  CHECKOUT_PLAYER,
  TOTAL_CHIPS,
  TAX,
  UPDATE_TRANSACTIONS,
  REMOVE_PLAYERS,
  UPDATE_WINNER_BALANCE,
  UPDATE_DEBTOR_BALANCE,
} from "./types";
import { v4 as uuidv4 } from "uuid";

export const startNewGame = () => (dispatch) => {
  try {
    dispatch({
      type: NEW_GAME,
      payload: {},
    });
  } catch (error) {
    console.log(error);
  }
};

export const setMinimal = (sum) => (dispatch) => {
  try {
    dispatch({
      type: MINIMAL,
      payload: sum,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setTaxFee = (taxValue) => (dispatch) => {
  try {
    dispatch({
      type: TAX,
      payload: taxValue,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setPlayer = (playerName) => (dispatch) => {
  const id = uuidv4();
  let newPlayer = {
    playerName: playerName,
    playerId: id,
    rebuyCount: 0,
    rebuyTimes: [],
    isOut: false,
    includeTax: false,
    finalAmount: 0,
    isTaxCollector: false,
  };
  try {
    dispatch({
      type: NEW_PLAYER,
      payload: newPlayer,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setTotalChips = (totalChips) => (dispatch) => {
  try {
    dispatch({
      type: TOTAL_CHIPS,
      payload: totalChips,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePlayerRebuy = (playerId, rebuyCount, newRebuyTime) => (
  dispatch
) => {
  let update = {
    playerId: playerId,
    rebuyCount: rebuyCount,
    newRebuyTime: newRebuyTime,
  };
  try {
    dispatch({
      type: REBUY_PLAYER,
      payload: update,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePlayerUndoRebuy = (
  playerId,
  rebuyCount,
  updatedRebuyTimes
) => (dispatch) => {
  let update = {
    playerId: playerId,
    rebuyCount: rebuyCount,
    updatedRebuyTimes: updatedRebuyTimes,
  };
  try {
    dispatch({
      type: UNDO_REBUY_PLAYER,
      payload: update,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePlayerCheckout = (playerId, finalAmount) => (dispatch) => {
  let update = {
    playerId: playerId,
    isOut: true,
    finalAmount: finalAmount,
  };
  try {
    dispatch({
      type: CHECKOUT_PLAYER,
      payload: update,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateDebtorsAndWinner = (debtorsAndWinnerArray) => (dispatch) => {
  let debtAndWin = [];
  let winnerBalance = debtorsAndWinnerArray[0].balance;
  // we know for sure that the winner is in place 0 - because we sorted it before
  for (let i = 1; i < debtorsAndWinnerArray.length; i++) {
    winnerBalance += debtorsAndWinnerArray[i].balance;
    const transaction = {
      debtor: debtorsAndWinnerArray[i].playerName,
      creditor: debtorsAndWinnerArray[0].playerName,
      sum: -1 * Number(debtorsAndWinnerArray[i].balance), //because the looser sum will always be negative
    };
    debtAndWin.push(transaction);
  }
  if (winnerBalance === 0) {
    try {
      dispatch({
        type: UPDATE_TRANSACTIONS,
        payload: debtAndWin,
      });
      dispatch({
        type: REMOVE_PLAYERS,
        payload: debtorsAndWinnerArray,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    let winnerToUpdate = debtorsAndWinnerArray.shift();
    try {
      dispatch({
        type: UPDATE_TRANSACTIONS,
        payload: debtAndWin,
      });
      dispatch({
        type: REMOVE_PLAYERS,
        payload: debtorsAndWinnerArray, //this will remove all players except the first one - as we shifted them out (line 164).
      });
      dispatch({
        type: UPDATE_WINNER_BALANCE,
        payload: {
          winnerBalance: winnerBalance,
          winner: winnerToUpdate.playerName,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  //if balance is not 0 - meaning the debtors do not cover the full debt - so the winner must not be removed from
  //players list for now.
};

export const updateWinnersAndDebtor = (winnersAndDebtorArray) => (dispatch) => {
  let debtAndWin = [];
  let debtorBalance =
    winnersAndDebtorArray[winnersAndDebtorArray.length - 1].balance; //the debtor is on the last place of the array, as it is sorted.

  for (let i = 0; i < winnersAndDebtorArray.length - 1; i++) {
    //we know starts at position '0' and continue untill one position before last one, which is the debtor.
    debtorBalance += winnersAndDebtorArray[i].balance;
    const transaction = {
      debtor:
        winnersAndDebtorArray[winnersAndDebtorArray.length - 1].playerName,
      creditor: winnersAndDebtorArray[i].playerName,
      sum: winnersAndDebtorArray[i].balance, // here the balance is positive, hence we do not multiply by -1.
    };
    debtAndWin.push(transaction);
  }
  if (debtorBalance === 0) {
    try {
      dispatch({
        type: UPDATE_TRANSACTIONS,
        payload: debtAndWin,
      });
      dispatch({
        type: REMOVE_PLAYERS,
        payload: winnersAndDebtorArray,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    let debtorToUpdte = winnersAndDebtorArray.pop(); // we know remove the last item - as debtor is last.
    try {
      dispatch({
        type: UPDATE_TRANSACTIONS,
        payload: debtAndWin,
      });
      dispatch({
        type: REMOVE_PLAYERS,
        payload: winnersAndDebtorArray, //this will remove all players except the last one - as we shifted them out (line 216).
      });
      dispatch({
        type: UPDATE_DEBTOR_BALANCE,
        payload: {
          debtorBalance: debtorBalance,
          debtor: debtorToUpdte.playerName,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};
