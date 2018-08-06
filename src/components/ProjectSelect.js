import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

// TODO: implement adding projects to this dropdown
class ProjectSelect extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
    };
  }

  render() {
    const { projects } = this.state;
    const { handleProjectSelect, project } = this.props;
    const displayValue = project.label ? project.label : project;

    const customStyle = {
      control: base => ({
        ...base,
        borderRadius: '0',
        height: '34px',
        color: 'black',
        backgroundColor: 'white',
        width: '200px',
      }),
      option: base => ({
        ...base,
        color: 'black',
      }),
    };

    return (
      <div className="input-reset db w-20 mh3">
        <Select
          name="selected-project"
          placeholder=""
          value={displayValue}
          onChange={handleProjectSelect}
          options={projects}
          styles={customStyle}
        />
      </div>
    );
  }
}

ProjectSelect.propTypes = {
  handleProjectSelect: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
};

export default ProjectSelect;
