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
      <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">{t('sensors.edit-sensor')}</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>{t('sensors.name')}</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder={this.props.sensorName}
            />
          </div>

          {this.props.sensorCategory !== 'water_temp' && this.props.sensorCategory !== 'smoke' && this.props.sensorCategory !== 'rain_sensor' && this.props.sensorCategory !== 'breathalyser' ?
          <div className="form-group">
            <label>{t('sensors.category')}</label>
            <select className="form-control" onChange={this.handleCategorySelect} value={this.state.category}>
              <option value="" disabled selected>{this.props.sensorCategory === 'temperature' ? `${t('sensors.temp')}` : `${t('sensors.hum')}`}</option>
              <option value="temperature">{t('sensors.temp')}</option>
              <option value="humidity">{t('sensors.hum')}</option>
            </select>
          </div> : false}

          {this.props.sensorCategory !== 'water_temp' && this.props.sensorCategory !== 'smoke' && this.props.sensorCategory !== 'rain_sensor' && this.props.sensorCategory !== 'breathalyser' ?
          <div className="form-group">
              <label>{t('sensors.data-samp-freq')}</label>
              <select className="form-control" onChange={this.handleFrequencyUnitSelect} value={this.state.frequencyUnit}>
                <option value="" disabled selected>{t('sensors.sec')}</option>
                <option value="seconds">{t('sensors.sec')}</option>
                <option value="minutes">{t('sensors.min')}</option>
                <option value="hours">{t('sensors.h')}</option>
                <option value="days">{t('sensors.days')}</option>
              </select>
            </div> : false}

            {this.props.sensorCategory !== 'water_temp' && this.props.sensorCategory !== 'smoke' && this.props.sensorCategory !== 'rain_sensor' && this.props.sensorCategory !== 'breathalyser' ?
            <div className="form-group">
              <input
                type="string"
                className="form-control"
                name="frequency"
                onChange={this.handleChange}
                value={this.state.frequency}
                placeholder={this.props.sensorFrequency}
              />
            </div> : false}

          <div className="form-group">
            <button className="btn btn-primary">{t('sensors.edit')}</button>
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