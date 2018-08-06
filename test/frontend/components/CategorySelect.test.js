import React from 'react';
import { mount } from 'enzyme';
import CategorySelect from '../../../src/components/CategorySelect';

describe('CategorySelect Component', () => {
  let categories = [];
  let categoriesOpen = false;
  const toggleCategoriesList = jest.fn();
  const handleCategorySelect = jest.fn();

  it('renders without crashing', () => {
    mount(<CategorySelect
      categories={categories}
      categoriesOpen={categoriesOpen}
      toggleCategoriesList={toggleCategoriesList}
      handleCategorySelect={handleCategorySelect}
    />);
  });

  it('renders all categories regardless of selected value', () => {
    categoriesOpen = true;
    categories = [
      { id: 0, title: 'One', selected: false },
      { id: 1, title: 'Two', selected: false },
      { id: 2, title: 'Third', selected: true },
    ];

    const wrapper = mount(<CategorySelect
      categories={categories}
      categoriesOpen={categoriesOpen}
      toggleCategoriesList={toggleCategoriesList}
      handleCategorySelect={handleCategorySelect}
    />);

    expect(wrapper.find('div .list .listItem').length).toBe(3);
  });
});
