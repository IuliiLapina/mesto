//Возвращает разметку карточки
export default class Card {
  constructor(data, cardSelector, handleCardClick, handleOpenPopupDeleteCard, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleOpenPopupDeleteCard = handleOpenPopupDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = this._cardSelector
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");

    this._element.querySelector(".card__title").textContent = this._name;
    this._image.alt = this._name;
    this._image.src = this._link;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__delete-btn")
      .addEventListener("click", () => {
        this._handleOpenPopupDeleteCard();
      });

    this._element
      .querySelector(".card__like-btn")
      .addEventListener("click", () => {
        this._handleLikeClick(this._element);
      });

    this._image
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link)
      );
  }

  isLiked() {

  }
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  setLike() {
    this._element
      .querySelector(".card__like-btn")
      .classList.toggle("card__like-btn_active");
  }
}
