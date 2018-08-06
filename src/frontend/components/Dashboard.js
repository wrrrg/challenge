import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import TimerHistory from './TimerHistory';

export default class Dashboard extends Component {
  render() {
    const {
      billable,
      billableClick,
      categories,
      categoriesOpen,
      handleCategorySelect,
      handleManualSubmit,
      handleProjectSelect,
      handleTimerClick,
      handleTimerMode,
      inTimerMode,
      isTiming,
      project,
      timeEntries,
      toggleCategoriesList,
    } = this.props;

    return (
      <div>
        <Timer
          billable={billable}
          billableClick={billableClick}
          categories={categories}
          categoriesOpen={categoriesOpen}
          handleCategorySelect={handleCategorySelect}
          handleManualSubmit={handleManualSubmit}
          handleProjectSelect={handleProjectSelect}
          handleTimerClick={handleTimerClick}
          handleTimerMode={handleTimerMode}
          inTimerMode={inTimerMode}
          isTiming={isTiming}
          project={project}
          toggleCategoriesList={toggleCategoriesList}
        />
        <TimerHistory timeEntries={timeEntries} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  billable: PropTypes.bool.isRequired,
  billableClick: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object),
  categoriesOpen: PropTypes.bool.isRequired,
  handleCategorySelect: PropTypes.func.isRequired,
  handleManualSubmit: PropTypes.func.isRequired,
  handleProjectSelect: PropTypes.func.isRequired,
  handleTimerClick: PropTypes.func.isRequired,
  handleTimerMode: PropTypes.func.isRequired,
  inTimerMode: PropTypes.bool.isRequired,
  isTiming: PropTypes.bool.isRequired,
  project: PropTypes.string.isRequired,
  timeEntries: PropTypes.arrayOf(PropTypes.object),
  toggleCategoriesList: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  categories: [],
  timeEntries: [],
};
