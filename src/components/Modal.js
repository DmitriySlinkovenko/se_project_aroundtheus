export default class Modal {
  constructor(modal) {
    this._modalElement = document.querySelector(modal);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const button = this._modalElement.querySelector(".modal__close-button");
    button.addEventListener("click", () => {
      this.close();
    });
    this._modalElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }
}
