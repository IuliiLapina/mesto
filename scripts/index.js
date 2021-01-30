const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;
const popup = content.querySelector('.popup');

const popupEditProfile = content.querySelector('.popup-edit-profile');
const editBtn = content.querySelector('.profile__edit-button');
const popupCloseBtnEditProfile = popupEditProfile.querySelector('.popup__close-btn');

const nameProfile = content.querySelector('.profile__title');
const nameInput = popupEditProfile.querySelector('.input__text_type_name');
const jobProfile = content.querySelector('.profile__subtitle');
const jobInput = popupEditProfile.querySelector('.input__text_type_job');
const formBtnEditProfile = popupEditProfile.querySelector('.input');

const popupAddCard = content.querySelector('.popup-add-card');
const addCardBtn = content.querySelector('.profile__add-button');
const popupCloseBtnAddCard = popupAddCard.querySelector('.popup__close-btn');

const titleInput = popupAddCard.querySelector('.input__text_type_title');
const linkInput = popupAddCard.querySelector('.input__text_type_link');
const formBtnAddCard = popupAddCard.querySelector('.input');

const popupZoomImg = content.querySelector('.popup-zoom-img');
const popupImg = popupZoomImg.querySelector('.popup__zoom-img');
const popupCaption = popupZoomImg.querySelector('.popup__zoom-caption');
const popupZoomCloseBtn = popupZoomImg.querySelector('.popup__close-btn-zoom-img');

//-------------------------------------------------------------------------------------------------------

//Открыть попап
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

//Закрыть попап
function closePopup (evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
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

//Добавить карточку с значениями пользователя через попап
function addCard (nameValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = nameValue;
  cardElement.querySelector('.card__image').src = linkValue;

  cardElement.querySelector('.card__image').addEventListener('click',  () => handleZoomImg(nameValue, linkValue));
  cardElement.querySelector('.card__delete-btn').addEventListener('click', handleDelete);
  cardElement.querySelector('.card__like-btn').addEventListener('click', handleLike);

  cards.prepend(cardElement);
}

//Добавить карточку кнопкой 'Создать'
function handleSubmitAddCard (evt) {
  evt.preventDefault();
  addCard(titleInput.value, linkInput.value);
  closePopup(evt);
}
formBtnAddCard.addEventListener('submit', handleSubmitAddCard)

//Удалить карточку
function handleDelete(evt) {
  evt.target.closest('.card').remove();
}

//Лайк карточки
function handleLike(evt) {
  evt.target.closest('.card__like-btn').classList.toggle('card__like-btn_active');
}

//-------------------------------------------------------------------------------------------------------

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

initialCards.forEach((item) => {
  addCard(item.name, item.link)
});


