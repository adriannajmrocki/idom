import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

import { getChartData } from '../../actions/sensors';
import { createMessage } from '../../actions/messages'; 
import Alerts from '../Alerts/Alerts';

import '../../styles/utilStyles.css';
import './style.css';

const Chart = (props) => {

  const [chartDataState, setChartDataState] = useState({});
  const [renderChart, setRenderChart] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;
    props.getChartData(id);
  }, []);

  const handleAllClick = () => {
    let allLabelsArray = [];
    props.chartData.map(data => {
      const date = new Date(data.delivery_time).toLocaleDateString();
      const time = new Date(data.delivery_time).toLocaleTimeString();
      allLabelsArray.push(`${date} | ${time}`);
    })

    let allDataArray = [];
    props.chartData.map(data => allDataArray.push(data.sensor_data))

    const allData = {
      labels: allLabelsArray,
      datasets: [
        {
          data: allDataArray,
          fill: false,
          backgroundColor: '#987316',
          borderColor: 'rgba(152, 115, 22, 0.2)',
        },
      ],
    }

    setChartDataState(allData);

    if (allLabelsArray.length > 0) {
      setRenderChart(true);
    } else {
      props.createMessage({ noChartData: 'Brak danych do narysowania wykresu w wybranym przez Ciebie filtrze' })
    }
  }

  const handleMonthClick = () => {
    let monthLabelsArray = [];
    props.chartData.map(data => {
      const date = new Date(data.delivery_time);
      const currentDate = new Date();
      const time = new Date(data.delivery_time).toLocaleTimeString();

      const diff = currentDate.getTime() - date.getTime();
      var daysDifference = Math.floor(diff / (1000 * 60 * 60 * 24)); 

      if (daysDifference < 30) {
        monthLabelsArray.push(`${date.toLocaleDateString()} | ${time}`);
      }
    })

    let monthDataArray = [];
    props.chartData.map(data => {
      const date = new Date(data.delivery_time);
      const currentDate = new Date();

      const diff = currentDate.getTime() - date.getTime();
      var daysDifference = Math.floor(diff / (1000 * 60 * 60 * 24)); 

      if (daysDifference < 30) {
        monthDataArray.push(data.sensor_data)
      }
    })

    const monthData = {
      labels: monthLabelsArray,
      datasets: [
        {
          data: monthDataArray,
          fill: false,
          backgroundColor: '#987316',
          borderColor: 'rgba(152, 115, 22, 0.2)',
        },
      ],
    }

    setChartDataState(monthData);

    if (monthLabelsArray.length > 0) {
      setRenderChart(true);
    } else {
      props.createMessage({ noChartData: 'Brak danych do narysowania wykresu w wybranym przez Ciebie filtrze' })
    }
  }

  const handleTwoWeeksClick = () => {
    let twoWeeksLabelsArray = [];
    props.chartData.map(data => {
      const date = new Date(data.delivery_time);
      const currentDate = new Date();
      const time = new Date(data.delivery_time).toLocaleTimeString();

      const diff = currentDate.getTime() - date.getTime();
      var daysDifference = Math.floor(diff / (1000 * 60 * 60 * 24)); 

      if (daysDifference < 14) {
        twoWeeksLabelsArray.push(`${date.toLocaleDateString()} | ${time}`);
      }
    })

    let twoWeeksDataArray = [];
    props.chartData.map(data => {
      const date = new Date(data.delivery_time);
      const currentDate = new Date();

      const diff = currentDate.getTime() - date.getTime();
      var daysDifference = Math.floor(diff / (1000 * 60 * 60 * 24)); 

      if (daysDifference < 14) {
        twoWeeksDataArray.push(data.sensor_data)
      }
    })

    const twoWeeksData = {
      labels: twoWeeksLabelsArray,
      datasets: [
        {
          data: twoWeeksDataArray,
          fill: false,
          backgroundColor: '#987316',
          borderColor: 'rgba(152, 115, 22, 0.2)',
        },
      ],
    }

    setChartDataState(twoWeeksData);

    if (twoWeeksLabelsArray.length > 0) {
      setRenderChart(true);
    } else {
      props.createMessage({ noChartData: 'Brak danych do narysowania wykresu w wybranym przez Ciebie filtrze' })
    }
  }

  const handleDayClick = () => {
    let dayLabelsArray = [];
    props.chartData.map(data => {
      const date = new Date(data.delivery_time).toLocaleDateString();
      const currentDate = new Date().toLocaleDateString();
      const time = new Date(data.delivery_time).toLocaleTimeString();

      if (date === currentDate) {
        dayLabelsArray.push(`${date} | ${time}`);
      }

      return `${date} | ${time}`;
    })

    let dayDataArray = [];
    props.chartData.map(data => {
      const date = new Date(data.delivery_time).toLocaleDateString();
      const currentDate = new Date().toLocaleDateString();

      if (date === currentDate) {
        dayDataArray.push(data.sensor_data)
      }
    })

    const dayData = {
      labels: dayLabelsArray,
      datasets: [
        {
          data: dayDataArray,
          fill: false,
          backgroundColor: '#987316',
          borderColor: 'rgba(152, 115, 22, 0.2)',
        },
      ],
    }

    setChartDataState(dayData);

    if (dayLabelsArray.length > 0) {
      setRenderChart(true);
    } else {
      props.createMessage({ noChartData: 'Brak danych do narysowania wykresu w wybranym przez Ciebie filtrze' })
    }
  }

  return (  
    <div className="container">
      <div className="head" style={{'marginBottom': '30px'}}>
        <h2>Wykres</h2>
        <div className="line" style={{"width": "900px"}}></div>
      </div>

      <div className="filter-buttons">
        <button className="all filter-btn" onClick={handleAllClick}>Historia</button>
        <button className="month filter-btn" onClick={handleMonthClick}>30 dni</button>
        <button className="two-weeks filter-btn" onClick={handleTwoWeeksClick}>14 dni</button>
        <button className="day filter-btn" onClick={handleDayClick}>1 dzień</button>
      </div>

      {renderChart === false ?
      <div className="choose-filter">
        <h6>Wybierz filtr, aby narysować wykres</h6>
      </div>
      :
      <div className="chart">
        <Line
          data={chartDataState}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            responsive: true,
          }}
          height={400}
        />
      </div> }
    </div>
  );
}

const mapStateToProps = state => ({
  chartData: state.sensors.chartData,
})
 
export default connect(mapStateToProps, { getChartData, createMessage })(Chart);