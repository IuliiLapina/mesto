import {
  configValidation,
  cardSelector,
  addCardBtn,
  popupAddCard,
  aboutInput,
  nameInput,
  editBtn,
  popupEditProfile,
} from "../scripts/utils/constants.js";
import { initialCards } from "../scripts/utils/initialCards.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

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

//попап редактирования профиля
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
});

function popupProfileInputsValues() {
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;
}

const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup-edit-profile",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData.name, formData.about);
    popupWithFormEditProfile.close();
  },
});
popupWithFormEditProfile.setEventListeners();

editBtn.addEventListener("click", handlePopupOpenEditProfile); //Открыть редактирование профиля
function handlePopupOpenEditProfile() {
  popupEditProfileValidation.resetInputError();
  popupProfileInputsValues();

  popupWithFormEditProfile.open();
}

//попап добавления карточки
const popupWithFormAddCard = new PopupWithForm({
  popupSelector: ".popup-add-card",
  handleFormSubmit: (formData) => {
    const generateCard = createCard(formData, cardSelector);
    cardList.addItem(generateCard);

    popupWithFormAddCard.close();
  },
});
popupWithFormAddCard.setEventListeners();

addCardBtn.addEventListener("click", handlePopupOpenAddCard); //Открыть редактирование профиля
function handlePopupOpenAddCard() {
  popupAddCardValidation.resetInputError();
  popupWithFormAddCard.open();
}

//Попап картинки
const popupZoomCard = new PopupWithImage(".popup-zoom-img");
popupZoomCard.setEventListeners();

//Про отрисовку карточек
function createCard(cardInput, cardSelector) {
  const card = new Card(
    cardInput,
    cardSelector,
    popupZoomCard.open.bind(popupZoomCard)
  );
  return card.generateCard();
}

//Отрисуем 6 первых карточек
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const generateCard = createCard(item, cardSelector);
      cardList.addItem(generateCard);
    },
  },
  ".cards"
);
cardList.renderItems();
