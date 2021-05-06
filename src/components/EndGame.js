import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const EndGame = ({ players }) => {
    return (
        <div>
            ENDGAME
        </div>
    )
}

EndGame.propTypes = {
    players: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    players: state.table.players
})

export default connect(mapStateToProps)(EndGame);
