import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSensor, getSensorData } from '../actions/sensors';
import { createMessage } from '../actions/messages';
import Alerts from '../layouts/Alerts';

// const units = {
//   seconds: {
//     name: "seconds",
//     multiplier: 1,
//     minValue: "30",
//     maxValue: "21474836"
//   },
//   minutes: {
//     name: "minutes",
//     multiplier: 60,
//     minValue: "1",
//     maxValue: "357913"
//   },
//   hours: { name: "hours", multiplier: 3600, minValue: "1", maxValue: "5965" },
//   days: { name: "days", multiplier: 86400, minValue: "1", maxValue: "248" }
// };

class EditSensorPage extends Component {

  state = {
    name: '',
    category: '',
    frequencyUnit: '',
    frequency: ''
  }

  static propTypes = {
    sensorName: PropTypes.string.isRequired,
    sensorCategory: PropTypes.string.isRequired,
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

  formValidation = () => {
    let name = false;
    let category = false;
    let frequencyUnit = false;
    let frequency = false;
    let correct = false;


    if (this.state.frequencyUnit === 'seconds' && this.state.frequency < 30) {
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

    console.log(sensor);
    this.props.updateSensor(id, sensor);
    this.setState({
      name: "",
      category: "",
      frequencyUnit: "",
      frequency: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const id = this.props.match.params.id;
    let { name, category, frequency, frequencyUnit } = this.state;
    const validation = this.formValidation();

    // let sensor = { 
    //   name, 
    //   category, 
    //   frequency: frequency * frequencyUnit.multiplier
    // };

    // if (!name) {
    //   name = undefined;
    //   sensor = { name, category, frequency }
    // } else if (!category) {
    //   category = undefined;
    //   sensor = { name, category, frequency }
    // } else if (!frequency) {
    //   frequency = undefined;
    //   sensor = { name, category, frequency }
    // }

    // this.props.updateSensor(id, sensor)

    // this.setState({
    //   name: '',
    //   category: '',
    //   frequency: '',
    //   frequencyUnit: {}
    // })

    // NIE DZIAŁA BO SPRAWDZA CZY CORRECT I WCHODZI DO PĘTLI SZUKAJAC FREQUENCYUNIT, KTORE NIE ZAWSZE JEST USTAWIANE

    // Frequency validation
    if (validation.correct) {
      if (frequencyUnit === 'seconds') {
        // this.setState({
        //   minValue: '30',
        //   maxValue: '21474836'
        // },
        // () => {
        //   this.callback();
        // })
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

    // if (frequencyUnit === 'minutes') {
    //   this.setState({
    //     minValue: '1',
    //     maxValue: '357913',
    //     frequency: frequency * 60
    //   },
    //   () => {
    //     this.callback();
    //   })
    // }

    // if (frequencyUnit === 'hours') {
    //   this.setState({
    //     minValue: '1',
    //     maxValue: '5965',
    //     frequency: frequency * 3600
    //   },
    //   () => {
    //     this.callback();
    //   })
    // }

    // if (frequencyUnit === 'days') {
    //   this.setState({
    //     minValue: '1',
    //     maxValue: '248',
    //     frequency: frequency * 86400
    //   },
    //   () => {
    //     this.callback();
    //   })
    // }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    
    this.props.getSensorData(id)
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Edytuj czujnik</h2>
        <form onSubmit={this.handleSubmit}>
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
            <button className="btn btn-primary">Potwierdź</button>
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
})
 
export default connect(mapStateToProps, { updateSensor, createMessage, getSensorData })(EditSensorPage);
// export default connect(null, { updateSensor, getSensorData })(EditSensorPage);