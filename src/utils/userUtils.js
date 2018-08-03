export function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUser() {
  localStorage.removeItem('user');
}

export function userHasValidToken(validToken) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) return user.authToken === validToken;
  return false;
}
