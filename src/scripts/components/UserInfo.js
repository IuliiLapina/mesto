export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
  }
//возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent
    }
    return userInfo;
  }

//принимает новые данные пользователя
  setUserInfo(name, about) {
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
  }
}
