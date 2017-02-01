import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/contact';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Contact = () => {
  return (
    <div>
        <h3>Association Accompagner l'Autisme</h3>
        <div className={cx('address-line')}>6, rue Jean Hupeau</div>
        <div className={cx('address-line')}>45000 Orléans</div>
        <div className={cx('address-line')}><a href="mailto:accompagner.autisme@gmail.com" target="_top">accompagner.autisme@gmail.com</a></div>
    </div>
  );
};

export default Contact;
