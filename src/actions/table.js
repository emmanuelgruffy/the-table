import {
  MINIMAL,
  NEW_PLAYER,
  REBUY_PLAYER,
  CHECKOUT_PLAYER,
  TAX,
} from "./types";
import { v4 as uuidv4 } from "uuid";

// initiate minimal buy-in:
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
    lastRebuy: null,
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

export const updatePlayerRebuy = (playerId, rebuyCount, lastRebuy) => (
  dispatch
) => {
  let update = {
    playerId: playerId,
    rebuyCount: rebuyCount,
    lastRebuy: lastRebuy,
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

export const updatePlayerCheckout = (
  playerId,
  finalAmount,
  taxFee,
  includeTax,
  isTaxCollector
) => (dispatch) => {
  if (isTaxCollector) {
  }
  let update = {
    playerId: playerId,
    isOut: true,
    finalAmount: finalAmount, // TODO: - separate taxFee from finalAmount
    includeTax: includeTax,
    isTaxCollector: isTaxCollector,
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
