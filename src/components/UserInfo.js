export default class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  }

  getUserInfo() {
    this._user = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
    return this._user;
  }

  setUserInfo({ name, description }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }
}
