import {
  NEW_GAME,
  MINIMAL,
  NEW_PLAYER,
  REBUY_PLAYER,
  UNDO_REBUY_PLAYER,
  CHECKOUT_PLAYER,
  TOTAL_CHIPS,
  TAX,
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
