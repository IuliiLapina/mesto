export class Card {
  constructor(data, cardSelector, handleZoomImg) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleZoomImg = handleZoomImg;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
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
        this._handleDelete();
      });

    this._element
      .querySelector(".card__like-btn")
      .addEventListener("click", () => {
        this._handleLike();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleZoomImg(this._name, this._link)
      );
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleLike() {
    this._element
      .querySelector(".card__like-btn")
      .classList.toggle("card__like-btn_active");
  }
}
