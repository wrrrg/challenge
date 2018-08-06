export function setTimeEntryInLocalStorage(timeEntry) {
  return localStorage.setItem('timeEntry', JSON.stringify(timeEntry));
}

export function getTimeEntryFromLocalStorage() {
  return JSON.parse(localStorage.getItem('timeEntry'));
}

export function removeTimeEntryFromLocalStorage() {
  return localStorage.removeItem('timeEntry');
}
