import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { displayDate, displayStartAndEndTimes, displayTimeElapsed } from '../utils/timeUtils';

export default class TimerHistoryItem extends Component {
  render() {
    const {
      billable, categories, description, project, endTime, startTime,
    } = this.props;

    const isTimeOut = endTime !== 0;

    const renderCategories = categories.filter(item => item.selected).map((item, index, arr) => {
      const lastIndex = arr.length - 1;
      return `${item.title}${index === lastIndex ? '' : ', '}`;
    });

    if (!isTimeOut) return '';
    // added timerHistoryItem class for testing
    return (
      <div className="black-50 f6 flex justify-between w100 center bg-white br0 pa3 pa3-ns mv3 ba b--black-10 timerHistoryItem">
        <div>{description || 'DESCRIPTION PLACEHOLDER'}</div>
        <div>{project && project.name}</div>
        <div>{renderCategories}</div>
        <div>{billable && '$'}</div>

        <div>{displayDate(startTime)}</div>
        <div>{displayStartAndEndTimes(startTime, endTime)}</div>
        <div>{displayTimeElapsed(startTime, endTime)}</div>
      </div>
    );
  }
}

TimerHistoryItem.propTypes = {
  billable: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string.isRequired,
  project: PropTypes.shape({}),
  endTime: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
};

TimerHistoryItem.defaultProps = {
  categories: [],
  project: {},
};
