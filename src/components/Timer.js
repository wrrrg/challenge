import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import {
  getTimeEntryFromLocalStorage,
  setTimeEntryInLocalStorage,
  removeTimeEntryFromLocalStorage,
} from '../utils/timerUtils';
import { createTimestamp } from '../utils/timeUtils';

import Task from './Task';
import Billable from './Billable';
import ProjectSelect from './ProjectSelect';
import TimerMode from './TimerMode';
import ManualMode from './ManualMode';
import CategorySelect from './CategorySelect';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billable: false,
      selectedCategories: [],
      description: '',
      isTiming: false,
      inTimerMode: true,
      project: '',
    };

    this.billableClick = this.billableClick.bind(this);
    this.handleManualSubmit = this.handleManualSubmit.bind(this);
    this.handleProjectSelect = this.handleProjectSelect.bind(this);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.handleTimerMode = this.handleTimerMode.bind(this);
    this.updateSelectedCategories = this.updateSelectedCategories.bind(this);
  }

  resetAppState() {
    this.setState({
      billable: false,
      selectedCategories: [],
      description: '',
      isTiming: false,
      project: '',
    });
  }

  billableClick() {
    this.setState(prevState => ({ billable: !prevState.billable }));
  }

  handleProjectSelect(project) {
    // react-select library turns project (event) into an array if you remove a project
    this.setState({ project: Array.isArray(project) ? '' : project._id }); // eslint-disable-line no-underscore-dangle
  }

  createTimeEntryObj(timeStart, timeEnd) {
    const {
      billable, selectedCategories, description, project,
    } = this.state;

    return {
      billable,
      categories: selectedCategories,
      description,
      project,
      timeEnd,
      timeStart,
    };
  }

  handleTimerClick() {
    const { isTiming } = this.state;
    const { addTimeEntry } = this.props;

    if (!isTiming) {
      const timeStart = createTimestamp();
      const entry = this.createTimeEntryObj(timeStart);
      setTimeEntryInLocalStorage(entry);
      this.setState({ isTiming: true });
    } else {
      this.resetAppState();
      const entry = getTimeEntryFromLocalStorage();
      removeTimeEntryFromLocalStorage();
      entry.timeEnd = createTimestamp();
      addTimeEntry(entry);
    }
  }

  handleManualSubmit(timeStart, timeEnd) {
    const { addTimeEntry } = this.props;

    const timeEntry = this.createTimeEntryObj(timeStart, timeEnd);
    addTimeEntry(timeEntry);
  }

  handleTimerMode() {
    const { isTiming } = this.state;
    if (!isTiming) {
      this.setState(prevState => ({ inTimerMode: !prevState.inTimerMode }));
    }
  }

  updateSelectedCategories(selectedCategories) {
    this.setState({ selectedCategories });
  }

  render() {
    const {
      billable, selectedCategories, project, isTiming, inTimerMode,
    } = this.state;

    return (
      <div className="mw100 center bg-white br3 h3 pa3 mv3 ba b--black-10 flex justify-between items-center">
        <Task />

        <ProjectSelect handleProjectSelect={this.handleProjectSelect} project={project} />

        <CategorySelect
          selectedCategories={selectedCategories}
          updateSelectedCategories={this.updateSelectedCategories}
        />

        <Billable billableClick={this.billableClick} billable={billable} />

        <div className="flex w-100 items-center justify-end ph2">
          {inTimerMode ? (
            <TimerMode isTiming={isTiming} handleTimerClick={this.handleTimerClick} />
          ) : (
            <ManualMode handleManualSubmit={this.handleManualSubmit} />
          )}
        </div>

        <div className="items-center pointer dim">
          <FontAwesomeIcon
            icon={inTimerMode ? faEdit : faUserClock}
            size="1x"
            onClick={this.handleTimerMode}
          />
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  addTimeEntry: PropTypes.func.isRequired,
};
