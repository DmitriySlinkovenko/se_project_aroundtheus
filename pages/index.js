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
const addNewCardModal = document.querySelector("#add-card__modal");
const imagePreviewModal = document.querySelector("#preview-image-modal");

//Buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

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

// Form submits
const profileFormSubmit = document.querySelector("#profile-submit__form");
const imageSubmitForm = document.querySelector("#image-submit__form");

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
  addImageFormValidator.resetValidation();
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
}

function renderCard(data) {
  const card = createCard(data);
  cardElements.prepend(card);
}

function setProfileValues() {
  modalTitle.value = profileName.textContent;
  modalSubtitle.value = profileDescription.textContent;
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  setProfileValues();
  profileFormValidator.resetValidation();
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});

profileFormSubmit.addEventListener("submit", submitProfileData);
imageSubmitForm.addEventListener("submit", addNewCard);

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close-button")) {
      closeModal(modal);
    }
  });
});

initialCards.forEach(renderCard);

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
