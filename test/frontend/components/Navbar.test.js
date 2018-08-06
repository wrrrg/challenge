/* eslint-disable react/jsx-indent */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../../src/components/Navbar';

describe('Navbar', () => {
  it('renders without crashing', () => {
    const isLoggedIn = true;
    const onClick = jest.fn();
    const user = {};

    mount(<BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} logout={onClick} user={user} />
          </BrowserRouter>);
  });
});
