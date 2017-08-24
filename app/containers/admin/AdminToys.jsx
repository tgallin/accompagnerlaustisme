import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import styles from 'css/components/toy';

const cx = classNames.bind(styles);

class AdminToys extends Component {

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
                    <th>Catégorie</th>
                    <th>Validé</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  toys.map((toy) => 
                    <tr key={toy._id}>
                      <td>{toy.name}</td>
                      <td>{toy.categories.length > 1 ? toy.categories[0].name + ',...' : toy.categories[0].name }</td>
                      <td>{toy.approved ? 'Oui' : 'Non'}</td>
                      <td>
                        <Link to={'/dashboard/toyLibrary/toys/' + toy._id} className="btn btn-info"><i className="fa fa-pencil"/><span className={cx('hide-btn-label')}> Editer</span></Link>
                      </td>
                    </tr>)
                }
                </tbody>
              </table>
            </div>
          }
          {(!toys || toys.length === 0) &&
            <div className={cx('paddingAll')}>Aucun jeu</div>
          }
          <Link to='/dashboard/toyLibrary/toys/0' className="btn btn-info"><i className="fa fa-plus"/> Ajouter un jeu</Link>
        </div>
        }
        {children}
      </div>
    );
  };
}

AdminToys.propTypes = {
    toys: PropTypes.array,
    error: PropTypes.string,
    children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    toys: state.adminToyLibrary.toys
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(AdminToys);
