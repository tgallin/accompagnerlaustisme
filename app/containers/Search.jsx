import React, {
  Component,
  PropTypes
}
from 'react';
import {
  connect
}
from 'react-redux';
import classNames from 'classnames/bind';
import SearchEntryBox from '../components/SearchEntryBox';
import SearchResults from '../components/SearchResults';
import { getBars, typing, going } from '../actions/bars';
import styles from '../css/components/search';

const cx = classNames.bind(styles);

class Search extends Component {
  render() {
    const {
      newLocation,
      bars,
      typing,
      getBars,
      going
    } = this.props;
    return (
      <div className={cx('search')}>
        <SearchEntryBox
          location={newLocation}
          onEntryChange={typing}
          onBarsSearch={getBars} />
        <SearchResults
          bars={bars}
          updateGoing={going} />
      </div>
    );
  }
}

Search.propTypes = {
  bars: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  getBars: PropTypes.func.isRequired,
  going: PropTypes.func.isRequired,
  newLocation: PropTypes.string
};

function mapStateToProps(state) {
  return {
    bars: state.bar.bars,
    newLocation: state.bar.newLocation
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {
  getBars,
  typing,
  going,
})(Search);
