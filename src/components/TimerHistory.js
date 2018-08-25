import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimerHistoryItem from './TimerHistoryItem';
import { unixSort, objectToArray } from '../utils/timerUtils';
import { addUnix } from '../utils/timeUtils';

export default class TimerHistory extends Component {
  renderHistoryItem() {
    const { timeEntries } = this.props;
    // before we begin rendering we want to sort timeEntries
    // we will import a helper util to accomplish this

    // change data to array for sorting
    const timesArr = objectToArray(timeEntries);
    // add unix timestamps from startDates for easier sorting
    addUnix(timesArr);
    // sort them
    timesArr.sort(unixSort);
    // back to an object for data
    const sortedTimeEntries = Object.assign({}, ...timesArr);

    return Object.entries(sortedTimeEntries).map(([id, entry]) => {
      const {
        description, project, categories, billable, startTime, endTime,
      } = entry;
      return (
        <TimerHistoryItem
          key={id}
          id={id}
          description={description}
          project={project}
          categories={categories}
          billable={billable}
          startTime={startTime}
          endTime={endTime}
        />
      );
    });
  }
  render() {
    return <div>{this.renderHistoryItem()}</div>;
  }
}

TimerHistory.propTypes = {
  timeEntries: PropTypes.shape().isRequired,
};
