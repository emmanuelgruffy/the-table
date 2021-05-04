import { MINIMAL, NEW_PLAYER, REBUY_PLAYER, CHECKOUT_PLAYER } from '../actions/types';

const initialState = {
    minimalBuyIn: 0,
    players: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case MINIMAL:
            return {
                ...state,
                minimalBuyIn: payload
            };
        case NEW_PLAYER:
            return {
                ...state,
                players: [...state.players, payload]
            };
        case REBUY_PLAYER:
            for (let i = 0; i < state.players.length; i++){
                if (state.players[i].playerId === payload.playerId) {
                    state.players[i].rebuyCount = payload.rebuyCount;
                    state.players[i].lastRebuy = payload.lastRebuy;
                    break;
                }
            }
            return {
                ...state,
                players: [...state.players]
            };
        case CHECKOUT_PLAYER:
            for (let i = 0; i < state.players.length; i++){
                if (state.players[i].playerId === payload.playerId) {
                    state.players[i].isOut = payload.isOut;
                    state.players[i].finalAmount = payload.finalAmount;
                    break;
                }
            }
            return {
                ...state,
                players: [...state.players]
            }           
        default:
            return state;   
    };
};