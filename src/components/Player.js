import React from 'react';
import PropTypes from 'prop-types';

const Player = props => {
    return (
        <div className='player-row'>
            <div>Player Name</div>
            <div>re-buy button</div>
            <div>buy-in number</div>
            <div>chips to represent buy-ins</div>
            <div>last re-buy time</div>
            <div>checkout button</div>
        </div>
    )
}

Player.propTypes = {

}

export default Player;
