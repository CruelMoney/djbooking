import React from "react";
import { getData } from "country-list";
import { Input } from "./FormComponents";

function CountrySelector({ initialValue, ...props }) {
  return (
    <Input
      type="select"
      label="Country"
      defaultValue={initialValue || ""}
      {...props}
    >
      <option disabled value="">
        select
      </option>

      {getData().map(({ name, code }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </Input>
  );
}

export default CountrySelector;
