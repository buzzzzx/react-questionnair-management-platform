import React from "react";
import { Rate } from "antd";

export const Pin = ({ checked, disabled, onCheckedChange }) => {
  return (
    <Rate
      value={checked === 2 ? 1 : 0}
      count={1}
      onChange={(num) => onCheckedChange?.(!!num)}
      disabled={disabled}
    />
  );
};
