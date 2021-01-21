let content = document.querySelector('.content');
let editBtn = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let popupCloseBtn = content.querySelector('.popup__close-btn');
let nameProfile = content.querySelector('.profile__title');
let nameInput = popup.querySelector('.input__text_type_name');
let jobProfile = content.querySelector('.profile__subtitle');
let jobInput = popup.querySelector('.input__text_type_job');
let formElement = popup.querySelector(".input");

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
