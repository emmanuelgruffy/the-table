import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const EndGame = ({ players }) => {
  const winnersArray = players.filter((player) => player.balance > 0);
  const losersArray = players.filter((player) => player.balance < 0);

  return (
    <div className="end-game">
      <div className="end-game-header">
        <h1 className="end-game-title">GOOD GAME EVERYONE!</h1>
        <h3 className="end-game-sub-title-one">
          Now time to pay your debts...
        </h3>
      </div>
    </div>
  );
};

EndGame.propTypes = {
  players: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  players: state.table.players,
});

export default connect(mapStateToProps)(EndGame);
