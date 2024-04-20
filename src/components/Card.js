class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleDeleteButton,
    handleLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._id = data._id;
    this._handleLike = handleLike;
    this._isLiked = false;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__remove-button");
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("card__like-button_active")) {
        this._handleLike(this.getId());
        this._likeButton.classList.remove("card__like-button_active");
      } else {
        this._likeButton.classList.add("card__like-button_active");
        this._handleLike(this.getId());
      }
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this.getId(), this._element);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  getId() {
    return this._id;
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
