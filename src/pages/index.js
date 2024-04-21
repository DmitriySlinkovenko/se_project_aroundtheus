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
      profileEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => profileEditModal.setLoading(false));
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
    .then(() => {
      avatarEditModal.setLoading(false);
      avatarEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

api
  .getUserInfo()
  .then((data) => {
    user.setUserInfo(data);
    user.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.error(err);
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
    .then((res) => {
      renderCard(res);
      constants.imageSubmitForm.reset();
      addImageFormValidator.resetValidation();
      addNewCardModal.close();
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => addNewCardModal.setLoading(false));
}

//Card like && dislike

function likeButton(card) {
  if (card.isLiked()) {
    api
      .dislikeCard(card._id)
      .then((response) => card.setIsLiked(response.isLiked))
      .catch((err) => console.error(err));
  } else {
    api
      .likeCard(card._id)
      .then((response) => card.setIsLiked(response.isLiked))
      .catch((err) => console.error(err));
  }
}

//Delete card confirmation modal

const confirmationModal = new ModalWithConfirmation(
  "#verification-modal",
  handleDeleteCardForm
);
confirmationModal.setEventListeners();

function handleDeleteCardForm(id, element) {
  confirmationModal.open();
  constants.deleteConfirmForm.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmationModal.setLoading(true, "Deleting...");
    api
      .deleteCard(id)
      .then(() => {
        element.remove();
        confirmationModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => confirmationModal.setLoading(false, "Yes"));
  });
}

let cardSection;

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const card = createCard(cardData);
          cardSection.addItem(card);
        },
      },
      ".elements"
    );
    cardSection.renderItems();
  })
  .catch((error) => {
    console.error("Error fetching initial cards", error);
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
