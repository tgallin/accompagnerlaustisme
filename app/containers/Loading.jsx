import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingAnim from '../components/LoadingAnim';

class Loading extends Component {
  
  render() {
    const {
      user : {
        isWaiting
      }
    } = this.props;
    
    if (isWaiting) {
      return (
          <LoadingAnim />
      );
    }
    return null;
  };
}

Loading.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Loading);
