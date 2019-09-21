import React from "react";
import constants from "../constants/constants";
import { Input } from "./FormComponents";

const CurrencySelector = ({ initialValue, ...props }) => {
  return (
    <Input {...props} type="select" defaultValue={initialValue || ""}>
      <option disabled value="">
        update
      </option>

      {constants.Currencies.map(c => ({
        label: c,
        value: c
      })).map(({ label, value }, idx) => (
        <option key={`option-${idx}`} value={value}>
          {label}
        </option>
      ))}
    </Input>
  );
};

export default CurrencySelector;
