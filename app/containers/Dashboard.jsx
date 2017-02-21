import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/dashboard';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Dashboard = () => {
  return (
<div className="container-fluid">
      <div className="row">
        <div className={'col-sm-3 col-md-2 '}>
          <ul className={'nav ' + cx('nav-sidebar')}>
            <li><a href="#">Formations</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Utilisateurs</a></li>
          </ul>
        </div>
        <div className={'col-sm-9 col-md-10 ' + cx('main')}>
          <h1 className={cx('page-header')}>Espace personnel</h1>
          <h2 className={cx('sub-header')}>Formations</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Lorem</td>
                  <td>ipsum</td>
                  <td>dolor</td>
                  <td>sit</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>amet</td>
                  <td>consectetur</td>
                  <td>adipiscing</td>
                  <td>elit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
