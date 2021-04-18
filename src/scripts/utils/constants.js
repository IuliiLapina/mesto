
export const cardSelector = document.querySelector(".card-template");
export const cardWithoutBinSelector = document.querySelector(".card-template-without-bin");

const content = document.querySelector(".content");
export const popupEditProfile = content.querySelector(".popup-edit-profile");
export const editBtn = content.querySelector(".profile__edit-button");
export const nameInput = popupEditProfile.querySelector(".popup__input-text_type_name");
export const aboutInput = popupEditProfile.querySelector(".popup__input-text_type_job");

export const popupAddCard = content.querySelector(".popup-add-card");
export const addCardBtn = content.querySelector(".profile__add-button");
export const avatarEditBtn = content.querySelector(".profile__avatar");
export const popupEditAvatar = content.querySelector(".popup-edit-avatar");
export const popupEditAvatarSaveBtn = popupEditAvatar.querySelector(".popup__button");
export const popupEditProfileSaveBtn = popupEditProfile.querySelector(".popup__button");
export const popupAddCardSaveBtn = popupAddCard.querySelector(".popup__button");
export const popupDeleteCard = content.querySelector(".popup-delete-card");
export const popupDeleteCardSaveBtn = popupDeleteCard.querySelector(".popup__button");

export const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_type_active",
}
