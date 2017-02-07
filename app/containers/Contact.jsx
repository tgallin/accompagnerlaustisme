import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/contact';
import ContactForm from '../components/ContactForm';
import Loading from '../components/Loading';
import { connect } from 'react-redux';

const cx = classNames.bind(styles);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class Contact extends React.Component {



handleSubmit = (values) => {
  return sleep(1000) // simulate server latency
    .then(() => {
      window.alert(`Valeurs à envoyer par email:\n\n${JSON.stringify(values, null, 2)}`);
    });
}

  render() {
    const {
      isWaiting,
      authenticated,
      message
    } = this.props.user;
    
    return (
    <Loading isLoading={isWaiting}>
        <h3>Association Accompagner l'Autisme</h3>
        <div className={cx('address-line')}>6, rue Jean Hupeau</div>
        <div className={cx('address-line')}>45000 Orléans</div>
        <br/>
        <div className='container well'>
        <h3>Laissez nous un message : </h3>
        <ContactForm onSubmit={this.handleSubmit} message={message} authenticated={authenticated} />
        </div>
    </Loading>);
  }
};

Contact.propTypes = {
  user: PropTypes.object
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({
  user
}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(Contact);
