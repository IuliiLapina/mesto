import { Card } from "./Card.js";
import {FormValidator} from './FormValidator.js';

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

const contentCards = document.querySelector(".content-cards");
const cards = contentCards.querySelector(".cards");

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Отрисуем 6 карточек
initialCards.forEach((item) => {
  const card = new Card(item, '.card-template', handleZoomImg);  // Создадим экземпляр карточки
  const cardElement = card.generateCard();  // Создаём карточку и возвращаем наружу
  cards.prepend(cardElement);
});

//Открыть попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handleEscClick);
}

//Закрыть попап
function closePopup() {
  document.querySelector(".popup_opened").classList.remove("popup_opened");
}

//закрытие всех попапов кликом на крест и оверлей
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
    })
})

//Закрыть попап Esc
const handleEscClick = (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
    document.removeEventListener('keydown', handleEscClick);
  }
}

//-------------------------------------------------------------------------------------------------------
//Открыть попап редактирования профиля, добавить в поля попапа значения со страницы
function popupOpenEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditProfile);
}
editBtn.addEventListener("click", popupOpenEditProfile); //Открыть
popupCloseBtnEditProfile.addEventListener("click", closePopup); //Закрыть

//Редактирование имени и информации о себе
function formSubmitHandler(evt) {
  evt.preventDefault();
  jobProfile.textContent = jobInput.value;
  nameProfile.textContent = nameInput.value;
  makeButtonDisabled(formBtnEditProfile);
  closePopup();
}
formBtnEditProfile.addEventListener("submit", formSubmitHandler);

//делает кнопку отправки формы неактивной
function makeButtonDisabled (formBtn) {
  const popupSubmitBtn = formBtn.querySelector('.popup__button');
  popupSubmitBtn.classList.add("popup__button_disabled");
  popupSubmitBtn.disabled = true;
}

//-------------------------------------------------------------------------------------------------------
//Попап добавления карточки
addCardBtn.addEventListener("click", () => {
  openPopup(popupAddCard);
}); //Открыть

popupCloseBtnAddCard.addEventListener("click", closePopup); //Закрыть

//Добавить карточку кнопкой 'Создать'
function handleSubmitAddCard(evt) {
  evt.preventDefault();

  const cardInput = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const card = new Card(cardInput, '.card-template', handleZoomImg);
  const cardElement = card.generateCard();
  cards.prepend(cardElement);

  formBtnAddCard.reset();
  makeButtonDisabled(formBtnAddCard);
  closePopup();
}

formBtnAddCard.addEventListener("submit", handleSubmitAddCard);

//Открыть попап картинки
function handleZoomImg(nameValue, linkValue) {
  openPopup(popupZoomImg);
  popupImg.src = linkValue;
  popupCaption.textContent = nameValue;
}
popupZoomCloseBtn.addEventListener("click", closePopup); //Закрыть

//Валидация форм
const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_type_active",
}

const popupEditProfileValidation = new FormValidator(configValidation, popupEditProfile);
popupEditProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator (configValidation, popupAddCard);
popupAddCardValidation.enableValidation();
