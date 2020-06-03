import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSensor } from '../actions/sensors';

class EditSensorPage extends Component {
  state = {  
    name: '',
    category: ''
  }

  static propTypes = {
    updateSensor: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({ name: e.target.value })
  }

  handleSelect = e => {
    this.setState({ category: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("name: " + this.state.name, "category: " + this.state.category)

    const id = this.props.match.params.id;

    const { name, category } = this.state;
    const sensor = { name, category };

    this.props.updateSensor(id, sensor);
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Edytuj czujnik</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Nazwa</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label>Kategoria</label>
            <select className="form-control" onChange={this.handleSelect} value={this.state.category}>
              <option></option>
              <option value="temperature">Czujnik temperatury</option>
              <option value="humidity">Czujnik wilgotności</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Potwierdź</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}
 
export default connect(null, { updateSensor })(EditSensorPage);