import "../pages/index.css";
import regeneratorRuntime from "../../node_modules/regenerator-runtime";
import "regenerator-runtime/runtime.js";
import {
  configValidation,
  cardSelector,
  addCardBtn,
  popupAddCard,
  aboutInput,
  nameInput,
  editBtn,
  popupEditProfile,
  avatarEditBtn,
  popupEditAvatar,
  popupEditAvatarSaveBtn,
  popupEditProfileSaveBtn,
  popupAddCardSaveBtn,
  popupDeleteCardSaveBtn,
  cardWithoutBinSelector,
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import { data, info } from "autoprefixer";

//Валидация форм
const popupEditProfileValidation = new FormValidator(
  configValidation,
  popupEditProfile
);
popupEditProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(
  configValidation,
  popupAddCard
);
popupAddCardValidation.enableValidation();

const popupEditAvatarValidation = new FormValidator(
  configValidation,
  popupEditAvatar
);
popupEditAvatarValidation.enableValidation();

//попап редактирования профиля
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

function formEditProfileInputsValue() {
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;
}
const api = new Api({
  address: "https://mesto.nomoreparties.co",
  token: "7a45c432-7073-4f3b-9cf1-c12940fb64b9",
});

//берем с сервера инфо пользователя
let userId = null;
api
  .getUserData()
  .then((info) => {
    userInfo.setUserInfo(info.name, info.about, info._id);
    userInfo.setUserAvatar(info.avatar);
    userId = userInfo.getUserInfo().userId;
  })
  .catch((err) => console.log(err));

//изменяем и отправляем данные пользователя на сервер
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup-edit-profile",
  handleFormSubmit: (formData) => {
    api
      .setUserData(formData)
      .then(() => {
        userInfo.setUserInfo(formData.name, formData.about);
        popupWithFormEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditProfileSaveBtn.value = "Сохранение...";
      });
  },
});
popupWithFormEditProfile.setEventListeners();

editBtn.addEventListener("click", handlePopupOpenEditProfile); //Открыть редактирование профиля
function handlePopupOpenEditProfile() {
  popupEditProfileValidation.resetInputError();
  formEditProfileInputsValue();
  popupEditProfileSaveBtn.value = "Сохранить";

  popupWithFormEditProfile.open();
}

//редактирование аватара
const popupWithFormEditAvatar = new PopupWithForm({
  popupSelector: ".popup-edit-avatar",
  handleFormSubmit: (formData) => {
    api
      .setUserAvatar(formData.avatar)
      .then(() => {
        userInfo.setUserAvatar(formData.avatar);
        popupWithFormEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditAvatarSaveBtn.value = "Сохранение...";
      });
  },
});
popupWithFormEditAvatar.setEventListeners();

avatarEditBtn.addEventListener("click", handlePopupOpenEditAvatar);

function handlePopupOpenEditAvatar() {
  popupEditAvatarValidation.resetInputError();
  popupEditAvatarSaveBtn.value = "Сохранить";
  popupWithFormEditAvatar.open();
}

//попап добавления карточки
//отправляем карточку на сервер
const popupWithFormAddCard = new PopupWithForm({
  popupSelector: ".popup-add-card",
  handleFormSubmit: (formData) => {
    api
      .addNewCard(formData)
      .then((response) => {
        const generateCard = createCard(response, cardSelector, userId);
        cardList.addItem(generateCard);
        popupWithFormAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddCardSaveBtn.value = "Создание...";
      });
  },
});

popupWithFormAddCard.setEventListeners();

addCardBtn.addEventListener("click", handlePopupOpenAddCard); //Открыть редактирование профиля
function handlePopupOpenAddCard() {
  popupAddCardValidation.resetInputError();
  popupAddCardSaveBtn.value = "Создать";
  popupWithFormAddCard.open();
}

//попап удаления карточки
let cardToDelete = null;
const popupWithFormDeleteCard = new PopupWithForm({
  popupSelector: ".popup-delete-card",
  handleFormSubmit: () => {
    api
      .deleteCard(cardToDelete.getCardId())
      .then(() => {
        cardToDelete.getCardElement().remove();
        cardToDelete = null;
        popupWithFormDeleteCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupDeleteCardSaveBtn.value = "Удаление...";
      });
  },
});
popupWithFormDeleteCard.setEventListeners();

//Попап картинки
const popupZoomCard = new PopupWithImage(".popup-zoom-img");
popupZoomCard.setEventListeners();

//Про отрисовку карточек
function createCard(cardData, cardSelector) {
  const card = new Card(
    cardData,
    cardSelector,
    popupZoomCard.open.bind(popupZoomCard),
    {
      handleRemoveClick: () => {
        cardToDelete = card;
        popupDeleteCardSaveBtn.value = "Да";
        popupWithFormDeleteCard.open();
      },
    },
    {
      handleLikeClick: () => {
        if (card.isLiked(userId) === true) {
          api
            .deleteCardLike(card.getCardId())
            .then((response) => {
              card.setCardLikes(response.likes);
              card.removeLike();
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addCardLike(card.getCardId())
            .then((response) => {
              card.setCardLikes(response.likes);
              card.setLike();
            })
            .catch((err) => console.log(err));
        }
      },
    }
  );
  return card.generateCard(userId);
}

let cardList = null;
//берем с сервера карточки
function drawCardsFromServer() {
  api
    .getInitialCards()
    .then((initialCards) => {
      initialCards.reverse();
      cardList = new Section(
        {
          data: initialCards,
          renderer: (item) => {
            let generateCard = null;
            if (item.owner._id === userId) {
              generateCard = createCard(item, cardSelector);
              cardList.addItem(generateCard);
            } else {
              generateCard = createCard(item, cardWithoutBinSelector);
              cardList.addItem(generateCard);
            }
          },
        },
        ".cards"
      );
      cardList.renderItems();
    })
    .catch((err) => console.log(err));
}

drawCardsFromServer();
