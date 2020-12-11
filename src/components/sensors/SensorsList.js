import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { getSensors, deleteSensor, getChartData } from '../../actions/sensors';

import '../../styles/utilStyles.css';
import './style.css';

class SensorsList extends Component {

  static propTypes = {
    sensors: PropTypes.array.isRequired,
    getSensors: PropTypes.func.isRequired,
    deleteSensor: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getSensors();
  }

  render() { 

    const { t } = this.props;

    return (  
      <div className="container">
        <div className="head">
          <h2>{t('Czujniki')}</h2>
          <div className="line"></div>
          <Link to='add-sensor'><button type="button" className="add-btn">+</button></Link>
        </div>

        <div className="csv">
          <p>{t('Potrzebujesz pliku z danymi w formacie')} .csv?</p>
          <p><Link to="/csv">{t('Wygeneruj')} <i className="far fa-file-alt"></i></Link></p>
        </div>
        
        <div className="category-field">
          <i className="fas fa-thermometer-half fa-2x"></i>
          <h5 className="category-title">{t('Temperatura')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'temperature') {
            return (
              <Fragment>
                <div key={sensor.id} className="item">
                  <ul className="item-ul">
                    <li className="item-li">{sensor.name}</li>
                    <li className="item-li">{`${sensor.last_data} °C`}</li>
                    <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                    <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                    <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                  </ul>
                </div>
              </Fragment>
            )
          }
        })}

        <div className="category-field" style={{"marginTop": "40px"}}>
          <i className="fas fa-water fa-2x"></i>
          <h5 className="category-title">{t('Temperatura wody')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'water_temp') {
            return (
                <div key={sensor.id} className="item">
                  <ul className="item-ul">
                    <li className="item-li">{sensor.name}</li>
                    <li className="item-li">{`${sensor.last_data} °C`}</li>
                    <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                    <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                    <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                  </ul>
                </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-tint fa-2x"></i>
          <h5 className="category-title">{t('Wilgotność')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'humidity') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data}%`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-tint fa-2x"></i>
          <h5 className="category-title">{t('Wilgotność powietrza')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'air_humidity') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data}%`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}
        
        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-sort-amount-up fa-2x"></i>
          <h5 className="category-title">{t('Ciśnienie')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'atmo_pressure') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data} hPa`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-glass-cheers fa-2x"></i>
          <h5 className="category-title">{t('Alkomat')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'breathalyser') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data}‰`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-smoking fa-2x"></i>
          <h5 className="category-title">{t('Dym')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'smoke') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  {/* <li className="data">{`${sensor.last_data}%`}</li> */}
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-cloud-rain fa-2x"></i>
          <h5 className="category-title">{t('Deszcz')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'rain_sensor') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  {/* <li className="data">{`${sensor.last_data}%`}</li> */}
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sensors: state.sensors.sensors
})
 
export default withTranslation()(connect(mapStateToProps, { getSensors, deleteSensor })(SensorsList));