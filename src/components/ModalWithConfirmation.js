import Modal from "../components/Modal";

export default class ModalWithConfirmation extends Modal {
  constructor(modalSelector, handleCardDelete) {
    super(modalSelector);
    this._modalForm = this._modalElement.querySelector(".form");
    this._handleCardDelete = handleCardDelete;
    this._submitButton = this._modalForm.querySelector(".form__save-button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("submit", () => {
      console.log("hello world");
    });
  }

  setLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = "Save";
    }
  }
}
