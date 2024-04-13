export const initialCards = [
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

//Buttons
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const addNewCardButton = document.querySelector(".profile__add-button");

// Inputs
export const modalTitle = document.querySelector("#input__title");
export const modalSubtitle = document.querySelector("#input__subtitle");
export const imageTitle = document.querySelector("#input__image_title");
export const imageLink = document.querySelector("#input__image_link");

// Elements

export const cardElements = document.querySelector(".elements");

// Form submits
export const profileFormSubmit = document.querySelector(
  "#profile-submit__form"
);
export const imageSubmitForm = document.querySelector("#image-submit__form");
// Form Validation
export const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};
