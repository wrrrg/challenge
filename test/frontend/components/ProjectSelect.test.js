import React from 'react';
import { shallow } from 'enzyme';
import ProjectSelect from '../../../src/components/ProjectSelect';

describe('ProjectSelect Component', () => {
  it('renders without crashing', () => {
    const setSelectedProject = jest.fn();
    const selectedProject = '';
    shallow(<ProjectSelect setSelectedProject={setSelectedProject} selectedProject={selectedProject} />);
  });
});
