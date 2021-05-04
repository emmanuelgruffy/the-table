import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { updatePlayerRebuy, updatePlayerCheckout } from '../actions/table';

const Player = ({ checkIfAllOut, updatePlayerCheckout, updatePlayerRebuy, minimalBuyIn, playerId, playerName, lastRebuy, rebuyCount, isOut }) => {

    const [checkoutFormIsOn, setCheckoutFormIsOn] = useState(false);
    const [finalAmount, setFinalAmount] = useState('');

    var chips = [];
    for (let i = 0; i < rebuyCount; i++) {
        chips[i] = '*';
    }

    const playerRebuy = () => {
        rebuyCount += 1;
        lastRebuy = Date.now();
        updatePlayerRebuy(playerId, rebuyCount, lastRebuy);
    }

    const showCheckoutForm = () => {
        setCheckoutFormIsOn(true);
    }

    const handleSubmit = e => {
        e.preventDefault();
        let action = e.target.ownerDocument.activeElement.name;
        if (action === 'leave') {
            updatePlayerCheckout(playerId, finalAmount);
            setCheckoutFormIsOn(false);
            checkIfAllOut();
        } else {
            setCheckoutFormIsOn(false);
        }
    }

    return (
        <div className='player-row'>
            <div className='row-item player-name'>{playerName}
                <button className='btn-rebuy' onClick={playerRebuy}>
                    <i className="fas fa-redo"></i>
                    <span className='tooltip-rebuy'>Rebuy</span>
                </button>
            </div>
            <div className='row-item buy-ins'>Buy In: {minimalBuyIn + (minimalBuyIn * rebuyCount)}</div>
            <div className='row-item'>
                {chips.map(chip => <i className='poker-chip-icons' />)}
            </div>
            <div className='row-item'>Last Rebuy: {lastRebuy && <Moment format="HH:mm">{lastRebuy}</Moment>}</div>
            { checkoutFormIsOn ?
                (
                    <div className='row-item form-popup'>
                        <form className='form-popup-form' onSubmit={e => handleSubmit(e)}>
                            <input
                                type='number'
                                min='0'
                                placeholder='Your final amount'
                                value={finalAmount}
                                onChange={e => setFinalAmount(parseInt(e.target.value))} 
                            />
                            <div className='btns-popup'>
                                <button className='btn-submit leave' type='submit' name='leave'>Submit</button>
                                <button className='btn-submit stay' type='submit' name='stay'>Cancel</button>
                            </div>
                        </form>
                    </div>
                )
                :
                (
                    <div className='row-item'>
                        <button className='btn-checkout' onClick={showCheckoutForm}> Checkout</button>
                    </div>
                )}
        </div>
    )
}

Player.propTypes = {
    updatePlayerRebuy: PropTypes.func.isRequired,
    updatePlayerCheckout: PropTypes.func.isRequired,
    rebuyCount: PropTypes.number.isRequired,
    minimalBuyIn: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    minimalBuyIn: state.table.minimalBuyIn,
})

export default connect(mapStateToProps, { updatePlayerRebuy, updatePlayerCheckout })(Player);
