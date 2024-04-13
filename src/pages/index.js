import FormValidator from "../components/FormValidator.js";
import Card from "../components/card.js";
import "./index.css";
import * as constants from "../utils/constants.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";

// User Info
const user = new UserInfo({
  profileName: ".profile__title",
  profileDescription: ".profile__subtitle",
});

//Image Preview
const imagePreview = new ModalWithImage("#preview-image-modal");
imagePreview.setEventListeners();
const handleImageClick = (name, link) => {
  imagePreview.open({ name, link });
};

// Edit profile modal
const profileEditModal = new ModalWithForm(
  "#edit__modal",
  handleProfileFormSubmit
);
profileEditModal.setEventListeners();
constants.profileEditButton.addEventListener("click", () => {
  profileEditModal.open();
  const userInfo = user.getUserInfo();
  constants.modalTitle.value = userInfo.name;
  constants.modalSubtitle.value = userInfo.description;
  profileFormValidator.resetValidation();
});

function handleProfileFormSubmit({ name, description }) {
  user.setUserInfo({ name, description });
}

// Add new card modal
const addNewCardModal = new ModalWithForm("#add-card__modal", () => {
  const name = constants.imageTitle.value;
  const link = constants.imageLink.value;
  addNewCardModal.close();
  renderCard({ name, link });
  constants.imageSubmitForm.reset();
  addImageFormValidator.resetValidation();
});

addNewCardModal.setEventListeners();
constants.addNewCardButton.addEventListener("click", () => {
  addNewCardModal.open();
});

//Section
const cardSection = new Section(
  {
    items: constants.initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

cardSection.renderItems();

// Functions
function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
}

function renderCard(data) {
  const card = createCard(data);
  constants.cardElements.prepend(card);
}

// Form Validation

const profileFormValidator = new FormValidator(
  constants.settings,
  constants.profileFormSubmit
);
const addImageFormValidator = new FormValidator(
  constants.settings,
  constants.imageSubmitForm
);
profileFormValidator.enableValidation();
addImageFormValidator.enableValidation();
