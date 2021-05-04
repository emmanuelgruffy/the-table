import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setMinimal } from '../actions/table';

const Onboarding = ({history, setMinimal}) => {

    const [buyIn, setBuyIn] = useState('');
    const [onOff, setOnOff] = useState('-off');

    const handleChange = e => {
        let regex = /^0*$/;
        setBuyIn(parseInt(e.target.value));
        setOnOff('-on');
        if ((e.target.value === '') || (e.target.value.match(regex))) {
            setOnOff('-off');
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(typeof(buyIn));
        setMinimal(buyIn);
        history.push('/table');
    }

    return (
        <div className='onboarding'>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <label>Minimal buy-in:</label>
                <input type='number' onChange={(e) => handleChange(e)} value={buyIn}></input>
                {buyIn ? (
                    <button type='submit' className={`btn-onboarding${onOff}`}>Play!</button>
                ) : (
                    <button type='submit' className={`btn-onboarding${onOff}`} disabled>Play!</button>
                )}          
            </form>
        </div>
    )
}

Onboarding.propTypes = {
    setMinimal: PropTypes.func.isRequired
}

export default connect(null, { setMinimal })(Onboarding);
