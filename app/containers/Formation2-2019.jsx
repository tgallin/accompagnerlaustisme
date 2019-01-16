import React from 'react';
import { Link } from 'react-router';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import classNames from 'classnames/bind';
import styles from 'css/components/formations';
import logoChristianDiorParfums from '../images/christian-dior-parfums-logo-300.png';
import logoOrleansMetropole from '../images/orleans-metropole.jpg';
import logoRotaryInnerWheel from '../images/rotary-inner-wheel-logo-200.png';
import logoAAA from '../images/logo-AAA.png';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Formation1_2019 = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className="row">
        <div className="col-md-2">
          <img src={logoAAA} alt="logo Accompagner autisme"/>
        </div>
        <div className="col-md-8">
          <div className={cx('title')}><h2 className={cx('frame-header')}>Ateliers pédagogiques GRATUITS</h2></div>
        </div>
        <div className="col-md-2">
          <div></div>
        </div>
      </div>

      <p className={cx('header-underlined')}>1ère partie : 9h30 à 11h30</p>
      <p className={cx('subheader')}>Atelier ABA animé par Teresa Gomes,</p>
      <p className={'text-justify ' + cx('content')}>Docteur en psychologie-psychopathologie et neuropsychologie cliniques ; BCBA – Analyste du comportement certifié</p>
      <p className={'text-justify ' + cx('content')}>Thèmes : ABA de base, apprentissage d’outils visuels, guidance et estompage, formes d’apprentissages (ITT, NET,...)</p>

      <p className={cx('header-underlined')}>2ème partie : 11h30 à 12h30</p>
      <p className={cx('subheader')}>Prêt de matériel Ludo-éducatif</p>
      <p className={'text-justify ' + cx('content')}>(à rendre le mois suivant)</p>
      <p className={'text-justify ' + cx('content')}>Liste des jeux et conditions sur notre <Link to="/ludotheque">page ludothèque</Link></p>
      
      <p className={cx('header-underlined')}>Dates et Lieux :</p>
      <ul className={cx('list')}>
          <li className={cx('list-item')}>09 février Salle Belle Croix – 141 rue du poirier rond - Orléans</li>
          <li className={cx('list-item')}>23 mars Salle des chats ferrés – 3b rue des chats ferrés - Orléans</li>
          <li className={cx('list-item')}>20 avril Salle des chats ferrés – 3b rue des chats ferrés - Orléans</li>
          <li className={cx('list-item')}>25 mai Salle Belle Croix – 141 rue du poirier rond - Orléans</li>
          <li className={cx('list-item')}>29 juin Salle Belle Croix – 141 rue du poirier rond - Orléans</li>
      </ul>
      
      <p className={cx('content', 'lastPaddingBottom')}><Link to="/contact" className={'btn btn-info ' + cx('text-wrap')}>Inscription obligatoire via le formulaire de contact</Link></p>
      
      <div className="row">
        <div className="col-md-2">
          <p className={'text-justify ' + cx('content')}>Avec le soutien de : </p>
        </div>
        <div className="col-md-3">
          <img src={logoOrleansMetropole} alt="Orléans métropole"/>
        </div>
        <div className={'col-md-4 ' + cx('frame-support-banner')}>
          <span className={cx('helper')}></span>
          <img className={cx('align-middle')} src={logoChristianDiorParfums} alt="Christian Dior Parfums"/>
        </div>
        <div className="col-md-3">
          <img src={logoRotaryInnerWheel} alt="Rotary Inner Wheel"/>
        </div>
      </div>
      
    </div>
  );
};

export default Formation1_2019;
