import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPlayer, editPlayer } from "../actions/table";

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
      let action = e.target.ownerDocument.activeElement.name;
      if (action === "leave") {
        console.log("i was clicked");

        editPlayer(playerName, playerId);
        setEditPlayerNameOn(false);
        submitted();
      } else {
        setEditPlayerNameOn(false);
      }
    } else {
      let action = e.target.ownerDocument.activeElement.name;
      if (action === "leave") {
        setPlayer(playerName);
      }
    }
  };
  return (
    <div className="row-item form-popup-edit">
      <form className="form-popup-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <input
            className="final-amount-input"
            type="text"
            placeholder="Player Name"
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
            <button className="btn-submit stay" type="submit" name="stay">
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
