import { MINIMAL, NEW_PLAYER, REBUY_PLAYER, CHECKOUT_PLAYER } from './types';
import { v4 as uuidv4 } from 'uuid';

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
    const id = uuidv4();
    let newPlayer = {
        playerName: playerName,
        playerId: id,
        rebuyCount: 0,
        lastRebuy: null,
        isOut: false,
        finalAmount: 0
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

export const updatePlayerRebuy = (playerId, rebuyCount, lastRebuy) => dispatch => {
    let update = {
        playerId: playerId,
        rebuyCount: rebuyCount,
        lastRebuy: lastRebuy
    }
    try {
        dispatch({
            type: REBUY_PLAYER,
            payload: update
        })
    } catch (error) {
        console.log(error);
    }
}

export const updatePlayerCheckout = (playerId, finalAmount) => dispatch => {
    let update = {
        playerId: playerId,
        isOut: true,
        finalAmount: finalAmount
    }
    try {
        dispatch({
            type: CHECKOUT_PLAYER,
            payload: update
        })
    } catch (error) {
        console.log(error);
    }
}