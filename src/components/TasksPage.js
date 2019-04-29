import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskList from './TaskList';
import { getGroupedAndFilteredTasks, getProjectOptions } from '../reducers';
import { createTask, editTask, fetchProjects, filterTasks } from '../actions';
import CreateTaskForm from './CreateTaskForm';
import { TASK_STATUSES } from '../constants';

class TasksPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }

  onCreateTask = task => this.props.dispatch(createTask(task));

  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }));
  };

  onSearch = e => this.props.dispatch(filterTasks(e.target.value));

  renderTasks = () => {
    const { tasks } = this.props;
    return TASK_STATUSES.map(status => {
      const statusTasks = tasks[status];

      return (
        <TaskList
          key={status}
          status={status}
          tasks={statusTasks}
          onStatusChange={this.onStatusChange}
        />
      );
    });
  };

  render() {
    if (this.props.isLoading) {
      return <div className="tasks-loading">Loading...</div>;
    }

    return (
      <div className="tasks">
        <div className="tasks-header">
          <input type="text" onChange={this.onSearch} value={this.props.searchTerm} />
          <CreateTaskForm onSubmit={this.onCreateTask} />
        </div>
        <div className="task-lists">{this.renderTasks()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoading, error, searchTerm } = state.tasks;
  return {
    tasks: getGroupedAndFilteredTasks(state),
    isLoading,
    error,
    searchTerm,
  };
}

export default connect(mapStateToProps)(TasksPage);
