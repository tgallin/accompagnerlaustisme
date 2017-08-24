import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteToy, toggleOnlineToy } from '../../actions/toyLibrary';
import { isToyLibraryCentralized } from '../../../config/app';

import styles from 'css/components/toy';
import inputStyles from 'css/common/inputs';

const cx = classNames.bind(styles);
const cy = classNames.bind(inputStyles);

class MyToys extends Component {

  confirmDeleteToy = (id) => {
    
    const {
      deleteToy
    } = this.props;
    
    /* global bootbox */
    bootbox.confirm({
      message: "Etes-vous sûr de vouloir supprimer ce jeu ?",
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
          deleteToy(id);
        }
      }
    });
  }
  
  displayHelpApprovedStatus = () => {
    bootbox.alert({
      message: "Le jeu est approuvé par un administrateur de l'association une fois que les détails renseignés ont été jugés conformes.",
      closeButton: false
    });
  }
  
  displayHelpOnlineStatus = () => {
    if (isToyLibraryCentralized) {
      bootbox.alert({
        message: "En mode de gestion centralisé, le jeu sera mis en ligne par un administrateur de l'association une fois que vous aurez déposé le jeu lors d'une permanence de la ludothèque",
        closeButton: false
      });
    } else {
      bootbox.alert({
        message: "Si vous avez décidé de garder le jeu chez vous, vous pouvez décidé de changer le statut en ligne du jeu quand vous voulez.",
        closeButton: false
      });
    }
  }
  
  displayHelpAvailableStatus = () => {
    bootbox.alert({
      message: "Le jeu est disponible s'il n'est pas emprunté et qu'il n'a été réservé par personne.",
      closeButton: false
    });
  }
  
  toggleOnline = (id) => {
    
    const {
      toggleOnlineToy
    } = this.props;
    
    toggleOnlineToy({toyId: id});
  }

  render() {
    
    const {toys, error, children } = this.props;
    
    return (
      <div>
        {error &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {' '}
            {error}
          </div>}
        {isToyLibraryCentralized &&
          <div className="alert alert-warning" role="alert">
            <strong>La ludothèque est en mode de gestion centralisée.</strong> Il est donc nécessaire de déposer vos jeux à un(e) bénévole de l'association lors d'une permanence avant que vos jeux puissent être empruntés.
          </div>}
        <div className="alert alert-info" role="alert">
            Les jeux sont visibles dans la partie ludothèque du site lorsqu'ils sont validés et en ligne.
          </div>
        { !children && 
        <div>
          {toys && toys.length > 0 &&
            
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Image</th>
                    <th>Validé <a href="#" onClick={() => this.displayHelpApprovedStatus()}><i className="fa fa-info-circle" aria-hidden="true"></i></a></th>
                    <th>En ligne <a href="#" onClick={() => this.displayHelpOnlineStatus()}><i className="fa fa-info-circle" aria-hidden="true"></i></a></th>
                    <th>Disponible <a href="#" onClick={() => this.displayHelpAvailableStatus()}><i className="fa fa-info-circle" aria-hidden="true"></i></a></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  toys.map((toy) => 
                    <tr key={toy._id}>
                      <td className="col-md-2">{toy.name}</td>
                      <td className="col-md-2">{toy.pictures && toy.pictures.length > 0 ? <img src={toy.pictures[0].eager[0].secure_url} /> : ''}</td>
                      <td className="col-md-2">{toy.approved ? 'Oui' : 'Non'}</td>
                      {toy.approved && 
                        <td className="col-md-2">
                          {isToyLibraryCentralized && <span>{toy.online ? 'Oui' : 'Non'}</span>}
                          {!isToyLibraryCentralized && 
                          <div className={cx('control-checkbox') + ' ' + cy('slide')}>
                            {toy.online && <input name="online" id="online" type="checkbox" checked readOnly onClick={() => this.toggleOnline(toy._id)} />}
                            {!toy.online && <input name="online" id="online" type="checkbox" readOnly onClick={() => this.toggleOnline(toy._id)} />}
                            <label htmlFor="online"></label>
                          </div>
                          }
                        </td>
                      }
                      {!toy.approved && 
                        <td className="col-md-2">
                          {toy.online ? 'Oui' : 'Non'}
                        </td>
                      }
                      <td className="col-md-2">{toy.available ? 'Oui' : 'Non'}</td>
                      <td className="col-md-1">
                        <Link to={'/dashboard/mytoys/' + toy._id} className="btn btn-info"><i className="fa fa-pencil"/><span className={cx('hide-btn-label')}> Editer</span></Link>
                      </td>
                      <td className="col-md-1">
                        <a href="#" onClick={() => this.confirmDeleteToy(toy._id)} className="btn btn-danger"><i className="fa fa-trash"/><span className={cx('hide-btn-label')}> Supprimer</span></a>
                      </td>
                    </tr>)
                }
                </tbody>
              </table>
            </div>
          }
          {(!toys || toys.length === 0) &&
            <div>
              <div className={cx('paddingAll')}>Aucun jeu</div>
            </div>
          }
          <Link to='/dashboard/mytoys/0' className="btn btn-info"><i className="fa fa-plus"/> Ajouter un jeu</Link>
        </div>
        }
        {children}
      </div>
    );
  };
}

MyToys.propTypes = {
    toys: PropTypes.array,
    error: PropTypes.string,
    children: PropTypes.object,
    deleteToy: PropTypes.func.isRequired,
    toggleOnlineToy: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    toys: state.user.toys
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {deleteToy, toggleOnlineToy})(MyToys);
