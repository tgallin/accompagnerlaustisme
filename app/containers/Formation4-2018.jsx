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
const Formation4_2018 = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className={cx('title')}><h2>Habilités sociales</h2></div>
      <div className='text-center'>Formation assurée par <a href="https://learnenjoy.com/" target="_blank">LearnEnjoy</a></div>

      <div className={cx('header')}>Date</div>
      <p className={'text-justify ' + cx('content')}>Les 17 & 18 mars 2018</p>
      
      <div className={cx('header')}>Programme et objectifs</div>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><div className={cx('title')}><h4>THEMES</h4></div></td>
            <td><div className={cx('title')}><h4>OBJECTIFS</h4></div></td>
          </tr>
          <tr>
            <td>Que sont les compétences sociales ?</td>
            <td>Savoir les définir</td>
          </tr>
          <tr>
            <td>L’ABA* et la socialisation</td>
            <td>Les apports des pratiques comportementales pour ces enseignements</td>
          </tr>
          <tr>
            <td>Evaluation des compétences sociales</td>
            <td>Quels outils d’évaluation utiliser ? Comment les utiliser ?</td>
          </tr>
          <tr>
            <td>Les premières compétences sociales</td>
            <td>Être capable d’intégrer aux projets individualisés des objectifs sociaux adaptés</td>
          </tr>
          <tr>
            <td>L’attention sociale comme renforçateur</td>
            <td>Comment augmenter la sensibilité sociale</td>
          </tr>
          <tr>
            <td>Compétences sociales avancées</td>
            <td>Quoi enseigner lorsque les bases sociales sont déjà présentes</td>
          </tr>
          <tr>
            <td>Procédures d’enseignement</td>
            <td>Comment développer des procédures efficaces</td>
          </tr>
          <tr>
            <td>Exemples d’interventions</td>
            <td>Exemples d’interventions pour les différents niveaux de développement</td>
          </tr>
        </tbody>
      </table>
      
      <div className={cx('header')}>Modalités pédagogiques</div>
      <p className={'text-justify ' + cx('content')}>Des travaux en petits groupes alternés avec des périodes en grand groupe favoriseront des échanges précis avec le formateur. 
      Ils vous seront utiles pour formaliser des objectifs individualisés en phase avec les situations que vous rencontrez.</p>
      
      <p className={'text-justify ' + cx('content')}>Grâce à cette formation, vous saurez élaborer des objectifs de développement des compétences sociales et les 
      procédures pour les atteindre. Vous saurez développer des objectifs, tant pour des enfants ayant peu de 
      compétences initiales, que pour des jeunes déjà plus avancés. Vous apprendrez également quels outils d’évaluation 
      des compétences sociales utiliser, et comment les utiliser.</p>
        
      <div className={cx('header')}>Public</div>
      <p className={'text-justify ' + cx('content')}>Cette formation est destinée aux professionnels et parents.</p>
      
      <div className={cx('header')}>Intervenante</div>
      <p className={'text-justify ' + cx('content')}><strong>Vanessa Riesgo</strong> de <a href="https://learnenjoy.com/" target="_blank">LearnEnjoy</a></p>
      
      <div className={cx('header')}>Tarif</div>
      <p className={'text-justify ' + cx('content')}>Tarif pour les 2 jours : 140 € par personne</p>
      <p className={'text-justify ' + cx('content')}>Merci d'envoyer votre réglement par chèque au 39 rue Paul Ratouis, 45650, Saint-Jean-Le-Blanc.</p>
      
      <div className={cx('header')}>Informations pratiques</div>
      <p className={cx('content')}>Salle de la Picardière</p>
      <p className={cx('content')}>214 rue de Frédeville</p>
      <p className={cx('content', 'paddingBottom')}>45800 St Jean de Braye</p>
      
      <p className={cx('content', 'lastPaddingBottom')}><Link to="/contact" className="btn btn-info">Inscription obligatoire via le formulaire de contact</Link> validée par le règlement complet 15 jours avant la formation</p>
      
    </div>
  );
};

export default Formation4_2018;
