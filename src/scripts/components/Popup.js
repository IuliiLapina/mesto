export default class Popup {
  constructor(popupSelector) {
    this._popupElement = popupSelector;
    this._clickClose = this._handleClickClose.bind(this);
    this._escClose = this._handleEscClose.bind(this)
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-btn")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", this._clickClose);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", this._escClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._escClose);
  }
}
