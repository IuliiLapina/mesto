let content = document.querySelector('.content');
let editBtn = content.querySelector('.form__edit-button');
let popup = content.querySelector('.popup');
let popupCloseBtn = content.querySelector('.popup__close-btn');
let nameProfile = content.querySelector('.profile__title');
let nameInput = popup.querySelector('.input__text_type_name');
let jobProfile = content.querySelector('.profile__subtitle');
let jobInput = popup.querySelector('.input__text_type_job');
let formElement = popup.querySelector(".input");

//Добавим в поля попапа значения со страницы
nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;

//Добавим функцию открытия и закрытия попапа
function popupToggle() {
  popup.classList.toggle('popup_opened');
}

editBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);

//Редактирование имени и информации о себе
  function formSubmitHandler (evt) {
    evt.preventDefault();
    jobProfile.textContent = jobInput.value;
    nameProfile.textContent = nameInput.value;
    popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);
