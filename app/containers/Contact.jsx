import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/contact';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import ContactForm from '../components/ContactForm';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/contact';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class Contact extends React.Component {

handleSubmit = (values) => {
  
  const {
    sendMessage,
    user: {
      authenticated
    }
  } = this.props;
  
  var subject = values.subject;
  var message = values.message;
  var firstname;
  var surname;
  var email;
  var captcharesponse;
  if (!authenticated) {
    firstname = values.firstname;
    surname = values.surname;
    email = values.email;
    captcharesponse = values.captcharesponse;
  }
  sendMessage({firstname, surname, email, subject, message, captcharesponse});
}

  render() {
    const {
      authenticated,
      message
    } = this.props.user;
    
    return (
      <div>
        <ScrollToTopOnMount/>
        <h3>Association Accompagner l'Autisme</h3>
        <div className={cx('address-line')}>46 ter rue Sainte Catherine</div>
        <div className={cx('address-line')}>45000 Orléans</div>
        <br/>
        <div className='well'>
          <h3>Laissez nous un message : </h3>
          <ContactForm onSubmit={this.handleSubmit} message={message} authenticated={authenticated} />
        </div>
      </div>
      );
  }
};

Contact.propTypes = {
  user: PropTypes.object
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, {
  sendMessage
})(Contact);
