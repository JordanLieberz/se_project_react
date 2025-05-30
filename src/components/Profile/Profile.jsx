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
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          weatherData={weatherData}
        />

        {/* Sign out button */}
        <button onClick={onSignOut} className="profile__signout-button">
          Sign out
        </button>
      </section>
    </div>
  );
}

export default Profile;
