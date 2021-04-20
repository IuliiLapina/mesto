export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
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
    if (name) {
      this._nameSelector.textContent = name;
    }
    if (about) {
      this._aboutSelector.textContent = about;
    }
    if (_id) {
      this._userId = _id;
    }
  }

  setUserAvatar(avatar) {
    if (avatar) {
      this._avatarSelector.style.backgroundImage = `url(${avatar})`;
    }
  }
}
