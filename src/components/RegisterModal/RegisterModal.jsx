import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { register } from "../../utils/auth";

const RegisterModal = ({
  isOpen,
  activeModal,
  closeActiveModal,
  handleButtonClick,
  handleLoginModal,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData)
      .then((res) => {
        console.log("Registered:", res);
        closeActiveModal();
      })
      .catch(console.error);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      buttonText="Sign up"
      activeModal={activeModal}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      handleButtonClick={handleButtonClick}
      handleLoginModal={handleLoginModal}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </label>

      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="text"
          className="modal__input"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="Avatar link"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
