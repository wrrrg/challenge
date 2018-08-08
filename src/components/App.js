import React, { Component } from 'react';

import Navbar from './Navbar';
import Timer from './Timer';
import TimerHistory from './TimerHistory';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeEntries: [],
    };

    this.addTimeEntry = this.addTimeEntry.bind(this);
  }

  // TODO: reload this from localstorage
  addTimeEntry(entry) {
    this.setState(prevState => ({ timeEntries: [...prevState.timeEntries, entry] }));
  }

  render() {
    const { timeEntries } = this.state;

    return (
      <div>
        <Navbar />
        <Timer addTimeEntry={this.addTimeEntry} />
        <TimerHistory timeEntries={timeEntries} />
      </div>
    );
  }
}
