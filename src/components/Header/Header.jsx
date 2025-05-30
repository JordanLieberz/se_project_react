import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // If no avatar, show first letter of user's name in a circle
  const renderAvatar = () => {
    if (currentUser && currentUser.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    } else if (currentUser && currentUser.name) {
      return (
        <div className="header__avatar-placeholder">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">
            {currentUser && currentUser.name ? currentUser.name : "Guest"}
          </p>
          {renderAvatar()}
        </div>
      </Link>
    </header>
  );
}

export default Header;
