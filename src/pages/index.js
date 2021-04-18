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
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

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
popupAddCardValidation.enableValidation();

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

//изменяем и отправляем данные пользователя на сервер
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup-edit-profile",
  handleFormSubmit: (formData) => {
    api
      .setUserData(formData)
      .then(() => {
        userInfo.setUserInfo(formData.name, formData.about);
      })
      .catch((err) => console.log(err));
    popupWithFormEditProfile.close();
  },
});
popupWithFormEditProfile.setEventListeners();

editBtn.addEventListener("click", handlePopupOpenEditProfile); //Открыть редактирование профиля
function handlePopupOpenEditProfile() {
  popupEditProfileValidation.resetInputError();
  formEditProfileInputsValue();

  popupWithFormEditProfile.open();
}

const popupWithFormEditAvatar = new PopupWithForm({
  popupSelector: ".popup-edit-avatar",
  handleFormSubmit: () => {
    popupWithFormEditAvatar.close();
  },
});
popupWithFormEditAvatar.setEventListeners();

avatarEditBtn.addEventListener("click", handlePopupOpenEditAvatar);

function handlePopupOpenEditAvatar() {
  popupEditAvatarValidation.resetInputError();
  popupWithFormEditAvatar.open();
}

//попап добавления карточки
//отправляем карточку на сервер
const popupWithFormAddCard = new PopupWithForm({
  popupSelector: ".popup-add-card",
  handleFormSubmit: (formData) => {
    api
      .addNewCard(formData)
      .then(() => {
        const generateCard = createCard(formData, cardSelector);
        newcardList.addItem(generateCard);
      })
      .catch((err) => console.log(err));
    popupWithFormAddCard.close();
  },
});

popupWithFormAddCard.setEventListeners();

addCardBtn.addEventListener("click", handlePopupOpenAddCard); //Открыть редактирование профиля
function handlePopupOpenAddCard() {
  popupAddCardValidation.resetInputError();
  popupWithFormAddCard.open();
}

//попап удаления карточки
const popupWithFormDeleteCard = new PopupWithForm({
  popupSelector: ".popup-delete-card",
  handleFormSubmit: (data) => {
    api
      .deleteCard(data)
      .then(() => {
        if ((data._id = userData)) {
        }
      })
      .catch((err) => console.log(err));
    popupWithFormDeleteCard.close();
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
    popupWithFormDeleteCard.open.bind(popupWithFormDeleteCard)
  );
  return card.generateCard();
}

const newcardList = new Section(
  {
    data: {},
    renderer: (item) => {
      const generateCard = createCard(item, cardSelector);
      newcardList.addItem(generateCard, data);
    },
  },
  ".cards"
);

const api = new Api({
  address: "https://mesto.nomoreparties.co",
  token: "7a45c432-7073-4f3b-9cf1-c12940fb64b9",
});

//берем с сервера карточки
api
  .getInitialCards()
  .then((result) => {
    const cardList = new Section(
      {
        data: result,
        renderer: (item) => {
          const generateCard = createCard(item, cardSelector);
          cardList.addItem(generateCard, result);
        },
      },
      ".cards"
    );
    cardList.renderItems();
  })
  .catch((err) => console.log(err));

//берем с сервера инфо пользователя
let userId = "";
api
  .getUserData()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about, result._id);
    userInfo.setUserAvatar(result.avatar);
    userId = result._id;
  })
  .catch((err) => console.log(err));
