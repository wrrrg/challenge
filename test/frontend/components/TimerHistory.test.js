import React from 'react';
import { shallow } from 'enzyme';
import TimerHistory from '../../../src/components/TimerHistory';

describe('TimerHistory Component', () => {
  it('renders without crashing', () => {
    shallow(<TimerHistory />);
  });
});
