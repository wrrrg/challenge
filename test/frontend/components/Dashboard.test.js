import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Dashboard from '../../../src/frontend/components/Dashboard';

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    const billable = false;
    const billableClick = jest.fn();
    const categories = [];
    const categoriesOpen = false;
    const handleCategorySelect = jest.fn();
    const handleManualSubmit = jest.fn();
    const handleProjectSelect = jest.fn();
    const handleTimerClick = jest.fn();
    const handleTimerMode = jest.fn();
    const isTiming = false;
    const project = '';
    const timeEntries = [];
    const inTimerMode = true;
    const toggleCategoriesList = jest.fn();
    const user = { email: 'admin@admin.com' };

    shallow(<Dashboard
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
      timeEntries={timeEntries}
      toggleCategoriesList={toggleCategoriesList}
      user={user}
    />);
  });
});
