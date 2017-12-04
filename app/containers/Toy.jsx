import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {} from '../actions/toyLibrary';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import ToysImageGallery from '../components/ToysImageGallery.jsx';
import ToysSearchForm from './ToysSearchForm';
import { matchesProperty } from '../js/utils/arrayUtils';

import classNames from 'classnames/bind';
import styles from 'css/components/toyView';
import toyLibraryStyles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);
const cy = classNames.bind(toyLibraryStyles);

class Toy extends Component {
  
  
  renderCategories(categories) {
    
    var catArr = categories.reduce(( acc, cur ) => acc.concat(cur.name),[]);

    return (<div className={cx('toy-details-section')}> <span className={cx('label')}>{catArr.length > 1 ? 'Catégories' : 'Catégorie'} :</span> <span>{catArr.join(', ')}</span></div>);
  }
  
  renderTags(tags) {
    
    var tagArr = tags.reduce(( acc, cur ) => acc.concat(cur.name),[]);

    return (<div className={cx('toy-details-section')}> <span className={cx('label')}>{tagArr.length > 1 ? 'Mots clés' : 'Mot clé'} :</span> <span>{tagArr.join(', ')}</span></div>);
  }

  render() {

    const { toys, toyId, back, searchText } = this.props;

    var toy = matchesProperty(toys, ['_id', toyId]);


    return (
      <div>
          <ScrollToTopOnMount/>
          <ToysSearchForm />
          
          <div id="columns" className="container">
          <div className={'pull-right ' + cy('paddingBottom')}>
           {!back && <Link to={'/ludotheque'} title='Revenir à la ludothèque'><i className="fa fa-chevron-left"></i> Retourner à la ludothèque</Link>
           }
           {back && back === 'catalog' && <Link to={'/ludotheque/toys'} title='Revenir au catalogue'><i className="fa fa-chevron-left"></i> Retourner au catalogue</Link>
           }
           {back && back === 'search' && <Link to={'/ludotheque/search'} title='Revenir à la recherche'><i className="fa fa-chevron-left"></i> Retourner aux résultats de la recherche sur "{searchText}"</Link>
           }
          </div>
          <div className="clearfix"></div>
          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <div>
                <div className={'row ' + cx('primary_block')}>
                  <div className="col-xs-12 col-sm-7 col-md-6">
                    <ToysImageGallery pictures={toy.pictures} />
                  </div>
                  <div className={'col-xs-12 col-sm-5 col-md-6'}>
                    <div className={cx('toy-name')}>
                      {toy.name}
                    </div>
                    <div>{toy.available ? <span className={cx('available')}>Disponible</span> : <span className={cx('unavailable')}>Non disponible</span>}</div>
                    {this.renderCategories(toy.categories)}
                    {this.renderTags(toy.tags)}
                    {toy.content &&
                      <div className={cx('toy-details-section')}>
                        <div className={cx('content-header')}>Contenu</div>
                        <div className={cx('content')}>{toy.content}</div>
                      </div>
                    }
                    {toy.description &&
                      <div className={cx('toy-details-section')}>
                        <div className={cx('content-header')}>Description</div>
                        <div className={cx('content')}>{toy.description}</div>
                      </div>
                    }
                    {!toy.available &&
                      <div> <span className={cx('label')}>Nombre de personnes sur la liste d'attente :</span> <span>{toy.waiting ? toy.waiting.length : 0}</span></div>
                    }
                  </div>
                  {/* 
                  <div className="col-xs-12 col-sm-8 col-md-7">
                    <form id="bookToy" action="" method="post">
                      <input type="hidden" name="toyId" id="toyId" value={toyId} />
                      <button type="submit" name="Submit" className="btn btn-warning"> <span>Réserver</span> </button>
                    </form>
                  </div>
                  */}
                </div>
        {/* insert suggested toys section here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

/*
               <section className="pdtslies">
                  <h3 className="page-toy-heading">Produits recommandés :</h3>
                  <div className="row">
                    <div className=" col-md-3 text-center ">
                      <p>
                        <Link className={cy('toy-name')} to={'/ludotheque/toys/' + suggestedToy._id} title={suggestedToy.name}>
                        {suggestedToy.pictures && suggestedToy.pictures.length > 0 && <img className="img-responsive" src={toy.pictures[0].eager[2].secure_url} alt={toy.name} title={toy.name} />}
                        {(!suggestedToy.pictures || suggestedToy.pictures.length == 0) && <img src="http://via.placeholder.com/200x200?text=Aucune+image" /> }
                        </Link>
                      </p>
                      <p> 
                        <Link className={cy('toy-name')} to={'/ludotheque/toys/' + suggestedToy._id} title={suggestedToy.name}>
                        {suggestedToy.name}
                        </Link>
                      </p>
                    </div>
                    <div className=" col-md-3 text-center ">
                      <p>
                        <Link className={cy('toy-name')} to={'/ludotheque/toys/' + suggestedToy._id} title={suggestedToy.name}>
                        {suggestedToy.pictures && suggestedToy.pictures.length > 0 && <img className="img-responsive" src={toy.pictures[0].eager[2].secure_url} alt={toy.name} title={toy.name} />}
                        {(!suggestedToy.pictures || suggestedToy.pictures.length == 0) && <img src="http://via.placeholder.com/200x200?text=Aucune+image" /> }
                        </Link>
                      </p>
                      <p> 
                        <Link className={cy('toy-name')} to={'/ludotheque/toys/' + suggestedToy._id} title={suggestedToy.name}>
                        {suggestedToy.name}
                        </Link>
                      </p>
                    </div>
                    <div className=" col-md-3 text-center ">
                      <p>
                        <Link className={cy('toy-name')} to={'/ludotheque/toys/' + suggestedToy._id} title={suggestedToy.name}>
                        {suggestedToy.pictures && suggestedToy.pictures.length > 0 && <img className="img-responsive" src={toy.pictures[0].eager[2].secure_url} alt={toy.name} title={toy.name} />}
                        {(!suggestedToy.pictures || suggestedToy.pictures.length == 0) && <img src="http://via.placeholder.com/200x200?text=Aucune+image" /> }
                        </Link>
                      </p>
                      <p> 
                        <Link className={cy('toy-name')} to={'/ludotheque/toys/' + suggestedToy._id} title={suggestedToy.name}>
                        {suggestedToy.name}
                        </Link>
                      </p>
                    </div>
                    <div className=" col-md-3 text-center ">
                      <p>
                        <Link className={cy('toy-name')} to={'/ludotheque/toys/' + suggestedToy._id} title={suggestedToy.name}>
                        {suggestedToy.pictures && suggestedToy.pictures.length > 0 && <img className="img-responsive" src={toy.pictures[0].eager[2].secure_url} alt={toy.name} title={toy.name} />}
                        {(!suggestedToy.pictures || suggestedToy.pictures.length == 0) && <img src="http://via.placeholder.com/200x200?text=Aucune+image" /> }
                        </Link>
                      </p>
                      <p> 
                        <Link className={cy('toy-name')} to={'/ludotheque/toys/' + suggestedToy._id} title={suggestedToy.name}>
                        {suggestedToy.name}
                        </Link>
                      </p>
                    </div>
                  </div>
                </section>
*/

Toy.propTypes = {
  toys: PropTypes.array,
  toyId: PropTypes.string,
  searchText: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return {
    toys: state.toyLibrary.toys,
    searchText: state.toyLibrary.search.text,
    toyId: ownProps.params.id,
    back: ownProps.location.query.back
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {})(Toy);
