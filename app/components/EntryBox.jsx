import React, {
  PropTypes
}
from 'react';
import classNames from 'classnames/bind';
import SearchBarsTextInput from '../components/SearchBarsTextInput';
import styles from '../css/components/entrybox';

const cx = classNames.bind(styles);

// Takes callback functions from props and passes it down to SearchBarsTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move SearchBarsTextInput up to EntryBox so it's less confusing
const EntryBox = ({
  onEntryChange,
  onBarsSearch,
  location
}) => {
  return (
    <div className={cx('entrybox')}>
      <h1 className={cx('header')}>See which bars are around you and tell the others you are going!</h1>
      <SearchBarsTextInput
        className={cx('input')}
        value={location}
        placeholder="Where you at?"
        onEntryChange={onEntryChange}
        onBarsSearch={onBarsSearch} />
    </div>
  );
};

EntryBox.propTypes = {
  location: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onBarsSearch: PropTypes.func.isRequired
};

export default EntryBox;
