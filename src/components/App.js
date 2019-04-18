import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearAll } from "../actions/index";
import moment from "moment";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: ""
    };
  }

  addReminder(text, dueDate) {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group">
        {reminders.map(reminder => {
          return (
            <div className="row">
              <li key={reminder.id} className="list-group-item mt-2 mb-2 col">
                <div className="list-item d-inline-block">
                  <div>{reminder.text}</div>
                  <div>
                    <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
                  </div>
                </div>
              </li>
              <button
                className="list-item d-inline-block button btn btn-danger ml-2 col"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </button>
            </div>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className="App text-center">
        <div className="title">Reminder online!</div>
        <div className="form mt-2 mb-2">
          <div className="form-group ">
            <input
              className="form-control mt-2 mb-2"
              placeholder="I have to ..."
              onChange={event => this.setState({ text: event.target.value })}
            />
            <input
              className="form-control mt-2 mb-2"
              type="datetime-local"
              onChange={event => this.setState({ dueDate: event.target.value })}
            />
          </div>
          <button
            className="btn btn-success"
            type="button"
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
          {this.renderReminders()}
        </div>
        <button
          className="btn btn-danger"
          onClick={() => this.props.clearAll()}
        >
          Clear all
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { reminders: state };
}

export default connect(
  mapStateToProps,
  { addReminder, deleteReminder, clearAll }
)(App);
