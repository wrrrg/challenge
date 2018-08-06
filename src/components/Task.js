import React, { Component } from 'react';

export default class Task extends Component {
  render() {
    return (
      <input
        className="input-reset ba b--black-20 pa2 mh3 db w-80"
        placeholder="Description"
        type="text"
      />
    );
  }
}
