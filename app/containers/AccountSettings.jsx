import React, { PropTypes } from 'react';
import AccountSettingsTabs from '../containers/AccountSettingsTabs';
import classNames from 'classnames/bind';
import styles from '../css/components/dashboard';

const cx = classNames.bind(styles);

const AccountSettings = ({children}) => {
  return (
    <div>
      <AccountSettingsTabs/>
  		<div className={'tab-content ' + cx('main')}>
  		  {children}
      </div>
    </div>
  );
};
  
AccountSettings.propTypes = {
  children: PropTypes.object
};

export default AccountSettings;
