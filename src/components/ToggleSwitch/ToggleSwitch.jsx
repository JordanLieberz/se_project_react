import React, { useContext, useState } from "react";

import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  // const [currentTemperatureUnit, handleToggleSwitchChange] = useState("F");

  // const handleChange = (e) => {
  //   if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  //   if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  // };
  // console.log(currentTemperatureUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  console.log(currentTemperatureUnit);

  return (
    <label className="switch">
      <input
        className="switch__box"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-f"
            : "switch__slider switch__slider-c"
        }
      ></span>
      <p
        className={`switch-temp-c ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
      <p
        className={`switch-temp-f ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
    </label>
  );
};

export default ToggleSwitch;
