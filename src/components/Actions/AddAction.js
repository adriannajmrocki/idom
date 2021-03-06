import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimePicker from 'react-time-picker';
import { withTranslation } from 'react-i18next';
import hexRgb from 'hex-rgb'

import { getSensors } from '../../actions/sensors';
import { getControllers } from '../../actions/controllers';
import { addAction } from '../../actions/actions';
import { createMessage } from '../../actions/messages';

import '../../styles/utilStyles.css';

class AddAction extends Component {

  static propTypes = {
    getSensors: PropTypes.func.isRequired,
    getControllers: PropTypes.func.isRequired,
    addAction: PropTypes.func.isRequired
  }

  state = {  
    name: '',
    sensor: '', 
    trigger: '',
    operator: '',
    controller: '',
    days: [
      { id: 1, isChecked: false, value: '1', label: `${this.props.t('actions.mon')}` },
      { id: 2, isChecked: false, value: '2', label: `${this.props.t('actions.tue')}` },
      { id: 3, isChecked: false, value: '3', label: `${this.props.t('actions.wed')}` },
      { id: 4, isChecked: false, value: '4', label: `${this.props.t('actions.thu')}` },
      { id: 5, isChecked: false, value: '5', label: `${this.props.t('actions.fri')}` },
      { id: 6, isChecked: false, value: '6', label: `${this.props.t('actions.sat')}` },
      { id: 7, isChecked: false, value: '0', label: `${this.props.t('actions.sun')}` },
    ],
    startEvent: '',
    endEvent: '',
    flag: '',
    type: '',
    status: null,
    brightness: 0,
    color: '#ffffff',
    red: 255,
    green: 255,
    blue: 255
  }

  componentDidMount() {
    this.props.getSensors();
    this.props.getControllers();
  }

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleStartEventChange = (startEvent) => {
    this.setState({ startEvent });
  }
  
  handleEndEventChange = (endEvent) => {
    this.setState({ endEvent });
  }

  handleBrightnessChange = e => {
    this.setState({ brightness: e.target.value })
  }

