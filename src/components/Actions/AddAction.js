import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimePicker from 'react-time-picker';

import { getSensors } from '../../actions/sensors';
import { getControllers } from '../../actions/controllers';
import { addAction } from '../../actions/actions';

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
      { id: 1, isChecked: false, value: '1', label: 'Poniedziałek' },
      { id: 2, isChecked: false, value: '2', label: 'Wtorek' },
      { id: 3, isChecked: false, value: '3', label: 'Środa' },
      { id: 4, isChecked: false, value: '4', label: 'Czwartek' },
      { id: 5, isChecked: false, value: '5', label: 'Piątek' },
      { id: 6, isChecked: false, value: '6', label: 'Sobota' },
      { id: 7, isChecked: false, value: '7', label: 'Niedziela' },
    ],
    startEvent: '',
    endEvent: '',
    flag: '',
    action: ''
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

  handleSubmit = e => {
    e.preventDefault();
    const { name, sensor, trigger, operator, controller, days, startEvent, endEvent, flag, action } = this.state;

    let daysArray = [];
    days.map(day => {
      if (day.isChecked) {
        daysArray.push(day.value);
      }
      return daysArray;
    })

    const dataFirstFlag = { name: name, sensor: null, trigger: null, operator: null, driver: controller, days: daysArray.toString(), start_event: startEvent, end_event: null, flag: 1 * flag, action: action }
    const dataSecondFlag = { name: name, sensor: null, trigger: null, operator: null, driver: controller, days: daysArray.toString(), start_event: startEvent, end_event: endEvent, flag: 1 * flag, action: action }
    const dataThirdFlag = { name: name, sensor: sensor, trigger: 1 * trigger, operator: operator, driver: controller, days: daysArray.toString(), start_event: null, end_event: null, flag: 1 * flag, action: action }
    const dataFourthFlag = { name: name, sensor: sensor, trigger: 1 * trigger, operator: operator, driver: controller, days: daysArray.toString(), start_event: startEvent, end_event: endEvent, flag: 1 * flag, action: action }
    
    if (flag === '1') {
      this.props.addAction(dataFirstFlag);
    } else if (flag === '2') {
      this.props.addAction(dataSecondFlag);
    } else if (flag === '3') {
      this.props.addAction(dataThirdFlag);
    } else if (flag === '4') {
      this.props.addAction(dataFourthFlag);
    }

    this.setState({
      name: '',
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
      startEvent: '',
      endEvent: '',
      flag: '',
      action: ''
    })
  }

  render() { 

    const { name, sensor, trigger, operator, controller, days, startEvent, endEvent, flag, action } = this.state;

    return (  
      <div className="container">
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <h2 className="text-center">Dodaj akcję</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Nazwa</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.handleTextChange}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label>Działanie akcji</label>
                <select name="flag" className="form-control" onChange={this.handleSelect} value={flag}>
                  <option value="" defaultValue></option>
                  <option value="1">Akcja o wybranej godzinie</option>
                  <option value="2">Akcja pomiędzy wybranymi godzinami</option>
                  <option value="3">Akcja po wykryciu przez czujnik danej wartości</option>
                  <option value="4">Akcja po wykryciu przez czujnik danej wartości pomiędzy wybranymi godzinami</option>
                </select>
              </div>

              {!flag ? (
                false
              ) : (
              <div className="form-group">
                <label>Akcja, jaka ma się wykonać</label>
                <input
                  type="text"
                  className="form-control"
                  name="action"
                  onChange={this.handleTextChange}
                  value={action}
                />
              </div>
              )}

              {!flag || flag === '1' || flag === '2' ? (
                false
              ) : (
              <div className="form-group">
                <label>Czujnik</label>
                <select name="sensor" className="form-control" onChange={this.handleSelect} value={sensor}>
                  <option value="" defaultValue></option>
                  {this.props.sensors.map(sensor => {
                    return (
                      <option key={sensor.id} value={sensor.name}>{sensor.name}</option>
                    )
                  })}
                </select>
              </div>
              )}

              {!flag || flag === '1' || flag === '2' ? (
                false
              ) : (
              <div className="form-group">
                <label>Dla jakiej wartości z czujnika wykonać akcję?</label>
                <input
                  type="text"
                  className="form-control"
                  name="trigger"
                  onChange={this.handleTextChange}
                  value={trigger}
                />
              </div>
              )}

              {!flag || flag === '1' || flag === '2' ? (
                false
              ) : (
              <div className="form-group">
                <label>Mniejsze / większe / równe?</label>
                <select name="operator" className="form-control" onChange={this.handleSelect} value={operator}>
                  <option value="" defaultValue></option>
                  <option value="<">Mniejszy</option>
                  <option value=">">Większy</option>
                  <option value="=">Równy</option>
                </select>
              </div>
              )}

              {!flag ? (
                false
              ) : (
              <div className="form-group">
                <label>Sterownik</label>
                <select name="controller" className="form-control" onChange={this.handleSelect} value={controller}>
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
              <fieldset className="form-group">Dni
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
                <label>Godzina rozpoczęcia akcji</label>
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
                <label>Godzina zakończenia akcji</label>
                <TimePicker
                  onChange={this.handleEndEventChange}
                  value={endEvent}
                />
              </div>
              )}

              <div className="form-group">
                <button className="btn btn-primary">Dodaj</button>
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
 
export default connect(mapStateToProps, { getSensors, getControllers, addAction })(AddAction);