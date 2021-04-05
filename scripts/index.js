import Card from "./Card.js";
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js';

const popupZoomImg = document.querySelector(".popup-zoom-img");
const popupImg = popupZoomImg.querySelector(".popup__zoom-img");
const popupCaption = popupZoomImg.querySelector(".popup__zoom-caption");

const content = document.querySelector(".content");

const popupEditProfile = content.querySelector(".popup-edit-profile");
const editBtn = content.querySelector(".profile__edit-button");
const popupCloseBtnEditProfile = popupEditProfile.querySelector(".popup__close-btn");

const nameProfile = content.querySelector(".profile__title");
const nameInput = popupEditProfile.querySelector(".popup__input-text_type_name");
const jobProfile = content.querySelector(".profile__subtitle");
const jobInput = popupEditProfile.querySelector(".popup__input-text_type_job");
const formBtnEditProfile = popupEditProfile.querySelector(".popup__form");

const popupAddCard = content.querySelector(".popup-add-card");
const addCardBtn = content.querySelector(".profile__add-button");
const popupCloseBtnAddCard = popupAddCard.querySelector(".popup__close-btn");

const titleInput = popupAddCard.querySelector(".popup__input-text_type_title");
const linkInput = popupAddCard.querySelector(".popup__input-text_type_link");
const formBtnAddCard = popupAddCard.querySelector(".popup__form");

const popupZoomCloseBtn = content.querySelector(".popup__close-btn-zoom-img");

const popups = document.querySelectorAll('.popup');
const contentCards = document.querySelector(".content-cards");
const cards = contentCards.querySelector(".cards");

const cardSelector = document.querySelector(".card-template");

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_type_active",
}

//Открыть попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handleEscClick);
}

//Закрыть попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener('keydown', handleEscClick);
}

//закрытие всех попапов кликом на крест и оверлей
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
            closePopup(popup)
        }
    })
})

//Закрыть попап Esc
const handleEscClick = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    }
  }

//Открыть попап редактирования профиля, добавить в поля попапа значения со страницы
function popupOpenEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popupEditProfileValidation.resetInputError();
  openPopup(popupEditProfile);
}
editBtn.addEventListener("click", popupOpenEditProfile); //Открыть
popupCloseBtnEditProfile.addEventListener("click", closePopup); //Закрыть

//Редактирование имени и информации о себе
function formSubmitHandler(evt) {
  evt.preventDefault();
  jobProfile.textContent = jobInput.value;
  nameProfile.textContent = nameInput.value;

  closePopup(popupEditProfile);
}
formBtnEditProfile.addEventListener("submit", formSubmitHandler);

//Попап добавления карточки
addCardBtn.addEventListener("click", () => {
  formBtnAddCard.reset();
  popupAddCardValidation.resetInputError();
  openPopup(popupAddCard);
}); //Открыть

popupCloseBtnAddCard.addEventListener("click", closePopup); //Закрыть

function createCard (cardInput, cardSelector) {
  const card = new Card(cardInput, cardSelector, handleZoomImg);
  return card.generateCard();
}

//Отрисуем 6 карточек
initialCards.forEach((item) => {
  cards.prepend(createCard (item, cardSelector));
});

//Добавить карточку кнопкой 'Создать'
function handleSubmitAddCard(evt) {
  evt.preventDefault();

  const cardInput = {
    name: titleInput.value,
    link: linkInput.value,
  };

  cards.prepend(createCard (cardInput, cardSelector));
  closePopup(popupAddCard);
}

formBtnAddCard.addEventListener("submit", handleSubmitAddCard);

//Открыть попап картинки
function handleZoomImg(nameValue, linkValue) {
  openPopup(popupZoomImg);
  popupImg.src = linkValue;
  popupCaption.textContent = nameValue;
  popupCaption.alt = nameValue;
}
popupZoomCloseBtn.addEventListener("click", closePopup); //Закрыть

//Валидация форм
const popupEditProfileValidation = new FormValidator(configValidation, popupEditProfile);
popupEditProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator (configValidation, popupAddCard);
popupAddCardValidation.enableValidation();
