import React from "react";
import PropTypes from "prop-types";

const TransactionBasic = ({ debtor, creditor, sum }) => {
  return (
    <div>
      <h1>
        {debtor} --> {creditor} ::: {sum}
      </h1>
    </div>
  );
};

export default TransactionBasic;
