import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage';
import FlashMessage from './components/FlashMessage';
import Header from './components/Header';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main-content">
          <Header />
          <TasksPage />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { error } = state.tasks;
  return {
    error,
  };
}

connect(mapStateToProps)(App);
