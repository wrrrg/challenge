import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import Admin from './Admin';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Route, { isAdmin } from './AuthRoute';
import Navbar from './Navbar';
import Login from './Login';
import NotFound from './NotFound';
import RestrictedComponent from './RestrictedComponent';
import { getUser, setUser, removeUser, userHasValidToken } from '../../utils/userUtils';
import {
  fetchTimeEntries,
  getTimeEntryFromLocalStorage,
  setTimeEntryInLocalStorage,
  postTimeEntry,
  removeTimeEntryFromLocalStorage,
} from '../../utils/timerUtils';
import { createTimestamp } from '../../utils/timeUtils';
import { VALID_TOKEN } from '../../constants';
import dummyCategories from '../../utils/dummyCategories';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billable: false,
      categories: cloneDeep(dummyCategories),
      categoriesOpen: false,
      currentUser: getUser() || {},
      description: '',
      isLoggedIn: userHasValidToken(VALID_TOKEN),
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
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.toggleCategoriesList = this.toggleCategoriesList.bind(this);
    this.updateTimeEntries = this.updateTimeEntries.bind(this);
    this.handleTimerMode = this.handleTimerMode.bind(this);
  }

  componentDidMount() {
    this.updateTimeEntries();
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

  login(user) {
    setUser(user);
    const currentUser = Object.assign({}, user);
    this.setState({ isLoggedIn: true, currentUser });
  }

  logout() {
    removeUser();
    this.resetAppState();
    this.setState({ isLoggedIn: false });
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
      await postTimeEntry(entry);
      this.updateTimeEntries();
    }
  }

  async handleManualSubmit(timeStart, timeEnd) {
    const timeEntry = this.createTimeEntryObj(timeStart, timeEnd);
    await postTimeEntry(timeEntry);
    this.updateTimeEntries();
  }

  handleTimerMode() {
    const { isTiming } = this.state;
    if (!isTiming) {
      this.setState(prevState => ({ inTimerMode: !prevState.inTimerMode }));
    }
  }

  async updateTimeEntries() {
    const fetchedTimeEntries = await fetchTimeEntries();
    this.setState({ timeEntries: fetchedTimeEntries });
  }

  render() {
    const {
      billable,
      categories,
      categoriesOpen,
      currentUser,
      inTimerMode,
      isLoggedIn,
      isTiming,
      project,
      timeEntries,
    } = this.state;

    return (
      <Router>
        <div>
          <Navbar isLoggedIn={isLoggedIn} user={currentUser} logout={this.logout} />
          <Switch>
            <Route exact path="/" component={Landing} isPrivate={false} />
            <Route path="/login" component={() => <Login login={this.login} />} isPrivate={false} />
            <Route
              path="/admin"
              component={() => (
                <RestrictedComponent isAdmin={isAdmin()}>
                  <Admin />
                </RestrictedComponent>
              )}
              isPrivate
            />
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
            <Route path="*" component={NotFound} isPrivate={false} />
          </Switch>
        </div>
      </Router>
    );
  }
}
