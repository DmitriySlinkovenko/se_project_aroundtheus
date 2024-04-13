import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._imageElement = this._modalElement.querySelector(
      ".modal__card-preview_image"
    );
    this._imageTitle = this._modalElement.querySelector(
      ".modal__preview_heading"
    );
  }

  open(data) {
    this._imageElement.src = data.link;
    this._imageTitle.textContent = data.name;
    this._imageElement.alt = data.name;
    super.open();
  }
}
