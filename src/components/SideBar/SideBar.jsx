import React, { useContext } from "react";
import avatarPlaceholder from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || avatarPlaceholder}
        alt="User Avatar"
      />
      <p className="sidebar__username">{currentUser?.name || "Username"}</p>
    </div>
  );
}

export default SideBar;
