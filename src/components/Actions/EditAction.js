import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getActionData } from '../../actions/actions';
import { getSensors } from '../../actions/sensors';
import { getControllers } from '../../actions/controllers';

import Alerts from '../Alerts/Alerts';

class EditAction extends Component {

  state = {  
    name: '',
    flag: '',
    action: '',
    sensor: '',
    trigger: '',
    operator: '',
    controller: '',
    days: [
      { id: 1, isChecked: false, value: '1', label: 'Poniedziałek' },
      { id: 2, isChecked: false, value: '2', label: 'Wtorek' },
      { id: 3, isChecked: false, value: '3', label: 'Środa' },
      { id: 4, isChecked: false, value: '4', label: 'Czwartek' },
      { id: 5, isChecked: false, value: '5', label: 'Piątek' },
      { id: 6, isChecked: false, value: '6', label: 'Sobota' },
      { id: 7, isChecked: false, value: '7', label: 'Niedziela' },
    ],

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

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.operator);
  }

  render() { 

    const { name, flag, action, sensor, trigger, operator, controller, days } = this.state;

    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Edytuj akcję</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nazwa</label>
                <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.handleTextChange}
                value={name}
                placeholder={this.props.name}
              />
            </div>

            <div className="form-group">
              <label>Działanie akcji</label>
              <select name="flag" className="form-control" onChange={this.handleSelect} value={flag}>
                <option value="" disabled defaultValue>{(this.props.flag === 1 && 'Akcja o wybranej godzinie') || (this.props.flag === 2 && 'Akcja pomiędzy wybranymi godzinami') || (this.props.flag === 3 && 'Akcja po wykryciu przez czujnik danej wartości') || (this.props.flag === 4 && 'Akcja po wykryciu przez czujnik danej wartości pomiędzy wybranymi godzinami')}</option>
                <option value="1">Akcja o wybranej godzinie</option>
                <option value="2">Akcja pomiędzy wybranymi godzinami</option>
                <option value="3">Akcja po wykryciu przez czujnik danej wartości</option>
                <option value="4">Akcja po wykryciu przez czujnik danej wartości pomiędzy wybranymi godzinami</option>
              </select>
            </div>

            <div className="form-group">
              <label>Akcja, jaka ma się wykonać</label>
              <input
                type="text"
                className="form-control"
                name="action"
                onChange={this.handleTextChange}
                value={action}
                placeholder={this.props.action}
              />
            </div>

            {(this.props.flag === 3 || this.props.flag === 4) && (
            <div className="form-group">
              <label>Czujnik</label>
              <select name="sensor" className="form-control" onChange={this.handleSelect} value={sensor}>
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
                <label>Dla jakiej wartości z czujnika wykonać akcję?</label>
                <input
                  type="text"
                  className="form-control"
                  name="trigger"
                  onChange={this.handleTextChange}
                  value={trigger}
                  placeholder={this.props.trigger}
                />
              </div>
            )}

            {(this.props.flag === 3 || this.props.flag === 4) && (
              <div className="form-group">
                <label>Mniejsze / większe / równe?</label>
                <select name="operator" className="form-control" onChange={this.handleSelect} value={operator}>
                  <option value='' disabled defaultValue>{(this.props.operator === '<' && 'Mniejszy') || (this.props.operator === '>' && 'Większy') || (this.props.operator === '=' && 'Równy')}</option>
                  <option value="<">Mniejszy</option>
                  <option value=">">Większy</option>
                  <option value="=">Równy</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label>Sterownik</label>
              <select name="controller" className="form-control" onChange={this.handleSelect} value={controller}>
                <option value="" disabled defaultValue>{this.props.controller}</option>
                {this.props.controllers.map(controller => {
                  return (
                    <option key={controller.id} value={controller.name}>{controller.name}</option>
                  )
                })}
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
  action: state.actions.action,
})
 
export default connect(mapStateToProps, { getActionData, getSensors, getControllers })(EditAction);