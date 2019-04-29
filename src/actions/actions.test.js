import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createTask, createTaskSucceeded } from '.';
import * as api from '../api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.unmock('../api');
api.createTask = jest.fn(() => new Promise((resolve, reject) => resolve({ data: 'foo' })));

describe('action creators', () => {
  it('should handle successful task creation', () => {
    const task = {
      title: 'Some Title',
      description: 'Some description',
    };
    const expectedAction = {
      type: 'CREATE_TASK_SUCCEEDED',
      payload: {
        task: {
          title: 'Some Title',
          description: 'Some description',
        },
      },
    };

    expect(createTaskSucceeded(task)).toEqual(expectedAction);
  });
});

describe('createTask', () => {
  it('works', () => {
    const expectedActions = [{ type: 'CREATE_TASK_SUCCEEDED', payload: { task: 'foo' } }];

    const store = mockStore({
      tasks: {
        tasks: [],
      },
    });

    return store.dispatch(createTask({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.createTask).toHaveBeenCalled();
    });
  });
});
