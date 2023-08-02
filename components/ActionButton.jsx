"use client";
import { useState } from "react";
import Tooltip from "./Tooltip";

const ActionButton = ({ button, row }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && <Tooltip title={button.title} />}
      <button onClick={() => button.onClick(row)} className="mr-2 ">
        {button.label}
      </button>
    </div>
  );
};

export default ActionButton;
