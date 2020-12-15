import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../../actions/users';

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
    return (  
      <div className="container">
        <div className="head" style={{"marginBottom": "40px"}}>
          <i className="far fa-user fa-2x"></i>
          <h2>Użytkownicy</h2>
          <div className="line"></div>
        </div>

        {this.props.users.map(user => {
          if (user.is_active) {
            return (
              <div key={user.id} className="item">
                <ul className="item-ul">
                  <li className="username">{user.username}</li>
                  <li className="email">{user.email}</li>
                  <li className="telephone">{user.telephone}</li>
                  <li className="icon"><Link to={`/edit-user/${user.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  {!user.is_staff ? <li className="icon"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteUser.bind(this, user.id)}></i></li> : <li className="icon"><i className="fas fa-lock"></i></li>}
                </ul>
              </div>
            )
          }
        })}

        <div className="reset-section">
          <p>Potrzebujesz resetu systemu?</p>
          <p>Skorzystaj z <span className='guide'><a href="https://adriannajmrocki.github.io/idom-website/" target="_blank" rel="noreferrer">poradnika</a></span></p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users
})
 
export default connect(mapStateToProps, { getUsers, deleteUser })(UsersList);