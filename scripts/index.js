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
const cardTemplate =
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

// Form submits
const formSubmit = profileEditModal.querySelector(".form");
const imageSubmitForm = addNewCardModal.querySelector(".form");

// Functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__remove-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    openModal(imagePreviewModal);
    imagePreviewTitle.textContent = cardTitle.textContent;
    cardImagePreview.alt = data.name;
    cardImagePreview.src = data.link;
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
}

function addNewCard(evt) {
  evt.preventDefault();
  const name = imageTitle.value;
  const link = imageLink.value;
  renderCard({ name, link });
  closeModal(addNewCardModal);
}

function renderCard(data) {
  const cardElement = getCardElement(data);
  cardElements.prepend(cardElement);
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  modalTitle.value = profileName.textContent;
  modalSubtitle.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));
closeNewCardModal.addEventListener("click", () => closeModal(addNewCardModal));
formSubmit.addEventListener("submit", submitProfileData);
imageSubmitForm.addEventListener("submit", addNewCard);
closeImagePreview.addEventListener("click", () =>
  closeModal(imagePreviewModal)
);

initialCards.forEach((data) => renderCard(data));
