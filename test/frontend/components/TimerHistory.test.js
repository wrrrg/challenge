import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import TimerHistory from '../../../src/components/TimerHistory';
import timeEntrySeeds from '../../../dummyData/timeEntries';
import { mountToJson } from 'enzyme-to-json';
import { addUnix } from '../../../src/utils/timeUtils';
import { objectToArray, unixSort } from '../../../src/utils/timerUtils';

describe('TimerHistory Component', () => {
  it('renders without crashing', () => {
    shallow(<TimerHistory timeEntries={timeEntrySeeds()} />);
  });

  it('should render 3 TimerHistoryItem components from dummy data', () => {
    const wrapper = mount(<TimerHistory timeEntries={timeEntrySeeds()} />);
    // enzyme grabbing by component display name
    expect(wrapper.find('.timerHistoryItem')).toHaveLength(3);
  });

  it(' should correctly convert startTime to unix time', () => {
    // we first convert our data object to an array of objects
    const timeEntries = timeEntrySeeds();
    const timesArr = objectToArray(timeEntries);
    // add the unix epoch timestamp
    addUnix(timesArr);
    console.log(timesArr);

    // // check that the first value is what we think it should be -
    const u = timesArr[0][Object.keys(timesArr[0])[0]].unix;
    expect(u).toEqual(1530727200);
  });

  it('should render sorted TimerHistoryItems most recent to oldest', () => {
    const wrapper = mount(<TimerHistory timeEntries={timeEntrySeeds()} />);

    const timeHistoryItems = wrapper.find('TimerHistoryItem');

    // check that the first timeHistoryItem's desceription prop matches the expected from dummy data
    // sorting descending time, the most recent entry should have 'Another Task'
    expect(timeHistoryItems.get(0).props.description).toBe('Another task');
    // the second task should be 'Some task'
    expect(timeHistoryItems.get(1).props.description).toBe('Some task');
    // the third and final task should be 'Yet another task'
    expect(timeHistoryItems.get(2).props.description).toBe('Yet another task');
  });
});
