import React, { useState } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Onboarding = props => {

    const [buyIn, setBuyIn] = useState('');
    const [onOff, setOnOff] = useState('-off');

    const handleChange = e => {
        let regex = /^0*$/;
        setBuyIn(e.target.value);
        setOnOff('-on');
        if ((e.target.value === '') || (e.target.value.match(regex))) {
            setOnOff('-off');
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('submitted');
        BrowserRouter.push('/table');
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

}

export default Onboarding;
