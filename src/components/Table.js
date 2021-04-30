import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import { setPlayer } from '../actions/table';
import Player from '../components/Player';
import SetPlayer from './SetPlayer';


const Table = props => {
    const [newPlayerButton, setNewPlayerButton] = useState(false);
    return (
        <div className='table'>
            <div className='navbar-container'>
                <div className='navbar-section start'>
                    <div className='nav-item chips'>Total Chips: </div>
                    <div className='nav-item buys'>Total Buy-In: </div>
                </div>
                <div className='navbar-section end'>
                    <div className='nav-item'>
                        <button className='btn-end-game'>End Game</button>
                    </div>
                </div>
            </div>
            <section className='content'>
                <Player />
                {newPlayerButton ? (
                    <Fragment>
                        <SetPlayer />
                        <button className='btn-add-player-disabled' disabled><i class="fas fa-user-plus"></i></button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button className='btn-add-player' onClick={() => setNewPlayerButton('true')}><i class="fas fa-user-plus"></i></button>
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
