import React from 'react';
import { Link } from 'react-router';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import classNames from 'classnames/bind';
import styles from 'css/components/formations';
import logoEpsilon from '../images/EpsilonLogo2.png';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Formation1_2017 = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className={cx('title')}><h3>Apprendre à lire et à écrire</h3></div>
      <div className={cx('title')}>Inclus dans le cursus CEPRO1</div>
      <div className={cx('title')}>Niveau scolaire de l’enfant : cycles 1 et 2</div>
      <div className={cx('title', 'paddingBottom')}>(de la petite section au Ce2, de la 1ere à la 6ème Harmos)</div>
      
      <div className='text-center'>Formation assurée par Epsilon à l'École ®</div>
      
      <div className='text-center'><img src={logoEpsilon} alt="logo Epsilon"/></div>
      
      <div className={cx('header')}>Objectif de la formation</div>
      <p className={'text-justify ' + cx('content')}>Ce cours a pour but de donner les bases nécessaires pour assurer le soutien scolaire d’un élève à besoins particuliers en début de primaire au niveau de l’apprentissage de la lecture et de l’écriture.</p>
      <p className={'text-justify ' + cx('content')}>Vous découvrirez comment l’explication du code, le déchiffrage et la compréhension peuvent être décomposés en étapes pertinentes et adaptées en fonction des particularités de l’élève.</p>
      
      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content')}>Le 14 et 15 janvier 2017.</p>
      
      <div className={cx('header')}>Programme</div>
      <ol className={cx('list')}>
        <li className={cx('list-item')}>Les prérequis à la lecture</li>
          <ul className={cx('list')}>
            <li className={cx('list-item')}>présentation des prérequis nécessaires à l’apprentissage de la lecture</li>
            <li className={cx('list-item')}>présentation des différents modèles théoriques qui décrivent les étapes de l’apprentissage de la lecture</li>
          </ul>
          <p className={'text-justify ' + cx('content', 'paddingBottom')}>Ces données sont essentielles pour être capable de sélectionner les meilleures stratégies d’enseignement pour chaque élève. L’objectif essentiel est de s’appuyer sur les forces de l’enfant.</p>
        <li className={cx('list-item')}>L’apprentissage étape par étape</li>
        <ul className={cx('list')}>
            <li className={cx('list-item')}>choix de la police d’écriture</li>
            <li className={cx('list-item')}>enseignement du code par approche alphabétique</li>
            <li className={cx('list-item')}>sensibilisation à la phonologie</li>
            <li className={cx('list-item')}>formation des syllabes</li>
            <li className={cx('list-item')}>enseignement du code par imprégnation syllabique</li>
            <li className={cx('list-item')}>écriture phonologique avec des lettres mobiles</li>
            <li className={cx('list-item')}>fusion des sons des lettres ou des syllabes vers la lecture de mots</li>
            <li className={cx('list-item')}>apprendre à écrire avec un outil scripteur</li>
            <li className={cx('list-item')}>les bases de la grammaire comme outil de compréhension</li>
            <li className={cx('list-item')}>développer l’expression orale des phrases complexes</li>
            <li className={cx('list-item')}>apprendre à raconter un événement dans un ordre chronologique ou logique à partir d’images séquentielles</li>
            <li className={cx('list-item')}>apprendre à lire des logogrammes</li>
          </ul>
          <p className={'text-justify ' + cx('content', 'paddingBottom')}>En parallèle de ces points, différentes stratégies sont présentées pour amener l’enfant à lire en ayant accès au sens.</p>
        <li className={cx('list-item')}>Les différentes stratégies de présentation</li>
        <ul className={cx('list')}>
            <li className={cx('list-item')}>mise en paire, studia, nomenclature, jeux de pistes, jeux du détective</li>
            <li className={cx('list-item')}>les premiers symboles de la grammaire et les premières affiches des fonctions</li>
        </ul>
      </ol>
      
      <div className={cx('header')}>Modalités pédagogiques</div>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Au cours de la formation, les gestes professionnels nécessaires pour enseigner chaque compétence sont précisés en fonction des besoins particuliers des enfants rencontrés.</p>
      
      <ul className={cx('list')}>
          <li className={cx('list-item')}>les étapes d’apprentissage sont décomposées afin de placer l'élève en succès</li>
          <li className={cx('list-item')}>l’enseignement sans erreur ou l’enseignement explicite est favorisée</li>
          <li className={cx('list-item')}>les procédures d’enseignement possibles pour chaque objectif sont décrites</li>
          <li className={cx('list-item')}>les guidances nécessaires à l’enseignement sont identifiées.</li>
          <li className={cx('list-item')}>l’estompage des guidances est programmée</li>
          <li className={cx('list-item')}>le maintien et la généralisation des compétences acquises dans la vie quotidienne sont planifiées</li>
      </ul>
      
      <div className={cx('header')}>Public</div>
      <p className={'text-justify ' + cx('content')}>Cette Formation est destinée aux parents d’enfants avec autisme et aux professionnels qui travaillent auprès des personnes avec autisme.</p>
      
      <div className={cx('header')}>Intervenante</div>
      <p className={'text-justify ' + cx('content')}><strong>Véronique MALLEJAC</strong></p>
      <p className={'text-justify ' + cx('content')}><strong>Formatrice Epsilon à l’école.</strong></p>
      <p className={'text-justify ' + cx('content')}>Ancienne enseignante en collège, lycée et GRETA (région parisienne et Bourgogne). </p>
      <p className={'text-justify ' + cx('content')}>Licenciée en mathématiques.</p>
      <p className={'text-justify ' + cx('content')}>Formatrice de formateurs au sein du Ministère de la Défense.</p>
      <p className={'text-justify ' + cx('content')}>Passionnée de pédagogie, aujourd’hui intervenante libérale en soutien scolaire spécifique. En structure ou à domicile.</p>
      <p className={'text-justify ' + cx('content')}>Met en place et suit des programmes auprès d’enfants avec autisme ou troubles cognitifs.</p>
      <p className={'text-justify ' + cx('content')}>Anime des ateliers pédagogiques pour parents et professionnels</p>
      
      <div className={cx('header')}>Tarifs</div>
      <p className={'text-justify ' + cx('content')}>Tarif pour les 2 jours : 120 € par personne</p>
      
      <div className={cx('header')}>Informations pratiques</div>
      <p className={cx('content')}>225, rue de Bourgogne</p>
      <p className={cx('content', 'paddingBottom')}>45000 Orléans</p>
      
      <p className={cx('content', 'lastPaddingBottom')}><Link to="/contact" className="btn btn-info">Inscription obligatoire via le formulaire de contact</Link></p>
      
    </div>
  );
};

export default Formation1_2017;
