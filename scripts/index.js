const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;

let popupEditProfile = document.getElementById('popup-edit-profile');
let editBtn = content.querySelector('.profile__edit-button');
let popupCloseBtnEditProfile = popupEditProfile.querySelector('.popup__close-btn');

let nameProfile = content.querySelector('.profile__title');
let nameInput = popupEditProfile.querySelector('.input__text_type_name');
let jobProfile = content.querySelector('.profile__subtitle');
let jobInput = popupEditProfile.querySelector('.input__text_type_job');
let formBtnEditProfile = popupEditProfile.querySelector('.input');

let popupAddCard = document.getElementById('popup-add-card');
let addCardBtn = content.querySelector('.profile__add-button');
let popupCloseBtnAddCard = popupAddCard.querySelector('.popup__close-btn');

let titleInput = popupAddCard.querySelector('.input__text_type_title');
let linkInput = popupAddCard.querySelector('.input__text_type_link');
let formBtnAddCard = popupAddCard.querySelector('.input');

//-------------------------------------------------------------------------------------------------------

//Открыть попап редактирования профиля, добавить в поля попапа значения со страницы
function popupOpenEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popupEditProfile.classList.add('popup_opened');
}
editBtn.addEventListener('click', popupOpenEditProfile);

//Закрыть попап редактирования профиля
function popupCloseEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
}
popupCloseBtnEditProfile.addEventListener('click', popupCloseEditProfile);

//Редактирование имени и информации о себе
function formSubmitHandler (evt) {
  evt.preventDefault();
  jobProfile.textContent = jobInput.value;
  nameProfile.textContent = nameInput.value;
  popupCloseEditProfile();
}
formBtnEditProfile.addEventListener('submit', formSubmitHandler);

//-------------------------------------------------------------------------------------------------------

//Открыть попап добавления карточки
function popupOpenAddCard() {
  popupAddCard.classList.add('popup_opened');
}
addCardBtn.addEventListener('click', popupOpenAddCard);

//Закрыть попап добавления карточки
function popupCloseAddCard() {
  popupAddCard.classList.remove('popup_opened');
}
popupCloseBtnAddCard.addEventListener('click', popupCloseAddCard);

//-------------------------------------------------------------------------------------------------------

//Добавить карточку с значениями пользователя через попап
function addCard (nameValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = nameValue;
  cardElement.querySelector('.card__image').src = linkValue;

  cardElement.querySelector('.card__delete-btn').addEventListener('click', handleDelete);
  cardElement.querySelector('.card__like-btn').addEventListener('click', handleLike);

  cards.prepend(cardElement);
}

//Добавление карточки кнопкой 'Создать'
function handleSubmitAddCard (evt) {
  evt.preventDefault();
  addCard(titleInput.value, linkInput.value);
  popupCloseAddCard();
}
formBtnAddCard.addEventListener('submit', handleSubmitAddCard)

//Удалить карточку
function handleDelete(evt) {
  evt.target.closest('.card').remove();
}



//-------------------------------------------------------------------------------------------------------

//добавим 6 карточек
let contentCards = document.querySelector('.content-cards');
let cards = contentCards.querySelector('.cards');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
  addCard(item.name, item.link)
});


