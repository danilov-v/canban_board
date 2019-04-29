import React from 'react';
import { connect } from 'react-redux';
import Select from './Select';
import { getProjectOptions, currentProjectId, getCurrentProjectId } from '../reducers';
import { setCurrentProject } from '../actions';

class Header extends React.Component {
  onChange = e => {
    this.props.onChangeProject(e.target.value);
  };

  render() {
    const { projectOptions, currentProjectId } = this.props;

    return (
      <div className="page-header">
        <div className="project-­item">
          Project:
          <Select options={projectOptions} onChange={this.onChange} value={currentProjectId} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectOptions: getProjectOptions(state),
    currentProjectId: getCurrentProjectId(state),
  };
};

const mapDispatch = dispatch => {
  return {
    onChangeProject: id => dispatch(setCurrentProject(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(Header);
