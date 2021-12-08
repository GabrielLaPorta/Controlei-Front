
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'app-token';
const NAME = 'username'

export const setLogin = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
}

export const setUserName = (name) => {
  localStorage.setItem(NAME, name);
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME);
}

export const getUserName = () => {
  return localStorage.getItem(NAME)
}

export const isLogged = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      logout();
      return false
    } else {
      return true
    }
  }
  return false;
}
