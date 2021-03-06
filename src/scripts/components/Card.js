//Возвращает разметку карточки
//import cardSelector from '../utils/constants.js';
export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    { handleRemoveClick },
    { handleLikeClick }
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getCardElement() {
    return this._element;
  }

  getCardId() {
    return this._id;
  }

  setCardLikes(likes) {
    this._likes = likes;
    this.changeLikesCounter(likes.length);
  }
  getCardLikes() {
    return this._likes;
  }
  generateCard(userId) {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._likeBtn = this._element.querySelector(".card__like-btn");
    this._likeQantity = this._element.querySelector(".card__like-quantity")

    this._element.querySelector(".card__title").textContent = this._name;
    this._image.alt = this._name;
    this._image.src = this._link;
    this._likeQantity.textContent = this._likes.length;
    this._setEventListeners(userId);
    if (this.isLiked(userId)) {
      this.setLike();
    } else {
      this.removeLike();
    }
    return this._element;
  }

  _setEventListeners(userId) {
    if (this._owner._id === userId || this._owner === null) {
      this._element
        .querySelector(".card__delete-btn")
        .addEventListener("click", () => {
          this._handleRemoveClick();
        });
    }

    this._likeBtn
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._image.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  isLiked(userId) {
    let wasLiked = false;
    this._likes.forEach((element) => {
      if (element._id === userId) {
        wasLiked = true;
      }
    });
    return wasLiked;
  }

  setLike() {
    this._likeBtn
      .classList.add("card__like-btn_active");
  }

  removeLike() {
    this._likeBtn
      .classList.remove("card__like-btn_active");
  }

  changeLikesCounter(count) {
    this._likeQantity.textContent = count;
  }
}
