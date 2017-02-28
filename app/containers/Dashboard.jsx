import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import DashboardNavigation from '../containers/DashboardNavigation';
import styles from 'css/components/dashboard';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Dashboard = ({children}) => {
  return (
<div className="container-fluid">
      <div className="row">
        <div className={'col-sm-3 col-md-2 '}>
          <DashboardNavigation/>
        </div>
        <div className={'col-sm-9 col-md-10 ' + cx('main')}>
          {children}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  children: PropTypes.object
};

export default Dashboard;
