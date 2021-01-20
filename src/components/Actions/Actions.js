import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { getActions, deleteAction } from '../../actions/actions';

import '../../styles/utilStyles.css';

class Actions extends Component {

  static propTypes = {
    interactions: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.getActions();
  }

  render() { 

    const { t } = this.props;

    return (  
      <div className="container">
        <div className="head" style={{"marginBottom": "40px"}}>
          <h2>{t('actions.actions-h')}</h2>
          <div className="line"></div>
          <Link to='/add-action'><button type="button" className="add-btn">+</button></Link>
        </div>
  
        {this.props.interactions.map(interaction => {
          return (
            <div key={interaction.id} className="item">
              <ul className="item-ul">
                <li className="item-li item-li-name">{interaction.name}</li>
                <li className="icon item-li item-li-icon"><Link to={`/edit-action/${interaction.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                <li className="icon item-li item-li-icon"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteAction.bind(this, interaction.id)}></i></li>
              </ul>
            </div>
          )
        })}
      </div>
    );
  }
}
 
const mapStateToProps = state => ({
  interactions: state.actions.interactions
})

export default withTranslation('common')(connect(mapStateToProps, { getActions, deleteAction })(Actions));