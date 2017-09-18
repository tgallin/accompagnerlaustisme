import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { createAddress } from '../utils/componentUtils';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import aBlue from '../images/Ableu.png';
import aYellow from '../images/Ajaune.png';
import aStripes from '../images/Araye.png';
import organizationSubscription from '../pdf/bulletin_adhesion_AAA.pdf';
import enrollForm from '../pdf/dossier_inscription_ludotheque.pdf';
import toyLibraryRules from '../pdf/reglement_ludotheque_AAA.pdf';


import classNames from 'classnames/bind';
import styles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);

moment.locale('fr');

class Ludotheque extends Component {

  render() {

    const { toys, toyLibraries, children } = this.props;

    return (
      <div>
      { !children && 
        <div>
          <ScrollToTopOnMount/>
          <div className={cx('header')}><span className={cx('image-a')}><img src={aBlue} alt="A bleu"/></span>L'esprit de la ludothèque AAA</div>
          <p className={'text-justify ' + cx('content', 'paddingBottom')}>Les enfants autistes ont tous une capacité d’apprentissage.
          Pour les aider à apprendre, nous avons recours à des outils ludo-éducatifs pour susciter leur intérêt. Il peut s’agir de jeux ou jouets très basiques mais bien souvent ces outil éducatifs ont une conception bien adaptées aux enfants à besoin spécifique.</p>
          <div className={cx('header')}>Qui peut emprunter<span className={cx('image-a')}><img src={aYellow} alt="A jaune"/></span></div>
          <p className={'text-justify ' + cx('content', 'paddingBottom')}>Tout membre de l’association peut emprunter des jouets et matériel pédagogique pour une période déterminée.</p>
          <p className={'text-justify ' + cx('content', 'paddingBottom')}><strong>Il est impératif de télécharger, imprimer et nous fournir les éléments ci dessous avant le premier emprunt :</strong></p>
          <ul>
            <li><a href={enrollForm} target='_blank'>dossier d’inscription complet</a></li>
            <li><a href={organizationSubscription} target='_blank'>bulletin d’adhésion en cours de validité</a></li>
            <li><a href={toyLibraryRules} target='_blank'>règlement intérieur</a></li>
          </ul>
                        

          <div className={cx('header')}><span className={cx('image-a')}><img src={aStripes} alt="A rayé"/></span>Qui peut contribuer</div>
          <p className={'text-justify ' + cx('content', 'paddingBottom')}>N'hésitez pas à nous contacter si vous souhaitez prêter ou donner des jeux à l’association.</p>
          
          {toyLibraries && toyLibraries.filter(tl => tl.active).length > 0 && 
          <div>
            <div className={cx('header')}>Où et quand emprunter</div>
            {toyLibraries.filter(tl => tl.active).map((toyLibrary) => (
              <div className={cx('toyLibray')} key={toyLibrary._id}>
                <div className={cx('address')} dangerouslySetInnerHTML={{__html: (toyLibrary.name + '<br/>' + createAddress(toyLibrary.address))}} />
                {toyLibrary.openings && toyLibrary.openings.length > 0 &&
                <div className={cx('openings')}>
                 <div className={cx('subheader')}>Permanences :</div>
                <ul>
                  {
                    toyLibrary.openings.map((op, index) => (
                    <li key={index}>
                      Le {moment(op.date).format('dddd DD MMMM YYYY')} de {moment(op.startTime).format('HH:mm')} à {moment(op.endTime).format('HH:mm')}
                    </li>))
                  }
                </ul>
                </div>
                }
              </div>
            ))}
          </div>
          }
          
          <div>
            {toys && toys.length > 0 &&
              <div>
                <div className={cx('header')}>Les derniers jeux ajoutés <span className={cx('image-a')}><img src={aYellow} alt="A jaune"/></span></div>
                {
                  // first 10 toys only
                  toys.slice(0, 10).map((toy) => (
                    <div key={toy._id}>
                      <ul className={cx('toy_list', 'grid')}>
                        <li className="col-xs-12 col-sm-4 col-md-3">
                          <div className={cx('toy-container')}>
                            <div>
                              <div className={cx('toy-image-container')}>
                                <Link className={cx('toy_img_link')} to={'/ludotheque/toys/' + toy._id} title={toy.name}>
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

Ludotheque.propTypes = {
  toys: PropTypes.array,
  toyLibraries: PropTypes.array,
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    toys: state.toyLibrary.toys,
    toyLibraries: state.toyLibrary.toyLibraries
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Ludotheque);
