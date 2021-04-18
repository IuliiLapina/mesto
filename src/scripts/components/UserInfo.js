export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector, id}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
    this._id = id;
  }
//возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
      userId: this._id
    }
    return userInfo;
  }

  getUserAvatar() {
    const userAvatar = {
      avatar: this._avatarSelector.src
    }
    return userAvatar;
  }

//принимает новые данные пользователя
  setUserInfo(name, about, id) {
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
    this._id = id;
  }

  setUserAvatar(avatar) {
    this._avatarSelector.style.backgroundImage = `url(${avatar})`
  }
}
