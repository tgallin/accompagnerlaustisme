import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleCatFilter, toggleTagFilter, toggleFilterPanel } from '../actions/toyLibrary';

import classNames from 'classnames/bind';
import styles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);

class ToysFilter extends Component {

  toggleFilter = () => {
     const {
      toggleFilterPanel
    } = this.props;
    
    toggleFilterPanel();
  }

  toggleCat = (id) => {
    const {
      toggleCatFilter
    } = this.props;
    
    toggleCatFilter({catId: id});
  }
  
  toggleTag = (id) => {
    const {
      toggleTagFilter
    } = this.props;
    
    toggleTagFilter({tagId: id});
  }
  
  render() {

    const { toyCategories, toyTags, catFilters, tagFilters, filterExpanded } = this.props;
    
    return (
      <div className="panel-group" id="accordion">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className={'accordion-toggle' + (!filterExpanded ? ' collapsed' : '')} data-toggle="collapse" data-parent="#accordion" href="#collapseFilters" onClick={() => this.toggleFilter()}>
                Filtrer
              </a>
            </h4>
          </div>
          <div id="collapseFilters" className={'panel-collapse collapse' + (filterExpanded ? ' in' : '')}>
            <div className="panel-body">
              <div className={cx('content-header')}>Par catégories :</div>
              <ul className={cx('listNoType')}>
              {
                toyCategories.map((cat) => (
                  <li key={cat._id}>
                  <div>
                    <input type="checkbox" name={'cat_' + cat._id} id={'cat_' + cat._id} className={cx('hide-checkbox')} value={cat.name} checked={catFilters.includes(cat._id)} onClick={() => this.toggleCat(cat._id)}/>
                    <label htmlFor={'cat_' + cat._id}>{cat.name}</label>
                  </div>
                  </li>
                ))
              }
              </ul>
              <div className="clearfix"></div>
              <div className={cx('content-header')}>Par mots clés :</div>
              <ul className={cx('listNoType')}>
              {
                toyTags.map((tag) => (
                  <li key={tag._id}>
                  <div>
                    <input type="checkbox" name={'tag_' + tag._id} id={'tag_' + tag._id} className={cx('hide-checkbox')} value={tag.name} checked={tagFilters.includes(tag._id)} onClick={() => this.toggleTag(tag._id)}/>
                    <label htmlFor={'tag_' + tag._id}>{tag.name}</label>
                  </div>
                  </li>
                ))
              }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

ToysFilter.propTypes = {
  toyCategories: PropTypes.array,
  toyTags: PropTypes.array,
  catFilters: PropTypes.array,
  tagFilters: PropTypes.array,
  filterExpanded: PropTypes.boolean,
  toggleCatFilter: PropTypes.func.isRequired,
  toggleTagFilter: PropTypes.func.isRequired,
  toggleFilterPanel: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    toyCategories: state.toyLibrary.categories,
    toyTags: state.toyLibrary.tags,
    catFilters: state.toyLibrary.filters.categories,
    tagFilters: state.toyLibrary.filters.tags,
    filterExpanded: state.toyLibrary.filters.expanded
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {toggleCatFilter, toggleTagFilter, toggleFilterPanel})(ToysFilter);
