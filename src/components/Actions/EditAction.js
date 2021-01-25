import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import hexRgb from 'hex-rgb'
import TimePicker from 'react-time-picker';
import { withTranslation } from 'react-i18next';

import { getActionData, updateAction } from '../../actions/actions';
import { getSensors } from '../../actions/sensors';
import { getControllers } from '../../actions/controllers';

import Alerts from '../Alerts/Alerts';

class EditAction extends Component {

  state = {  
    name: '',
    flag: '',
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
    type: '',
    status: '',
    brightness: 0,
    color: '#ffffff',
    red: 255,
    green: 255,
    blue: 255,
  }

  componentDidMount() {
    this.props.getSensors();
    this.props.getControllers();

    const id = this.props.match.params.id;
    this.props.getActionData(id);
  }

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value })
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

  handleStartEventChange = (startEvent) => {
    this.setState({ startEvent });
  }

  handleEndEventChange = (endEvent) => {
    this.setState({ endEvent });
  }

  handleSubmit = e => {
    e.preventDefault();

    const id = this.props.match.params.id;
    let { name, sensor, trigger, operator, days, startEvent, endEvent, status, brightness, red, green, blue } = this.state;

    let daysArray = [];
    days.map(day => {
      if (day.isChecked) {
        daysArray.push(day.value);
      }
      return daysArray;
    })

    if (!name) name = undefined;
    if (!sensor) sensor = undefined;
    if (!operator) operator = undefined;
    if (!startEvent) startEvent = undefined;
    if (!endEvent) endEvent = undefined;

    let firstFlagData = { name: name, sensor: null, trigger: null, operator: null, driver: this.props.controller, days: daysArray.length > 0 ? daysArray.toString() : undefined, start_event: startEvent, end_event: null, flag: this.props.flag, action: { type: this.props.type, status: status ? status : this.props.status, brightness: brightness !== 0 ? brightness : this.props.brightness, red: red !== 255 ? red : this.props.red, green: green !== 255 ? green : this.props.green, blue: blue !== 255 ? blue : this.props.blue } }
    let thirdFlagData = { name: name, sensor: sensor, trigger: trigger ? 1 * trigger : this.props.trigger, operator: operator, driver: this.props.controller, days: daysArray.length > 0 ? daysArray.toString() : undefined, start_event: "00:00", end_event: null, flag: this.props.flag, action: { type: this.props.type, status: status ? status : this.props.status, brightness: brightness !== 0 ? brightness : this.props.brightness, red: red !== 255 ? red : this.props.red, green: green !== 255 ? green : this.props.green, blue: blue !== 255 ? blue : this.props.blue } }
    let fourthFlagData = { name: name, sensor: sensor, trigger: trigger ? 1 * trigger : this.props.trigger, operator: operator, driver: this.props.controller, days: daysArray.length > 0 ? daysArray.toString() : undefined, start_event: startEvent, end_event: endEvent, flag: this.props.flag, action: { type: this.props.type, status: status ? status : this.props.status, brightness: brightness !== 0 ? brightness : this.props.brightness, red: red !== 255 ? red : this.props.red, green: green !== 255 ? green : this.props.green, blue: blue !== 255 ? blue : this.props.blue } }

    if (this.props.flag === 1) this.props.updateAction(id, firstFlagData);
    if (this.props.flag === 3) this.props.updateAction(id, thirdFlagData);
    if (this.props.flag === 4) this.props.updateAction(id, fourthFlagData);
  }

  showDays = () => {
    let daysProp = this.props.days;
    const daysPropArray = daysProp.split(",");
    let newArray = [];

    daysPropArray.map(day => {
      if (day === '1') newArray.push(` ${this.props.t('actions.mon')}`);
      if (day === '2') newArray.push(` ${this.props.t('actions.tue')}`);
      if (day === '3') newArray.push(` ${this.props.t('actions.wed')}`);
      if (day === '4') newArray.push(` ${this.props.t('actions.thu')}`);
      if (day === '5') newArray.push(` ${this.props.t('actions.fri')}`);
      if (day === '6') newArray.push(` ${this.props.t('actions.sat')}`);
      if (day === '0') newArray.push(` ${this.props.t('actions.sun')}`);

      return newArray
    })

    return newArray;
  }

  getStartHoursProp = () => {
    const time = this.props.startEvent;
    const getHours = time.slice(0, 2);

    return getHours;
  }

  getStartMinutesProp = () => {
    const time = this.props.startEvent;
    const getMinutes = time.slice(3, 5);

    return getMinutes;
  }

  getEndHoursProp = () => {
    const time = this.props.endEvent;
    const getHours = time.slice(0, 2);

    return getHours;
  }

  getEndMinutesProp = () => {
    const time = this.props.startEvent;
    const getMinutes = time.slice(3, 5);

    return getMinutes;
  }

  render() { 

    const { name, flag, sensor, trigger, operator, controller, days, type, status, brightness, color, startEvent, endEvent } = this.state;
    const { t } = this.props;

    return (  
      <div className="col-md-6 m-auto custom-position">
        <div className="card card-body mt-5 custom-border-style custom-position">
          <h2 className="text-center custom-mb">{t('actions.act-edit')}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>{t('sensors.name')}</label>
                <input
                type="text"
                className="form-control custom-input-style"
                name="name"
                onChange={this.handleTextChange}
                value={name}
                placeholder={this.props.name}
              />
            </div>

            <div className="form-group">
              <label>{t('actions.action-func')}</label>
              <select name="flag" className="form-control" onChange={this.handleSelect} value={flag}>
                <option value="" disabled defaultValue>{(this.props.flag === 1 && `${t('actions.act-time')}`) || (this.props.flag === 3 && `${t('actions.act-sensor')}`) || (this.props.flag === 4 && `${t('actions.act-sensor-between')}`)}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('actions.act-controller')}</label>
              <select name="controller" className="form-control" onChange={this.handleSelect} value={controller}>
                <option value="" disabled defaultValue>{this.props.controller}</option>
              </select>
            </div>

            <div className="form-group">
              {this.props.controllers.map(item => {
                if (this.props.controller === item.name && item.category === 'bulb') {
                  return (
                    <Fragment>
                      <label>{t('actions.act-to-work')}</label>
                      <select name="type" className="form-control" onChange={this.handleSelect} value={type}>
                        <option value="" disabled defaultValue>{(this.props.type === 'turn' && `${t('actions.act-switch')}`) || (this.props.type === 'brightness' && `${t('actions.set-brightness')}`) || (this.props.type === 'colour' && `${t('actions.set-color')}`)}</option>
                      </select>
                    </Fragment>
                  )                  
                } else if (this.props.controller === item.name && item.category === 'clicker') {
                  return (
                    <Fragment>
                      <label>{t('actions.act-to-work')}</label>
                      <select name="status" className="form-control" onChange={this.handleSelect} value={status}>
                        <option value="" disabled defaultValue>{this.props.status === 'on' && `${t('actions.click')}`}</option>
                      </select>
                    </Fragment>
                  )
                } else if (this.props.controller === item.name && item.category === 'roller_blind') {
                  return (
                    <Fragment>
                      <label>{t('actions.act-to-work')}</label>
                      <select name="status" className="form-control custom-input-style" onChange={this.handleSelect} value={status}>
                        <option value="" disabled defaultValue>{(this.props.status === 'on' && `${t('actions.close-blinds')}`) || (this.props.status === 'off' && `${t('actions.reveal-blinds')}`)}</option>
                        <option value="on">{t('actions.close-blinds')}</option>
                        <option value="off">{t('actions.reveal-blinds')}</option>
                      </select>
                    </Fragment>
                  )
                } 
              })}
            </div>

            {this.props.type === 'turn' && (
              <div className="form-group">
                <select name="status" className="form-control custom-input-style" onChange={this.handleSelect} value={status}>
                  <option value="" disabled defaultValue>{(this.props.status === 'on' && `${t('actions.switch-on')}`) || (this.props.status === 'off' && `${t('actions.switch-off')}`)}</option>
                  <option value="on">{t('actions.switch-on')}</option>
                  <option value="off">{t('actions.switch-off')}</option>
                </select>
              </div>
            )}

            {this.props.type === 'brightness' && (
              <div className="form-group">
                <label>{t('actions.brightness')} ({t('actions.currently')}: {`${this.props.brightness}%`})</label>
                <input 
                  className="custom-range" 
                  type="range" 
                  name="brightness" 
                  min="0" 
                  max="100" 
                  value={brightness} 
                  onChange={this.handleBrightnessChange} 
                  data-sizing="px" />
              </div>
            )}

            {this.props.type === 'colour' && (
              <div className="form-group">
                <label>{t('actions.color')} ({t('actions.currently')}: {`${this.props.red}, ${this.props.green}, ${this.props.blue}`})</label>
                <input className="form-control" id="color" type="color" name="color" value={color} onChange={this.handleColorChange} />
              </div>  
            )}

            {(this.props.flag === 3 || this.props.flag === 4) && (
            <div className="form-group">
              <label>{t('actions.sensor')}</label>
              <select name="sensor" className="form-control custom-input-style" onChange={this.handleSelect} value={sensor}>
                <option value='' disabled defaultValue>{this.props.sensor}</option>
                {this.props.sensors.map(sensor => {
                  return (
                    <option key={sensor.id} value={sensor.name}>{sensor.name}</option>
                  )
                })}
              </select>
            </div>
            )}

            {(this.props.flag === 3 || this.props.flag === 4) && (
              <div className="form-group">
                <label>{t('actions.operator')}</label>
                <select name="operator" className="form-control custom-input-style" onChange={this.handleSelect} value={operator}>
                  <option value='' disabled defaultValue>{(this.props.operator === '<' && `${t('actions.less')}`) || (this.props.operator === '>' && `${t('actions.greater')}`) || (this.props.operator === '=' && `${t('actions.equal')}`)}</option>
                  <option value="<">{t('actions.less')}</option>
                  <option value=">">{t('actions.greater')}</option>
                  <option value="=">{t('actions.equal')}</option>
                </select>
              </div>
            )}

            {(this.props.flag === 3 || this.props.flag === 4) && (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control custom-input-style"
                  name="trigger"
                  onChange={this.handleTextChange}
                  value={trigger}
                  placeholder={this.props.trigger}
                /> 
              </div>
            )}

            <fieldset className="form-group">{t('actions.days')} {`(${t('actions.currently')}:${this.showDays()})`}
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

            {(this.props.flag === 1 || this.props.flag === 4) && (
              <div className="form-group">
              <label>{t('actions.start-time')}</label>
              <br />
              <TimePicker
                onChange={this.handleStartEventChange}
                value={startEvent}
                hourPlaceholder={this.getStartHoursProp()}
                minutePlaceholder={this.getStartMinutesProp()}
              />
            </div>
            )}

            {this.props.flag === 4 && (
              <div className="form-group">
                <label>{t('actions.end-time')}</label>
                <br />
                <TimePicker
                  onChange={this.handleEndEventChange}
                  value={endEvent}
                  hourPlaceholder={this.getEndHoursProp()}
                  minutePlaceholder={this.getEndMinutesProp()}
                />
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
  sensors: state.sensors.sensors,
  controllers: state.controllers.controllers,

  name: state.actions.name,
  sensor: state.actions.sensor,
  trigger: state.actions.trigger,
  operator: state.actions.operator,
  controller: state.actions.controller,
  days: state.actions.days,
  isActive: state.actions.isActive,
  startEvent: state.actions.startEvent,
  endEvent: state.actions.endEvent,
  flag: state.actions.flag,
  type: state.actions.type,
  status: state.actions.status,
  brightness: state.actions.brightness,
  red: state.actions.red,
  green: state.actions.green,
  blue: state.actions.blue,
})
 
export default withTranslation('common')(connect(mapStateToProps, { getActionData, getSensors, getControllers, updateAction })(EditAction));