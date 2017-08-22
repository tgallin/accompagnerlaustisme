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
const Formation1_2018 = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className={cx('title')}><h2>Introduction à l’Analyse du Comportement Appliquée (ABA)</h2></div>
    
      <div className={cx('header')}>Objectif de la formation</div>
      <p className={'text-justify ' + cx('content')}>L’objectif de la formation est de former des professionnels et parents aux bases de l’Analyse du Comportement Appliquée (ABA).</p>
      
      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content')}>Les 14 & 15 octobre 2017</p>
      
      <div className={cx('header')}>Programme</div>
      <ol className={cx('listNoType')}>
        <li className={cx('list-item')}><strong>Définition et concepts de base en sciences comportementales</strong></li>
        <ul className={cx('list')}>
          <li className={cx('list-item')}>Les sciences du comportement</li>
          <li className={cx('list-item')}>Les 7 dimensions de l’ABA</li>
          <li className={cx('list-item')}>Les trois termes de la contingence</li>
          <li className={cx('list-item')}>Les approches basées sur l’ABA</li>
          <li className={cx('list-item')}>Principes de base : renforcement, extinction ...</li>
          <li className={cx('list-item')}>Les différents types de renforçateurs</li>
        </ul>
        <li className={cx('list-item')}><strong>Quelques procédures d’enseignement (Pratiques fondées sur les preuves)</strong></li>
        <ul className={cx('list')}>
          <li className={cx('list-item')}>Pairing, Enseignement sans erreur, Guidances, Estompage, Façonnement,</li>
          <li className={cx('list-item')}>Chaînage, Imitation, Modeling, Autogestion, Maintien des acquis, Généralisation</li>
        </ul>
      </ol>
      
      <div className={cx('header')}>Modalités pédagogiques</div>
      <ul className={cx('list')}>
          <li className={cx('list-item')}>Apporter des connaissances théoriques et pratiques</li>
          <li className={cx('list-item')}>Expliquer l’utilisation d’outils et de procédures spécifiques</li>
          <li className={cx('list-item')}>Travailler sur des présentations de situations de terrain</li>
          <li className={cx('list-item')}>Utiliser de supports vidéos et PPT</li>
          <li className={cx('list-item')}>Favoriser le dialogue et l’échange entre les participants.</li>
      </ul>
      
      <div className={cx('header')}>Public</div>
      <p className={'text-justify ' + cx('content')}>Cette formation est destinée aux professionnels et parents.</p>
      
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
      
      <div className={cx('header')}>Tarif</div>
      <p className={'text-justify ' + cx('content')}>Tarif pour les 2 jours : 130 € par personne</p>
      <p className={'text-justify ' + cx('content')}>Merci d'envoyer votre réglement par chèque au 39 rue Paul Ratouis, 45650, Saint-Jean-Le-Blanc.</p>
      
      <div className={cx('header')}>Informations pratiques</div>
      <p className={cx('content')}>Salle de la Pomme de Pin</p>
      <p className={cx('content')}>2-4 rue Gallouedec</p>
      <p className={cx('content', 'paddingBottom')}>45800 St Jean de Braye</p>
      
      <p className={cx('content', 'lastPaddingBottom')}><Link to="/contact" className="btn btn-info">Inscription obligatoire via le formulaire de contact</Link> validée par le règlement complet 15 jours avant la formation</p>
      
    </div>
  );
};

export default Formation1_2018;
