import avatar from "../../assets/avatar.png";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  weatherData,
  handleAddClick,
  onSignOut,
  activeModal,
  handleEditProfileClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button onClick={handleEditProfileClick} className="profile__edit-btn">
          Change profile data
        </button>
        <button onClick={onSignOut} className="profile__signout-btn">
          Log out
        </button>
        {activeModal === "Edit Profile" && (
          <button
            type="submit"
            className="modal__signin-btn"
            onClick={EditProfileModal}
          ></button>
        )}
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          weatherData={weatherData}
        />
      </section>
    </div>
  );
}

export default Profile;
