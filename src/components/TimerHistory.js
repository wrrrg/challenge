import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimerHistoryItem from './TimerHistoryItem';

export default class TimerHistory extends Component {
  renderHistoryItem() {
    const { timeEntries } = this.props;

    return timeEntries.map(({
      _id, billable, categories, description, project, endTime, startTime,
    }) => (
      <TimerHistoryItem
        billable={billable}
        categories={categories}
        description={description}
        key={_id}
        project={project}
        endTime={endTime}
        startTime={startTime}
      />
    ));
  }
  render() {
    return <div>{this.renderHistoryItem()}</div>;
  }
}

TimerHistory.propTypes = {
  timeEntries: PropTypes.arrayOf(PropTypes.object),
};

TimerHistory.defaultProps = {
  timeEntries: [],
};
