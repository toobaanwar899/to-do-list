export default class Helper {
  setToken(token, expirationTimeInMinutes = 1440) {
    if (!token) {
      throw new Error("Token is Required");
    }
    localStorage.setItem("token", token);
    console.log(`Token: ${token}`);

    setTimeout(() => {
      this.removeToken();
    }, expirationTimeInMinutes * 60 * 1000);
  }
  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }
}
