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
  isWaiting: PropTypes.bool,
  isFectching: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isWaiting: state.isWaiting,
    isFectching: state.isFetching
  };
}

export default connect(mapStateToProps)(Loading);
