import React from 'react';
import { Link } from 'react-router';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import classNames from 'classnames/bind';
import styles from 'css/components/formations';
import logoLearnEnjoy from '../images/learnenjoy.jpg';
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
          <div className={cx('title')}><h2>Les comportements sexuels</h2></div>
          <div className={'text-center ' + cx('paddingBottom')}>Gérer les comportement sexuels inadaptés</div>
          <div className={'text-center ' + cx('paddingBottom')}><strong>Bien être – Respect - Intimité</strong></div>
          <div className={'text-center ' + cx('paddingBottom')}>Accompagner l’Autisme en partenariat avec <a href="https://learnenjoy.com/" target="_blank">LearnEnjoy</a></div>
        </div>
        <div className="col-md-2">
          <img src={logoLearnEnjoy} alt="logo Learn Enjoy"/>
        </div>
      </div>


      <p className={'text-justify ' + cx('content')}>Les personnes avec handicap mental suivent les mêmes étapes de développement dans le domaine de la sexualité. 
      Toutefois le défaut d’accès aux codes sociaux subtils dans ce domaine peut rendre leur éducation sexuelle difficile. 
      Les accompagner, avec bienveillance et sans tabou dans cette voie, participe à leur bien-être physique et mental.</p>

      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content')}>Les 2 & 3 mars 2019 (09h00 / 17h30)</p>
      
      <div className={cx('header')}>Objectif de la formation</div>
      <ul className={cx('list')}>
          <li className={cx('list-item')}>Comprendre les particularités des comportements sexuels des personnes avec handicap mental</li>
          <li className={cx('list-item')}>Savoir analyser les comportements sexuels inadaptés et identifier les objectifs d’intervention</li>
          <li className={cx('list-item')}>Être en mesure de mettre en place des interventions adaptées visant à l’éducation sexuelle des
personnes avec handicap mental</li>
      </ul>
      
      <div className={cx('header')}>Programme</div>
      <ul className={cx('list')}>
          <li className={cx('list-item')}>La définition des comportements sexuels</li>
          <li className={cx('list-item')}>L’éducation à la sexualité</li>
          <li className={cx('list-item')}>Les responsabilités de chacun dans l’éducation sexuelle</li>
          <li className={cx('list-item')}>Évaluer les comportements sexuels inadaptés</li>
          <li className={cx('list-item')}>Les techniques d’intervention pour l’apprentissage de comportements sexuels adaptés</li>
          <li className={cx('list-item')}>Les programmes d’éducation à la sexualité</li>
          <li className={cx('list-item')}>Les programmes d’enseignement complémentaires à envisager</li>
      </ul>
      
      <div className={cx('header')}>Modalités pédagogiques</div>
      <ul className={cx('list')}>
          <li className={cx('list-item')}>Livret pédagogique</li>
          <li className={cx('list-item')}>Vidéos</li>
          <li className={cx('list-item')}>Cas cliniques</li>
      </ul>
        
      <div className={cx('header')}>Public</div>
      <p className={'text-justify ' + cx('content')}>Cette formation est destinée aux professionnels et parents.</p>
      
      <div className={cx('header')}>Intervenante</div>
      <p className={'text-justify ' + cx('content')}><strong>Manon LOISEAUX</strong></p>
      <ul className={cx('list')}>
          <li className={cx('list-item')}>Psychologue diplômée du Master ABA Lille3</li>
          <li className={cx('list-item')}>Formatrice LearnEnjoy, EPAJ08, CREAI Champagne Ardennes</li>
          <li className={cx('list-item')}>Personne ressource autisme pour le Service d’Accompagnement à la Vie Social de Revin</li>
          <li className={cx('list-item')}>Supervision en libéral et en institution</li>
      </ul>
      
      <div className={cx('header')}>Tarif</div>
      <p className={'text-justify ' + cx('content')}>Tarif pour les 2 jours : 140 € par personne</p>
      <p className={'text-justify ' + cx('content')}>Merci d'envoyer votre réglement par chèque au 39 rue Paul Ratouis, 45650, Saint-Jean-Le-Blanc.</p>
      
      <div className={cx('header')}>Informations pratiques</div>
      <p className={cx('content')}>Salle de la Pomme de Pin</p>
      <p className={cx('content')}>2-4 rue Gallouedec</p>
      <p className={cx('content', 'paddingBottom')}>45800 St Jean de Braye</p>
      
      <p className={cx('content')}><Link to="/contact" className={'btn btn-info ' + cx('text-wrap')}>Inscription obligatoire via le formulaire de contact</Link></p>
      <p className={cx('content', 'lastPaddingBottom')}>validée par le règlement complet 15 jours avant la formation</p>
      
    </div>
  );
};

export default Formation1_2019;
