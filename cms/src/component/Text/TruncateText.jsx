import React from "react";
import { MAX_VALUE } from "../../utils/validation.js";

const TruncateText = (props) => {
  const { record, property } = props;
  const text = record.params[property.name] || "";
  return (
    <span title={text}>
      {text.length > MAX_VALUE.CHARACTER ? `${text.slice(0, MAX_VALUE.CHARACTER)}...` : text}
    </span>
  );
};

export default TruncateText;
