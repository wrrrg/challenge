import React from 'react';
import { mount } from 'enzyme';
import CategorySelect from '../../../src/components/CategorySelect';

describe('CategorySelect Component', () => {
  it('renders without crashing', () => {
    const selectedCategories = [];
    const setSelectedCategories = jest.fn();

    mount(<CategorySelect
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
    />);
  });
});
