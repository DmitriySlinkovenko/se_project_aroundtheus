class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__remove-button");
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
