const express = require('express');

const Projects = require('./projectmodel.js');
const Actions = require('./actionModel.js');

const router = express.Router();

// this only runs if the url has /api/projects in it
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get(req.query);
    res.status(200).json(projects);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the projects',
    });
  }
});

// /api/projects/:id

router.get('/:id', async (req, res) => {
  try {
    const project = await Projects.getById(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the project',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the project',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The project has been nuked' });
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project',
    });
  }
});

// /api/projects/id <  req.params.id
router.put('/:id', async (req, res) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the project',
    });
  }
});

// add an endpoint that returns all the actions for a project
// this is a sub-route or sub-resource
router.get('/:id/actions', async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);

    res.status(200).json(actions);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error getting the actions from the project',
    });
  }
});

router.get('/:id/actions/:aid', async (req, res) => {
  try {
    const action = await Actions.get(req.params.aid);

    res.status(200).json(action);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error getting that action froms the project',
    });
  }
});

// add an endpoint for adding new message to a project
router.post('/:id/actions', async (req, res) => {
  const actionInfo = { ...req.body, project_id: req.params.id };

  try {
    const action = await Actions.insert(actionInfo);
    res.status(210).json(action);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error getting the projects for the project',
    });
  }
});

// /api/projects/id <  req.params.id
router.put('/:id/actions/:aid', async (req, res) => {
  try {
    const action = await Actions.update(req.params.aid, req.body);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the action',
    });
  }
});

router.delete('/:id/actions/:aid', async (req, res) => {
  try {
    const count = await Actions.remove(req.params.aid);
    if (count > 0) {
      res.status(200).json({ message: 'The action has been nuked' });
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the action',
    });
  }
});

module.exports = router;

// https://gitproject.com /luishrd ?tab=repositories