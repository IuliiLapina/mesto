let content = document.querySelector('.content');
let editBtn = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let popupCloseBtn = content.querySelector('.popup__close-btn');
let nameProfile = content.querySelector('.profile__title');
let nameInput = popup.querySelector('.input__text_type_name');
let jobProfile = content.querySelector('.profile__subtitle');
let jobInput = popup.querySelector('.input__text_type_job');
let formElement = popup.querySelector('.input');

//Добавим функцию открытия попапа, lобавим в поля попапа значения со страницы
function popupOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add('popup_opened');
}

//Добавим функцию закрытия попапа
function popupClose() {
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);

//Редактирование имени и информации о себе
  function formSubmitHandler (evt) {
    evt.preventDefault();
    jobProfile.textContent = jobInput.value;
    nameProfile.textContent = nameInput.value;
    popupClose();
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
