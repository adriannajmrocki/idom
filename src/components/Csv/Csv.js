import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";

import { getSensors, postCsv } from '../../actions/sensors';
import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';

// const categories = [
//   { id: 1, isChecked: false, value: "temperature", label: `${t('sensors.temp')}` },
//   { id: 2, isChecked: false, value: "water_temp", label: "Temperatura wody" },
//   { id: 3, isChecked: false, value: "humidity", label: "Wilgotność" },
//   { id: 4, isChecked: false, value: "air_humidity", label: "Wilgotność powietrza" },
//   { id: 5, isChecked: false, value: "atmo_pressure", label: "Ciśnienie atmosferyczne" },
//   { id: 6, isChecked: false, value: "breathalyser", label: "Alkomat" },
//   { id: 7, isChecked: false, value: "smoke", label: "Dym" },
//   { id: 8, isChecked: false, value: "rain_sensor", label: "Deszcz" },
// ]

function Csv(props) {

  const { t } = useTranslation('common');

  const categories = [
    { id: 1, isChecked: false, value: "temperature", label: `${t('sensors.temp')}` },
    { id: 2, isChecked: false, value: "water_temp", label: `${t('sensors.water-temp')}` },
    { id: 3, isChecked: false, value: "humidity", label: `${t('sensors.hum')}` },
    { id: 4, isChecked: false, value: "air_humidity", label: `${t('sensors.air-hum')}` },
    { id: 5, isChecked: false, value: "atmo_pressure", label: `${t('sensors.pressure')}` },
    { id: 6, isChecked: false, value: "breathalyser", label: `${t('sensors.alc')}` },
    { id: 7, isChecked: false, value: "smoke", label: `${t('sensors.smoke')}` },
    { id: 8, isChecked: false, value: "rain_sensor", label: `${t('sensors.rain')}` },
  ]

  const [filter, setFilter] = useState('');
  const [sensorsState, setSensorsState] = useState([]);
  const [categoriesState, setCategoriesState] = useState(categories);
  const [days, setDays] = useState('');

  useEffect(() => {
    let sensorsStateProps = props.sensors;

    setSensorsState(
      sensorsStateProps.map(sensor => {
        return { 'isChecked': false, ...sensor }
      })
    );
  }, [])

  const handleFilterSelect = e => {
    setFilter(e.target.value);
    console.log(filter);
  }

  const handleDaysChange = e => {
    setDays(e.target.value);
    console.log(days);
  }

  const handleSubmit = e => {
    e.preventDefault();

    let sensorsArray = [];
    sensorsState.map(sensor => {
      if (sensor.isChecked) {
        sensorsArray.push('' + sensor.id);
      }
      return sensorsArray;
    })

    let categoriesArray = [];
    categoriesState.map(category => {
      if (category.isChecked) {
        categoriesArray.push(category.value);
      }
      return categoriesArray
    })

    const sensorData = { sensors_ids: sensorsArray, categories: categoriesArray, days };

    if (!filter) {
      props.createMessage({ noFilter: 'Wybierz filtr' })
    } else if (sensorsArray.length === 0 && categoriesArray.length === 0) {
      props.createMessage({ noItems: 'Wybierz interesujące cię czujniki lub kategorie' })
    } else if (!days.match(/^([1-9]|[1-2][0-9]|[3][0])$/)) {
      props.createMessage({ daysError: 'Podaj liczbę dni z zakresu od 1 do 30' })
    }
    else {
      props.postCsv(sensorData);
    }
  }

  return (
    <div className="container">
      <div className="head" style={{"marginBottom": "40px"}}>
        <i className="far fa-file-alt fa-2x"></i>
        <h2>{t('csv-generate.csv-file')}</h2>
        <div className="line"></div>
      </div>
  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('csv-generate.csv-filter')}</label>
              <select className="form-control" onChange={handleFilterSelect} value={filter}>
                <option value="" disabled defaultValue></option>
                <option value="sensors">{t('header.sensors')}</option>
                <option value="categories">{t('csv-generate.categories')}</option>
              </select>
            </div>
  
            {filter === 'sensors' ?
            <fieldset className="form-group">
              {sensorsState.map((sensor, id) => {
                return (
                  <div key={id} className="form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={event => {
                          let checked = event.target.checked;
                          setSensorsState(
                            sensorsState.map(data => {
                              if (sensor.id === data.id) {
                                data.isChecked = checked;
                              }
                              return data;
                            })
                          )
                        }}
                        checked={sensor.isChecked}
                      />
                      {sensor.name}
                    </label>
                  </div>
                )
              })}
            </fieldset>
            : false }
  
            {filter === 'categories' ?
            <fieldset className="form-group">
              {categoriesState.map(category => {
                return (
                  <div key={category.id} className="form-check">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={event => {
                          let checked = event.target.checked;
                          setCategoriesState(
                            categoriesState.map(data => {
                              if (category.id === data.id) {
                                category.isChecked = checked;
                              }
                              return data;
                            })
                          )
                        }}
                        checked={categoriesState.isChecked}
                      />
                      {category.label}
                    </label>
                  </div>
                )
              })}
            </fieldset>
            : false }
  
            <div className="form-group">
              <label>{t('sensors.days')}</label>
              <input 
                type="text"
                className="form-control"
                name="days"
                onChange={handleDaysChange}
                value={days}
              />
            </div>
  
            <div className="form-group">
              <button className="btn btn-primary">{t('sensors.add')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  sensors: state.sensors.sensors
})

export default connect(mapStateToProps, { getSensors, postCsv, createMessage })(Csv);