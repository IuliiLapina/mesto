import Popup from "../components/Popup.js";

//попап картинки
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popupElement.querySelector(".popup__zoom-img");
    this._popupCaption = this._popupElement.querySelector(".popup__zoom-caption");
  }

  open(name, link) {
    super.open();

    this._popupImg.src = link;
    this._popupCaption.textContent = name;
    this._popupCaption.alt = name;
  }
}
