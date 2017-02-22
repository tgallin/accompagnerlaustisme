import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/formations';
import enfantsAutistesBienvenueEcole from '../images/enfants-autistes-bienvenue-ecole.jpg';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Formation3 = () => {
  return (
    <div>
    
      <div className={cx('title')}><h3>Enfants austistes : bienvenue à l'école !<br/>Inclusion scolaire en maternelle et primaire</h3></div>
      
      <div className={'text-center ' + cx('content', 'paddingBottom')}>Programme vidéo suivi d’un débat avec la réalisatrice Sophie Robert.</div>
      <div className={'text-center ' + cx('content', 'paddingBottom')}>Présence de plusieurs inspecteurs et enseignants de l’Education Nationale</div>
      
      <div className='text-center'><img src={enfantsAutistesBienvenueEcole} alt="Enfants autistes : bienvenue à l'école"/></div>
      
      <div className={cx('header')}>Objectif de la formation</div>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>L’objectif est de fournir aux professeurs, aux AESH,
      et plus généralement à toute personne intervenant dans le champ de l’autisme
      et du handicap au sein de l’Education Nationale, un outil de sensibilisation et de formation à l’inclusion scolaire, 
      qui lui permette d’entrer dans la démarche pour faciliter l’inclusion scolaire des enfants autistes.</p>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Les moyens : filmer des professeurs inclusifs, des enseignants spécialisés,
      et des experts de la pédagogie différenciée (psychologues TEACCH, ABA, Montessori, orthophonistes) qui vont partager avec le public 
      leur expertise, et leur expérience de terrain, pour aborder pas à pas, et l’illustrer en situation, 
      toute la démarche de l’inclusion à l’intention de leurs collègues.</p>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Dans cette série, le vecteur principal de l’information 
      ce sont des professeurs et des experts au sein de l’Education Nationale qui parlent aux professeurs. 
      Ceci afin d’aborder les problématiques des enseignants et répondre à leurs interrogations de façon très concrète.</p>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>In fine, il s’agit de fournir un programme pédagogique positif qui dédramatise, 
      et sensibilise à la démarche avec un enthousiasme communicatif, afin de faciliter le passage à l’acte de l’inclusion, à travers la valorisation de ce qui marche.</p>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>En effet cette série va mettre en valeur les ressources intellectuelles, 
      pédagogiques et humaines au sein de l’Education Nationale afin que ces personnes ressources servent de « rôle model » aux enseignants qui s’interrogent.</p>
      <p className={'text-justify ' + cx('content')}>Cette série vidéo est porteuse de valeurs. Elle montrera que les outils de la pédagogie différenciée 
      et de l’adaptation scolaire bénéficient à tous les élèves : enfants porteurs d’autres formes de handicap que l’autisme, enfants en difficultés, 
      mais aussi enfants ordinaires bien adaptés à l’école enrichi par le contact de la diversité humaine : l’inclusion est un bénéfice pour tous.</p>
      
      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content')}>Le 7 avril 2017</p>
      
      <div className={cx('header')}>Programme</div>
      <div className="row">
        <div className="col-xs-1">18h30</div>
        <div className="col-xs-11">Ouverture des portes</div>
      </div>
      <div className="row">
        <div className="col-xs-1">19h15</div>
        <div className="col-xs-11">Projection du film</div>
      </div>
      <div className="row">
        <div className="col-xs-1">21h00</div>
        <div className="col-xs-11">Débat avec la réalisatrice, des inspecteurs de l’education nationale, des enseignants, des professionnels, des parents...</div>
      </div>
      
      <div className={cx('header')}>Modalités pédagogiques</div>
      <p className={'text-justify ' + cx('content')}>Comment accompagner la scolarité d’un enfant autiste en milieu ordinaire ? Quels sont les pré requis de l’inclusion scolaire ?</p>
      <p className={'text-justify ' + cx('content')}>Comment adapter sa pédagogie à ces élèves différents ? </p>
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Comment prévenir le harcèlement scolaire et faire des autres élèves les acteurs de l’inclusion ? Au fait, c’est quoi l’autisme ?</p>
      
      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Pour répondre à ces questions nous allons suivre en classe trois élèves autistes de profils très différents en interaction 
      avec leurs professeurs et camarades : Victor, un enfant peu verbal pourvu d’une déficience cognitive ; Aniss, un enfant autiste typique sans déficience cognitive et Tristan, un enfant porteur du syndrome d’Asperger.</p>
      
      <p className={'text-justify ' + cx('content')}>En parallèle, trois enseignantes de maternelle et élémentaire, une AESH, une enseignante spécialisée et deux psychologues TEACCH et ABA, nous feront partager 
      leur expérience de l’inclusion de façon concrète, enthousiaste et pragmatique.</p>
      
      <div className={cx('header')}>Public</div>
      <p className={'text-justify ' + cx('content')}>Cette soirée de sensibilisation est destinée personnels de l’Education Nationale, aux parents d’enfants avec autisme et aux professionnels qui travaillent auprès des personnes avec autisme.</p>
      
      <div className={cx('header')}>Intervenante</div>
      <p className={'text-justify ' + cx('content')}><strong>Sophie Robert</strong></p>
      <p className={'text-justify ' + cx('content')}>Réalisatrice – productrice animatrice des programmes,</p>
      <p className={'text-justify ' + cx('content','paddingBottom')}>Sophie Robert est investie dans l’autisme depuis plus de 5 ans, elle explore la
problématique de l’autisme et du handicap en général à travers une série de films destinés à améliorer l’autonomie des personnes porteuses d’un handicap neuro-développemental.</p>
      
       <p className={'text-justify ' + cx('content')}>FILMOGRAPHIE (extraits)</p>
       <p className={'text-justify ' + cx('content')}>2011 : le Mur</p>
       <p className={'text-justify ' + cx('content')}>2014 : Mon univers à part</p>
       <p className={'text-justify ' + cx('content')}>2014 : Quelque chose en plus</p>
       <p className={'text-justify ' + cx('content', 'paddingBottom')}>2016 : Inclusion scolaire en collège et lycée / Inclusion scolaire en maternelle et
primaire, premiers volets de la série "Enfants autistes : bienvenue à l’école !".</p>

       <a href="http://www.enfantsautistesbienvenuealecole.com" target="_blank">www.enfantsautistesbienvenuealecole.com</a>
      
      
      <div className={cx('header')}>Tarifs</div>
      <p className={'text-justify ' + cx('content')}>Gratuit, sur inscription</p>
      
      <div className={cx('header')}>Informations pratiques</div>
      <p className={cx('content')}>Auditorium Jean Zay CANOPE 45</p>
      <p className={cx('content')}>55, rue notre dame de recouvrance</p>
      <p className={cx('content', 'paddingBottom')}>45000 Orléans</p>
      
      <p className={cx('content', 'lastPaddingBottom')}><Link to="/contact" className="btn btn-info">Inscription obligatoire via le formulaire de contact</Link></p>
      
    </div>
  );
};

export default Formation3;
