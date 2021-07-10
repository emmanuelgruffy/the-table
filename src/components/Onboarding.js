import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setMinimal } from "../actions/table"; //setTaxFee

const Onboarding = ({ history, setMinimal }) => {
  //setTaxFee,
  //  const [taxValue, setTaxValue] = useState("");
  const [buyIn, setBuyIn] = useState("");
  const [onOff, setOnOff] = useState("-off");
  //  const [taxCheck, setTaxCheck] = useState(false);

  const handleChange = (e) => {
    let regex = /^0*$/;
    setBuyIn(parseInt(e.target.value));
    setOnOff("-on");
    if (e.target.value === "" || e.target.value.match(regex)) {
      setOnOff("-off");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMinimal(buyIn);
    //if (taxCheck) {
    //  setTaxFee(taxValue);
    //}
    history.push("/table");
  };

  return (
    <div className="onboarding">
      <form className="onboarding-form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Minimal buy-in:</label>
          <input
            type="number"
            onChange={(e) => handleChange(e)}
            value={buyIn}
          ></input>
          {buyIn ? (
            <button type="submit" className={`btn-onboarding${onOff}`}>
              Play!
            </button>
          ) : (
            <button type="submit" className={`btn-onboarding${onOff}`} disabled>
              Play!
            </button>
          )}
        </div>
        {/*<div className="set-tax">
          <label className="set-tax-label">Set Tax?</label>
          <input
            className="set-tax-input"
            type="number"
            min="0"
            placeholder=" This field is optional"
            onChange={(e) => {
              if (e.target.value !== 0 && e.target.value !== NaN) {
                setTaxCheck(true);
                setTaxValue(parseInt(e.target.value));
              } else {
                setTaxCheck(false);
              }
            }}
            value={taxValue}
          />
        </div>*/}
      </form>
    </div>
  );
};

Onboarding.propTypes = {
  setMinimal: PropTypes.func.isRequired,
  //  setTaxFee: PropTypes.func.isRequired,
};

export default connect(null, { setMinimal })(Onboarding); //setTaxFee
