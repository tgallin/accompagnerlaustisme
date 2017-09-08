import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/adminUsers';

import styles from 'css/components/user';

const cx = classNames.bind(styles);

class AdminUsers extends Component {

  confirmDeleteUser = (id) => {
    
    const {
      deleteUser
    } = this.props;
    
    /* global bootbox */
    bootbox.confirm({
      message: "Etes-vous sûr de vouloir supprimer cet utilisateur ?",
      size: 'small',
      backdrop: true,
      closeButton: false,
      buttons: {
          confirm: {
              label: 'Oui',
              className: 'btn-danger'
          },
          cancel: {
              label: 'Non',
              className: 'btn-default'
          }
      },
      callback: function (confirmedDelete) {
        if (confirmedDelete) {
          deleteUser(id);
        }
      }
    });
  }

  render() {
    
    const {users, error, children } = this.props;
    
    return (
      <div>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        { !children && 
        <div>
          {users && users.length > 0 &&
            
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nom prénom / Raison sociale</th>
                    <th><div className={cx('shorten-label')}>Admin</div></th>
                    <th><div className={cx('shorten-label')}>Membre</div></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  users.map((user) => 
                    <tr key={user._id}>
                      {user.profile.surname !== "" && 
                        <td>{user.profile.surname + ' ' + user.profile.firstname}</td>
                      }
                      {user.profile.entityName !== "" && 
                        <td>{user.profile.entityName}</td>
                      }
                      <td>{user.admin ? 'Oui' : 'Non'}</td>
                      <td>{user.membership && user.membership.member ? 'Oui' : 'Non'}</td>
                      <td>
                        <Link to={'/dashboard/users/' + user._id} className="btn btn-info"><i className="fa fa-pencil"/><span className={cx('hide-btn-label')}> Editer</span></Link>
                      </td>
                      <td>
                        <a href='#' onClick={() => this.confirmDeleteUser(user._id)} className="btn btn-danger"><i className="fa fa-trash"/><span className={cx('hide-btn-label')}> Supprimer</span></a>
                      </td>
                    </tr>)
                }
                </tbody>
              </table>
            </div>
          }
          {(!users || users.length === 0) &&
            <div className={cx('paddingAll')}>Aucun utilisateur</div>
          }
          <Link to='/dashboard/users/0' className="btn btn-info"><i className="fa fa-plus"/> Ajouter un utilisateur</Link>
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
    children: PropTypes.object,
    deleteUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.adminUsers.users
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {deleteUser})(AdminUsers);
