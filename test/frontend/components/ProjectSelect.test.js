import React from 'react';
import { shallow } from 'enzyme';
import ProjectSelect from '../../../src/components/ProjectSelect';

describe('ProjectSelect Component', () => {
  it('renders without crashing', () => {
    const handleProjectSelect = jest.fn();
    const project = '';
    shallow(<ProjectSelect handleProjectSelect={handleProjectSelect} project={project} />);
  });
});
