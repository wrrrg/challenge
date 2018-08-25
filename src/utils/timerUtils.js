import uuid from 'uuid/v1';
import moment from 'moment';

const KEY_PREFIX = 'minutero:';

function setTimeEntry(id, value) {
  localStorage.setItem(id, JSON.stringify(value));
}

export function getTimeEntry(id) {
  return JSON.parse(localStorage.getItem(id));
}

export function removeTimeEntry(id) {
  return localStorage.removeItem(id);
}

export function updateTimeEntry(id, timeEntryAttrs) {
  const oldTimeEntry = getTimeEntry(id);
  const newTimeEntry = Object.assign(oldTimeEntry, timeEntryAttrs);

  setTimeEntry(id, newTimeEntry);
}

export function createTimeEntry(timeEntry) {
  const id = `${KEY_PREFIX}${uuid()}`;

  setTimeEntry(id, timeEntry);
  return id;
}

export function fetchTimeEntries() {
  const allTimeEntries = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage.key(i);
    if (!id.includes(KEY_PREFIX)) continue; // eslint-disable-line no-continue
    const entry = getTimeEntry(id);
    allTimeEntries[id] = entry;
  }

  return allTimeEntries;
}


export function objectToArray(obj) {
  return Object.keys(obj).map((key) => {
    return { [key]: obj[key] };
  });
}

export function unixSort(a, b) {
  // this nesting is because we will convert our big object to an array,
  // and we won't know the first key (the dynamic uuid) from which we need the
  // next nested object. This allows us to access the second nested object.
  const aUnix = a[Object.keys(a)[0]].unix;
  const bUnix = b[Object.keys(b)[0]].unix;
  let compare = 0;
  if (aUnix > bUnix) {
    compare = 1;
  } else if (aUnix < bUnix) {
    compare = -1;
  }
  // flip to have greatest unix timestamp sort first, so descending from most recent
  return compare * -1;
}
