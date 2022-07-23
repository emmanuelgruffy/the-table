import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { startNewGame } from "../actions/table";
import { connect } from "react-redux";

const Landing = ({ startNewGame, minimalBuyIn }) => {
  return (
    <Fragment>
      <div className="landing page-section">
        <div>
          <Link className={"btn-start link-menu"} to="join-table">
            Join Table{" "}
          </Link>
        </div>
        <Link to="/onboarding">
          <button
            className={`btn-start-static`}
            onClick={() => {
              if (window.localStorage.length > 0) {
                window.localStorage.clear();
                startNewGame();
              }
            }}
          >
            Open New Table{" "}
          </button>
        </Link>
        {minimalBuyIn > 0 && (
          <div className="continue-game">
            <Link to="/table">
              <button className="btn-start">Continue</button>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  startNewGame: PropTypes.func.isRequired,
  minimalBuyIn: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  minimalBuyIn: state.table.minimalBuyIn,
});

export default connect(mapStateToProps, { startNewGame })(Landing);
