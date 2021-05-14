import {
  MINIMAL,
  NEW_PLAYER,
  REBUY_PLAYER,
  CHECKOUT_PLAYER,
  TAX,
} from "../actions/types";

const initialState = {
  taxFee: 0,
  minimalBuyIn: 0,
  players: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MINIMAL:
      return {
        ...state,
        minimalBuyIn: payload,
      };
    case TAX:
      return {
        ...state,
        taxFee: payload,
      };
    case NEW_PLAYER:
      return {
        ...state,
        players: [...state.players, payload],
      };
    case REBUY_PLAYER:
      for (let i = 0; i < state.players.length; i++) {
        if (state.players[i].playerId === payload.playerId) {
          state.players[i].rebuyCount = payload.rebuyCount;
          state.players[i].lastRebuy = payload.lastRebuy;
          break;
        }
      }
      return {
        ...state,
        players: [...state.players],
      };
    case CHECKOUT_PLAYER:
      for (let i = 0; i < state.players.length; i++) {
        if (state.players[i].playerId === payload.playerId) {
          state.players[i].isOut = payload.isOut;
          state.players[i].finalAmount = payload.finalAmount;
          state.players[i].balance =
            payload.finalAmount -
            (state.players[i].rebuyCount + 1) * state.minimalBuyIn;
          state.players[i].includeTax = payload.includeTax;
          state.players[i].isTaxCollector = payload.isTaxCollector;
          break;
        }
      }
      return {
        ...state,
        players: [...state.players],
      };
    default:
      return state;
  }
}
