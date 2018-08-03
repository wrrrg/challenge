import axios from 'axios';
import { VALID_TOKEN } from '../constants';

const { API_GITHUB_URL } = process.env;


export const validEmailsAndPasswords = {
  'admin@admin.com': 'password',
  'user@user.com': 'password',
};

function isValidEmailAndPassword(email, password) {
  return validEmailsAndPasswords[email] === password;
}

export const handleGitHubLogin = async (response) => {
  const result = await axios.post(API_GITHUB_URL, response);
  return result;
};

export default function sessionLogin(email, password) {
  const user = { email };
  if (isValidEmailAndPassword(email, password)) {
    user.authToken = VALID_TOKEN;
    return Promise.resolve(user);
  }
  user.authToken = 'invalid';
  return Promise.resolve(user);
}
