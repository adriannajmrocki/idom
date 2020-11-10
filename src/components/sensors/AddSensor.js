import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSensor } from '../../actions/sensors';
import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';

import Select from 'react-select';

const categoryOptions = [
  { value: "temperature", label: "Temperatura" },
  { value: "water_temp", label: "Temperatura wody" },
  { value: "humidity", label: "Wilgotność" }
]

const frequencyUnitOptions = [
  { value: "seconds", label: "Sekundy" },
  { value: "minutes", label: "Minuty" },
  { value: "hours", label: "Godziny" },
  { value: "days", label: "Dni" },
];

const secondsOption = [
  { value: 'seconds', label: 'Sekundy' }
]

const constFrequencyOption = [
  { value: '30', label: '30' }
]

class AddSensor extends Component {
  state = {  
    name: '',
    category: '',
    selectedCategoryLabel: '',
    frequencyUnit: '',
    frequency: '',
  }

  static propTypes = {
    addSensor: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCategorySelect = category => {
    this.setState({
      category: category,
      selectedCategoryLabel: category.label
    })
  }

  handleFrequencyUnitSelect = frequencyUnit => {
    this.setState({ frequencyUnit: frequencyUnit })
  }

  handleConstFrequencySelect = frequency => {
    this.setState({ frequency: frequency.value })
  }

  callback = () => {
    let sensor = {};
    sensor = {
      name: this.state.name,
      category: this.state.category.value,
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
    } else if (this.state.frequencyUnit.value === 'seconds' && this.state.frequency < 30) {
      this.props.createMessage({ frequencyMinSecondsError: 'Minimalna liczba sekund: 30' })
    } else if (this.state.frequencyUnit.value === 'seconds' && this.state.frequency > 21474836) {
      this.props.createMessage({ frequencyMaxSecondsError: 'Maksymalna liczba sekund: 21474836' })
    } else if (this.state.frequencyUnit.value === 'minutes' && this.state.frequency < 1) {
      this.props.createMessage({ frequencyMinMinutesError: 'Minimalna liczba minut: 1' })
    } else if (this.state.frequencyUnit.value === 'minutes' && this.state.frequency > 357913) {
      this.props.createMessage({ frequencyMaxMinutesError: 'Maksymalna liczba minut: 357913' })
    } else if (this.state.frequencyUnit.value === 'hours' && this.state.frequency < 1) {
      this.props.createMessage({ frequencyMinHoursError: 'Minimalna liczba godzin: 1' })
    } else if (this.state.frequencyUnit.value === 'hours' && this.state.frequency > 5965) {
      this.props.createMessage({ frequencyMaxHoursError: 'Maksymalna liczba godzin: 5965' })
    } else if (this.state.frequencyUnit.value === 'days' && this.state.frequency < 1) {
      this.props.createMessage({ frequencyMinDaysError: 'Minimalna liczba dni: 1' })
    } else if (this.state.frequencyUnit.value === 'days' && this.state.frequency > 248) {
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
      if (frequencyUnit.value === 'seconds') {
        this.callback();
      } else if (frequencyUnit.value === 'minutes') {
        this.setState({
          frequency: frequency * 60
        },
        () => {
          this.callback();
        })
      } else if (frequencyUnit.value === 'hours') {
        this.setState({
          frequency: frequency * 3600
        },
        () => {
          this.callback();
        })
      } else if (frequencyUnit.value === 'days') {
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
              <Select
                value={this.state.category}
                onChange={this.handleCategorySelect}
                options={categoryOptions}
                placeholder={'Wybierz...'}
              />
            </div>
            
            {this.state.selectedCategoryLabel !== 'Temperatura wody' ?
            <div>
              <label>Częstotliwość pobierania danych</label>
              <Select
                value={this.state.frequencyUnit}
                onChange={this.handleFrequencyUnitSelect}
                options={frequencyUnitOptions}
                placeholder={'Wybierz...'}
              />
            </div> :
            <div>
              <label>Częstotliwość pobierania danych</label>
              <Select 
                options={secondsOption}
                value={this.state.frequencyUnit}
                onChange={this.handleFrequencyUnitSelect}
                placeholder={'Wybierz...'}
              />
            </div> }

            {this.state.selectedCategoryLabel !== 'Temperatura wody' ?
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
             :
            <div>
              <label>Wartość</label>
              <Select 
                options={constFrequencyOption}
                value={this.state.frequency.value}
                onChange={this.handleConstFrequencySelect}
                placeholder={'Wybierz...'}
              />
            </div> }

            <div className="form-group">
              <button className="btn btn-primary">Dodaj</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
 
export default connect(null, { createMessage, addSensor })(AddSensor);