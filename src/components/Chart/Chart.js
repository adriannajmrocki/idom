import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import { getChartData } from '../../actions/sensors';

import '../../styles/utilStyles.css';

const Chart = (props) => {

  useEffect(() => {
    const id = props.match.params.id;
    props.getChartData(id);
  }, []);

  const chartData = {
    labels: props.chartData.map(data => {
      const date = new Date(data.delivery_time).toLocaleDateString();
      const time = new Date(data.delivery_time).toLocaleTimeString();
      return `${time} | ${date}`;
    }),
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
      <div className="head" style={{'marginBottom': '50px'}}>
        <h2>Wykres</h2>
        <div className="line" style={{"width": "900px"}}></div>
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


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Line } from 'react-chartjs-2';

// import { getChartData } from '../../actions/sensors';

// import '../../styles/utilStyles.css';

// class Chart extends Component {
//   state = {
//     chartData: {
//       labels: this.props.chartData.map(data => {
//         const date = new Date(data.delivery_time).toLocaleDateString();
//         const time = new Date(data.delivery_time).toLocaleTimeString();
//         return `${time} | ${date}`;
//       }),
//       datasets: [
//         {
//           data: this.props.chartData.map(data => data.sensor_data),
//           fill: false,
//           backgroundColor: '#987316',
//           borderColor: 'rgba(152, 115, 22, 0.2)',
//         },
//       ],
//     }
//   }

//   static propTypes = {
//     getChartData: PropTypes.func.isRequired
//   }

//   componentDidMount() {
//     const id = this.props.match.params.id;
//     this.props.getChartData(id);
//   }

//   render() { 

//     const { chartData } = this.state;

//     return (  
//       <div className="container">
//         <div className="head" style={{'marginBottom': '50px'}}>
//           <h2>Wykres</h2>
//           <div className="line" style={{"width": "900px"}}></div>
//         </div>
//         <div className="chart">
//           <Line
//             data={chartData}
//             options={{
//               maintainAspectRatio: false,
//               legend: {
//                 display: false,
//               }
//             }}
//             height={400}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   chartData: state.sensors.chartData,
// })
 
// export default connect(mapStateToProps, { getChartData })(Chart);