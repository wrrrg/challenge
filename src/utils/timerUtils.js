import uuid from 'uuid/v1';

function setTimeEntry(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getTimeEntry(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeTimeEntry(key) {
  return localStorage.removeItem(key);
}

export function updateTimeEntry(key, timeEntryAttrs) {
  const oldTimeEntry = getTimeEntry(key);
  const newTimeEntry = Object.assign(oldTimeEntry, timeEntryAttrs);

  setTimeEntry(key, newTimeEntry);
}

export function createTimeEntry(timeEntry) {
  const id = uuid();

  setTimeEntry(id, timeEntry);
  return id;
}

export function fetchTimeEntries() {
  const allTimeEntries = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const entry = getTimeEntry(key);
    allTimeEntries[key] = entry;
  }

  return allTimeEntries;
}
