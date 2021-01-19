let content = document.querySelector('.content');
let editBtn = content.querySelector('.form__edit-button');
let popup = content.querySelector('.popup');
let popupCloseBtn = content.querySelector('.popup__close-btn');

let profileName = content.querySelector('.profile__title');
let inputName = popup.querySelector('.input__text_type_name');
inputName.value = profileName.textContent;

let profileJob = content.querySelector('.profile__subtitle');
let inputJob = popup.querySelector('.input__text_type_job');
inputJob.value = profileJob.textContent;

function popupToggle() {
  popup.classList.toggle('popup_opened');
}

editBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);
