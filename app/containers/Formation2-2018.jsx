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
const Formation2_2018 = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className={cx('title')}><h2>Enseigner l’écriture aux enfants de maternelle</h2></div>
      
      <div className={cx('header')}>Objectif de la formation</div>
      <p className={'text-justify ' + cx('content')}>L’objectif est de prévenir la dysgraphie et les troubles de l’écriture chez les enfants présentant un syndrome autistique.</p>
      
      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content')}>Les 18 novembre & 19 novembre (matin) 2017</p>
      
      <div className={cx('header')}>Programme</div>
      <table className="table table-bordered">
      <tbody>
        <tr>
          <td><strong>Motricité fine, délier les doigts</strong></td>
          <td>pourquoi est-ce important ? comment ?</td>
        </tr>
        <tr>
          <td><strong>Stylos, papier, table et chaise...</strong></td>
          <td>
            <ul className={cx('list')}>
              <li className={cx('list-item')}>Tenue et maniement du stylo,</li>
              <li className={cx('list-item')}>réflexe d’agrippement et intégration</li>
              <li className={cx('list-item')}>Posture</li>
              <li className={cx('list-item')}>Crayon et stylo : un choix personnel..</li>
              <li className={cx('list-item')}>Format et taille du papier</li>
              <li className={cx('list-item')}>Choix du lignage</li>
              <li className={cx('list-item')}>Importance de l’adaptation du mobilier</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><strong>Latéralisation</strong></td>
          <td>
            <ul className={cx('list')}>
              <li className={cx('list-item')}>Vérifier le bon choix de la main scriptrice</li>
              <li className={cx('list-item')}>Aider l’élève à se latéraliser</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><strong>Les contingences spatiales</strong></td>
          <td>
            <ul className={cx('list')}>
              <li className={cx('list-item')}>Gérer l’espace et l’espace feuille</li>
              <li className={cx('list-item')}>Sens conventionnel de l’écriture</li>
              <li className={cx('list-item')}>Horizontalité</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><strong>Formes et mouvement</strong></td>
          <td>
            <ul className={cx('list')}>
              <li className={cx('list-item')}>Les 4 gestes graphiques de base de l’écriture</li>
              <li className={cx('list-item')}>Ancrage kinesthésique de ces 4 gestes</li>
              <li className={cx('list-item')}>Le rythme du mouvement</li>
              <li className={cx('list-item')}>Quelles lettres et dans quel ordre ?</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><strong>Les erreurs à éviter</strong></td>
          <td>
            <ul className={cx('list')}>
              <li className={cx('list-item')}>Le graphisme</li>
              <li className={cx('list-item')}>Les lettres bâtonnées</li>
              <li className={cx('list-item')}>Les feutres et gros crayons</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
      
      <div className={cx('header')}>Public</div>
      <p className={'text-justify ' + cx('content')}>Cette formation est destinée aux professionnels et parents.</p>
      
      <div className={cx('header')}>Intervenante</div>
      <p className={'text-justify ' + cx('content')}><strong>Célia CHEYNEL</strong>, rééducatrice de l’écriture, formatrice d’enseignants et de rééducateurs</p>
      
      <div className={cx('header')}>Tarif</div>
      <p className={'text-justify ' + cx('content')}>Tarif pour les 2 matinées : 90 € par personne</p>
      
      <div className={cx('header')}>Informations pratiques</div>
      <p className={cx('content')}>Salle de la Pomme de Pin</p>
      <p className={cx('content')}>2-4 rue Gallouedec</p>
      <p className={cx('content', 'paddingBottom')}>45800 St Jean de Braye</p>
      
      <p className={cx('content', 'lastPaddingBottom')}><Link to="/contact" className="btn btn-info">Inscription obligatoire via le formulaire de contact</Link> validée par le règlement complet 15 jours avant la formation</p>
      
    </div>
  );
};

export default Formation2_2018;
