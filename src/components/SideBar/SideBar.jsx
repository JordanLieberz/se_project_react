import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sidebar__username">User name</p>
    </div>
  );
}

export default SideBar;
