import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPlayer } from '../actions/table';
import SetPlayer from './SetPlayer';
import Player from './Player';



const Table = ({ players, minimalBuyIn }) => {

    const [newPlayerButton, setNewPlayerButton] = useState(false);
    const [allOut, setAllout] = useState(false);

    const checkIfAllOut = () => {
        const playersInTheTable = players.filter(player => !player.isOut);
        if (playersInTheTable.length === 0 && players.length > 0) {
            setAllout(true);
        }
    }

    let totalBuyIns = 0;
    if (players.length > 0) {
        totalBuyIns = players.reduce((accumulator, player) => (accumulator + player.rebuyCount + 1), 0);
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
                        {allOut ?
                            (<button className='btn-end-game-on'>End Game</button>)
                            :
                            (<button className='btn-end-game-off' disabled>End Game</button>)
                        }
                    </div>
                </div>
            </div>
            <section className='content'>
                {players.filter(player => !player.isOut).map(({ playerId, rebuyCount, playerName, lastRebuy, isOut }, index) =>
                    <Player
                        key={index}
                        playerId={playerId}
                        playerName={playerName}
                        lastRebuy={lastRebuy}
                        rebuyCount={rebuyCount}
                        isOut={isOut}
                        checkIfAllOut={checkIfAllOut}
                    />
                )}
                {newPlayerButton ? (
                    <Fragment>
                        <SetPlayer submitted={() => {
                            setNewPlayerButton(false);
                            setAllout(false);
                            }} 
                            />
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
