import React from 'react';
import { shallow } from 'enzyme';
import ManualMode from '../../../src/frontend/components/ManualMode';
import { setTimeEntryInLocalStorage } from '../../../src/utils/timerUtils';
import timeEntrySeeds from '../../server/seeds/timeEntries';

setTimeEntryInLocalStorage(timeEntrySeeds);

let handleManualSubmit;
let manualSubmitCallback;

beforeAll(() => {
  manualSubmitCallback = jest.fn();
  handleManualSubmit = jest.fn();
});

describe('Manual Mode', () => {
  it('should render without crashing', () => {
    shallow(<ManualMode handleManualSubmit={handleManualSubmit} />);
  });

  it('should not call handleManualSubmit if inputs are empty', () => {
    const wrapper = shallow(<ManualMode handleManualSubmit={handleManualSubmit} />);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(manualSubmitCallback).not.toHaveBeenCalled();
  });
});
