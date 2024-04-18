export default class UserInfo {
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._avatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    this._user = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
    };
    return this._user;
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = about;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
