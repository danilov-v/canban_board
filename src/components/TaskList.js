import React from 'react';
import Task from './Task';

const TaskList = ({ tasks = [], status, onStatusChange }) => {
  return (
    <div className="task-list">
      <div className="task-list-title">
        <strong>{status}</strong>
      </div>
      {tasks.map(id => (
        <Task key={id} taskId={id} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
};

export default TaskList;
