const db = require('../dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  getProjectActions,
};

function get() {
  return db('projects');
}

function getById(id) {
  let query = db('projects as p');

  if (id) {
    query.where('p.id', id).first();

    const promises = [query, this.getProjectActions(id)]; // [ projects, actions ]

    return Promise.all(promises).then(function(results) {
      let [project, actions] = results;

      if (project) {
        project.actions = actions;

        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  }

  return query.then(projects => {
    return projects.map(project => mappers.projectToBody(project));
  });
}

function insert(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => this.getById(id));
}

function update(id, changes) {
  return db('projects')
    .where('id', id)
    .update(changes)
    .then(count => (count > 0 ? this.getById(id) : null));
}

function remove(id) {
  return db('projects')
    .where('id', id)
    .del();
}

function getProjectActions(projectId) {
  return db('actions')
    .where('project_id', projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
}
