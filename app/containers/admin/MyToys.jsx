import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteToy } from '../../actions/toyLibrary';

import styles from 'css/components/toy';

const cx = classNames.bind(styles);

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
        { !children && 
        <div>
          {toys && toys.length > 0 &&
            
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Image</th>
                    <th>Validé</th>
                    <th>En ligne</th>
                    <th><div className={cx('shorten-label')}>Disponible</div></th>
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
                      <td className="col-md-2">{toy.online ? 'Oui' : 'Non'}</td>
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
    deleteToy: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    toys: state.user.toys
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {deleteToy})(MyToys);
