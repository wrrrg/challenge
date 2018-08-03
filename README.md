# Apprenticeship Toggle

## Sprint Workflow

• Sprints are one week long

• Iteration planning takes place on **Tuesday** mornings

• Retrospectives take place on **Mondays** at the end of the day

• Demos for the client take place on **Fridays**

• The client will create the user stories

• The team leader will keep Jira up to date

• The Dev Team members will use Post-it notes to show each other what you are working on

## Git Workflow

Feature branches should match the Jira ticket along with a keyword(s) describing the purpose

```
AT-6-login
```

### Before Making a Pull Request

Pull down latest changes and fix any merge conflicts.
(E.g. from feature branch):

```
$ git pull --rebase origin master
```

Make sure code passes tests

```
$ npm test
```

Make sure code passes linter

```
$ npm run lint
```

Squash all related commits locally.
(E.g. if on feature branch, to squash last 4 commits):

```
$ git rebase -i HEAD~4
```

Push to your feature branch

```
$ git push origin AT-6-login
```

### When Making a Pull Request

Provide a **title** which matches the feature branch name.

```
AT-6-login
```

Provide **comments** which _briefly_ explain the purpose of the pull request.

```
Enable login functionality
Refactor utility function sessionLogin
```

### After Making a Pull Request

Notify team by posting link in Slack with a mention to everyone.

```
https://github.com/moove-it/apprenticeship-toggle/pull/13 @here
```

Respond to reviewer comments on Github. For more in depth discussions use Slack.
```
You: Hey, I have a question about one of your comments
Them: Great
You: Great!
```

### Reviewing a Pull Request

If your pull request is being reviewed, it's nice when they let you know in the Slack channel.

```
Them: 👀☝️
You: Great!
Them: Stop it
```

### Before Merging a Pull Request

• There should be at least two approvals, one of them from a full-time dev.

• All reviewers must approve.

### To Merge a Pull Request

• Use the **Squash and Merge** option on the Github button.

• After merging, **Delete Branch** using the Github button.

## How time entries happen
A time entry consists of:

• a task description

• a project

• any number of category tags

• whether or not the task is billable

• a start time/date

• an end time/date


How the start and end times/dates are recorded depend on whether you are in timer mode or manual entry mode

### Time entries made in timer mode
By default the app is in timer mode.

The user sees a running clock set to zeros and a timer button.


#### Start Button
When the user first clicks the timer button the following happens:

• isTiming changes from false to true

• A utility function captures the current time/date (the start time) and creates an ISO string

• A time entry object is created (with the description, project, etc) along with that freshly created start time

• A utility function sets the entry local storage in case a browser refresh occurs while timing

#### Stop Button

When the user clicks the timer button a second time the following happens:

• isTiming changes from true to false

• The time entry object is retrived from local storage

• The time entry in local storage is removed

• Another timestamp is created (just like the first one) which denotes the end time.

• This timestamp is added top the time entry object

• A POST request is made to the server persisting the time entry to the db


### Time entries made using manual entry

The user has the option to switch to manual entry mode by clicking an icon.

The user is shown a calendar, inputs for start and end times, and a submit button.

#### Calendar

When the user clicks a date on the calendar the date is set in state.

#### Time Inputs

When the user enters a valid time a utility function formats it to a consistent format and it is set in state.

The user must provide valid times before they can submit, otherwise alerts are shown

#### Submit Button

When the user is able to submit the following happens:

• A utility function combines the manually entered date and start time into a single ISO string.

• A utility funtion converts the manually entered end time to an ISO string.

• A time entry object is created (with the description, project, etc) along with the formatted manual start and end times/dates

• A POST request is made to the server persisting the time entry to the db


## How the timer works

When the app is in timer mode and the start button is clicked, isTiming is set to true.

A clock function is invoked and the following happens:

• The start time, which was just set in local storage, is retrieved

• A timer fires every 1 second and a utility function calculates the elapsed time (start time to current time)

• The elapsed time is updated in state and re rendered every second

• A library called react-helmet shows the elapsed time in the document header as well

## Mongoose conventions

Mongoose models will be in their own directory.  Their schemas will be defined there as well.

Variable names will follow this convention:

```
/* user.js */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  token: String,
});

module.exports = mongoose.model('User', schema);

```

Note the following:

• The file is lowercase singular

• Schema is destructured from the mongoose module

• The schema is instantiated using the _new_ keyword

• Schemas can refereenced in other models using ref so they don't have to be passed

• If a field only contains the type, do not use object syntax, i.e.

```
name: String
```
not
```
name: {
  type: String
}
```

• Export the model without having to name it

• The model name (first argument) is uppercase singular (see mongoose docs for more re this)
