import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Navbar from './Navbar';
import NotFound from './NotFound';
import {
  getTimeEntryFromLocalStorage,
  setTimeEntryInLocalStorage,
  removeTimeEntryFromLocalStorage,
} from '../utils/timerUtils';
import { createTimestamp } from '../utils/timeUtils';
import dummyCategories from '../utils/dummyCategories';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billable: false,
      categories: dummyCategories,
      categoriesOpen: false,
      description: '',
      isTiming: false,
      inTimerMode: true,
      project: '',
      timeEntries: [],
    };

    this.billableClick = this.billableClick.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleManualSubmit = this.handleManualSubmit.bind(this);
    this.handleProjectSelect = this.handleProjectSelect.bind(this);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.toggleCategoriesList = this.toggleCategoriesList.bind(this);
    this.handleTimerMode = this.handleTimerMode.bind(this);
  }

  resetAppState() {
    this.setState({
      billable: false,
      categories: dummyCategories,
      categoriesOpen: false,
      description: '',
      isTiming: false,
      project: '',
    });
  }

  billableClick() {
    this.setState(prevState => ({ billable: !prevState.billable, categoriesOpen: false }));
  }

  handleProjectSelect(project) {
    // react-select library turns project (event) into an array if you remove a project
    this.setState({ project: Array.isArray(project) ? '' : project._id }); // eslint-disable-line no-underscore-dangle
  }

  toggleCategoriesList() {
    this.setState(prevState => ({
      categoriesOpen: !prevState.categoriesOpen,
    }));
  }

  handleCategorySelect(id) {
    this.setState((prevState) => {
      const { categories } = prevState;
      categories[id].selected = !categories[id].selected;
      return {
        categories,
        categoriesOpen: true,
      };
    });
  }

  createTimeEntryObj(timeStart, timeEnd) {
    const {
      billable, categories, description, project,
    } = this.state;

    return {
      billable,
      categories,
      description,
      project,
      timeEnd,
      timeStart,
    };
  }

  async handleTimerClick() {
    const { isTiming } = this.state;

    if (!isTiming) {
      const timeStart = createTimestamp();
      const entry = this.createTimeEntryObj(timeStart);
      setTimeEntryInLocalStorage(entry);
      this.setState({ isTiming: true, categoriesOpen: false });
    } else {
      this.resetAppState();
      const entry = getTimeEntryFromLocalStorage();
      removeTimeEntryFromLocalStorage();
      entry.timeEnd = createTimestamp();
      this.addTimeEntry(entry);
    }
  }

  addTimeEntry(entry) {
    this.setState(prevState => ({ timeEntries: [...prevState.timeEntries, entry] }));
  }

  handleManualSubmit(timeStart, timeEnd) {
    const timeEntry = this.createTimeEntryObj(timeStart, timeEnd);
    this.addTimeEntry(timeEntry);
  }

  handleTimerMode() {
    const { isTiming } = this.state;
    if (!isTiming) {
      this.setState(prevState => ({ inTimerMode: !prevState.inTimerMode }));
    }
  }

  render() {
    const {
      billable,
      categories,
      categoriesOpen,
      inTimerMode,
      isTiming,
      project,
      timeEntries,
    } = this.state;

    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              path="/dashboard"
              component={() => (
                <Dashboard
                  billable={billable}
                  billableClick={this.billableClick}
                  categories={categories}
                  categoriesOpen={categoriesOpen}
                  handleCategorySelect={this.handleCategorySelect}
                  handleManualSubmit={this.handleManualSubmit}
                  handleProjectSelect={this.handleProjectSelect}
                  handleTimerClick={this.handleTimerClick}
                  handleTimerMode={this.handleTimerMode}
                  inTimerMode={inTimerMode}
                  isTiming={isTiming}
                  project={project}
                  timeEntries={timeEntries}
                  toggleCategoriesList={this.toggleCategoriesList}
                />
              )}
              isPrivate
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
