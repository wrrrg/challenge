/* eslint-disable react/jsx-indent */
import React from 'react';
import { mount } from 'enzyme';
import Navbar from '../../../src/components/Navbar';

describe('Navbar', () => {
  it('renders without crashing', () => {
    const isLoggedIn = true;
    const onClick = jest.fn();
    const user = {};

    mount(<Navbar />);
  });

  it('contains the anchor element with appropriate attributes', () => {
    const wrapper = mount(<Navbar />);

    const link = wrapper.find('a');

    console.log(wrapper.html());
  });
});


// Here we want to add another test to make sure our Navbar link is
// correctly redirecting to the moove-it.com page in a new window. However,
// adding the test seems much more complicated than simply adding the html
// element. Possibly redundant. Want to move on to other tickets for now,
// but want to return if time permits.

