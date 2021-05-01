import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import { setPlayer } from '../actions/table';
import SetPlayer from './SetPlayer';
import Player from './Player';


const Table = ({ players, minimalBuyIn }) => {

    const [newPlayerButton, setNewPlayerButton] = useState(false);
    let totalBuyIns = 0;
    if (players.length > 0) {
        totalBuyIns = players.reduce((accumulator, player) => (accumulator + player.buyIns), 0);
    }
    let totalChips = totalBuyIns * minimalBuyIn;
    return (
        <div className='table'>
            <div className='navbar-container'>
                <div className='navbar-section start'>
                    <div className='nav-item chips'>Total Chips: {totalChips}</div> 
                    <div className='nav-item buys'>Total Buy-In: {totalBuyIns}</div> 
                </div>
                <div className='navbar-section end'>
                    <div className='nav-item'>
                        <button className='btn-end-game'>End Game</button>
                    </div>
                </div>
            </div>
            <section className='content'>
                {players.map(({ playerName, buyIns, lastRebuy }, index) =>
                    <Player
                        key={index}
                        playerId={index}
                        playerName={playerName}
                        buyIns={buyIns}
                        lastRebuy={lastRebuy}
                    />
                )}
                {newPlayerButton ? (
                    <Fragment>
                        <SetPlayer submitted={() => setNewPlayerButton(false)} />
                        <button className='btn-add-player-disabled' disabled><i className="fas fa-user-plus"></i></button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button className='btn-add-player' onClick={() => setNewPlayerButton('true')}><i className="fas fa-user-plus"></i></button>
                    </Fragment>
                )}
            </section>
        </div>
    )
}

Table.propTypes = {
    setPlayer: PropTypes.func.isRequired,
    minimalBuyIn: PropTypes.number.isRequired,
    players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    minimalBuyIn: state.table.minimalBuyIn,
    players: state.table.players
})

export default connect(mapStateToProps, { setPlayer })(Table);
