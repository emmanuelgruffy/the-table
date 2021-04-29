import { MINIMAL } from '../actions/types';

const initialState = {
    minimalBuyIn: null,
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
        default:
            return state;   
    };
};