import React from 'react';
import { Link } from 'react-router';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import classNames from 'classnames/bind';
import styles from 'css/components/formations';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Formation4 = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className={cx('title')}><h3>INITIATION A<br/>L'ENTRAÎNEMENT<br/>AUX RÉPONSES PIVOTS (PRT)</h3></div>
      <div className={cx('title')}><h4>ET SON APPLICATION DANS LE CADRE DE LA COMMUNICATION</h4></div>
    
      <div className={cx('header')}>Objectif de la formation</div>
      <p className={'text-justify ' + cx('content')}>L'objectif de la formation est d'apporter aux parents et des professionnels des connaissances de base sur 
      l'approche PRT (l'Entraînement Aux Réponses Pivots) et de les former à utiliser les variables de motivation et l'outil d'autogestion pour promouvoir 
      l'apprentissage du langage chez les adolescents et enfants avec autisme.</p>
      
      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content')}>Le 8 avril et 9 avril de 9h à 12h et de 13h à 17h</p>
      
      <div className={cx('header')}>Programme</div>
      <ol className={cx('listNoType')}>
        <li className={cx('list-item')}><strong>Jour 1 (7h)</strong></li>
        <ul className={cx('list')}>
          <li className={cx('list-item')}>Historique développement du PRT</li>
          <li className={cx('list-item')}>La Définition d’un comportement pivots</li>
          <li className={cx('list-item')}>Les comportements pivots</li>
          <li className={cx('list-item')}>Appliquer la composante motivationnelle du PRT pour enseigner le langage</li>
        </ul>
        <li className={cx('list-item')}><strong>Jour 2 (7h)</strong></li>
        <ul className={cx('list')}>
          <li className={cx('list-item')}>Les Initiations (apprendre à l’élève à poser des questions et faire des commentaires)</li>
          <li className={cx('list-item')}>Faire Attention aux signaux multiples</li>
          <li className={cx('list-item')}>Utiliser l’outil de l’autogestion pour enseigner la conversation</li>
          <li className={cx('list-item')}>Un Point rapide sur la socialisation</li>
        </ul>
      </ol>
      
      <div className={cx('header')}>Modalités pédagogiques</div>
      <ul className={cx('listNoType')}>
          <li className={cx('list-item')}>Apporter des connaissances théoriques et pratiques</li>
          <li className={cx('list-item')}>Expliquer l’utilisation d’outils et de procédures spécifiques</li>
          <li className={cx('list-item')}>Travailler sur des présentations de situations de terrain</li>
          <li className={cx('list-item')}>Utiliser de supports vidéos et PPT</li>
          <li className={cx('list-item')}>Favoriser le dialogue et l’échange entre les participants.</li>
      </ul>
      
      <div className={cx('header')}>Public</div>
      <p className={'text-justify ' + cx('content')}>Cette Formation est destinée aux parents d’enfants avec autisme et aux professionnels qui travaillent auprès des personnes avec autisme.</p>
      
      <div className={cx('header')}>Intervenante</div>
      <p className={'text-justify ' + cx('content')}><strong>Ghadeer Barghouthy</strong></p>
      <p className={'text-justify ' + cx('content')}><strong>Consultante indépendante, certifiée BCBA</strong></p>
      <p className={'text-justify ' + cx('content')}>Master en ABA Et Autisme De l’université de Sage Graduate School A New York</p>
      <p className={'text-justify ' + cx('content')}>Professionnelle Intervenante depuis 10 Ans auprès de personnes avec autisme</p>
      <p className={'text-justify ' + cx('content')}>Fondatrice Du Chapitre Suisse d’Analyse du Comportement (Affilié A ABAI)</p>
      <p className={'text-justify ' + cx('content')}>Coordinatrice d’une étude scientifique (Swiss Early Intervention Project In Autisme</p>
      <p className={'text-justify ' + cx('content')}>Prise En charge à domicile des enfants atteints d’autisme</p>
      <p className={'text-justify ' + cx('content')}>Formatrice De psychologues dans différentes structures de France</p>
      <p className={'text-justify ' + cx('content')}>Formatrice pour groupe de parents et professionnels avec Epsilon A L’Ecole</p>
      
      <div className={cx('header')}>Tarifs</div>
      <p className={'text-justify ' + cx('content')}>Tarif pour les 2 jours : 120 € par personne</p>
      
      <div className={cx('header')}>Informations pratiques</div>
      <p className={cx('content')}>Salle du Foyer St Vincent</p>
      <p className={cx('content')}>46, rue du Champ Rond</p>
      <p className={cx('content', 'paddingBottom')}>45000 Orléans</p>
      
      <p className={cx('content', 'lastPaddingBottom')}><Link to="/contact" className="btn btn-info">Inscription obligatoire via le formulaire de contact</Link></p>
      
    </div>
  );
};

export default Formation4;
