import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../actions/users';

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
      <Fragment>
        {/* { this.props.users.map(user => {
          switch (user.is_staff) {
            case true:
              return ( */}
                {/* <Fragment> */}
                  <h2 style={{ marginTop: "40px" }}>Użytkownicy</h2>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Login</th>
                        <th>Email</th>
                        <th>Numer telefonu</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.props.users.map(user => (
                        <tr key={user.id}>
                          {user.is_active ? <td>{user.username}</td> : false}
                          {user.is_active ? <td>{user.email}</td> : false}
                          {user.is_active ? <td>{user.telephone}</td> : false}
                          {user.is_active ? <td>{!user.is_staff ? <button onClick={this.props.deleteUser.bind(this, user.id)} className="btn btn-danger btn-sm">Usuń</button> : ''}</td> : false}
                        </tr>
                      )) }
                    </tbody>
                  </table>
                {/* </Fragment> */}
              {/* )
              break;
            case false:
              return (<h2>Nie masz uprawnień administratora</h2>)
              break;
            default:
              return "ERROR"
          }
        }) } */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users
})
 
export default connect(mapStateToProps, { getUsers, deleteUser })(UsersList);