import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { intersect } from '../js/utils/arrayUtils';
import { noImageMediumPlaceHolderUrl, mediumToyImageUrl } from '../js/utils/imageUtils';
import { matchesProperty } from '../js/utils/arrayUtils';
import { searchToys } from '../actions/toyLibrary';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import ToysSearchForm from './ToysSearchForm';
import ToysFilter from './ToysFilter';

import classNames from 'classnames/bind';
import styles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);

class ToysSearchResults extends Component {

  handleSubmit = (values) => {
    const {
      searchToys
    } = this.props;

    const text = values.searchText;
    searchToys({text});
  }

  passFilter(t) {
    const { catFilters, tagFilters } = this.props;
    
    return (!catFilters || catFilters.length == 0 || intersect(t.categoryIds.reduce(( acc, cur ) => acc.concat(cur._id),[]), catFilters).length == catFilters.length)
            && (!tagFilters || tagFilters.length == 0 || intersect(t.tagIds.reduce(( acc, cur ) => acc.concat(cur._id),[]), tagFilters).length == tagFilters.length);
  }
  
  addMissingProperties(toys, results) {
    var enrichedResults = results.map(function(res) { 
       var toy = matchesProperty(toys, ['_id', res._id]);
       if (toy) {
         res.pictures = toy.pictures;
         res.categoryIds = toy.categories;
         res.tagIds = toy.tags;
         res.name = toy.name;
       }
       return res;
    });
    return enrichedResults;
  }

  render() {

    const { toys, results, text, children } = this.props;
    
    var enrichedResults = this.addMissingProperties(toys, results);
    
    var toysToDisplay = enrichedResults.filter(t => this.passFilter(t));

    return (
      <div>
      { !children && 
        <div>
          <ScrollToTopOnMount/>
          <ToysSearchForm />
          <ToysFilter />
          <div>
            {results && results.length >= 0 &&
              <div>
                <div className={cx('resultTitle')}>Recherche sur "{text}" - {results.length} {results.length > 1 ? "résultats" : "résultat"}
                </div>
                <div>{results.length != toysToDisplay.length && toysToDisplay.length > 0 ? toysToDisplay.length + (toysToDisplay.length > 1 ? ' jeux passent' : ' jeu passe') + ' le filtre' : ''}</div>
              {
                toysToDisplay.map((toy) => (
                  <div key={toy._id}>
                    <ul className={cx('toy-list', 'grid')}>
                      <li className="col-xs-12 col-sm-4 col-md-3">
                        <div className={cx('toy-container')}>
                          <div>
                            <div className={cx('toy-image-container')}>
                              <Link to={'/ludotheque/search/' + toy._id + '?back=search'} title={toy.name}>
                                <div className={cx('toy-img-link')}>
                                  {toy.pictures && toy.pictures.length > 0 && <img className="img-responsive" src={mediumToyImageUrl(toy.pictures[0])} alt={toy.name} title={toy.name} />}
                                  {(!toy.pictures || toy.pictures.length == 0) && <img src={noImageMediumPlaceHolderUrl()}  /> }
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div>
                            <h5>
                              <Link className={cx('toy-name')} to={'/ludotheque/search/' + toy._id} title={toy.name}>
                              {toy.name}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
              ))}
              {results.length > 0 && toysToDisplay.length == 0 && <span>Aucun résultat ne satisfait votre filtre</span>}
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

ToysSearchResults.propTypes = {
  toys: PropTypes.array,
  results: PropTypes.array,
  text: PropTypes.string,
  catFilters: PropTypes.array,
  tagFilters: PropTypes.array,
  searchToys: PropTypes.func.isRequired,
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    toys: state.toyLibrary.toys,
    results: state.toyLibrary.search.results,
    text: state.toyLibrary.search.text,
    catFilters: state.toyLibrary.filters.categories,
    tagFilters: state.toyLibrary.filters.tags
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {searchToys})(ToysSearchResults);
