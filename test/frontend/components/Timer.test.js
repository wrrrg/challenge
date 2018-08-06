import React from 'react';
import { shallow } from 'enzyme';
import Timer from '../../../src/frontend/components/Timer';
import { setTimeEntryInLocalStorage } from '../../../src/utils/timerUtils';
import timeEntrySeeds from '../../dummyData/timeEntries';

let billable;
let billableClick;
let categories;
let categoriesOpen;
let handleCategorySelect;
let handleManualSubmit;
let handleProjectSelect;
let handleTimerClick;
let handleTimerMode;
let isTiming;
let project;
let inTimerMode;
let toggleCategoriesList;

setTimeEntryInLocalStorage(timeEntrySeeds);

beforeAll(() => {
  billable = false;
  billableClick = jest.fn();
  categories = [];
  categoriesOpen = false;
  handleCategorySelect = jest.fn();
  handleManualSubmit = jest.fn();
  handleProjectSelect = jest.fn();
  handleTimerClick = jest.fn();
  handleTimerMode = jest.fn();
  isTiming = true;
  project = '';
  inTimerMode = true;
  toggleCategoriesList = jest.fn();
});

describe('Timer', () => {
  it('renders without crashing', () => {
    shallow(<Timer
      billable={billable}
      billableClick={billableClick}
      categories={categories}
      categoriesOpen={categoriesOpen}
      handleCategorySelect={handleCategorySelect}
      handleManualSubmit={handleManualSubmit}
      handleProjectSelect={handleProjectSelect}
      handleTimerClick={handleTimerClick}
      handleTimerMode={handleTimerMode}
      isTiming={isTiming}
      project={project}
      inTimerMode={inTimerMode}
      toggleCategoriesList={toggleCategoriesList}
    />);
  });
});
