import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import logoEpsilon from '../images/EpsilonLogo2.png';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Formation3 = () => {
  return (
    <div>
    
      <div className='text-center'>Apprendre à lire et à écrire</div>
      <div className='text-center'>Inclus dans le cursus CEPRO1</div>
      <div className='text-center'>Niveau scolaire de l’enfant : cycles 1 et 2</div>
      <div className={'text-center ' + cx('paddingBottom')}>(de la petite section au Ce2, de la 1ere à la 6ème Harmos)</div>
      
      <div className='text-center'>Formation assurée par Epsilon à l'École ®</div>
      
      <div className='text-center'><img src={logoEpsilon} alt="logo Epsilon"/></div>
      
      <div className={cx('header')}>Objectif de la formation</div>
      <p className={'text-justify ' + cx('content')}>Ce cours a pour but de donner les bases nécessaires pour assurer le soutien scolaire d’un élève à besoins particuliers en début de primaire au niveau de l’apprentissage de la lecture et de l’écriture.</p>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Vous découvrirez comment l’explication du code, le déchiffrage et la compréhension peuvent être décomposés en étapes pertinentes et adaptées en fonction des particularités de l’élève.</p>
      
      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Le 14 et 15 janvier 2017.</p>
      
      <div className={cx('header')}>Programme</div>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>1. Les prérequis à la lecture</p>
      
    </div>
  );
};

export default Formation3;
