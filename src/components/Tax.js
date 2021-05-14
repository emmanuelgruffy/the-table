import React from "react";
import PropTypes from "prop-types";

// TODO: make screen to define who bought what for the game and who owes who money for this

const Tax = (props) => {
  return (
    <div>
      Set Tax collectors and debtors
      {/* TODO:form with text input and '+' button to define a tax
                        once tax added - a list of all players appear to be able to decide which player participate in this tax
                        as: debtor or collector.
                        each tax is a column with two buttons - 'to pay' 'to collect' 
                        pressing 'to collect' propmps an input number element with 'V' and 'X' - button is editable
            */}
    </div>
  );
};

Tax.propTypes = {};

export default Tax;
