let content = document.querySelector('.content');
let editBtn = content.querySelector('.profile__edit-button');
let popupEditProfile = document.getElementById('popup-edit-profile');
let popupAddCard = document.getElementById('popup-add-card');
let popupCloseBtnEditProfile = popupEditProfile.querySelector('.popup__close-btn');
let popupCloseBtnAddCard = popupAddCard.querySelector('.popup__close-btn');
let nameProfile = content.querySelector('.profile__title');
let nameInput = popupEditProfile.querySelector('.input__text_type_name');
let jobProfile = content.querySelector('.profile__subtitle');
let jobInput = popupEditProfile.querySelector('.input__text_type_job');
let formElement = popupEditProfile.querySelector('.input');
let addCardBtn = content.querySelector('.profile__add-button');

//Функция открытия попапа редактирования профиля, добавление в поля попапа значения со страницы
function popupOpenEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popupEditProfile.classList.add('popup_opened');
}
editBtn.addEventListener('click', popupOpenEditProfile);

//Функция открытия попапа добавления карточки
function popupOpenAddCard() {
  popupAddCard.classList.add('popup_opened');
}
addCardBtn.addEventListener('click', popupOpenAddCard);

//Функция закрытия попапа редактирования профиля
function popupCloseEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
}
popupCloseBtnEditProfile.addEventListener('click', popupCloseEditProfile);

//Функция закрытия попапа добавления карточки
function popupCloseAddCard() {
  popupAddCard.classList.remove('popup_opened');
}
popupCloseBtnAddCard.addEventListener('click', popupCloseAddCard);

//Редактирование имени и информации о себе
  function formSubmitHandler (evt) {
    evt.preventDefault();
    jobProfile.textContent = jobInput.value;
    nameProfile.textContent = nameInput.value;
    popupCloseEditProfile();
}

formElement.addEventListener('submit', formSubmitHandler);


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
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;

    cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-btn_active');
  });
  cards.append(cardElement)
});

/*
addButton.addEventListener('click', function () {
  const artist = document.querySelector('.input__text_type_artist');
  const title = document.querySelector('.input__text_type_title');

  addSong(artist.value, title.value);
  renderHasSongs();

  artist.value = '';
  title.value = '';
});


//Функция добавления новой карточки с значениями пользователя через попап

function addCard (nameValue, linkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').textContent = linkValue;
  cardElement.querySelector('.card__title').textContent = nameValue;

  cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
  evt.target.classList.toggle('card__like-btn_active');
  });
}
*/
