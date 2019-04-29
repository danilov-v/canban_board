import { createSelector } from 'reselect';

const initialState = {
  items: {},
  isLoading: false,
  error: null,
};

export function projects(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS_STARTED': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'RECEIVE_ENTITIES': {
      const { entities } = action.payload;
      const items = entities?.projects;

      return items
        ? {
            ...state,
            items,
            isLoading: false,
          }
        : state;
    }

    case 'FETCH_PROJECTS_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    case 'CREATE_TASK_SUCCEEDED': {
      const { id, projectId } = action.payload.task;
      const { items } = state;
      const project = items[projectId];

      return {
        ...state,
        items: {
          ...items,
          [projectId]: { ...project, tasks: project.tasks.concat([id]) },
        },
      };
    }

    default: {
      return state;
    }
  }
}

const initialPageState = {
  currentProjectId: 1,
  searchTerm: '',
};

export function page(state = initialPageState, action) {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT_ID': {
      return {
        ...state,
        currentProjectId: action.payload.id,
      };
    }
    case 'CHANGE_SEARCH_TERM': {
      return { ...state, searchTerm: action.payload.searchTerm };
    }
    default: {
      return state;
    }
  }
}

const defaultTasksState = {
  items: {},
  isLoading: false,
  error: null,
};

export const tasks = (state = defaultTasksState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_STARTED':
      return {
        ...state,
        isLoading: true,
      };

    case 'RECEIVE_ENTITIES': {
      const { entities } = action.payload;
      const items = entities?.tasks;

      return tasks
        ? {
            ...state,
            items,
            isLoading: false,
          }
        : state;
    }

    case 'EDIT_TASK_SUCCEEDED':
    case 'CREATE_TASK_SUCCEEDED': {
      const { task } = action.payload;
      return {
        ...state,
        items: { ...state.items, [task.id]: task },
      };
    }

    case 'TIMER_INCREMENT': {
      const { taskId } = action.payload;
      const nextTask = { ...state.items[taskId] };

      nextTask.timer += 1;

      return Object.assign({}, state, { items: { ...state.items, [taskId]: nextTask } });
    }

    default: {
      return state;
    }
  }
};

export const getCurrentProjectId = state => state.page.currentProjectId;

export const getTasksByProjectId = state => {
  const { currentProjectId } = state.page;
  const { items } = state.tasks;

  return state.projects.items[currentProjectId]?.tasks.map(id => items[id]);
};

const getSearchTerm = state => state.page.searchTerm;

export const getFilteredTasks = createSelector(
  [getTasksByProjectId, getSearchTerm],
  (tasks, searchTerm) => {
    if (!tasks) return [];

    return tasks.filter(task => {
      return task && task.title.match(new RegExp(searchTerm, 'i'));
    });
  },
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  tasks => {
    return tasks.reduce((tasksGroup, task) => {
      const { id, status } = task;
      tasksGroup[status] = [id].concat(tasksGroup[status] || []);
      return tasksGroup;
    }, {});
  },
);

export const getProjectOptions = createSelector(
  state => state.projects,
  ({ items }) => Object.values(items).map(({ name, id }) => ({ label: name, value: id })),
);

export const getTaskById = createSelector(
  state => state.tasks.items,
  tasks => id => tasks[id],
);
