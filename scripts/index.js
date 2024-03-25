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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal");
const profileEditCloseButton = document.querySelector(".modal__close-button");
const modalTitle = document.querySelector("#input__title");
const modalSubtitle = document.querySelector("#input__subtitle");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const saveButton = document.querySelector(".form__save-button");
const cardTemplate = document.querySelector("#card__template").content;
const cardElements = document.querySelector(".elements");
const formSubmit = document.querySelector(".form");

profileEditButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_opened");
  modalTitle.value = profileName.textContent;
  modalSubtitle.value = profileDescription.textContent;
});

profileEditCloseButton.addEventListener("click", closeModal);

formSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = modalTitle.value;
  profileDescription.textContent = modalSubtitle.value;
  closeModal();
});

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  return cardElement;
}

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardElements.append(cardElement);
});
