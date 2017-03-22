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
const Formation2 = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className={cx('title')}><h3>Numération de base</h3></div>
      <div className={cx('title')}>Inclus dans le cursus CEPRO1</div>
      <div className={cx('title')}>Niveau scolaire de l’enfant : cycles 1 et 2</div>
      <div className={cx('title', 'paddingBottom')}>(de la petite section au Ce2, de la 1ere à la 6ème Harmos)</div>
      
      <div className='text-center'>Formation assurée par Epsilon à l'École ®</div>
      
      <div className='text-center'><img src={logoEpsilon} alt="logo Epsilon"/></div>
      
      <div className={cx('header')}>Objectif de la formation</div>
      <p className={'text-justify ' + cx('content')}>En passant par la manipulation de matériel concret et par l’adaptation pédagogique, 
      l'élève avec TSA (troubles du spectre autistique), comprend et parvient progressivement à maîtriser le système décimal, 
      le classement des nombres et la comparaison des nombres. Cet apprentissage permet d'introduire les bases de l’addition et de la soustraction. Dans ce cours, 
      les participants apprendront comment etre capable de sélectionner pour chaque enfant les outils pédagogiques et les procédures pour lui apprendre à compter jusqu’à dix, 
      et au delà de dix en comprenant les bases de la construction du système décimal. Cet enseignement tiendra compte du maintien de la motivation tout au long de l’apprentissage.</p>
      
      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content')}>Le 25 et 26 mars 2017</p>
      
      <div className={cx('header')}>Programme</div>
      <ol className={cx('list')}>
        <li className={cx('list-item')}>Apprendre à compter jusqu’à 10 :</li>
          <ul className={cx('list')}>
            <li className={cx('list-item')}>description détaillée des prérequis nécessaires à l’apprentissage des quantités, des nombres et du dénombrement</li>
            <li className={cx('list-item')}>apprendre à reconnaître des quantités globales</li>
            <li className={cx('list-item')}>apprendre à dénombrer de différentes manières jusqu’à 10</li>
            <li className={cx('list-item')}>apprendre à se repérer sur la chaîne numérique</li>
            <li className={cx('list-item')}>introduction de la notion d’addition et de soustraction</li>
            <li className={cx('list-item')}>la notion de double, de moitié, de nombre pair et impair</li>
            <li className={cx('list-item')}>la notion de compléments à 10</li>
          </ul>
        <li className={cx('list-item')}>Apprendre à compter au delà de 10 :</li>
        <ul className={cx('list')}>
            <li className={cx('list-item')}>présentation du système décimal : notion de quantité</li>
            <li className={cx('list-item')}>classement et comparaison de quantité et de nombre</li>
            <li className={cx('list-item')}>notion de nombre et de chiffre</li>
            <li className={cx('list-item')}>apprendre à compter de n en n en partant de 1 ou d’un autre nombre</li>
          </ul>
        <li className={cx('list-item')}>Les méthodes et outils :</li>
        <p className={'text-justify ' + cx('content')}>L’enseignement de ces compétences prend appui principalement sur les outils de la pédagogie Montessori, les procédures d’enseignement utilisées en ABA et PRT.</p>
        <ul className={cx('list')}>
            <li className={cx('list-item')}>les barres rouges et bleues, les fuseaux, les jetons, le serpent positif</li>
            <li className={cx('list-item')}>la banque, les tables de Seguin, les chaînes des perles</li>
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

export default Formation2;
