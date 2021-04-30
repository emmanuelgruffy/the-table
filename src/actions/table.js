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

export const setPlayer = ({ playerName, rebuyCount, lastRebuy, isOut}) => dispatch => {
    let newPlayer = {
        playerName: playerName,
        rebuyCount: rebuyCount,
        lastRebuy: lastRebuy,
        isOut: isOut
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