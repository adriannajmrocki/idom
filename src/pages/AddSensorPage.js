import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSensor } from '../actions/sensors';

class AddSensorPage extends Component {
  state = {  
    name: '',
    category: ''
  }

  static propTypes = {
    addSensor: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({
      name: e.target.value,
    })
  }

  handleSelect = e => {
    this.setState({
      category: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("name: " + this.state.name, "category: " + this.state.category)

    const { name, category } = this.state;
    const sensor = { name, category };

    this.props.addSensor(sensor);
    this.setState({
      name: '',
      category: ''
    })
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Dodaj czujnik</h2>
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
              <button className="btn btn-primary">Dodaj</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
 
export default connect(null, { addSensor })(AddSensorPage);