import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {} from '../actions/toyLibrary';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import ToysImageGallery from '../components/ToysImageGallery.jsx';
import { matchesProperty } from '../utils/arrayUtils';

import classNames from 'classnames/bind';
import styles from 'css/components/toyView';
import toyLibraryStyles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);
const cy = classNames.bind(toyLibraryStyles);

class Toy extends Component {
  
  
  renderCategories(categories) {
    
    var catArr = categories.reduce(( acc, cur ) => acc.concat(cur.name),[]);

    return (<p id="categories"> <span className={cx('cat_label')}>{catArr.length > 1 ? 'Catégories' : 'Catégorie'} :</span> <span>{catArr.join(', ')}</span></p>);
  }
  
  renderTags(tags) {
    
    var tagArr = tags.reduce(( acc, cur ) => acc.concat(cur.name),[]);

    return (<p id="tags"> <span className={cx('tag_label')}>{tagArr.length > 1 ? 'Mots clés' : 'Mot clé'} :</span> <span>{tagArr.join(', ')}</span></p>);
  }

  render() {

    const { toys, toyId } = this.props;

    var toy = matchesProperty(toys, ['_id', toyId]);


    return (
      <div>
          <ScrollToTopOnMount/>
          
          <div id="columns" className="container">
          <div className="pull-right">
           {/* <a href="" name="back"> <i className="fa fa-chevron-left"></i> Retourner aux résultats de la recherche "...."</a> */}
          </div>
          <div className="clearfix"></div>
          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <div>
                <div className={'row ' + cx('primary_block')}>
                  <div className="col-xs-12 col-sm-4 col-md-5">
                    <ToysImageGallery pictures={toy.pictures} />
                  </div>
                  <div className={'col-xs-12 col-sm-8 col-md-7 ' + cx('toy-details')}>
                    <div id="titres">
                      <h1>{toy.name}</h1>
                    </div>
                    <p id="availability">{toy.available ? <span className={cx('available')}>Disponible</span> : <span className={cx('unavailable')}>Non disponible</span>}</p>
                    <div id={cx('short_description_block')}>
                      <div id={cx('short_description_content')}>
                        {this.renderCategories(toy.categories)}
                      </div>
                    </div>
                    <div id={cx('short_description_block')}>
                      <div id={cx('short_description_content')}>
                        {this.renderTags(toy.tags)}
                      </div>
                    </div>
                    {toy.content &&
                    <div id={cx('short_description_block')}>
                      <div id={cx('short_description_content')}>
                        <div className={cx('descriptionshortshort')}>
                          <p><strong>Contenu</strong></p>
                          <p>{toy.content}</p>
                        </div>
                      </div>
                    </div>
                    }
                    {toy.description &&
                    <div id={cx('short_description_block')}>
                      <div id={cx('short_description_content')}>
                        <div className={cx('descriptionshortshort')}>
                          <p><strong>Description</strong></p>
                          <p>{toy.description}</p>
                        </div>
                      </div>
                    </div>
                    }
                    
                    {!toy.available &&
                    <p id="waiting"> <span className={cx('waiting_label')}>Nombre de personnes sur la liste d'attente :</span> <span>{toy.waiting ? toy.waiting.length : 0}</span></p>
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
  toyId: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    toys: state.toyLibrary.toys,
    toyId: ownProps.params.id
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {})(Toy);
