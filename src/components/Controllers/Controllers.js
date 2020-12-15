import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Switch from "react-switch";

import { getControllers, deleteController, runController, getControllerData, runBulb } from '../../actions/controllers';

import '../../styles/utilStyles.css';
import './style.css';

class Controllers extends Component {

  state = {
    flag: '',
  }

  static propTypes = {
    controllers: PropTypes.array.isRequired,
    getControllers: PropTypes.func.isRequired,
    deleteController: PropTypes.func.isRequired,
    runController: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getControllers();
  }

  render() {
    return (
      <div className="container">
        <div className="head" style={{"marginBottom": "40px"}}>
          <i className="fas fa-gamepad fa-2x"></i>
          <h2>Sterowniki</h2>
          <div className="line"></div>
          <Link to='/add-controller'><button type="button" className="add-btn">+</button></Link>
        </div>
  
        <div className="category-field">
          <i className="fas fa-toggle-on fa-2x"></i>
          <h5 className="category-title">Przycisk</h5>
        </div>
        {this.props.controllers.map(controller => {
          if (controller.category === 'clicker') {
            return (
              <div key={controller.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{controller.name}</li>
                  <li className="item-li"><i className="far fa-play-circle fa-lg"></i></li>
                  <li className="icon item-li"><Link to={`/edit-controller/${controller.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="icon item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteController.bind(this, controller.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field" style={{"marginTop": "40px"}}>
          <i className="far fa-lightbulb fa-2x"></i>
          <h5 className="category-title">Żarówka</h5>
        </div>
        {this.props.controllers.map(controller => {
          if (controller.category === 'bulb') {
            return (
              <div key={controller.id} className="item">
                <ul className="item-ul">
                  <li className="item-li" style={{"flex": "3"}}>{controller.name}</li>
                  <li className="item-li">
                    <Switch
                      checked={controller.data} 
                      onChange={e => {
                        let data = {};

                        if (controller.data === true) {
                          data = { flag: 'off' }
                        } else {
                          data = { flag: 'on' }
                        }

                        this.props.runBulb(controller.id, data);
                        controller.data = !controller.data;
                      }} 
                      onColor='#987316'
                    />
                  </li>
                  <li className="icon item-li"><Link to={`/bulb-color/${controller.id}`}><i className="fas fa-palette fa-lg"></i></Link></li>
                  <li className="icon item-li"><Link to={`/edit-controller/${controller.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="icon item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteController.bind(this, controller.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field" style={{"marginTop": "40px"}}>
          <i className="fas fa-scroll fa-2x"></i>
          <h5 className="category-title">Roleta</h5>
        </div>
        {this.props.controllers.map(controller => {
          if (controller.category === 'roller_blind') {
            return (
              <div key={controller.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{controller.name}</li>
                  <li className="item-li"><i className="far fa-play-circle fa-lg" onClick={this.props.runController.bind(this, controller.name)}></i></li>
                  <li className="icon item-li"><Link to={`/edit-controller/${controller.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="icon item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteController.bind(this, controller.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  controllers: state.controllers.controllers,
  controllerData: state.controllers.controllerData
})

export default connect(mapStateToProps, { getControllers, deleteController, runController, getControllerData, runBulb })(Controllers);





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import Switch from "react-switch";

// import { getControllers, deleteController, runController, getControllerData, runBulb } from '../../actions/controllers';

// import '../../styles/utilStyles.css';
// import './style.css';

// function Controllers(props) {

//   const [controllersState, setControllersState] = useState([]);
//   const [checked, setChecked] = useState()
//   const [flag, setFlag] = useState('off');

//   useEffect(() => {
//     props.getControllers();
//     let controllersStateProps = props.controllers;
//     setControllersState(controllersStateProps);
//   }, [])

//   return (
//     <div className="container">
//       <div className="head" style={{"marginBottom": "40px"}}>
//         <i className="fas fa-gamepad fa-2x"></i>
//         <h2>Sterowniki</h2>
//         <div className="line"></div>
//         <Link to='/add-controller'><button type="button" className="add-btn">+</button></Link>
//       </div>
  
//       <div className="category-field">
//         <i className="fas fa-toggle-on fa-2x"></i>
//         <h5 className="category-title">Przycisk</h5>
//       </div>
//       {props.controllers.map(controller => {
//         if (controller.category === 'clicker') {
//           return (
//             <div key={controller.id} className="item">
//               <ul className="item-ul">
//                 <li className="item-li">{controller.name}</li>
//                 <li className="item-li"><i className="far fa-play-circle fa-lg"></i></li>
//                 <li className="icon item-li"><Link to={`/edit-controller/${controller.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
//                 <li className="icon item-li"><i className="far fa-trash-alt fa-lg" onClick={props.deleteController.bind(this, controller.id)}></i></li>
//               </ul>
//             </div>
//           )
//         }
//       })}

//       <div className="category-field" style={{"marginTop": "40px"}}>
//         <i className="far fa-lightbulb fa-2x"></i>
//         <h5 className="category-title">Żarówka</h5>
//       </div>
//       {props.controllers.map(controller => {
//         if (controller.category === 'bulb') {
//           return (
//             <div key={controller.id} className="item">
//               <ul className="item-ul">
//                 <li className="item-li">{controller.name}</li>
//                 <li className="icon item-li"><i className="fas fa-lightbulb fa-lg" onClick={e => {
//                   e.preventDefault();
//                   props.runBulb(controller.id, flag);
//                 }}></i></li>
//                 <li className="icon item-li"><Link to={`/edit-controller/${controller.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
//                 <li className="icon item-li"><i className="far fa-trash-alt fa-lg" onClick={props.deleteController.bind(this, controller.id)}></i></li>
//               </ul>
//             </div>
//           )
//         }
//       })}

//       <div className="category-field" style={{"marginTop": "40px"}}>
//         <i className="fas fa-scroll fa-2x"></i>
//         <h5 className="category-title">Roleta</h5>
//       </div>
//       {props.controllers.map(controller => {
//         if (controller.category === 'roller_blind') {
//           return (
//             <div key={controller.id} className="item">
//               <ul className="item-ul">
//                 <li className="item-li">{controller.name}</li>
//                 <li className="item-li"><i className="far fa-play-circle fa-lg" onClick={props.runController.bind(this, controller.name)}></i></li>
//                 <li className="icon item-li"><Link to={`/edit-controller/${controller.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
//                 <li className="icon item-li"><i className="far fa-trash-alt fa-lg" onClick={props.deleteController.bind(this, controller.id)}></i></li>
//               </ul>
//             </div>
//           )
//         }
//       })}
//     </div>
//   )
// }

// const mapStateToProps = state => ({
//   controllers: state.controllers.controllers,
//   controllerData: state.controllers.controllerData
// })

// export default connect(mapStateToProps, { getControllers, deleteController, runController, getControllerData, runBulb })(Controllers);
