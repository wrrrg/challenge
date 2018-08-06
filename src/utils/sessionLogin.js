import { VALID_TOKEN } from '../constants';

export const validEmailsAndPasswords = {
  'admin@admin.com': 'password',
  'user@user.com': 'password',
};

function isValidEmailAndPassword(email, password) {
  return validEmailsAndPasswords[email] === password;
}

export default function sessionLogin(email, password) {
  const user = { email };
  if (isValidEmailAndPassword(email, password)) {
    user.authToken = VALID_TOKEN;
    return Promise.resolve(user);
  }
  user.authToken = 'invalid';
  return Promise.resolve(user);
}
