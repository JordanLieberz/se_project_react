import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  activeModal,
  closeActiveModal,
  onAddItem,
  isOpen,
  handleButtonClick,
}) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setLink] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setLink(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const resetForm = () => {
    setName("");
    setUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl: link, weather }, resetForm);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      handleButtonClick={handleButtonClick}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
          />{" "}
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
          />{" "}
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
          />{" "}
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
