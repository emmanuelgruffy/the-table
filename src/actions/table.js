import { MINIMAL, NEW_PLAYER } from './types';

// initiate minimal buy-in:
export const setMinimal = (sum) => dispatch => {
    try {
        dispatch({
            type: MINIMAL,
            payload: sum
        });
    } catch (error) {
        console.log(error);
    }
};

export const setPlayer = (playerName) => dispatch => {
    let newPlayer = {
        playerName: playerName,
        rebuyCount: 0,
        buyIns: 1,
        lastRebuy: null,
        isOut: false
    }
    try {
        dispatch({
            type: NEW_PLAYER,
            payload: newPlayer
        })
    } catch (error) {
        console.log(error);
    }
}