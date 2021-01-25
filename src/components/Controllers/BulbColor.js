import React, { Component } from 'react';
import { connect } from 'react-redux';
import hexRgb from 'hex-rgb';
import { withTranslation } from 'react-i18next';

import { postBulbBrightness, postBulbColor } from '../../actions/controllers';

import '../../styles/utilStyles.css';

class BulbColor extends Component {

  state = {
    brightness: 0,
    color: '#987316',
    red: 152,
    green: 115,
    blue: 22
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

    const id = this.props.match.params.id;
    const brightnessValue = { brightness: this.state.brightness }
    const colorValue = { red: this.state.red, green: this.state.green, blue: this.state.blue }

    this.props.postBulbBrightness(id, brightnessValue);
    this.props.postBulbColor(id, colorValue);
  }

  render() { 

    const { t } = this.props;

    return (  
      <div className="container">
        <div className="head" style={{"marginBottom": "40px"}}>
          <h2>{t('controllers.color-settings')}</h2>
          <div className="line" style={{'width': '700px'}}></div>
        </div>

        <div className="col-md-6 m-auto custom-position">
          <div className="card card-body mt-5 custom-border-style custom-position">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>{t('actions.brightness')}</label>
                <input className="custom-range" type="range" name="brightness" min="0" max="100" value={this.state.brightness} onChange={this.handleBrightnessChange} data-sizing="px" />
              </div>

              <div className="form-group">
                <label>{t('actions.color')}</label>
                <input className="form-control" id="color" type="color" name="color" value={this.state.color} onChange={this.handleColorChange} />
              </div>

              <div className="ff-center">
                <button className="button">{t('controllers.confirm')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
 
export default withTranslation('common')(connect(null, { postBulbBrightness, postBulbColor })(BulbColor));