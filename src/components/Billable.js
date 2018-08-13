import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default class Billable extends Component {
  render() {
    const { billable, setBillable } = this.props;

    return (
      <FontAwesomeIcon
        className={`pointer gray dim ${billable && 'green'} ma4`}
        onClick={setBillable}
        icon={faDollarSign}
        size="2x"
      />
    );
  }
}

Billable.propTypes = {
  billable: PropTypes.bool.isRequired,
  setBillable: PropTypes.func.isRequired,
};
