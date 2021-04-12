import Popup from "../components/Popup.js";

//форма попапа
export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super (popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll('.popup__input'); //все элементы полей
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._formSubmitThis = this._formSubmit.bind(this);
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit",  this._formSubmitThis);
  }

  close () {
    super.close();
    this._popupForm.reset();
  }
}
