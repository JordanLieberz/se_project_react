import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Profile from "../Profile/Profile";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  postItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { register, login, getUserData, updateUserData } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedButton, setSelectedButton] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // ─── Auth Functions ──────────────────────────────────────────────────────────
  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => login({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return getUserData(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsRegisterModalOpen(false);
      })
      .catch((err) => {
        console.error("Registration/Login error:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          return getUserData(res.token);
        } else {
          return Promise.reject("No token received");
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoginModalOpen(false);
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);

    updateUserData({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileModalOpen(false);
      })
      .catch((err) => {
        console.error("Update profile error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleButtonClick = (evt) => {
    setSelectedButton(evt.target.value);
  };

  const handleAddItemSubmit = (newItem) => {
    setClothingItems([newItem, ...clothingItems]);
  };
  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((id) => id === currentUser._id);

    (!isLiked ? addCardLike(_id, token) : removeCardLike(_id, token))
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Like/Dislike error:", err));
  };

  const closeActiveModal = () => {
    setActiveModal("");
    if (activeModal === "add-garment") {
      setSelectedButton("");
    }
  };

  const onAddItem = (newItem) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);

    postItems(newItem, token)
      .then((res) => {
        handleAddItemSubmit(res);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = () => {
    const token = localStorage.getItem("jwt");

    deleteItems(selectedCard._id, token)
      .then(() => {
        const newItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(newItems);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  // ─── useEffect Hooks ────────────────────────────────────────────────────────
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token invalid:", err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleDelete={handleDelete}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    handleDelete={handleDelete}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleEditProfileClick={() =>
                      setIsEditProfileModalOpen(true)
                    }
                    onSignOut={handleLogout}
                  />
                }
              />
            </Routes>
          </div>

          {activeModal === "add-garment" && (
            <AddItemModal
              closeActiveModal={closeActiveModal}
              buttonText={isLoading ? "Saving..." : "Add garment"}
              selectedButton={selectedButton}
              isOpen={activeModal === "add-garment"}
              handleButtonClick={handleButtonClick}
              onAddItem={onAddItem}
            />
          )}

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDelete={handleDelete}
          />

          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <RegisterModal
            isOpen={isRegisterModalOpen}
            activeModal="register"
            closeActiveModal={() => setIsRegisterModalOpen(false)}
            handleButtonClick={() => {}}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            activeModal="login"
            closeActiveModal={() => setIsLoginModalOpen(false)}
            handleButtonClick={() => {}}
            onLogin={handleLogin}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>

      <Footer />
    </div>
  );
}

export default App;
