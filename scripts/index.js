const content = document.querySelector('.content');
const popup = content.querySelector('.popup');

const popupEditProfile = content.querySelector('.popup-edit-profile');
const editBtn = content.querySelector('.profile__edit-button');
const popupCloseBtnEditProfile = popupEditProfile.querySelector('.popup__close-btn');

const nameProfile = content.querySelector('.profile__title');
const nameInput = popupEditProfile.querySelector('.popup__input-text_type_name');
const jobProfile = content.querySelector('.profile__subtitle');
const jobInput = popupEditProfile.querySelector('.popup__input-text_type_job');
const formBtnEditProfile = popupEditProfile.querySelector('.popup__form');

const popupAddCard = content.querySelector('.popup-add-card');
const addCardBtn = content.querySelector('.profile__add-button');
const popupCloseBtnAddCard = popupAddCard.querySelector('.popup__close-btn');

const titleInput = popupAddCard.querySelector('.popup__input-text_type_title');
const linkInput = popupAddCard.querySelector('.popup__input-text_type_link');
const formBtnAddCard = popupAddCard.querySelector('.popup__form');

const popupZoomImg = content.querySelector('.popup-zoom-img');
const popupImg = popupZoomImg.querySelector('.popup__zoom-img');
const popupCaption = popupZoomImg.querySelector('.popup__zoom-caption');
const popupZoomCloseBtn = popupZoomImg.querySelector('.popup__close-btn-zoom-img');

//-------------------------------------------------------------------------------------------------------

//Закрыть попап кликом по overlay

const handleOverlayClick = (evt) => {
   if (evt.target === evt.currentTarget) {
    closePopup(evt)
   }
}

const popupArray = Array.from(document.querySelectorAll('.popup'));
popupArray.forEach((popupItem) => {
  popupItem.addEventListener('click', handleOverlayClick);
})

//Закрыть попап Esc
const handleEscClick = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

//Открыть попап
function openPopup (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', handleEscClick);
}

//Закрыть попап
function closePopup (popup) {
  popup = document.querySelector('.popup_opened').classList.remove('popup_opened');

  document.removeEventListener('keydown', handleEscClick);
}

//-------------------------------------------------------------------------------------------------------

//Открыть попап редактирования профиля, добавить в поля попапа значения со страницы
function popupOpenEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditProfile);
}

editBtn.addEventListener('click', popupOpenEditProfile); //Открыть
popupCloseBtnEditProfile.addEventListener('click', closePopup); //Закрыть

//Редактирование имени и информации о себе
function formSubmitHandler (evt) {
  evt.preventDefault();
  jobProfile.textContent = jobInput.value;
  nameProfile.textContent = nameInput.value;
  closePopup(evt);
}

formBtnEditProfile.addEventListener('submit', formSubmitHandler);

//-------------------------------------------------------------------------------------------------------

//Попап добавления карточки
addCardBtn.addEventListener('click', () => {openPopup(popupAddCard);}); //Открыть
popupCloseBtnAddCard.addEventListener('click', closePopup); //Закрыть

//-------------------------------------------------------------------------------------------------------

//Открыть попап картинки
function handleZoomImg(nameValue, linkValue) {
  openPopup(popupZoomImg);
  popupImg.src = linkValue;
  popupCaption.textContent = nameValue;
}
popupZoomCloseBtn.addEventListener('click', closePopup) //Закрыть

//-------------------------------------------------------------------------------------------------------

//Удалить карточку
function handleDelete(evt) {
  evt.target.closest('.card').remove();
}

//Лайк карточки
function handleLike(evt) {
  evt.target.closest('.card__like-btn').classList.toggle('card__like-btn_active');
}

//Отрисовать 6 карточек

const contentCards = document.querySelector('.content-cards');
const cards = contentCards.querySelector('.cards');

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

//-------------------------------------------------------------------------------------------------------

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

//Создать карточку
function createCard (data) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').addEventListener('click',  () => handleZoomImg(data.name, data.link));
  cardElement.querySelector('.card__delete-btn').addEventListener('click', handleDelete);
  cardElement.querySelector('.card__like-btn').addEventListener('click', handleLike);

  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__image').src = data.link;

  return cardElement;
}

//Отрисовать карточку
function renderCard (data, cardlist) {
  cardlist.prepend(createCard(data));
}

//Отрисовать 6 первых карточек
initialCards.forEach(data => renderCard(data, cards));

//Добавить карточку кнопкой 'Создать'
function handleSubmitAddCard (evt) {
  evt.preventDefault();

  const cardInput = {
    name: titleInput.value,
    link: linkInput.value
  }

  renderCard(cardInput, cards);
  closePopup(evt);
}
formBtnAddCard.addEventListener('submit', handleSubmitAddCard)
