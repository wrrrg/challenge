import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const timingOnIcon = '../static/favicon-timing.ico';
const timingOffIcon = '../static/favicon-not-timing.ico';

export default class DocumentHead extends Component {
  render() {
    const { isTiming, runningTimer } = this.props;
    return (
      <Helmet defer={false}>
        <title>
          {runningTimer || isTiming
            ? `${runningTimer} ∙ Apprenticeship Toggle`
            : 'Apprenticeship Toggle'}
        </title>
        <link
          rel="icon"
          href={isTiming ? timingOnIcon : timingOffIcon}
          sizes="16x16"
          type="image/ico"
        />
      </Helmet>
    );
  }
}

DocumentHead.propTypes = {
  isTiming: PropTypes.bool.isRequired,
  runningTimer: PropTypes.string.isRequired,
};
