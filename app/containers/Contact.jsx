import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Contact = () => {
  return (
    <div>
        Association Accompagner l'Autisme
        6, rue Jean Hupeau
        45000 Orléans
        accompagner.autisme@gmail.com
    </div>
  );
};

export default Contact;
