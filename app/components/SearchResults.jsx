import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import BarItem from '../components/BarItem';
import styles from '../css/components/search-results';

const cx = classNames.bind(styles);

const SearchResults = ({ bars, updateGoing }) => {
  
  const barItems = bars.map((bar, key) => {
    return (
      <BarItem
        index={key}
        id={bar.id}
        key={key}
        name={bar.name}
        going={bar.going}
        imageUrl={bar.imageUrl}
        updateGoing={updateGoing} />);
  });

  return (
    <div className={cx('search-results')}>
      <h3 className={cx('header')}>Search results</h3>
      <ul className={cx('list')}>{barItems}</ul>
    </div>
  );
};

SearchResults.propTypes = {
  bars: PropTypes.array.isRequired,
  updateGoing: PropTypes.func.isRequired
};

export default SearchResults;
