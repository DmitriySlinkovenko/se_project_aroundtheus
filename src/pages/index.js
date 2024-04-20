import FormValidator from "../components/FormValidator.js";
import Card from "../components/card.js";
import "./index.css";
import * as constants from "../utils/constants.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import Api from "../components/Api.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";

// User Info
const user = new UserInfo({
  profileName: ".profile__title",
  profileDescription: ".profile__subtitle",
  profileAvatar: ".profile__avatar",
});

// API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6e2733e6-8f97-40f4-b18f-c832cf63bc4b",
    "Content-Type": "application/json",
  },
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
  profileEditModal.setInputValues(userInfo);
  profileFormValidator.resetValidation();
});

function handleProfileFormSubmit({ name, about }) {
  profileEditModal.setLoading(true);
  api
    .updateUserProfile({ name, about })
    .then(() => {
      user.setUserInfo({ name, about });
    })
    .finally(() => {
      profileEditModal.setLoading(false);
      profileEditModal.close();
    });
}

//User avatar
const avatarEditModal = new ModalWithForm(
  "#avatar-change-modal",
  handleAvatarSubmit
);
avatarEditModal.setEventListeners();
constants.userAvatarButton.addEventListener("click", () => {
  avatarEditModal.open();
});

function handleAvatarSubmit({ link }) {
  avatarEditModal.setLoading(true);
  api
    .updateAvatar({ link })
    .then(() => {
      user.setAvatar(link);
    })
    .finally(() => {
      avatarEditModal.setLoading(false);
      avatarEditModal.close();
    });
}

api.getUserInfo().then((data) => {
  user.setUserInfo(data);
  user.setAvatar(data.avatar);
});

// Add new card modal
const addNewCardModal = new ModalWithForm(
  "#add-card__modal",
  handleImageSubmit
);

addNewCardModal.setEventListeners();
constants.addNewCardButton.addEventListener("click", () => {
  addNewCardModal.open();
});

function handleImageSubmit(card) {
  addNewCardModal.setLoading(true, "Saving...");
  api
    .addCard(card)
    .then(() => {
      renderCard(card);
    })
    .finally(() => {
      addNewCardModal.setLoading(false);
      constants.imageSubmitForm.reset();
      addImageFormValidator.resetValidation();
      addNewCardModal.close();
    });
}

//Card like && dislike

function likeButton(id) {
  api.getInitialCards().then((data) =>
    data.forEach((d) => {
      if (d._id === id) {
        if (d.isLiked === true) {
          api.dislikeCard(id);
        } else {
          api.likeCard(id);
        }
      }
    })
  );
}

//Delete card confirmation modal

const confirmationModal = new ModalWithConfirmation(
  "#verification-modal",
  handleDeleteCardForm
);
confirmationModal.setEventListeners();

function handleDeleteCardForm(id, element) {
  confirmationModal.open();
  constants.deleteConfirmForm.addEventListener("submit", () => {
    confirmationModal.setLoading(true, "Deleting...");
    api
      .deleteCard(id)
      .then(() => element.remove())
      .finally(() => confirmationModal.setLoading(false));
  });
}

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

api.getInitialCards().then((cards) => {
  cards.forEach((card) => {
    renderCard(card);
  });
});

// Functions
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCardForm,
    likeButton
  );
  return card.generateCard();
}

function renderCard(data) {
  const card = createCard(data);
  cardSection.addItem(card);
  if (data.isLiked) {
    card
      .querySelector(".card__like-button")
      .classList.add("card__like-button_active");
  }
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
const avatarFormValidator = new FormValidator(
  constants.settings,
  constants.avatarSubmitForm
);
profileFormValidator.enableValidation();
addImageFormValidator.enableValidation();
avatarFormValidator.enableValidation();
