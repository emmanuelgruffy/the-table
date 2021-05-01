import { MINIMAL, NEW_PLAYER } from '../actions/types';

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
            }    
        default:
            return state;   
    };
};