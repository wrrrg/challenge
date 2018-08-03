import axios from 'axios';

const { API_URL } = process.env;

export const fetchProjectsForDropdown = async () => {
  const response = await axios.get(`${API_URL}/projects`);

  const formattedArray = response.data.map(project => ({
    _id: project._id, // eslint-disable-line no-underscore-dangle
    label: project.name,
    value: project.number,
  }));

  return formattedArray;
};

export const fetchProjectsForAdmin = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export default { fetchProjectsForDropdown, fetchProjectsForAdmin };
