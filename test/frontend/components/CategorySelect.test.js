import React from 'react';
import { mount, shallow } from 'enzyme';
import styled, { ThemeProvider, css } from 'styled-components';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';

// import 'react-test-renderer';
import CategorySelect from '../../../src/components/CategorySelect';
import dummyCategories from '../../../dummyData/categories';


describe('CategorySelect Component', () => {
  const selectedCategories = [];
  const setSelectedCategories = jest.fn();
  const allCategories = dummyCategories;
  it('renders without crashing', () => {
    mount(<CategorySelect
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
    />);
  });

  // using the styled-components and jest-styled-components packages here to test an element's css attributes.
  // if our ul on the cat select component has default cursor, we should be all good.
  it('has the ul element with correct class "categoriesList"', () => {
    const wrapper = mount(<CategorySelect
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
    />);

    // ensure that our dummy categories are set in the wrapper state
    wrapper.setState({ categoriesOpen: true, allCategories });
    wrapper.update();
    console.log(wrapper.html());

    // ensure that we're finding an element with this class
    const ul = wrapper.find('.categoriesList');

    expect(ul).toHaveLength(1);
  });

  // this test ideally tests the actual cursor appearance - unable to test external CSS with current package/knowledge
  // mainly knowledge


  // it('has the "cursor: default" css property on the ul element', () => {
  //   const wrapper = mount(<CategorySelect
  //     selectedCategories={selectedCategories}
  //     setSelectedCategories={setSelectedCategories}
  //   />);

  //   wrapper.setState({ categoriesOpen: true, allCategories });
  //   wrapper.update();

  //   expect(wrapper.find('.categoriesList')).toHaveStyleRule('cursor', 'default');
  // });
});
