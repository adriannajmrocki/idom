import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import { getChartData } from '../../actions/sensors';

import '../../styles/utilStyles.css';
import './style.css';

const Chart = (props) => {

  useEffect(() => {
    const id = props.match.params.id;
    props.getChartData(id);
  }, []);

  const allData = props.chartData.map(data => {
    const date = new Date(data.delivery_time).toLocaleDateString();
    const time = new Date(data.delivery_time).toLocaleTimeString();
    return `${time} | ${date}`;
  })

  const chartData = {
    // labels: props.chartData.map(data => {
    //   const date = new Date(data.delivery_time).toLocaleDateString();
    //   const time = new Date(data.delivery_time).toLocaleTimeString();
    //   return `${time} | ${date}`;
    // }),
    labels: allData,
    datasets: [
      {
        data: props.chartData.map(data => data.sensor_data),
        fill: false,
        backgroundColor: '#987316',
        borderColor: 'rgba(152, 115, 22, 0.2)',
      },
    ],
  }

  return (  
    <div className="container">
      <div className="head" style={{'marginBottom': '30px'}}>
        <h2>Wykres</h2>
        <div className="line" style={{"width": "900px"}}></div>
      </div>
      <div className="filter-buttons">
        <button className="month filter-btn">30 dni</button>
        <button className="two-weeks filter-btn">14 dni</button>
        <button className="day filter-btn">1 dzień</button>
      </div>
      <div className="chart">
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false,
            }
          }}
          height={400}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  chartData: state.sensors.chartData,
})
 
export default connect(mapStateToProps, { getChartData })(Chart);