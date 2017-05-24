import React from 'react';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/network';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Reseau = () => {
  return (
    <div>
      <ScrollToTopOnMount/>

      <div className={cx('header')}>Interventions à domicile et à l’école</div>
      <p className={'text-justify ' + cx('content')}>AAA peut proposer un accompagnement des personnes autistes :</p>
      
      <p className={cx('content', 'paddingBottom')}> </p>
      
      <p className={'text-justify ' + cx('content')}>Il s’agit d’interventions :</p>
      <ul className={cx('list')}>
        <li className={cx('list-item')}>à domicile ou à l’école</li>
        <li className={cx('list-item')}>menées par des professionnels spécialisés dans le domaine de l’autisme : analystes comportementaux, consultants ABA, psychologues spécialisés, éducateurs spécialisés, intervenants ABA, ...</li>
        <li className={cx('list-item')}>conformes aux bonnes pratiques recommandées par la HAS et l’ANESM (approches développementales et comportementales)</li>
      </ul>

      <div className={cx('header')}>Fonctionnement en réseau</div>
      <p className={'text-justify ' + cx('content')}>L’animation de ce réseau de professionnels de l’accompagnement permet :</p>
      <ul className={cx('list')}>
        <li className={cx('list-item')}>le partage de connaissance et échange sur les meilleures pratiques</li>
        <li className={cx('list-item')}>la constitution d’outils d’évaluation et de suivi des progrès de l’enfant.</li>
        <li className={cx('list-item')}>la création de protocoles modulables de prise en charge)</li>
        <li className={cx('list-item')}>des réunions et supervisions des pratiques régulières)</li>
      </ul>

      <div className={cx('header')}>Les 5 piliers</div>
      <p className={'text-justify ' + cx('content')}>L’accompagnement intervient dans le cadre d’une charte éthique et repose sur 5 piliers essentiels qui sont :</p>
      <ol className={cx('list')}>
        <li className={cx('big-item')}>Le bénéficiaire au cœur du dispositif</li>
        <li className={cx('big-item')}>La famille partie intégrante du projet personnalisé</li>
        <li className={cx('big-item')}>L’accompagnant en formation continue</li>
        <li className={cx('big-item')}>La supervision régulière</li>
        <li className={cx('big-item')}>La coordination avec les acteurs transverses</li>
      </ol>
      
      <p className={cx('content', 'paddingBottom')}> </p>
      
      <p className={'text-center ' + cx('content', 'lastPaddingBottom')}><Link to="/contact" className="btn btn-info">Contactez-nous</Link></p>
      
    </div>
  );
};

export default Reseau;
