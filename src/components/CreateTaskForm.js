import React from 'react';

export default class createTaskForm extends React.PureComponent {
  defaultState = {
    title: '',
    description: '',
    timer: 0,
    isFormOpen: false,
  };

  state = this.defaultState;

  toggleForm = () => this.setState({ isFormOpen: !this.state.isFormOpen });

  closeForm = () => this.setState({ isFormOpen: false });

  onChangeTitle = e => this.setState({ title: e.target.value });

  onChangeDescription = e => this.setState({ description: e.target.value });

  resetForm = () => this.setState(defaultState);

  onSubmit = e => {
    e.preventDefault();
    const { title, description, timer } = this.state;
    this.props.onSubmit({ title, description, timer });
    this.closeForm();
  };

  render() {
    const { isFormOpen, title, description } = this.state;
    const display = isFormOpen ? 'block' : 'none';

    return (
      <>

        <button className="button button-default" onClick={this.toggleForm}>
          + New task
       </button>

        <form className="new-task-form" onSubmit={this.onSubmit} style={{ display }}>
         <input
            className="full-width-input"
            onChange={this.onTitleChange}
            value={title}
            type="text"
            placeholder="title"
          />
         <input
            className="full-width-input"
            onChange={this.onDescriptionChange}
            value={description}
            type="text"
            placeholder="description"
          />
         <button className="button" type="submit">
            Save
          </button>
       </form>
       
      </>
    );
  }
}
