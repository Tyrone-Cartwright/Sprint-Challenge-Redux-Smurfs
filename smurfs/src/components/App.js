import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { getSmurfs, deleteSmurf } from "../actions";
import SmurfForm from "./SmurfForm";
import UpdateSmurf from "./UpdateSmurf";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isHidden: true
    };
  }

  componentDidMount() {
    this.props.getSmurfs();
  }

  updateClick = () => {
    this.setState({ isHidden: !this.state.isHidden });
  };

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <div className="smurf-container">
          <h1>Smurf-Redux</h1>
          <ul>
            {this.props.smurfs.map(smurf => (
              <li key={smurf.id}>
                Name: {smurf.name}, Age: {smurf.age}, Height: {smurf.height}
                cm&nbsp;
                <UpdateSmurf id={smurf.id} hidden={this.state.isHidden} />
                <button
                  className="del-btn"
                  onClick={() => {
                    this.props.deleteSmurf(smurf.id);
                    this.forceUpdate();
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <SmurfForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs
  };
};

export default connect(
  mapStateToProps,
  { getSmurfs, deleteSmurf }
)(App);
