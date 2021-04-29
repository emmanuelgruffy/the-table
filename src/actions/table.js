import { MINIMAL } from './types';

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
}