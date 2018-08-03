import axios from 'axios';

const { API_URL } = process.env;

export function setTimeEntryInLocalStorage(timeEntry) {
  return localStorage.setItem('timeEntry', JSON.stringify(timeEntry));
}

export function getTimeEntryFromLocalStorage() {
  return JSON.parse(localStorage.getItem('timeEntry'));
}

export function removeTimeEntryFromLocalStorage() {
  return localStorage.removeItem('timeEntry');
}

export async function fetchTimeEntries() {
  const response = await axios.get(`${API_URL}/entries`);
  return response.data;
}

export async function postTimeEntry(timeEntry) {
  const response = await axios.post(`${API_URL}/entries`, timeEntry);
  return response.data;
}
