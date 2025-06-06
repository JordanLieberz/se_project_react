import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isOpen,
  onSubmit,
  handleRegisterModal,
  handleLoginModal,
  EditProfileModal,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          {activeModal === "Log-in" && (
            <button
              type="submit"
              className="modal__signin-btn"
              onClick={handleRegisterModal}
            >
              or Sign Up
            </button>
          )}
          {activeModal === "Sign up" && (
            <button
              type="submit"
              className="modal__signin-btn"
              onClick={handleLoginModal}
            >
              or Log In
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
