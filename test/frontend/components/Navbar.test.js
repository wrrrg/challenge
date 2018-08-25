/* eslint-disable react/jsx-indent */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Navbar from '../../../src/components/Navbar';

describe('Navbar', () => {
  it('renders without crashing', () => {
    const isLoggedIn = true;
    const onClick = jest.fn();
    const user = {};

    mount(<Navbar />);
  });

  it('contains the anchor element with appropriate href', () => {
    const wrapper = mount(<Navbar />);
    const link = wrapper.find('a');
    expect(link.prop('href')).toEqual('https://www.moove-it.com');
  });

  it('contains the anchor element with appropriate target to open new window', () => {
    const wrapper = mount(<Navbar />);
    const link = wrapper.find('a');
    expect(link.prop('target')).toEqual('_blank');
  });


  it('contains the anchor element with appropriate target to secure the target', () => {
    const wrapper = mount(<Navbar />);
    const link = wrapper.find('a');
    expect(link.prop('rel')).toEqual('noopener noreferrer');
  });

  it('persists through the link click', () => {
    const wrapper = mount(<Navbar />);
    const link = wrapper.find('a');

    // simulate clicking on the link
    link.simulate('click');

    // check if still matches jest snapshot, as in, a new page hasn't loaded
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


// Here we want to add another test to make sure our Navbar link is
// correctly redirecting to the moove-it.com page in a new window. However,
// adding the test seems much more complicated than simply adding the html
// element. Possibly redundant. Want to move on to other tickets for now,
// but want to return if time permits.

