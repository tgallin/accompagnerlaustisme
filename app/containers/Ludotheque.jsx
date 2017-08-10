import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { } from '../actions/toyLibrary';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import ToysImageGallery from '../components/ToysImageGallery.jsx';

import classNames from 'classnames/bind';
import styles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);

class Ludotheque extends Component {

  render() {
    
    const {toys} = this.props;
    
    return (
        <div>
          <ScrollToTopOnMount/>
          <p className={'text-justify ' + cx('content', 'paddingBottom')}>Les enfants autistes ont tous une capacité d’apprentissage. Pour les aider à apprendre, les accompagnants et éducateurs ont très souvent recours à des outils ludo-éducatifs pour susciter leur intérêt. 	Il peut s’agir de jeux ou jouets très basiques mais bien souvent ces outils éducatifs ont une conception bien adaptées aux enfants à besoin spécifique. Ces derniers sont très chers. </p>
          <p className={'text-justify ' + cx('content', 'paddingBottom')}>En tant que membre de l’association, vous pouvez emprunter des jouets et matériel pédagogique pour une période déterminée. Cela permettra notamment de valider que ce matériel est adapté à votre enfant, avant de l'acheter.</p>
          
          <ToysImageGallery/>
          
          {toys && toys.length > 0 &&
            
            <div>
                {
                  toys.map((toy) => 
                    <div key={toy._id}>
                      <div>{toy.name}</div>
                      <div>{toy.pictures && toy.pictures.length > 0 ? <img src={toy.pictures[0].eager[0].secure_url} /> : ''}</div>
                      <div className="col-md-2">{toy.available ? 'Oui' : 'Non'}</div>
                      <div className="col-md-1">
                        <Link to={'/toy/' + toy._id} className="btn btn-info"><span>Détails</span></Link>
                      </div>
                    </div>)
                }
            </div>
          }
          {(!toys || toys.length === 0) &&
            <div>
              <div className={cx('paddingAll')}>Aucun jeu</div>
            </div>
          }
        </div>
    );
  };
}

Ludotheque.propTypes = {
    toys: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    toys: state.toyLibrary.toys
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {})(Ludotheque);
