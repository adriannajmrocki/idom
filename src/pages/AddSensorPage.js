import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSensor } from '../actions/sensors';
import { createMessage } from '../actions/messages';

class AddSensorPage extends Component {
  state = {  
    name: '',
    category: '',
    frequencyUnit: '',
    frequency: '',
    minValue: '',
    maxValue: ''
  }

  static propTypes = {
    addSensor: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCategorySelect = e => {
    this.setState({ category: e.target.value })
  }

  handleFrequencyUnitSelect = e => {
    this.setState({ frequencyUnit: e.target.value })
  }

  callback = () => {
    let sensor = {};
    sensor = {
      name: this.state.name,
      category: this.state.category,
      frequency: this.state.frequency
    };
    console.log(sensor);
    this.props.addSensor(sensor);
    this.setState({
      name: "",
      category: "",
      frequencyUnit: "",
      frequency: ""
    });
  };


  handleSubmit = e => {
    e.preventDefault();
    const { frequency, frequencyUnit } = this.state;

    // Frequency validation
    if (frequencyUnit === 'seconds' && frequency >= 30) {
      this.setState({
        minValue: '30',
        maxValue: '21474836'
      },
      () => {
        this.callback();
      })
    } else {
      // createMessage({ frequencyError: 'Minimalna częstotliwość to 30 sekund' });
      alert('Minimalna częstotliwość to 30 sekund');
    }

    if (frequencyUnit === 'minutes') {
      this.setState({
        minValue: '1',
        maxValue: '357913',
        frequency: frequency * 60
      },
      () => {
        this.callback();
      })
    }

    if (frequencyUnit === 'hours') {
      this.setState({
        minValue: '1',
        maxValue: '5965',
        frequency: frequency * 3600
      },
      () => {
        this.callback();
      })
    }

    if (frequencyUnit === 'days') {
      this.setState({
        minValue: '1',
        maxValue: '248',
        frequency: frequency * 86400
      },
      () => {
        this.callback();
      })
    }
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
              <select className="form-control" onChange={this.handleCategorySelect} value={this.state.category}>
                <option></option>
                <option value="temperature">Czujnik temperatury</option>
                <option value="humidity">Czujnik wilgotności</option>
              </select>
            </div>
            <div className="form-group">
              <label>Częstotliwość pobierania danych</label>
              <select className="form-control" onChange={this.handleFrequencyUnitSelect} value={this.state.frequencyUnit}>
                <option></option>
                <option value="seconds">Sekundy</option>
                <option value="minutes">Minuty</option>
                <option value="hours">Godziny</option>
                <option value="days">Dni</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                name="frequency"
                onChange={this.handleChange}
                value={this.state.frequency}
                placeholder="Wartość..."
                min={this.state.minValue}
                max={this.state.maxValue}
              />
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
 
export default connect(null, { createMessage, addSensor })(AddSensorPage);