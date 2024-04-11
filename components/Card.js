class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners(cardElement, cardImage) {
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__remove-button");
    likeButton.addEventListener("click", () =>
      this._handleLikeButton(likeButton)
    );
    deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(cardElement)
    );
    cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleDeleteCard(cardElement) {
    cardElement.remove();
  }

  _handleLikeButton(likeButton) {
    likeButton.classList.toggle("card__like-button_active");
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
    this._setEventListeners(this._element, this._cardImage);
    return this._element;
  }
}

export default Card;
