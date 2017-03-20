import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingAnim from '../components/LoadingAnim';

class Loading extends Component {
  
  render() {
    const {
      isFetching,
      isWaiting
    } = this.props;
    
    if (isFetching || isWaiting) {
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
    user: state.user,
    isFectching: state.isFetching
  };
}

export default connect(mapStateToProps)(Loading);
