import {
  getTimeEntryFromLocalStorage,
  setTimeEntryInLocalStorage,
} from '../../src/utils/timerUtils';
import timeEntrySeeds from '../../dummyData/timeEntries';

beforeEach(() => {
  setTimeEntryInLocalStorage(timeEntrySeeds);
});

afterEach(() => {
  localStorage.clear();
});

describe('timer utilities', () => {
  it('it sets and gets time entry in local storage', () => {
    const timeEntry = { description: 'This is a task' };
    setTimeEntryInLocalStorage(timeEntry);
    const timeEntryFromLocalStorage = getTimeEntryFromLocalStorage();
    expect(timeEntryFromLocalStorage.description).toBe('This is a task');
  });
});
