import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteToyBooking } from '../../actions/toyLibrary';

import styles from 'css/components/toyCreation';

const cx = classNames.bind(styles);

moment.locale('fr');

class AdminToyBookings extends Component {
  
  confirmDeleteToyBooking = (id) => {
    
    const {
      deleteToyBooking
    } = this.props;
    
    /* global bootbox */
    bootbox.confirm({
      message: "Etes-vous sûr de vouloir supprimer cet emprunt ?",
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
          deleteToyBooking(id);
        }
      }
    });
  }
  
  render() {
    
    const {toyBookings, error, children } = this.props;
    
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
          {toyBookings && toyBookings.length > 0 &&
            
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Emprunteur</th>
                    <th>Jeu</th>
                    <th>Ref</th>
                    <th>Début</th>
                    <th>Fin</th>
                    <th>Retour</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  toyBookings.map((toyBooking) => 
                    <tr key={toyBooking._id}>
                      <td className="col-md-3">{toyBooking.borrower && toyBooking.borrower.profile ? toyBooking.borrower.profile.displayName : ''}</td>
                      <td className="col-md-2">{toyBooking.toy && toyBooking.toy.name ? toyBooking.toy.name : ''}</td>
                      <td className="col-md-2">{toyBooking.reference}</td>
                      <td className="col-md-1">{toyBooking.start ? moment(toyBooking.start).format('DD/MM/YYYY') : ''}</td>
                      <td className="col-md-1">{toyBooking.end ? moment(toyBooking.end).format('DD/MM/YYYY') : ''}</td>
                      <td className="col-md-1">{toyBooking.returnedDate ? moment(toyBooking.returnedDate).format('DD/MM/YYYY') : ''}</td>
                      <td className="col-md-1">
                        <Link to={'/dashboard/toyLibrary/bookings/' + toyBooking._id} className="btn btn-info"><i className="fa fa-pencil"/><span className={cx('hide-btn-label')}> Editer</span></Link>
                      </td>
                      <td className="col-md-1">
                        <a href="#" onClick={() => this.confirmDeleteToyBooking(toyBooking._id)} className="btn btn-danger"><i className="fa fa-trash"/><span className={cx('hide-btn-label')}> Supprimer</span></a>
                      </td>
                    </tr>)
                }
                </tbody>
              </table>
            </div>
          }
          {(!toyBookings || toyBookings.length === 0) &&
            <div>
              <div className={cx('paddingAll')}>Aucun emprunt</div>
            </div>
          }
          <Link to='/dashboard/toyLibrary/bookings/0' className="btn btn-info"><i className="fa fa-plus"/> Ajouter un emprunt</Link>
        </div>
        }
        {children}
      </div>
    );
  };
}

AdminToyBookings.propTypes = {
    toyBookings: PropTypes.array,
    error: PropTypes.string,
    children: PropTypes.object,
    deleteToyBooking: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    toyBookings: state.adminToyLibrary.toyBookings
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {deleteToyBooking})(AdminToyBookings);
