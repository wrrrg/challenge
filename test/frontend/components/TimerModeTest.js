import React from 'react';
import { shallow } from 'enzyme';
import TimerMode from '../../../src/components/TimerMode';
import { createTimeEntry } from '../../../src/utils/timerUtils';
import timestamps from '../../mock/timestamps';

let isTiming;
let handleTimerClick;

beforeAll(() => {
  isTiming = false;
  handleTimerClick = jest.fn();
});

describe('TimerMode', () => {
  it('renders an empty clock when the timer is stopped', () => {
    const wrapper = shallow(<TimerMode handleTimerClick={handleTimerClick} isTiming={isTiming} />);
    const timeElapsed = wrapper.find('h1').text();
    expect(timeElapsed).toBe('00:00:00');
  });
});
