import FormValidator from "../components/FormValidator.js";
import Card from "../components/card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Templates and modals
const profileEditModal = document.querySelector("#edit__modal");
const cardTemplateContent =
  document.querySelector(".card__template").content.firstElementChild;
const addNewCardModal = document.querySelector("#add-card__modal");
const imagePreviewModal = document.querySelector("#preview-image-modal");

//Buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);
const createNewCardButton = document.querySelector("#add-card__button");
const closeNewCardModal = addNewCardModal.querySelector(".modal__close-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const saveNewCardButton = document.querySelector(".form__save-button");
const closeImagePreview = imagePreviewModal.querySelector(
  ".modal__close-button"
);

// Inputs
const modalTitle = document.querySelector("#input__title");
const modalSubtitle = document.querySelector("#input__subtitle");
const imageTitle = addNewCardModal.querySelector("#input__image_title");
const imageLink = addNewCardModal.querySelector("#input__image_link");

// Elements
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const cardElements = document.querySelector(".elements");
const imagePreviewTitle = imagePreviewModal.querySelector(
  ".modal__preview_heading"
);
const cardImagePreview = imagePreviewModal.querySelector(
  ".modal__card-preview_image"
);
const cardElement = cardTemplateContent.cloneNode(true);
const cardImage = cardElement.querySelector(".card__image");
const cardTitle = cardElement.querySelector(".card__title");

// Form submits
const profileFormSubmit = profileEditModal.querySelector(".form");
const imageSubmitForm = addNewCardModal.querySelector(".form");

// Functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

const handleImageClick = (name, link) => {
  openModal(imagePreviewModal);
  imagePreviewTitle.textContent = name;
  cardImagePreview.src = link;
  cardImagePreview.alt = name;
};

function getCardElement(data) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__remove-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;

  return cardElement;
}

function submitProfileData(evt) {
  evt.preventDefault();
  profileName.textContent = modalTitle.value;
  profileDescription.textContent = modalSubtitle.value;
  closeModal(profileEditModal);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function addNewCard(evt) {
  evt.preventDefault();
  const name = imageTitle.value;
  const link = imageLink.value;
  renderCard({ name, link });
  closeModal(addNewCardModal);
  evt.target.reset();
}

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  cardElements.prepend(card.generateCard());
}

function closeModalOnClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
}

function setProfileValues() {
  modalTitle.value = profileName.textContent;
  modalSubtitle.value = profileDescription.textContent;
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  setProfileValues();
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModal);
  addImageFormValidator.disableButton();
});
closeNewCardModal.addEventListener("click", () => closeModal(addNewCardModal));
profileFormSubmit.addEventListener("submit", submitProfileData);
imageSubmitForm.addEventListener("submit", addNewCard);
closeImagePreview.addEventListener("click", () =>
  closeModal(imagePreviewModal)
);

profileEditModal.addEventListener("mousedown", closeModalOnClick);
addNewCardModal.addEventListener("mousedown", closeModalOnClick);
imagePreviewModal.addEventListener("mousedown", closeModalOnClick);

initialCards.forEach((data) => renderCard(data));

// Form Validation
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const profileFormValidator = new FormValidator(settings, profileFormSubmit);
const addImageFormValidator = new FormValidator(settings, imageSubmitForm);
profileFormValidator.enableValidation();
addImageFormValidator.enableValidation();
addImageFormValidator.disableButton(
  document.querySelectorAll(settings.inputSelector),
  document.querySelectorAll(settings.submitButtonSelector)
);
