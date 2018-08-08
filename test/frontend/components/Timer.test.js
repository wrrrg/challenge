import React from 'react';
import { shallow } from 'enzyme';
import Timer from '../../../src/components/Timer';
import { setTimeEntryInLocalStorage } from '../../../src/utils/timerUtils';
import timeEntrySeeds from '../../../dummyData/timeEntries';

let addTimeEntry;

setTimeEntryInLocalStorage(timeEntrySeeds);

beforeAll(() => {
  addTimeEntry = jest.fn();
});

describe('Timer', () => {
  it('renders without crashing', () => {
    shallow(<Timer addTimeEntry={addTimeEntry} />);
  });
});
