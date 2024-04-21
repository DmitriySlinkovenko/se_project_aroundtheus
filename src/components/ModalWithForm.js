import Modal from "../components/Modal";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._modalForm = this._modalElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._modalElement.querySelectorAll(".form__input");
    this._submitButton = this._modalForm.querySelector(".form__save-button");
  }

  _getInputValues() {
    const inputData = {};
    this._inputList.forEach(({ name, value }) => {
      inputData[name] = value;
    });
    return inputData;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
