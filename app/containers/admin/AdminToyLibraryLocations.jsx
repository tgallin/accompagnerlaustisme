import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteToyLibrary } from '../../actions/toyLibrary';

import styles from 'css/components/toy';

const cx = classNames.bind(styles);

class AdminToyLibraryLocations extends Component {
  
  confirmDeleteToyLibrary = (id) => {
    
    const {
      deleteToyLibrary
    } = this.props;
    
    /* global bootbox */
    bootbox.confirm({
      message: "Etes-vous sûr de vouloir supprimer ce lieu ?",
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
          deleteToyLibrary(id);
        }
      }
    });
  }
  
  formatAddress(address) {
    var chunks = [];
    if (address.complement1) {
      chunks.push(address.complement1);
    }
    chunks.push(address.street);
    chunks.push(address.postalCode);
    chunks.push(address.city);
    return chunks.join(', ');
  }

  render() {
    
    const {toyLibraries, error, children } = this.props;
    
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
          {toyLibraries && toyLibraries.length > 0 &&
            
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Adresse</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  toyLibraries.map((toyLibrary) => 
                    <tr key={toyLibrary._id}>
                      <td className="col-md-8">{this.formatAddress(toyLibrary.address)}</td>
                      <td className="col-md-2">
                        <Link to={'/dashboard/toyLibrary/locations/' + toyLibrary._id} className="btn btn-info"><i className="fa fa-pencil"/><span className={cx('hide-btn-label')}> Editer</span></Link>
                      </td>
                      <td className="col-md-2">
                        <a href="#" onClick={() => this.confirmDeleteToyLibrary(toyLibrary._id)} className="btn btn-danger"><i className="fa fa-trash"/><span className={cx('hide-btn-label')}> Supprimer</span></a>
                      </td>
                    </tr>)
                }
                </tbody>
              </table>
            </div>
          }
          {(!toyLibraries || toyLibraries.length === 0) &&
            <div>
              <div className={cx('paddingAll')}>Aucun lieu</div>
            </div>
          }
          <Link to='/dashboard/toyLibrary/locations/0' className="btn btn-info"><i className="fa fa-plus"/> Ajouter un lieu</Link>
        </div>
        }
        {children}
      </div>
    );
  };
}

AdminToyLibraryLocations.propTypes = {
    toyLibraries: PropTypes.array,
    error: PropTypes.string,
    children: PropTypes.object,
    deleteToyLibrary: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    toyLibraries: state.adminToyLibrary.toyLibraries
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {deleteToyLibrary})(AdminToyLibraryLocations);
