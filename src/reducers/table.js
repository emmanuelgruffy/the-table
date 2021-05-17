import {
  MINIMAL,
  NEW_PLAYER,
  REBUY_PLAYER,
  UNDO_REBUY_PLAYER,
  CHECKOUT_PLAYER,
  TAX,
  TOTAL_CHIPS,
  NEW_GAME,
} from "../actions/types";

const initialState = {
  taxFee: 0,
  minimalBuyIn: 0,
  totalChips: 0,
  totalPlayersBalance: 0,
  players: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_GAME:
      return {
        taxFee: 0,
        minimalBuyIn: 0,
        totalChips: 0,
        totalPlayersBalance: 0,
        players: [],
      };
    case MINIMAL:
      return {
        ...state,
        minimalBuyIn: payload,
      };
    case TOTAL_CHIPS:
      return {
        ...state,
        totalChips: payload,
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
          state.players[i].rebuyTimes = [
            ...state.players[i].rebuyTimes,
            payload.newRebuyTime,
          ];
          break;
        }
      }
      return {
        ...state,
        players: [...state.players],
      };
    case UNDO_REBUY_PLAYER:
      for (let i = 0; i < state.players.length; i++) {
        if (state.players[i].playerId === payload.playerId) {
          state.players[i].rebuyCount = payload.rebuyCount;
          state.players[i].rebuyTimes = [...payload.updatedRebuyTimes];
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
      state.totalPlayersBalance = state.players.reduce(
        (accumulator, player) => accumulator + player.finalAmount,
        0
      );
      return {
        ...state,
        players: [...state.players],
      };
    default:
      return state;
  }
}
