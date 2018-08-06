import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import logo from '../../static/Moove_It-Logo_W.png';

function Navbar() {
  return (
    <nav className="flex justify-between mooveItNavybg">
      <Link className="link mooveItPink no-underline flex items-center pa3" to="/">
        <FontAwesomeIcon className="mooveItPinkBorder ba bw1 br-100 mooveItTeal" icon={faClock} />
        <h4 className="pl1">Minutero</h4>
      </Link>

      <img className="mooveItNavybg pt4 mt2 h1" src={logo} alt="Moove-it logo" />

      <div className="flex-grow pa2 flex items-center">
        <Link
          to="/dashboard"
          className="shadow-hover h2 flex items-center f6 mooveItPink hover-white bg-animate no-underline pv1 ph3 ma2 br-pill b--black"
        >
          Go To Timer
        </Link>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
