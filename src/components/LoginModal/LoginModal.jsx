import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import { login } from "../../utils/auth";

const LoginModal = ({
  isOpen,
  activeModal,
  closeActiveModal,
  handleButtonClick,
  onLogin,
  handleRegisterModal,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(formData);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log in"
      buttonText="Log in"
      activeModal={activeModal}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      handleButtonClick={handleButtonClick}
      handleRegisterModal={handleRegisterModal}
    >
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
    </ModalWithForm>
  );
};

export default LoginModal;
