import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { getUsers, deleteUser } from '../../actions/users';
import pdf from './hard-reset.pdf'

import '../../styles/utilStyles.css';
import './style.css';

class UsersList extends Component {

  static propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() { 

    const { t } = this.props;

    return (  
      <div className="container">
        <div className="head" style={{"marginBottom": "40px"}}>
          <h2 className="ml-10">{t('users.usrs')}</h2>
          <div className="line"></div>
        </div>

        {this.props.users.map(user => {
          if (user.is_active) {
            return (
              <div key={user.id} className="item">
                <ul className="item-ul">
                  <li className="item-li item-li-name-users">{user.username}</li>
                  <li className="item-li item-li-email-users">{user.email}</li>
                  <li className="item-li item-li-data-users">{user.telephone}</li>
                  <li className="item-li item-li-icon"><Link to={`/edit-user/${user.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  {!user.is_staff ? <li className="item-li item-li-icon"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteUser.bind(this, user.id)}></i></li> : <li className="item-li item-li-icon"><i className="fas fa-lock"></i></li>}
                </ul>
              </div>
            )
          }
        })}

        <div className="reset-section">
          <p>{t('users.need-reset')}?</p>
          <p>{t('users.see')} <span className='guide'><a href={pdf} target="_blank" rel="noreferrer">{t('users.guide')}</a></span></p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users
})
 
export default withTranslation('common')(connect(mapStateToProps, { getUsers, deleteUser })(UsersList));