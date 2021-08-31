import {
  MINIMAL,
  NEW_PLAYER,
  EDIT_PLAYER,
  REBUY_PLAYER,
  UNDO_REBUY_PLAYER,
  CHECKOUT_PLAYER,
  TAX,
  TOTAL_CHIPS,
  NEW_GAME,
  SET_RESULTS,
  UPDATE_TRANSACTIONS,
  REMOVE_PLAYERS,
  UPDATE_WINNER_BALANCE,
  UPDATE_DEBTOR_BALANCE,
} from "../actions/types";

const initialState = {
  taxFee: 0,
  minimalBuyIn: 0,
  totalChips: 0,
  totalPlayersBalance: 0,
  players: [],
  resultsList: [],
  transactions: [],
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
        resultsList: [],
        transactions: [],
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
    case EDIT_PLAYER:
      for (let i = 0; i < state.players.length; i++) {
        if (payload.playerId === state.players[i].playerId) {
          state.players[i].playerName = payload.playerName;
          break;
        }
      }
      return {
        ...state,
        players: [...state.players],
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
          //state.players[i].includeTax = payload.includeTax;
          //state.players[i].isTaxCollector = payload.isTaxCollector;
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
    case SET_RESULTS:
      for (let i = state.resultsList.length; i < state.players.length; i++) {
        let resultItem = {
          playerName: state.players[i].playerName,
          balancedFinalResult: state.players[i].balance,
        };
        state.resultsList.push(resultItem);
      }
      return { ...state };
    case UPDATE_TRANSACTIONS:
      return {
        ...state,
        transactions: [...state.transactions, ...payload],
      };
    case REMOVE_PLAYERS:
      return {
        ...state,
        players: [
          ...state.players.filter((player) => {
            let count = 0;
            //we want to return only players that were not found in the player list so
            // return false if count > 0 meaning player was found in the player list, true otherwise
            for (let i = 0; i < payload.length; i++) {
              if (payload[i].playerName === player.playerName) {
                count++;
              }
            }
            return count === 0;
          }),
        ],
      };
    case UPDATE_WINNER_BALANCE:
      for (let i = 0; i < state.players.length; i++) {
        if (payload.winner === state.players[i].playerName) {
          state.players[i].balance = payload.winnerBalance;
        }
      }
      return {
        ...state,
        players: [...state.players],
      };
    case UPDATE_DEBTOR_BALANCE:
      for (let i = 0; i < state.players.length; i++) {
        if (payload.debtor === state.players[i].playerName) {
          state.players[i].balance = payload.debtorBalance;
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
