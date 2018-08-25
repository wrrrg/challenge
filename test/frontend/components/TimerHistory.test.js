import React from 'react';
import { shallow, mount } from 'enzyme';
import TimerHistory from '../../../src/components/TimerHistory';
import timeEntrySeeds from '../../../dummyData/timeEntries';
import { mountToJson } from 'enzyme-to-json';

describe('TimerHistory Component', () => {
  it('renders without crashing', () => {
    shallow(<TimerHistory timeEntries={timeEntrySeeds()} />);
  });

  it('should render 3 TimerHistoryItem components from dummy data', () => {
    const wrapper = mount(<TimerHistory timeEntries={timeEntrySeeds()} />);
    // enzyme grabbing by component display name
    expect(wrapper.find('.timerHistoryItem')).toHaveLength(3);
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
