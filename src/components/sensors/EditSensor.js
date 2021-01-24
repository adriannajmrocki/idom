import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { updateSensor, getSensorData } from '../../actions/sensors';
import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';

class EditSensor extends Component {

  state = {
    name: '',
    category: '',
    frequencyUnit: '',
    frequency: ''
  }

  static propTypes = {
    sensorName: PropTypes.string.isRequired,
    sensorCategory: PropTypes.string.isRequired,
    sensorFrequency: PropTypes.string.isRequired,
    updateSensor: PropTypes.func.isRequired,
    getSensorData: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCategorySelect = e => {
    this.setState({ category: e.target.value })
  }

  handleFrequencyUnitSelect = e => {
    this.setState({ frequencyUnit: e.target.value })
  }

  handleFrequencySelect = e => {
    this.setState({ frequency: e.target.value })
  }

  callback = () => {
    const id = this.props.match.params.id
    let { name, category, frequency } = this.state;

    let sensor = {};
    sensor = {
      name: name,
      category: category,
      frequency: frequency
    };

    if (!name) {
      name = undefined;
      sensor = { name, category, frequency }
    }

    if (!category) {
      category = undefined;
      sensor = { name, category, frequency }
    }

    if (!frequency) {
      frequency = undefined;
      sensor = { name, category, frequency }
    }

    if (name === undefined && category === undefined && frequency === undefined) {
      this.props.createMessage({ dataNotChanged: 'Żadne dane nie zostały zmienione' });
    } else {
      this.props.updateSensor(id, sensor);
    }

    console.log(sensor);
    this.setState({
      name: "",
      category: "",
      frequencyUnit: "",
      frequency: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { name, category, frequency, frequencyUnit } = this.state;

    if (!name && !category && !frequency && !frequencyUnit) this.callback();
    if ((!name || !category || !frequency || !frequencyUnit) || (name || category || frequency || frequencyUnit)) {
      if (frequencyUnit && !frequency) {
        this.props.createMessage({ noFrequencyError: 'Podaj wartość częstotliwości' })
      } else if (!frequencyUnit && frequency) {
        this.props.createMessage({ noFrequencyUnitError: 'Podaj jednostkę częstotliwości' })
      } else if (frequencyUnit && frequency) {
        if (frequencyUnit === 'seconds' && frequency >= 30) this.callback();
        else if (frequencyUnit === 'seconds' && frequency < 30) this.props.createMessage({ frequencyMinSecondsError: 'Minimalna liczba sekund: 30' })
        else if (frequencyUnit === 'minutes') {
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
      else this.callback();
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    
    this.props.getSensorData(id)
  }

  render() { 

    const { t } = this.props;

    return (  
      <div className="col-md-6 m-auto custom-position">
      <div className="card card-body mt-5 custom-border-style custom-position">
        <h2 className="text-center custom-mb">{t('sensors.edit-sensor')}</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>{t('sensors.name')}</label>
            <input
              type="text"
              className="form-control custom-input-style"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder={this.props.sensorName}
            />
          </div>

          {/* {this.props.sensorCategory !== 'water_temp' && this.props.sensorCategory !== 'smoke' && this.props.sensorCategory !== 'rain_sensor' && this.props.sensorCategory !== 'breathalyser' ? */}
          <div className="form-group">
            <label>{t('sensors.category')}</label>
            <select className="form-control custom-input-style" onChange={this.handleCategorySelect} value={this.state.category}>
              <option value="" disabled defaultValue>{(this.props.sensorCategory === 'temperature' && `${t('sensors.temp')}`) || (this.props.sensorCategory === 'water_temp' && `${t('sensors.water_temp')}`) || (this.props.sensorCategory === 'humidity' && `${t('sensors.hum')}`) || (this.props.sensorCategory === 'air_humidity' && `${t('sensors.air_hum')}`) || (this.props.sensorCategory === 'atmo_pressure' && `${t('sensors.pressure')}`) || (this.props.sensorCategory === 'breathalyser' && `${t('sensors.alc')}`) || (this.props.sensorCategory === 'smoke' && `${t('sensors.smoke')}`) || (this.props.sensorCategory === 'gas' && `Gaz`) || (this.props.sensorCategory === 'rain_sensor' && `${t('sensors.rain')}`) || (this.props.sensorCategory === 'motion_sensor' && 'Ruch')}</option>
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
          {/* : false} */}

          {(this.props.sensorCategory !== 'water_temp' && this.props.sensorCategory !== 'smoke' && this.props.sensorCategory !== 'rain_sensor' && this.props.sensorCategory !== 'breathalyser' && this.props.sensorCategory !== 'gas' && this.props.sensorCategory !== 'motion_sensor') && (this.state.category !== 'water_temp' && this.state.category !== 'smoke' && this.state.category !== 'rain_sensor' && this.state.category !== 'breathalyser' && this.state.category !== 'gas' && this.props.sensorCategory !== 'motion_sensor') ? (
            <div className="form-group">
              <label>{t('sensors.data-samp-freq')}</label>
              <select className="form-control custom-input-style" onChange={this.handleFrequencyUnitSelect} value={this.state.frequencyUnit}>
                <option value="" disabled selected>{t('sensors.sec')}</option>
                <option value="seconds">{t('sensors.sec')}</option>
                <option value="minutes">{t('sensors.min')}</option>
                <option value="hours">{t('sensors.h')}</option>
                <option value="days">{t('sensors.days')}</option>
              </select>
            </div> 
            ) : (
            <div className="form-group">
              <label>{t('sensors.data-samp-freq')}</label>
              <select className="form-control custom-input-style" onChange={this.handleFrequencyUnitSelect} value={this.state.frequencyUnit}>
                <option value="" disabled selected>{t('sensors.sec')}</option>
                <option value="seconds">{t('sensors.sec')}</option>
              </select>
            </div> 
          )}

            {(this.props.sensorCategory !== 'water_temp' && this.props.sensorCategory !== 'smoke' && this.props.sensorCategory !== 'rain_sensor' && this.props.sensorCategory !== 'breathalyser' && this.props.sensorCategory !== 'gas' && this.props.sensorCategory !== 'motion_sensor') && (this.state.category !== 'water_temp' && this.state.category !== 'smoke' && this.state.category !== 'rain_sensor' && this.state.category !== 'breathalyser' && this.state.category !== 'gas' && this.props.sensorCategory !== 'motion_sensor') ? (
            <div className="form-group">
              <input
                type="string"
                className="form-control custom-input-style"
                name="frequency"
                onChange={this.handleChange}
                value={this.state.frequency}
                placeholder={this.props.sensorFrequency}
              />
            </div> 
            ) : (
            <div className="form-group">
              <label>{t('sensors.value')}</label>
              <select name="frequency" className="form-control custom-input-style" value={this.state.frequency} onChange={this.handleFrequencySelect}>
                <option value="" disabled defaultValue></option>
                <option value="30">30</option>
              </select>
            </div>
            )}

          <div className="ff-center">
            <button className="button">{t('sensors.edit')}</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  sensorName: state.sensors.sensorName,
  sensorCategory: state.sensors.sensorCategory,
  sensorFrequency: state.sensors.sensorFrequency
})
 
export default withTranslation('common')(connect(mapStateToProps, { updateSensor, createMessage, getSensorData })(EditSensor));