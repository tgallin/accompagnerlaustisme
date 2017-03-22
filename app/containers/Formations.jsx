import React from 'react';
import { Link } from 'react-router';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import classNames from 'classnames/bind';
import styles from 'css/components/formations';
import logo from '../images/logoAAA_180.png';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Formations = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className='text-center'><img src={logo} alt="logo"/></div>
      
      <div className={cx('header')}>Les formations</div>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>L’association Accompagner l’Autisme organise des formations dispensées par des prestataires certifiés.</p>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Ces formations sont conformes aux recommandations de la <a href="http://www.has-sante.fr/portail/" target="_blank">HAS</a> (Haute Autorité de Santé) et l’<a href="http://www.anesm.sante.gouv.fr" target="_blank">Anesm</a>  (Agence Nationale de l’Evaluation de la qualité des établissement et Services sociaux et Médico-sociaux).</p>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Les formations et sessions de sensibilisation proposées couvrent des thématiques telles que l’adaptation scolaire, le langage, la gestion des troubles du comportement, etc.</p>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Ces formations sont ouvertes à tous : parents comme professionnels (psychologues, éducateurs spécialisés, AVS, orthophonistes, enseignants,...)</p>
      
      <div className={cx('header')}>Agenda 2017</div>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>14 & 15 janvier : <Link to="/formations/formation1">Apprendre à lire et écrire</Link></p>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>25 & 26 Mars : <Link to="/formations/formation2">Numération de base</Link></p>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>7 avril : <Link to="/formations/formation3">Projection du film “Enfants autistes : bienvenue à l'école !”</Link></p>
      
      <p className={'text-justify ' + cx('content', 'lastPaddingBottom')}>8 & 9 avril 2017 : <Link to="/formations/formation4">Entraînement aux Réponses Pivots</Link> (PRT)</p>
      
    </div>
  );
};

export default Formations;
