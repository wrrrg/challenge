import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSquare } from '@fortawesome/free-solid-svg-icons';

import DocumentHead from './DocumentHead';
import { getTimeEntryFromLocalStorage } from '../utils/timerUtils';
import { createTimestamp, displayTimeElapsed } from '../utils/timeUtils';

export default class TimerMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runningTimer: '00:00:00',
    };
  }

  componentDidMount() {
    this.clock();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  clock() {
    const { isTiming } = this.props;

    if (isTiming) {
      const { timeStart } = getTimeEntryFromLocalStorage();

      this.timer = setInterval(() => {
        const timeNow = createTimestamp();
        this.setState({ runningTimer: displayTimeElapsed(timeStart, timeNow) });
      }, 1000);
    }
  }

  render() {
    const { isTiming, handleTimerClick } = this.props;
    const { runningTimer } = this.state;

    return (
      <div className="flex w-100 items-center justify-end ph2">
        <DocumentHead runningTimer={runningTimer} isTiming={isTiming} />
        <h1 className="f4 mr4">{runningTimer}</h1>
        <button
          className="pointer mooveItNavybg f6 link dim br-100 w2 h2 dib mooveItPink bg-blue tc justify-end"
          onClick={handleTimerClick}
        >
          <FontAwesomeIcon icon={isTiming ? faSquare : faPlay} size="1x" />
        </button>
      </div>
    );
  }
}

TimerMode.propTypes = {
  handleTimerClick: PropTypes.func.isRequired,
  isTiming: PropTypes.bool.isRequired,
};
