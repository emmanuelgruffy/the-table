import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPlayer, editPlayer } from "../actions/table";

//helper
import { capitalize } from "../helpers/capitalize";

const SetPlayerForm = ({
  setPlayer,
  editPlayer,
  editMode,
  setEditPlayerNameOn,
  playerId,
  submitted,
}) => {
  let regex = /^\s*$/;

  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      editPlayer(capitalize(playerName), playerId);
      setEditPlayerNameOn(false);
      submitted();
    } else {
      capitalize(playerName);
    }
  };
  return (
    <div className="row-item form-popup-edit">
      <form className="form-popup-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <input
            className="final-amount-input"
            type="text"
            placeholder={editMode ? "Name" : "Player Name"}
            value={playerName}
            onChange={(e) => {
              if (e.target.value === "") {
                setPlayerName("");
              } else {
                setPlayerName(e.target.value);
              }
            }}
          />
          <div className="btns-popup">
            <button
              className="btn-submit leave"
              type="submit"
              name="leave"
              disabled={
                playerName === "" || playerName.match(regex) ? true : false
              }
            >
              <i className="fas fa-check-square check-icon"></i>
            </button>
            <button
              className="btn-submit stay"
              onClick={() => setEditPlayerNameOn(false)}
              name="stay"
            >
              <i className="fas fa-window-close times-icon"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

SetPlayerForm.propTypes = {
  setPlayer: PropTypes.func.isRequired,
  editPlayer: PropTypes.func.isRequired,
};

export default connect(null, { setPlayer, editPlayer })(SetPlayerForm);
