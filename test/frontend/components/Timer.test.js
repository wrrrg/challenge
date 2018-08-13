import React from 'react';
import { shallow } from 'enzyme';
import TimeEntryForm from '../../../src/components/TimeEntryForm';
import { createTimeEntry } from '../../../src/utils/timerUtils';
import timeEntrySeeds from '../../../dummyData/timeEntries';

let addTimeEntry;

createTimeEntry(timeEntrySeeds);

beforeAll(() => {
  addTimeEntry = jest.fn();
});

describe('TimeEntryForm', () => {
  it('renders without crashing', () => {
    shallow(<TimeEntryForm addTimeEntry={addTimeEntry} />);
  });
});
