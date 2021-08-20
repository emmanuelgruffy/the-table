import {
  NEW_GAME,
  MINIMAL,
  NEW_PLAYER,
  REBUY_PLAYER,
  UNDO_REBUY_PLAYER,
  CHECKOUT_PLAYER,
  TOTAL_CHIPS,
  TAX,
  SET_RESULTS,
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

export const setResultsList = () => (dispatch) => {
  try {
    dispatch({
      type: SET_RESULTS,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateDebtorsAndWinner = (debtorsAndWinnerArray) => (dispatch) => {
  let debtAndWin = [];
  let winnerBalance = debtorsAndWinnerArray[0].balance;
  let leftoverDebtor = false;
  // we know for sure that the winner is in place 0 - because we sorted it before
  for (let i = 1; i < debtorsAndWinnerArray.length; i++) {
    if (winnerBalance >= -1 * debtorsAndWinnerArray[i].balance) {
      const transaction = {
        debtor: debtorsAndWinnerArray[i].playerName,
        creditor: debtorsAndWinnerArray[0].playerName,
        sum: -1 * Number(debtorsAndWinnerArray[i].balance), //because the looser sum will always be negative
      };
      debtAndWin.push(transaction);
      winnerBalance += debtorsAndWinnerArray[i].balance; //after transaction is done - we update winnerBalance
    } else {
      // if winnerBalance is lower than debtor absolute value
      const transaction = {
        debtor: debtorsAndWinnerArray[i].playerName,
        creditor: debtorsAndWinnerArray[0].playerName,
        sum: winnerBalance, // - then the sum of debt has to be the winner balance.
      };
      debtAndWin.push(transaction);
      debtorsAndWinnerArray[i].balance += winnerBalance; //we update the debtor as they paid only part of the sum
      winnerBalance = 0; // and we set the winner balance to '0'
      leftoverDebtor = true; //a flag to know whether or not the last debtor still has debt.
    }
  }
  if (winnerBalance === 0) {
    if (!leftoverDebtor) {
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
      // we need to remove all players except the last debtor who still ows money.
      let debtorToUpdte = debtorsAndWinnerArray.pop();
      try {
        dispatch({
          type: UPDATE_TRANSACTIONS,
          payload: debtAndWin,
        });
        dispatch({
          type: REMOVE_PLAYERS,
          payload: debtorsAndWinnerArray, //remember the array is now missing the final debtor
        });
        dispatch({
          type: UPDATE_DEBTOR_BALANCE,
          payload: {
            debtorBalance: debtorToUpdte.balance,
            debtor: debtorToUpdte.playerName,
          },
        });
      } catch (error) {
        console.log(error);
      }
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
  //raz: 153 dedi: 83 dan: 72 damian: -294 || damian => 153 => raz
  //raz: 0 dedi: 83 dan: 72 damian: -141 || damian => 83 => dedi
  //raz: 0 dedi: 0 dan: 72 damian: -58 || damian => 58 => dan
  //raz: 0 dedi: 0 dan: 14 damian: 0
  let debtAndWin = [];
  let debtorBalance =
    winnersAndDebtorArray[winnersAndDebtorArray.length - 1].balance; //the debtor is on the last place of the array, as it is sorted.
  let leftoverWinner = false;
  for (let i = 0; i < winnersAndDebtorArray.length - 1; i++) {
    //we now starts at position '0' and continue untill one position before last one, which is the debtor.
    if (winnersAndDebtorArray[i].balance <= -1 * debtorBalance) {
      console.log(
        winnersAndDebtorArray[i].playerName,
        winnersAndDebtorArray[i].balance
      );
      const transaction = {
        debtor:
          winnersAndDebtorArray[winnersAndDebtorArray.length - 1].playerName,
        creditor: winnersAndDebtorArray[i].playerName,
        sum: winnersAndDebtorArray[i].balance, // here the balance is positive, hence we do not multiply by -1.
      };
      debtAndWin.push(transaction);
      debtorBalance += winnersAndDebtorArray[i].balance; //we update the debtor balance.
    } else {
      //the situation is that we have a winner with leftover.
      const transaction = {
        debtor:
          winnersAndDebtorArray[winnersAndDebtorArray.length - 1].playerName,
        creditor: winnersAndDebtorArray[i].playerName,
        sum: -1 * debtorBalance, // the sum is what the debtor can pay.
      };
      debtAndWin.push(transaction);
      winnersAndDebtorArray[i].balance += debtorBalance;
      debtorBalance = 0;
      leftoverWinner = true;
    }
  }
  if (debtorBalance === 0) {
    if (!leftoverWinner) {
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
      let winnerToUpdate = winnersAndDebtorArray.splice(
        winnersAndDebtorArray.length - 2,
        1
      )[0]; //the leftover winner is always one before the last one (the debtor), also the return of splice is an array so we need to extract the value out of it, hence [0]
      try {
        dispatch({
          type: UPDATE_TRANSACTIONS,
          payload: debtAndWin,
        });
        dispatch({
          type: REMOVE_PLAYERS,
          payload: winnersAndDebtorArray,
        });
        dispatch({
          type: UPDATE_WINNER_BALANCE,
          payload: {
            winnerBalance: winnerToUpdate.balance,
            winner: winnerToUpdate.playerName,
          },
        });
      } catch (error) {
        console.log(error);
      }
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
