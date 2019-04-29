import { normalize, schema } from 'normalizr';
import { batchActions } from 'redux-batched-actions';
import * as api from '../api';

const taskSchema = new schema.Entity('tasks');
const projectSchema = new schema.Entity('projects', {
  tasks: [taskSchema],
});

function receiveEntities(entities) {
  return {
    type: 'RECEIVE_ENTITIES',
    payload: entities,
  };
}

export function fetchProjectsStarted(boards) {
  return { type: 'FETCH_PROJECTS_STARTED', payload: { boards } };
}

export function fetchProjectsSucceeded(projects) {
  return { type: 'FETCH_PROJECTS_SUCCEEDED', payload: { projects } };
}

export function fetchProjectsFailed(err) {
  return { type: 'FETCH_PROJECTS_FAILED', payload: err };
}

export function setCurrentProject(id) {
  return { type: 'SET_CURRENT_PROJECT_ID', payload: { id } };
}

export function fetchProjects() {
  return async (dispatch, getState) => {
    dispatch(fetchProjectsStarted());

    try {
      const { data } = await api.fetchProjects();
      const normalizedData = normalize(data, [projectSchema]);
      dispatch(batchActions([receiveEntities(normalizedData), setCurrentProject(data[0].id)]));
    } catch (e) {
      console.log(e);
      dispatch(fetchProjectsFailed(e));
    }
  };
}

export function createTaskSucceeded(task) {
  return {
    type: 'CREATE_TASK_SUCCEEDED',
    payload: {
      task,
    },
  };
}

function progressTimerStart(taskId) {
  return { type: 'TIMER_STARTED', payload: { taskId } };
}

function stopTimmer(taskId) {
  return { type: 'TIMER_STOPPED', payload: { taskId } };
}

export function createTask({ title, description, status = 'Unstarted' }) {
  return (dispatch, getState) => {
    const projectId = getState().page?.currentProjectId;

    return api.createTask({ title, description, status, projectId }).then(resp => {
      dispatch(createTaskSucceeded(resp.data));
    });
  };
}

function editTaskSucceeded(task) {
  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: {
      task,
    },
  };
}

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    const task = getState().tasks.items[id];
    const updatedTask = Object.assign({}, task, params);

    api.editTask(id, updatedTask).then(resp => {
      dispatch(editTaskSucceeded(resp.data));

      if (resp.data.status === 'In Progress') {
        dispatch(progressTimerStart(resp.data.id));
      } else {
        dispatch(stopTimmer(resp.data.id));
      }
    });
  };
}

export function filterTasks(searchTerm) {
  return {
    type: 'FILTER_TASKS',
    payload: { searchTerm },
  };
}

export function changeSearchTerm(payload) {
  return {
    type: 'CHANGE_SEARCH_TERM',
    payload,
  };
}
