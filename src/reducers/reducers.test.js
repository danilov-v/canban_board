import { tasks } from '.';

describe('the tasks reducer', () => {
  const initialState = {
    items: {},
    isLoading: false,
    error: null,
  };

  it('should return initial state', () => {
    const actualResult = tasks(undefined, {});
    const expectedResult = initialState;

    expect(actualResult).toEqual(expectedResult);
  });

  it('should handle the FETCH_TASKS_STARTED action', () => {
    const actualResult = tasks(undefined, { type: 'FETCH_TASKS_STARTED' });
    const expectedResult = { ...initialState, isLoading: true };

    expect(actualResult).toEqual(expectedResult);
  });

  it('should handle the RECEIVE_ENTITIES action', () => {
    const testAction = {
      type: 'RECEIVE_ENTITIES',
      payload: {
        entities: {
          tasks: {
            1: {
              id: 1,
              title: 'title',
            },
          },
        },
      },
    };
    const actualResult = tasks(undefined, testAction);
    const expectedResult = {
      ...initialState,
      isLoading: false,
      items: { 1: { id: 1, title: 'title' } },
    };

    expect(actualResult).toEqual(expectedResult);
  });

  it('should handle the EDIT_TASK_SUCCEEDED action', () => {
    const initial = {
      ...initialState,
      items: {
        1: {
          id: 1,
          title: 'name-1',
          desk: 'text-1',
        },
      },
    };

    const task = {
      id: 1,
      title: 'title',
      description: 'description',
    };

    const actualResult = tasks(initial, { type: 'EDIT_TASK_SUCCEEDED', payload: { task } });
    const expectedResult = { ...initial, isLoading: false, items: { [task.id]: task } };

    expect(actualResult).toEqual(expectedResult);
  });
});
