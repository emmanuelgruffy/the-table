import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPlayer } from '../actions/table';

const SetPlayer = ({ setPlayer, submitted }) => {

    let regex = /^\s*$/;

    const [playerName, setPlayerName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        setPlayer(playerName);
        submitted();
    }

    return (
        <div>
            <form className='form-submit-player' onSubmit={e => handleSubmit(e)}>
                <input
                    className='input-submit-player'
                    type='text'
                    placeholder='Player Name'
                    value={playerName}
                    onChange={e => setPlayerName(e.target.value)}
                    required
                />{' '}
                {(playerName !== '' && !playerName.match(regex)) ? (
                    <button className='btn-submit-player-on' type='submit'>Create</button>
                ) : (
                    <button className='btn-submit-player-off' type='submit' disabled>Create</button>
                )}      
            </form>
        </div>
    )
}

SetPlayer.propTypes = {
    setPlayer: PropTypes.func.isRequired
}

export default connect(null, { setPlayer })(SetPlayer);
