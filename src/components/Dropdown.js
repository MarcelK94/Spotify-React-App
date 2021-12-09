import React from "react";
import Select from "react-select";

export const Dropdown = ({ options, selectOption, loading }) => {
  return (
    <Select
      options={options}
      onChange={({ value }) => selectOption(value)}
      isLoading={loading}
      />
  )
}
