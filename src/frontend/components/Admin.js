import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-super-modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { fetchProjectsForAdmin } from '../../utils/fetchProjects';

const { API_URL } = process.env;
const ERROR_STRING = 'Something went wrong...please try again later';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      projects: [],
      projId: '',
      projNumber: '',
      projClient: '',
      projName: '',
      isEditMode: false,
      isDeleteMode: false,
      isError: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postProject = this.postProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.getDisabledStatus = this.getDisabledStatus.bind(this);
    this.handleProjectEdit = this.handleProjectEdit.bind(this);
  }

  componentDidMount() {
    fetchProjectsForAdmin().then(projects => this.setState({ projects }));
  }

  getDisabledStatus() {
    const { projClient, projName, projNumber } = this.state;
    return projNumber.length === 0 || projName.length === 0 || projClient.length === 0;
  }

  showModal() {
    this.setState({ isModalOpen: true });
  }

  hideModal() {
    this.setState({
      isModalOpen: false, isEditMode: false, isDeleteMode: false, projNumber: '', projClient: '', projName: '', isError: false,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  postProject() {
    const { projClient, projName, projNumber } = this.state;
    axios.post(`${API_URL}/projects`, {
      number: projNumber,
      name: projName,
      client: projClient,
    })
      .then(response => response.send(response.error));
  }

  async deleteProject() {
    const { projId, projects } = this.state;
    try {
      await axios.delete(`${API_URL}/projects/${projId}`);
      const index = projects.map(project => project._id)// eslint-disable-line no-underscore-dangle
        .indexOf(projId);
      const slicedArray = [...projects.slice(0, index), ...projects.slice(index + 1)];
      this.setState({ projects: slicedArray });
      this.hideModal();
    } catch (error) {
      this.setState({ isError: true });
    }
  }

  updateProject() {
    const {
      projId, projClient, projName, projNumber,
    } = this.state;
    axios.put(`${API_URL}/projects/${projId}`, {
      number: projNumber,
      name: projName,
      client: projClient,
    })
      .then(response => response.send(response.error));
  }

  handleProjectEdit(projId, projNumber, projClient, projName) {
    this.showModal();
    this.setState({
      isEditMode: true, projId, projNumber, projClient, projName,
    });
  }

  handleProjectDelete(projId, projName) {
    this.showModal();
    this.setState({ projId, projName, isDeleteMode: true });
  }


  render() {
    const {
      projects,
      isModalOpen,
      projNumber,
      projName,
      projClient,
      isEditMode,
      isDeleteMode,
      isError,
    } = this.state;

    return (
      <div className="tc measure center ph2 lh-copy">
        <h1 className="mb0 fw9 dib tracked-tight mooveItNavy">ADMIN PORTAL</h1>
        <Link className="fw9 tracked-tight mooveItNavy" to="/dashboard">
          <p className="mt0 mb4">Take me to dashboard</p>
        </Link>
        <h2>Current Projects <FontAwesomeIcon className="tl mooveItNavy pointer" icon={faPlusCircle} size="1x" onClick={this.showModal} /></h2>
        <Modal isOpen={isModalOpen} onClose={this.hideModal}>
          {
            isDeleteMode ?
              <div className="tc measure center">
                <p className="mooveItNavy">{isError ? ERROR_STRING : `Are you sure you want to delete "${projName}"?`}</p>
                {isError ? <button className="f6 mb2 mh2 ph3 pv2 outline-0 input-reset dib bg-transparent ba mooveItTealBorder white mooveItNavybg pointer" onClick={this.hideModal}>OK</button> :
                <button className="f6 mb2 mh2 ph3 pv2 outline-0 input-reset dib bg-transparent ba mooveItTealBorder white mooveItNavybg pointer" onClick={this.deleteProject}>Yes</button>}
              </div>
            :
              <form onSubmit={isEditMode ? this.updateProject : this.postProject}>
                <fieldset className="ba b--transparent ph0 mh0">
                  <legend className="pt2 mooveItTeal f5 fw6 ph0 mh3 tl">{isEditMode ? 'Edit Project' : 'New Project'}</legend>
                  <div className="mt3">
                    <label className="mooveItTeal db fw6 lh-copy f6 tl mh3" htmlFor="projNumber">
                      Project Number
                      <input
                        className="pa2 outline-0 mooveItTealBorder input-reset ba bg-transparent w-100"
                        value={projNumber}
                        onChange={this.handleChange}
                        type="text"
                        name="projNumber"
                        autoComplete="off"
                      />
                    </label>
                  </div>
                  <div className="mv3">
                    <label className="mooveItTeal db fw6 lh-copy f6 tl mh3" htmlFor="projClient">
                      Client
                      <input
                        className="pa2 outline-0 mooveItTealBorder input-reset ba bg-transparent w-100"
                        value={projClient}
                        onChange={this.handleChange}
                        type="text"
                        name="projClient"
                        autoComplete="off"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="mooveItTeal db fw6 lh-copy f6 tl mh3" htmlFor="projName">
                      Project Name
                      <input
                        className="pa2 outline-0 mooveItTealBorder input-reset ba bg-transparent w-100"
                        value={projName}
                        onChange={this.handleChange}
                        type="text"
                        name="projName"
                        autoComplete="off"
                      />
                    </label>
                  </div>
                </fieldset>
                <div>
                  <input
                    className={`f6 mh3 mb2 ph3 pv2 outline-0 input-reset dib bg-transparent ba b--moon-gray bg-white moon-gray ${!this.getDisabledStatus() && 'mooveItNavybg mooveItTeal pointer'}`}
                    type="submit"
                    value="Submit"
                    disabled={this.getDisabledStatus()}
                  />
                </div>
              </form>
        }
        </Modal>
        {
          projects.map(project => (
            <p className="tl" key={project._id}> {/* eslint-disable-line no-underscore-dangle */}
              {project.number} {project.client} -- {project.name} <FontAwesomeIcon className="mooveItNavy pointer" onClick={() => this.handleProjectEdit(project._id, project.number, project.client, project.name)} icon={faEdit} size="1x" /> <FontAwesomeIcon className="mooveItPink pointer" onClick={() => this.handleProjectDelete(project._id, project.name)} icon={faTrashAlt} size="1x" /> {/* eslint-disable-line no-underscore-dangle */}
            </p>
          ))
        }
      </div>
    );
  }
}

export default Admin;
