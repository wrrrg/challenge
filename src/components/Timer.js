import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import Task from './Task';
import Billable from './Billable';
import ProjectSelect from './ProjectSelect';
import TimerMode from './TimerMode';
import ManualMode from './ManualMode';
import CategorySelect from './CategorySelect';

export default class Timer extends Component {
  renderTimerMode() {
    const {
      isTiming, handleTimerClick, handleManualSubmit, inTimerMode,
    } = this.props;

    return (
      <div className="flex w-100 items-center justify-end ph2">
        {inTimerMode ? (
          <TimerMode isTiming={isTiming} handleTimerClick={handleTimerClick} />
        ) : (
          <ManualMode handleManualSubmit={handleManualSubmit} />
        )}
      </div>
    );
  }

  renderTimerModeIcon() {
    const { inTimerMode } = this.props;
    const { handleTimerMode } = this.props;
    return (
      <div className="items-center pointer dim">
        <FontAwesomeIcon
          icon={inTimerMode ? faEdit : faUserClock}
          size="1x"
          onClick={handleTimerMode}
        />
      </div>
    );
  }

  render() {
    const {
      billable,
      billableClick,
      categories,
      categoriesOpen,
      handleCategorySelect,
      handleProjectSelect,
      project,
      toggleCategoriesList,
    } = this.props;

    return (
      <div className="mw100 center bg-white br3 h3 pa3 mv3 ba b--black-10 flex justify-between items-center">
        <Task />

        <ProjectSelect handleProjectSelect={handleProjectSelect} project={project} />

        <CategorySelect
          categories={categories}
          categoriesOpen={categoriesOpen}
          toggleCategoriesList={toggleCategoriesList}
          handleCategorySelect={handleCategorySelect}
        />

        <Billable billableClick={billableClick} billable={billable} />

        {this.renderTimerMode()}

        {this.renderTimerModeIcon()}
      </div>
    );
  }
}

Timer.propTypes = {
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
  toggleCategoriesList: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  categories: [],
};