  handleColorChange = e => {
    const hex = e.target.value;
    const rgb = hexRgb(hex);

    this.setState({
      color: hex,
      red: rgb.red,
      green: rgb.green,
      blue: rgb.blue
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, sensor, trigger, operator, controller, days, startEvent, endEvent, flag, type, status, brightness, red, green, blue } = this.state;

    let daysArray = [];
    days.map(day => {
      if (day.isChecked) {
        daysArray.push(day.value);
      }
      return daysArray;
    })

    const dataFirstFlag = { name: name, sensor: null, trigger: null, operator: null, driver: controller, days: daysArray.toString(), start_event: startEvent, end_event: null, flag: 1 * flag, action: { type: type, status: status, brightness: brightness, red: red, green: green, blue: blue } }
    const dataThirdFlag = { name: name, sensor: sensor, trigger: 1 * trigger, operator: operator, driver: controller, days: daysArray.toString(), start_event: "00:00", end_event: null, flag: 1 * flag, action: { type: type, status: status, brightness: brightness, red: red, green: green, blue: blue } }
    const dataFourthFlag = { name: name, sensor: sensor, trigger: 1 * trigger, operator: operator, driver: controller, days: daysArray.toString(), start_event: startEvent, end_event: endEvent, flag: 1 * flag, action: { type: type, status: status, brightness: brightness, red: red, green: green, blue: blue } }
    
    if (flag === '1') {
      this.props.addAction(dataFirstFlag);
      this.setState({
        name: '',
        sensor: '', 
        trigger: '',
        operator: '',
        controller: '',
        days: [
          { id: 1, isChecked: false, value: '1', label: `${this.props.t('actions.mon')}` },
          { id: 2, isChecked: false, value: '2', label: `${this.props.t('actions.tue')}` },
          { id: 3, isChecked: false, value: '3', label: `${this.props.t('actions.wed')}` },
          { id: 4, isChecked: false, value: '4', label: `${this.props.t('actions.thu')}` },
          { id: 5, isChecked: false, value: '5', label: `${this.props.t('actions.fri')}` },
          { id: 6, isChecked: false, value: '6', label: `${this.props.t('actions.sat')}` },
          { id: 7, isChecked: false, value: '0', label: `${this.props.t('actions.sun')}` },
        ],
        startEvent: '',
        endEvent: '',
        flag: '',
        type: '',
        status: null,
        brightness: 0,
        color: '#ffffff',
        red: 255,
        green: 255,
        blue: 255
      })
    } else if (flag === '3') {
      this.props.addAction(dataThirdFlag);
      this.setState({
        name: '',
        sensor: '', 
        trigger: '',
        operator: '',
        controller: '',
        days: [
          { id: 1, isChecked: false, value: '1', label: `${this.props.t('actions.mon')}` },
          { id: 2, isChecked: false, value: '2', label: `${this.props.t('actions.tue')}` },
          { id: 3, isChecked: false, value: '3', label: `${this.props.t('actions.wed')}` },
          { id: 4, isChecked: false, value: '4', label: `${this.props.t('actions.thu')}` },
          { id: 5, isChecked: false, value: '5', label: `${this.props.t('actions.fri')}` },
          { id: 6, isChecked: false, value: '6', label: `${this.props.t('actions.sat')}` },
          { id: 7, isChecked: false, value: '0', label: `${this.props.t('actions.sun')}` },
        ],
        startEvent: '',
        endEvent: '',
        flag: '',
        type: '',
        status: null,
        brightness: 0,
        color: '#ffffff',
        red: 255,
        green: 255,
        blue: 255
      })
    } else if (flag === '4') {
      this.props.addAction(dataFourthFlag);
      this.setState({
        name: '',
        sensor: '', 
        trigger: '',
        operator: '',
        controller: '',
        days: [
          { id: 1, isChecked: false, value: '1', label: `${this.props.t('actions.mon')}` },
          { id: 2, isChecked: false, value: '2', label: `${this.props.t('actions.tue')}` },
          { id: 3, isChecked: false, value: '3', label: `${this.props.t('actions.wed')}` },
          { id: 4, isChecked: false, value: '4', label: `${this.props.t('actions.thu')}` },
          { id: 5, isChecked: false, value: '5', label: `${this.props.t('actions.fri')}` },
          { id: 6, isChecked: false, value: '6', label: `${this.props.t('actions.sat')}` },
          { id: 7, isChecked: false, value: '0', label: `${this.props.t('actions.sun')}` },
        ],
        startEvent: '',
        endEvent: '',
        flag: '',
        type: '',
        status: null,
        brightness: 0,
        color: '#ffffff',
        red: 255,
        green: 255,
        blue: 255
      })
    } else if (!flag) {
      this.props.createMessage({ emptyFieldsError: 'Nie wszystkie wymagane pola zostały wypełnione' })
    }
  }

  render() { 

    const { name, sensor, trigger, operator, controller, days, startEvent, endEvent, flag, type, status, brightness, color } = this.state;
    const { t } = this.props;

    return (  
      <div className="container">
        <div className="col-md-6 m-auto custom-position">
          <div className="card card-body mt-5 custom-border-style custom-position">
            <h2 className="text-center custom-mb">{t('actions.add-action')}</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>{t('sensors.name')}</label>
                <input
                  type="text"
                  className="form-control custom-input-style"
                  name="name"
                  onChange={this.handleTextChange}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label>{t('actions.action-func')}</label>
                <select name="flag" className="form-control custom-input-style" onChange={this.handleSelect} value={flag}>
                  <option value="" defaultValue></option>
                  <option value="1">{t('actions.act-time')}</option>
                  <option value="3">{t('actions.act-sensor')}</option>
                  <option value="4">{t('actions.act-sensor-between')}</option>
                </select>
              </div>

              {!flag ? (
                false
              ) : (
              <div className="form-group">
                <label>{t('actions.act-controller')}</label>
                <select name="controller" className="form-control custom-input-style" onChange={this.handleSelect} value={controller}>
                  <option value="" defaultValue></option>
                  {this.props.controllers.map(controller => {
                    return (
                      <option key={controller.id} value={controller.name}>{controller.name}</option>
                    )
                  })}
                </select>
              </div>
              )}

              {!flag ? (
                false
              ) : (
                <div className="form-group">
                  {this.props.controllers.map(item => {
                    if (controller === item.name && item.category === 'bulb') {
                      return (
                        <Fragment>
                          <label>{t('actions.act-to-work')}</label>
                          <select name="type" className="form-control custom-input-style" onChange={this.handleSelect} value={type}>
                            <option value="" defaultValue></option>
                            <option value="turn">{t('actions.act-switch')}</option>
                            <option value="brightness">{t('actions.set-brightness')}</option>
                            <option value="colour">{t('actions.set-color')}</option>
                          </select>
                        </Fragment>
                      )
                    } else if (controller === item.name && item.category === 'clicker') {
                      return (
                        <Fragment>
                          <label>{t('actions.act-to-work')}</label>
                          <select name="status" className="form-control custom-input-style" onChange={this.handleSelect} value={status}>
                            <option value="" defaultValue></option>
                            <option value="on">{t('actions.click')}</option>
                          </select>
                        </Fragment>
                      )
                    } else if (controller === item.name && item.category === 'roller_blind') {
                      return (
                        <Fragment>
                          <label>{t('actions.act-to-work')}</label>
                          <select name="status" className="form-control custom-input-style" onChange={this.handleSelect} value={status}>
                            <option value="" defaultValue></option>
                            <option value="on">{t('actions.close-blinds')}</option>
                            <option value="off">{t('actions.reveal-blinds')}</option>
                          </select>
                        </Fragment>
                      )
                    }
                  })}
                </div>
              )}

              {type === 'turn' && (
              <div className="form-group">
                <select name="status" className="form-control custom-input-style" onChange={this.handleSelect} value={status}>
                  <option value="" defaultValue></option>
                  <option value="on">{t('actions.switch-on')}</option>
                  <option value="off">{t('actions.switch-off')}</option>
                </select>
              </div>
              )}

              {type === 'brightness' && (
                <div className="form-group">
                  <label>{t('actions.brightness')}</label>
                  <input className="custom-range" type="range" name="brightness" min="0" max="100" value={brightness} onChange={this.handleBrightnessChange} data-sizing="px" />
                </div>
              )}

              {type === 'colour' && (
              <div className="form-group">
                <label>{t('actions.color')}</label>
                <input className="form-control" id="color" type="color" name="color" value={color} onChange={this.handleColorChange} />
              </div>                
              )}

              {!flag || flag === '1' ? (
                false
              ) : (
              <div className="form-group">
                <label>{t('actions.sensor')}</label>
                <select name="sensor" className="form-control custom-input-style" onChange={this.handleSelect} value={sensor}>
                  <option value="" defaultValue></option>
                  {this.props.sensors.map(sensor => {
                    return (
                      <option key={sensor.id} value={sensor.name}>{sensor.name}</option>
                    )
                  })}
                </select>
              </div>
              )}

              {!flag || flag === '1' ? (
                false
              ) : (
              <div className="form-group">
                <label>{t('actions.operator')}</label>
                <select name="operator" className="form-control custom-input-style" onChange={this.handleSelect} value={operator}>
                  <option value="" defaultValue></option>
                  <option value="<">{t('actions.less')}</option>
                  <option value=">">{t('actions.greater')}</option>
                  <option value="=">{t('actions.equal')}</option>
                </select>
              </div>
              )}

              {!flag || flag === '1' ? (
                false
              ) : (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control custom-input-style"
                  name="trigger"
                  onChange={this.handleTextChange}
                  value={trigger}
                  placeholder={`${t('actions.set-value')}`}
                />
              </div>
              )}

              {!flag ? (
                false
              ) : (
              <fieldset className="form-group">{t('actions.days')}
              {days.map(day => {
                return (
                  <div key={day.id} className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={e => {
                          let checked = e.target.checked;
                          this.setState(
                            days.map(data => {
                              if (day.id === data.id) {
                                day.isChecked = checked;
                              }
                              return data;
                            })
                          )
                        }}
                        checked={days.isChecked}
                      />
                      {day.label}
                    </label>
                  </div>
                )
              })}
              </fieldset>
              )}

              {!flag || flag === '3' ? (
                false
              ) : (
              <div className="form-group">
                <label>{t('actions.start-time')}</label>
                <br />
                <TimePicker
                  onChange={this.handleStartEventChange}
                  value={startEvent}
                />
              </div>
              )}

              {!flag || flag === '1' || flag === '3' ? (
                false
              ) : (
              <div className="form-group">
                <label>{t('actions.end-time')}</label>
                <br />
                <TimePicker
                  onChange={this.handleEndEventChange}
                  value={endEvent}
                />
              </div>
              )}

              <div className="ff-center">
                <button className="button">{t('sensors.add')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sensors: state.sensors.sensors,
  controllers: state.controllers.controllers
})
 
export default withTranslation('common')(connect(mapStateToProps, { getSensors, getControllers, addAction, createMessage })(AddAction));