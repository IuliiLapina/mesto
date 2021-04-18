export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }
//возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
      userId: this._userId
    }
    return userInfo;
  }

  getUserAvatar() {
    const userAvatar = {
      avatar: this._avatarSelector.style.backgroundImage
    }
    return userAvatar;
  }

//принимает новые данные пользователя
  setUserInfo(name, about, _id) {
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
    this._userId = _id;
  }

  setUserAvatar(avatar) {
    this._avatarSelector.style.backgroundImage = `url(${avatar})`;
  }
}
