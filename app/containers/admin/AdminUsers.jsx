import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import styles from 'css/components/user';

const cx = classNames.bind(styles);

class AdminUsers extends Component {

  render() {
    
    const {users, error, children } = this.props;
    
    return (
      <div>
        { !children && 
        <div className="table-responsive">
          {error &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {' '}
            {error}
          </div>}
          {users && users.length > 0 &&
            
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th><div className={cx('shorten-label')}>Admin</div></th>
                    <th><div className={cx('shorten-label')}>Membre</div></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  users.map((user) => 
                    <tr key={user._id}>
                      <td>{user.profile.surname}</td>
                      <td>{user.profile.firstname}</td>
                      <td>{user.admin ? 'Oui' : 'Non'}</td>
                      <td>{user.membership && user.membership.member ? 'Oui' : 'Non'}</td>
                      <td>
                        <Link to={'/dashboard/users/' + user._id} className="btn btn-info"><i className="fa fa-pencil"/><span className={cx('hide-btn-label')}> Editer</span></Link>
                      </td>
                    </tr>)
                }
                </tbody>
              </table>
            
          }
        </div>
        }
        {children}
      </div>
    );
  };
}

AdminUsers.propTypes = {
    users: PropTypes.array,
    error: PropTypes.string,
    children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    users: state.adminUsers.users
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(AdminUsers);
