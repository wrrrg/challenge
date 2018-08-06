import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Alert from 'react-s-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

import Calendar from './Calendar';
import {
  createManualTimestamp,
  createManualTimestampWithDate,
  displayTimeInput,
} from '../utils/timeUtils';

const TIMER_WARNING = 'Please fill out correct time entry';
const INVALID_TIME = 'Please enter a valid time';

export default class ManualMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manualDate: moment(),
      manualTimeEnd: '',
      manualTimeStart: '',
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.manualSubmitCallback = this.manualSubmitCallback.bind(this);
    this.validateManualTime = this.validateManualTime.bind(this);
  }

  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleDateChange(date) {
    this.setState({ manualDate: date });
  }

  validateManualTime(e) {
    const { value, name } = e.target;
    const time = displayTimeInput(value);

    if (time === 'Invalid date') {
      this.setState({ [name]: '' });

      Alert.error(INVALID_TIME, {
        position: 'bottom-right',
        effect: 'slide',
      });
    } else {
      this.setState({ [name]: time });
    }
  }

  manualSubmitCallback() {
    const { manualDate, manualTimeStart, manualTimeEnd } = this.state;
    const { handleManualSubmit } = this.props;

    if (manualTimeStart && manualTimeEnd) {
      const timeStart = createManualTimestampWithDate(manualTimeStart, manualDate);
      const timeEnd = createManualTimestamp(manualTimeEnd);
      return handleManualSubmit(timeStart, timeEnd);
    }
    return Alert.error(TIMER_WARNING, {
      position: 'bottom-right',
      effect: 'slide',
    });
  }

  render() {
    const { manualTimeStart, manualTimeEnd, manualDate } = this.state;

    return (
      <div className="flex items-center justify-end ph2">
        <DatePicker
          className="input-reset ba b--black-20 pa2 mr1 db w3"
          customInput={<Calendar />}
          dateFormat="M/D"
          selected={manualDate}
          onChange={this.handleDateChange}
        />
        <input
          className="start input-reset ba b--black-20 pa2 mh1 db w4"
          name="manualTimeStart"
          onChange={this.handleInputChange}
          value={manualTimeStart}
          onBlur={this.validateManualTime}
          placeholder="Time In"
        />
        <FontAwesomeIcon icon={faArrowRight} size="1x" />
        <input
          className="end input-reset ba b--black-20 pa2 mh1 db w4"
          name="manualTimeEnd"
          onChange={this.handleInputChange}
          value={manualTimeEnd}
          onBlur={this.validateManualTime}
          placeholder="Time Out"
        />
        <button
          className="pointer mooveItNavybg f6 link dim br-100 w2 h2 dib mooveItPink bg-blue tc"
          onClick={this.manualSubmitCallback}
        >
          <FontAwesomeIcon icon={faCheck} size="1x" />
        </button>

        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}

ManualMode.propTypes = {
  handleManualSubmit: PropTypes.func.isRequired,
};
