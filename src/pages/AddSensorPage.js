import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSensor } from '../actions/sensors';
import { createMessage } from '../actions/messages';
import Alerts from '../layouts/Alerts';

class AddSensorPage extends Component {
  state = {  
    name: '',
    category: '',
    frequencyUnit: '',
    frequency: ''
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

  formValidation = () => {
    let name = false;
    let category = false;
    let frequencyUnit = false;
    let frequency = false;
    let correct = false;

    if (!this.state.name) {
      this.props.createMessage({ noSensorNameError: 'Podaj nazwę czujnika' })
    } else {
      name = true;
    }

    if (!this.state.category) {
      this.props.createMessage({ noSensorCategoryError: 'Wybierz kategorię' })
    } else {
      category = true;
    }

    if (!this.state.frequencyUnit) {
      this.props.createMessage({ noFrequencyUnitError: 'Podaj jednostkę częstotliwości' })
    } else if (this.state.frequencyUnit === 'seconds' && this.state.frequency < 30) {
      this.props.createMessage({ frequencyMinSecondsError: 'Minimalna liczba sekund: 30' })
    } else if (this.state.frequencyUnit === 'seconds' && this.state.frequency > 21474836) {
      this.props.createMessage({ frequencyMaxSecondsError: 'Maksymalna liczba sekund: 21474836' })
    } else if (this.state.frequencyUnit === 'minutes' && this.state.frequency < 1) {
      this.props.createMessage({ frequencyMinMinutesError: 'Minimalna liczba minut: 1' })
    } else if (this.state.frequencyUnit === 'minutes' && this.state.frequency > 357913) {
      this.props.createMessage({ frequencyMaxMinutesError: 'Maksymalna liczba minut: 357913' })
    } else if (this.state.frequencyUnit === 'hours' && this.state.frequency < 1) {
      this.props.createMessage({ frequencyMinHoursError: 'Minimalna liczba godzin: 1' })
    } else if (this.state.frequencyUnit === 'hours' && this.state.frequency > 5965) {
      this.props.createMessage({ frequencyMaxHoursError: 'Maksymalna liczba godzin: 5965' })
    } else if (this.state.frequencyUnit === 'days' && this.state.frequency < 1) {
      this.props.createMessage({ frequencyMinDaysError: 'Minimalna liczba dni: 1' })
    } else if (this.state.frequencyUnit === 'days' && this.state.frequency > 248) {
      this.props.createMessage({ frequencyMaxDaysError: 'Maksymalna liczba dni: 248' })
    } else {
      frequencyUnit = true;
    }

    if (!this.state.frequency) {
      this.props.createMessage({ noFrequencyError: 'Podaj wartość częstotliwości' })
    } else {
      frequency = true;
    }

    if (name && category && frequencyUnit && frequency) {
      correct = true;
    }

    return ({
      name,
      category,
      frequency,
      frequencyUnit,
      correct
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    const { frequency, frequencyUnit } = this.state;
    const validation = this.formValidation();

    if (validation.correct) {
      if (frequencyUnit === 'seconds') {
        this.callback();
      } else if (frequencyUnit === 'minutes') {
        this.setState({
          frequency: frequency * 60
        },
        () => {
          this.callback();
        })
      } else if (frequencyUnit === 'hours') {
        this.setState({
          frequency: frequency * 3600
        },
        () => {
          this.callback();
        })
      } else if (frequencyUnit === 'days') {
        this.setState({
          frequency: frequency * 86400
        },
        () => {
          this.callback();
        })
      }
    }
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Dodaj czujnik</h2>
          <form onSubmit={this.handleSubmit} noValidate>
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