import React from 'react';
import { connect } from 'react-redux';
import Select from './Select';
import { TASK_STATUSES } from '../constants';
import { getTaskById } from '../reducers';

const statusOptions = TASK_STATUSES.map(item => ({ value: item, label: item }));

const Task = props => {
  const { title, status, description, timer } = props.task;

  return (
    <div className="task">
      <div className="task-header">
        <div>{title}</div>
        <Select value={status} options={statusOptions} onChange={onStatusChange} />
      </div>
      <hr />
      <div className="task-body">{description}</div>
      <div className="task-timer">{timer}s</div>
    </div>
  );

  function onStatusChange(e) {
    props.onStatusChange(props.task.id, e.target.value);
  }
};

Task.defaultProps = {
  task: {},
};

const mapStateToProps = (state, ownProps) => {
  const { taskId } = ownProps;
  return {
    task: getTaskById(state)(taskId),
  };
};

export default connect(mapStateToProps)(Task);
