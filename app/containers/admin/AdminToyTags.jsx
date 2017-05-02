import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteToyTag } from '../../actions/toyLibrary';

import styles from 'css/components/toy';

const cx = classNames.bind(styles);

class AdminToyTags extends Component {

  confirmDeleteTag = (id) => {
    
    const {
      deleteToyTag
    } = this.props;

    /* global bootbox */
    bootbox.confirm({
      message: "Etes-vous sûr de vouloir supprimer ce mot clé ?",
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
            deleteToyTag(id);
          }
      }
    });
  }

  render() {
    
    const {tags, error, children } = this.props;
    
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
          {tags && tags.length > 0 &&
            
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  tags.map((tag) => 
                    <tr key={tag._id}>
                      <td className="col-md-8">{tag.name}</td>
                      <td className="col-md-2">
                        <Link to={'/dashboard/toyLibrary/tags/' + tag._id} className="btn btn-info"><i className="fa fa-pencil"/> Editer</Link>
                      </td>
                      <td className="col-md-2">
                        <a href="#" onClick={() => this.confirmDeleteTag(tag._id)} className="btn btn-danger" ><i className="fa fa-trash"/> Supprimer</a>
                      </td>
                    </tr>)
                }
                </tbody>
              </table>
            </div>
          }
          {(!tags || tags.length === 0) &&
            <div>
              <div className={cx('paddingAll')}>Aucun mot clé</div>
            </div>
          }
          <Link to='/dashboard/toyLibrary/tags/0' className="btn btn-info"><i className="fa fa-plus"/> Ajouter un mot clé</Link>
        </div>
        }
        {children}
      </div>
    );
  };
}

AdminToyTags.propTypes = {
    tags: PropTypes.array,
    error: PropTypes.string,
    children: PropTypes.object,
    deleteToyTag: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    tags: state.adminToyLibrary.tags
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {deleteToyTag})(AdminToyTags);
