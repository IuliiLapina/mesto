import "../pages/index.css";
import regeneratorRuntime from "../../node_modules/regenerator-runtime";
import "regenerator-runtime/runtime.js";
import {
  configValidation,
  cardSelector,
  addCardBtn,
  popupAddCard,
  aboutInput,
  nameInput,
  editBtn,
  popupEditProfile,
  avatarEditBtn,
  popupEditAvatar,
  popupEditAvatarSaveBtn,
  popupEditProfileSaveBtn,
  popupAddCardSaveBtn,
  popupDeleteCardSaveBtn,
  cardWithoutBinSelector,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  popupDeleteCard,
  popupZoomImg,
  containerForCards,
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import renderLoading from "../scripts/utils/utils.js";

//Валидация форм
const popupEditProfileValidation = new FormValidator(
  configValidation,
  popupEditProfile
);
popupEditProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(
  configValidation,
  popupAddCard
);
popupAddCardValidation.enableValidation();

const popupEditAvatarValidation = new FormValidator(
  configValidation,
  popupEditAvatar
);
popupEditAvatarValidation.enableValidation();

//попап редактирования профиля
const userInfo = new UserInfo({
  nameSelector: profileTitle,
  aboutSelector: profileSubtitle,
  avatarSelector: profileAvatar,
});

function formEditProfileInputsValue() {
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;
}
const api = new Api({
  address: "https://mesto.nomoreparties.co",
  token: "7a45c432-7073-4f3b-9cf1-c12940fb64b9",
});

let userId = null;
//берем с сервера инфо пользователя
const userInfoPromise = api
  .getUserData()
  .then((info) => {
    userInfo.setUserInfo(info.name, info.about, info._id);
    userInfo.setUserAvatar(info.avatar);
    userId = userInfo.getUserInfo().userId;
  })
  .catch((err) => console.log(err));

//берем с сервера карточки
const initialCardsPromise = api
  .getInitialCards()
  .then((initialCards) => {
    initialCards.reverse();
    return initialCards;
  })
  .catch((err) => console.log(err));

const cardList = new Section(
  {
    data: null,
    renderer: (item) => {
      let generateCard = null;
      if (item.owner._id === userId) {
        generateCard = createCard(item, cardSelector);
        cardList.addItem(generateCard);
      } else {
        generateCard = createCard(item, cardWithoutBinSelector);
        cardList.addItem(generateCard);
      }
    },
  },
  containerForCards
);

Promise.all([userInfoPromise, initialCardsPromise])
.then((values) => {
  cardList.setRenderedItems(values[1]);
  cardList.renderItems();
});

//изменяем и отправляем данные пользователя на сервер
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (formData) => {
    api
      .setUserData(formData)
      .then(() => {
        userInfo.setUserInfo(formData.name, formData.about);
        popupWithFormEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(popupEditProfileSaveBtn, "Сохранение...");
      });
  },
});
popupWithFormEditProfile.setEventListeners();

editBtn.addEventListener("click", handlePopupOpenEditProfile); //Открыть редактирование профиля
function handlePopupOpenEditProfile() {
  popupEditProfileValidation.resetInputError();
  formEditProfileInputsValue();
  renderLoading(popupEditProfileSaveBtn, "Сохранить");
  popupWithFormEditProfile.open();
}

//редактирование аватара
const popupWithFormEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatar,
  handleFormSubmit: (formData) => {
    api
      .setUserAvatar(formData.avatar)
      .then(() => {
        userInfo.setUserAvatar(formData.avatar);
        popupWithFormEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(popupEditAvatarSaveBtn, "Сохранение...");
      });
  },
});
popupWithFormEditAvatar.setEventListeners();

avatarEditBtn.addEventListener("click", handlePopupOpenEditAvatar);

function handlePopupOpenEditAvatar() {
  popupEditAvatarValidation.resetInputError();
  renderLoading(popupEditAvatarSaveBtn, "Сохранить");
  popupWithFormEditAvatar.open();
}

//попап добавления карточки
//отправляем карточку на сервер
const popupWithFormAddCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (formData) => {
    api
      .addNewCard(formData)
      .then((response) => {
        const generateCard = createCard(response, cardSelector, userId);
        cardList.addItem(generateCard);
        popupWithFormAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(popupAddCardSaveBtn, "Создание...")
      });
  },
});

popupWithFormAddCard.setEventListeners();

addCardBtn.addEventListener("click", handlePopupOpenAddCard); //Открыть редактирование профиля
function handlePopupOpenAddCard() {
  popupAddCardValidation.resetInputError();
  renderLoading(popupAddCardSaveBtn, "Создать");
  popupWithFormAddCard.open();
}

//попап удаления карточки
let cardToDelete = null;
const popupWithFormDeleteCard = new PopupWithForm({
  popupSelector: popupDeleteCard,
  handleFormSubmit: () => {
    api
      .deleteCard(cardToDelete.getCardId())
      .then(() => {
        cardToDelete.getCardElement().remove();
        cardToDelete = null;
        popupWithFormDeleteCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(popupDeleteCardSaveBtn, "Удаление...");
      });
  },
});
popupWithFormDeleteCard.setEventListeners();

//Попап картинки
const popupZoomCard = new PopupWithImage(popupZoomImg);
popupZoomCard.setEventListeners();

//Про отрисовку карточек
function createCard(cardData, cardSelector) {
  const card = new Card(
    cardData,
    cardSelector,
    popupZoomCard.open.bind(popupZoomCard),
    {
      handleRemoveClick: () => {
        cardToDelete = card;
        renderLoading(popupDeleteCardSaveBtn, "Да");
        popupWithFormDeleteCard.open();
      },
    },
    {
      handleLikeClick: () => {
        if (card.isLiked(userId) === true) {
          api
            .deleteCardLike(card.getCardId())
            .then((response) => {
              card.setCardLikes(response.likes);
              card.removeLike();
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addCardLike(card.getCardId())
            .then((response) => {
              card.setCardLikes(response.likes);
              card.setLike();
            })
            .catch((err) => console.log(err));
        }
      },
    }
  );
  return card.generateCard(userId);
}
