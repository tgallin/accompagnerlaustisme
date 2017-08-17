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
const Formation3_2018 = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className={cx('title')}><h2>La gestion des troubles du comportement</h2></div>
    
      <div className={cx('header')}>Objectif de la formation</div>
      <p className={'text-justify ' + cx('content')}>L’objectif de la formation est de former des professionnels et parents dans la gestion des troubles du comportement chez les personnes avec autisme.</p>
      
      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content')}>Les 27 & 28 janvier 2018</p>
      
      <div className={cx('header')}>Programme</div>
      
      <ol className={cx('listNoType')}>
        <li className={cx('list-item')}>Quelques bases : mentalisme, renforcement, extinction, punition, guidances, comportement</li>
        <li className={cx('list-item')}>Evaluation et analyse fonctionnelle</li>
        <li className={cx('list-item')}>Entraînement à la communication fonctionnelle</li>
        <li className={cx('list-item')}>Augmenter la coopération</li>
        <li className={cx('list-item')}>Agir selon la fonction du comportement et les 8 compétences essentielles de l’outil Essential For Living :
          <br/><br/>
          <ol className={cx('list')}>
            <li className={cx('list-item')}>Faire des demandes</li>
            <li className={cx('list-item')}>Attendre après une demande</li>
            <li className={cx('list-item')}>Accepter les retraits d’activités ou items préférés, pour faire des transitions, partager, attendre son tour</li>
            <li className={cx('list-item')}>Faire 10 tâches brèves consécutives acquises</li>
            <li className={cx('list-item')}>Accepter le « non »</li>
            <li className={cx('list-item')}>Suivre des consignes liées à la santé et à la sécurité</li>
            <li className={cx('list-item')}>Réaliser des tâches de vie quotidienne concernant la santé et la sécurité</li>
            <li className={cx('list-item')}>Tolérer des situations liées à la santé et la sécurité</li>
          </ol>
        </li>
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
      
      <div className={cx('header')}>Informations pratiques</div>
      <p className={cx('content')}>Salle Jean Baptiste Clément</p>
      <p className={cx('content')}>24 rue Danton</p>
      <p className={cx('content', 'paddingBottom')}>45800 St Jean de Braye</p>
      
      <p className={cx('content', 'lastPaddingBottom')}><Link to="/contact" className="btn btn-info">Inscription obligatoire via le formulaire de contact</Link> validée par le règlement complet 15 jours avant la formation</p>
      
    </div>
  );
};

export default Formation3_2018;
