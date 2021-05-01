import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Player = ({playerId, playerName, buyIns, lastRebuy, reBuyCounts}) => {

    const chips = () => {
        for (let i = 0; i < reBuyCounts; i++){
            return <i className='poker-chip-icons'></i>
        }
    }

    return (
        <div className='player-row'>
            <div>{playerName}</div>
            <button>Re Buy</button>
            <div>Buy In: {buyIns}</div>
            {chips()}
            <div>{lastRebuy}</div>
            <button>Checkout</button>
        </div>
    )
}

Player.propTypes = {
    reBuyCounts: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    reBuyCounts: state.table.players[ownProps.playerId].rebuyCount
})

export default connect(mapStateToProps, {  })(Player);
