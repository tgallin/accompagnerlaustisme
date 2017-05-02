import React, { PropTypes } from 'react';
import AdminToyLibraryTabs from '../../containers/admin/AdminToyLibraryTabs';
import classNames from 'classnames/bind';
import styles from 'css/components/dashboard';

const cx = classNames.bind(styles);

const AdminToyLibrary = ({children}) => {
  return (
    <div>
      <AdminToyLibraryTabs/>
  		<div className={'tab-content ' + cx('main')}>
  		  {children}
      </div>
    </div>
  );
};
  
AdminToyLibrary.propTypes = {
  children: PropTypes.object
};

export default AdminToyLibrary;
