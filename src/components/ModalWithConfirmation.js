import Modal from "../components/Modal";

export default class ModalWithConfirmation extends Modal {
  constructor(modalSelector, handleCardDelete) {
    super(modalSelector);
    this._handleCardDelete = handleCardDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleCardDelete(this);
      this.close();
    });
  }
}
