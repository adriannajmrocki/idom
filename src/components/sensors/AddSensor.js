import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSensor } from '../../actions/sensors';
import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';
import { withTranslation } from 'react-i18next';

class AddSensor extends Component {

  state = {  
    name: '',
    category: '',
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

  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value })
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
    const { t } = this.props;

    let name = false;
    let category = false;
    let frequencyUnit = false;
    let frequency = false;
    let correct = false;

    if (!this.state.name) {
      this.props.createMessage({ noSensorNameError: `${t('notifications.no-sensor-name-error')}` })
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

    const { t } = this.props;

    return (  
      <div className="col-md-6 m-auto custom-position">
        <div className="card card-body mt-5 custom-border-style custom-position">
          <h2 className="text-center custom-mb">{t('sensors.add-sensor')}</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="form-group">
              <label>{t('sensors.name')}</label>
              <input
                type="text"
                className="form-control custom-input-style"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>

            <div className="form-group">
              <label>{t('sensors.category')}</label>
              <select name="category" className="form-control custom-input-style" value={this.state.category} onChange={this.handleSelect}>
                <option value="" defaultValue></option>
                <option value="temperature">{t('sensors.temp')}</option>
                <option value="water_temp">{t('sensors.water-temp')}</option>
                <option value="humidity">{t('sensors.hum')}</option>
                <option value="air_humidity">{t('sensors.air-hum')}</option>
                <option value="atmo_pressure">{t('sensors.pressure')}</option>
                <option value="breathalyser">{t('sensors.alc')}</option>
                <option value="smoke">{t('sensors.smoke')}</option>
                <option value="gas">Gaz</option>
                <option value="rain_sensor">{t('sensors.rain')}</option>
                <option value="motion_sensor">Ruch</option>
              </select>
            </div>
            
            {this.state.category === 'water_temp' || this.state.category === 'smoke' || this.state.category === 'rain_sensor' || this.state.category === 'breathalyser' || this.state.category === 'gas' || this.state.category === 'motion_sensor' ?
            <div className="form-group">
              <label>{t('sensors.data-samp-freq')}</label>
              <select name="frequencyUnit" className="form-control custom-input-style" value={this.state.frequencyUnit} onChange={this.handleSelect}>
                <option value="" defaultValue></option>
                <option value="seconds">{t('sensors.sec')}</option>
              </select>
            </div>
            :
            <div>
              <label>{t('sensors.data-samp-freq')}</label>
              <select name="frequencyUnit" className="form-control custom-input-style" value={this.state.frequencyUnit} onChange={this.handleSelect}>
                <option value="" defaultValue></option>
                <option value="seconds">{t('sensors.sec')}</option>
                <option value="minutes">{t('sensors.min')}</option>
                <option value="hours">{t('sensors.h')}</option>
                <option value="days">{t('sensors.days')}</option>
              </select>
            </div> }

            {this.state.category === 'water_temp' || this.state.category === 'smoke' || this.state.category === 'rain_sensor' || this.state.category === 'breathalyser' || this.state.category === 'gas' || this.state.category === 'motion_sensor' ?
            <div>
              <label>{t('sensors.value')}</label>
              <select name="frequency" className="form-control custom-input-style" value={this.state.frequency} onChange={this.handleSelect}>
                <option value="" defaultValue></option>
                <option value="30">30</option>
              </select>
            </div>
            :
            <div className="form-group">
              <input
                type="number"
                className="form-control custom-input-style"
                name="frequency"
                onChange={this.handleChange}
                value={this.state.frequency}
                placeholder={`${t('sensors.value')}...`}
              />
            </div> }

            <div className="ff-center">
              <button className="button">{t('sensors.add')}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
 
export default withTranslation('common')(connect(null, { createMessage, addSensor })(AddSensor));