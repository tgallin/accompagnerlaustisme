import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import styles from 'css/components/toy';

const cx = classNames.bind(styles);

class MyToys extends Component {

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
                    <th>Disponible</th>
                  </tr>
                </thead>
                <tbody>
                {
                  toys.map((toy) => 
                    <tr key={toy._id}>
                      <td>{toy.name}</td>
                      <td>{toy.pictures && toy.pictures.length > 0 ? toy.pictures[0] : ''}</td>
                      <td>{toy.approved ? 'Oui' : 'Non'}</td>
                      <td>{toy.online ? 'Oui' : 'Non'}</td>
                      <td>{toy.available ? 'Oui' : 'Non'}</td>
                      <td>
                        <Link to={'/dashboard/toys/' + toy._id} className="btn btn-info"><i className="fa fa-pencil"/> Editer</Link>
                      </td>
                    </tr>)
                }
                </tbody>
              </table>
            </div>
          }
          {(!toys || toys.length === 0) &&
            <div>
              <div className={cx('paddingAll')}>Aucun jouet</div>
            </div>
          }
          <Link to='/dashboard/createToy' className="btn btn-info"><i className="fa fa-plus"/> Ajouter un jouet</Link>
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
    children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    toys: state.user.toys
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(MyToys);
