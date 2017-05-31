import React from 'react';
import { Link } from 'react-router';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import logo from '../images/logo-AAA.png';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className='text-center'><img src={logo} alt="logo"/></div>
      
      <div className={cx('header')}>L’association</div>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>L’association Accompagner l’Autisme est une association type loi 1901 créée en octobre 2016, à Orléans.</p>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Les membres fondateurs sont des parents d’enfants autistes, dont certains sont enseignants en école primaire et des professionnels de l’accompagnement.</p>
      
      <p className={cx('content')}>D’après ses statuts, cette association a pour objet de :</p>
      <ul className={cx('list')}>
        <li className={cx('list-item')}>favoriser la diffusion d'<Link to='/formations'>informations</Link> concernant l'autisme et les troubles envahissants du développement par tout moyen ou tout évènement</li>
        <li className={cx('list-item')}>l’animation d’un <Link to='/reseau'>réseau</Link> d’acteurs professionnels autour de l’autisme</li>
        <li className={cx('list-item')}>favoriser l'inclusion d'enfants autistes / porteur de handicap dans tout milieu ordinaire (école, sport,médical,...)</li>
        <li className={cx('list-item')}>mettre en place un plan d'action pour l'accès à la scolarisation</li>
      </ul>
      
      <div className={cx('header')}>Notre combat</div>
      
      <div className={cx('subheader')}>L’autisme</div>
      
      <p className={'text-justify ' + cx('content')}>Trouble neuro-développemental d’origine multifactorielle, l’autisme se caractérise par :</p>
      <ul className={cx('list')}>
        <li className={cx('list-item')}>des troubles de la communication et des interactions sociales.</li>
        <li className={cx('list-item')}>des comportements, activités et intérêts restreints et stéréotypés.</li>
      </ul>
      <p className={'text-justify ' + cx('content','paddingBottom')}>Ces troubles envahissants du développement (TED) sont aujourd’hui désignés sous l’appellation de <em>troubles du spectre autistique</em> (TSA).</p>
      
      <p className={'text-justify ' + cx('content','paddingBottom')}>L’autisme est généralement associé à d’autres troubles développementaux tels que des troubles du sommeil, de l’anxiété, des déficits de l’attention, de l’épilepsie...</p>

      <p className={'text-justify ' + cx('content')}>En France, 650 000 personnes sont officiellement diagnostiquées, soit 1 naissance sur 100. Les garçons sont, en moyenne, quatre fois plus touchés que les filles.</p>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Les premiers signes évocateurs apparaissent entre 18 et 36 mois. On peut notamment citer un manque d’intérêt pour les personnes, une absence de regard vers l’adulte, des comportements répétitifs et des utili­sations inappropriées d’objets. Les familles sont souvent démunies face à la découverte de l’autisme de leur enfant.</p>
 
      <div className={cx('subheader')}>Autisme et scolarisation</div>

      <p className={'text-justify ' + cx('content')}>Les enfants autistes ayant des difficultés relationnelles et de communication, les apprentissages ne sont pas facilités. Mais, avec un accompagnement adapté, les enfants sont tout à fait capables d’apprendre.</p>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Depuis 2005, la scolarisation est obligatoire pour tous et les élèves sont « inscrits de droit » dans l’école de leur quartier. Malgré un plan national pour l’autisme et une volonté de mettre en avant l’inclusion scolaire, on estime aujourd’hui que 80% des enfants autistes sont déscolarisés.</p>

      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Les raisons sont multiples : manque de formation du personnel autorisé à intervenir à l’école, orientation quasi-systématique vers des établissements médicaux, méconnaissance des familles et de leurs droits, ...</p>
 
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Nous aidons les familles à mener ce combat pour une scolarisation - accompagnée et adaptée - de leurs enfants.</p>
 
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Nous mettons beaucoup d’énergie dans nos différents projets</p>
 
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Merci de votre soutien.</p>
 
      <p className={'text-right ' + cx('content', 'lastPaddingBottom')}>Josselin MONTAGU, président d’Accompagner l’Autisme</p>
    </div>
  );
};

export default About;
