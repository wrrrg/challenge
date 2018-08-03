const router = require('express').Router();
const postToken = require('../operations/auth/postToken');
const getUsers = require('../operations/auth/getAll');
const getUserByEmail = require('../operations/auth/getByEmail');
const getAllProjects = require('../operations/projects/getAllProjects');
const createProject = require('../operations/projects/createProject');
const deleteProject = require('../operations/projects/deleteProject');
const updateProject = require('../operations/projects/updateProject');
const findTimeEntries = require('../operations/timeEntries/findTimeEntries');
const createTimeEntry = require('../operations/timeEntries/createTimeEntry');
const deleteTimeEntries = require('../operations/timeEntries/deleteTimeEntries');

// auth routes
router.post('/auth/github', postToken);
router.get('/api/users', getUsers);
router.get('/api/users/:email', getUserByEmail);

// project routes
router.get('/api/projects', getAllProjects);
router.post('/api/projects', createProject);
router.delete('/api/projects/:projectId', deleteProject);
router.put('/api/projects/:projectId', updateProject);

// time entry routes
router.get('/api/entries', findTimeEntries);
router.post('/api/entries', createTimeEntry);
router.delete('/api/entries', deleteTimeEntries);

module.exports = router;
