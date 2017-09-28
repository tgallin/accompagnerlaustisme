import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleCatFilter, toggleTagFilter } from '../actions/toyLibrary';
import { intersect } from '../utils/arrayUtils';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

import classNames from 'classnames/bind';
import styles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);

class Toys extends Component {

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
  
  passFilter(t) {
    const { catFilters, tagFilters } = this.props;
    
    return (!catFilters || catFilters.length == 0 || intersect(t.categories.reduce(( acc, cur ) => acc.concat(cur._id),[]), catFilters).length == catFilters.length)
            && (!tagFilters || tagFilters.length == 0 || intersect(t.tags.reduce(( acc, cur ) => acc.concat(cur._id),[]), tagFilters).length == tagFilters.length);
  }


  render() {

    const { toys, toyCategories, toyTags, catFilters, tagFilters, children } = this.props;
    
    var toysToDisplay = toys.filter(t => this.passFilter(t));

    return (
      <div>
      { !children && 
        <div className="row">
          <ScrollToTopOnMount/>
          <div className={'col-xs-4 col-sm-3 col-md-2 ' + cx('filters')}>
            <h1>Filtrer</h1>
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
          <div className="col-xs-8 col-sm-9 col-md-10">
            {toys && toys.length > 0 &&
              <div>
                <div className={cx('header')}>Catalogue de jeux</div>
                
                {
                  toysToDisplay.map((toy) => (
                    <div key={toy._id}>
                      <ul className={cx('toy_list', 'grid')}>
                        <li className="col-xs-12 col-sm-4 col-md-5">
                          <div className={cx('toy-container')}>
                            <div>
                              <div className={cx('toy-image-container')}>
                                <Link className={cx('toy_img_link')} to={'/ludotheque/toys/' + toy._id + '?back=catalog'} title={toy.name}>
                                  <div>{toy.pictures && toy.pictures.length > 0 && <img className="img-responsive" src={toy.pictures[0].eager[2].secure_url} alt={toy.name} title={toy.name} />}</div>
                                  <div>{(!toy.pictures || toy.pictures.length == 0) && <img src="http://via.placeholder.com/200x200?text=Aucune+image" /> }</div>
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h5>
                                <Link className={cx('toy-name')} to={'/ludotheque/toys/' + toy._id} title={toy.name}>
                                {toy.name}
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                ))}
                {toysToDisplay.length == 0 && <span>Aucun jeu ne satisfait votre filtre</span>}
              </div>
            }
          </div>
        </div>
      }
      {children}
      </div>
    );
  };
}

Toys.propTypes = {
  toys: PropTypes.array,
  toyCategories: PropTypes.array,
  toyTags: PropTypes.array,
  catFilters: PropTypes.array,
  tagFilters: PropTypes.array,
  toggleCatFilter: PropTypes.func.isRequired,
  toggleTagFilter: PropTypes.func.isRequired,
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    toys: state.toyLibrary.toys,
    toyCategories: state.toyLibrary.categories,
    toyTags: state.toyLibrary.tags,
    catFilters: state.toyLibrary.filters.categories,
    tagFilters: state.toyLibrary.filters.tags
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {toggleCatFilter, toggleTagFilter})(Toys);
