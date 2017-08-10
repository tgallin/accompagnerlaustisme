import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/liens';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Liens = () => {
  return (
    <div>
      <ScrollToTopOnMount/>
      <div className={'text-justify ' + cx('content')}>Cette liste est amenée à être complétée régulièrement.</div>
      <div className={'text-justify ' + cx('content')}>N’hésitez pas à nous proposer de nouveaux liens !</div>
      
      <div className={cx('subheader')}>ADMINISTRATIF - DROIT :</div>
      <div><a href="http://www.egalited.org" target="_blank">www.egalited.org</a></div>
      <div className={cx('paddingBottom')}><a href="http://www.loiret.fr/la-maison-departementale-des-personnes-handicapees-mdph--60336.htm?RH=ACCUEIL&xtmc=mdph&xtcr=1" target="_blank">www.loiret.fr/la-maison-departementale-des-personnes-handicapees-mdph--60336.htm?RH=ACCUEIL&xtmc=mdph&xtcr=1</a></div>
       
      <p>Recommandations HAS 2012 :</p>
      <div className={cx('paddingBottom')}><a href="https://www.has-sante.fr/portail/upload/docs/application/pdf/2012-03/recommandations_autisme_ted_enfant_adolescent_interventions.pdf" target="_blank">www.has-sante.fr/portail/upload/docs/application/pdf/2012-03/recommandations_autisme_ted_enfant_adolescent_interventions.pdf</a></div>
      
      <p>Plan autisme 2013-2017 : </p>
      <div><a href="http://www.cnsa.fr/documentation/plan-autisme2013.pdf" target="_blank">www.cnsa.fr/documentation/plan-autisme2013.pdf</a></div>
      
      <div className={cx('subheader')}>DÉPISTAGE - DIAGNOSTIC :</div>
      <div><a href="http://www.cra-centre.org" target="_blank">www.cra-centre.org</a></div>
      <div><a href="http://www.vaincrelautisme.org/content/outils-de-diagnostic-et-de-depistage" target="_blank">www.vaincrelautisme.org/content/outils-de-diagnostic-et-de-depistage</a></div>
      
      <div className={cx('subheader')}>QUELQUES ASSOCIATIONS :</div>
      <div><a href="http://www.autisme-france.fr" target="_blank">www.autisme-france.fr</a></div>
      <div><a href="https://www.dialogueautisme.com" target="_blank">www.dialogueautisme.com</a></div>
      <div><a href="http://www.vaincrelautisme.org" target="_blank">www.vaincrelautisme.org</a></div>
      
      <div className={cx('subheader')}>SCOLARISATION :</div>
      <div><a href="http://www.epsilonalecole.com" target="_blank">www.epsilonalecole.com</a></div>
      <div className={cx('paddingBottom')}><a href="http://www.craif.org/86-bibliographies.html" target="_blank">www.craif.org/86-bibliographies.html</a></div>
      
      <p>Film “Mon petit frère de la lune” :</p>
      <div className={cx('paddingBottom')}><a href="https://www.youtube.com/watch?v=sGb6JP8ktws" target="_blank">www.youtube.com/watch?v=sGb6JP8ktws</a></div>
      
      <p>Film “Mon ami Tom” :</p>
      <div className={cx('paddingBottom')}><a href="https://www.youtube.com/watch?v=-eHtZHH1AYQ" target="_blank">www.youtube.com/watch?v=-eHtZHH1AYQ</a></div>
      
      <p>Guides de scolarisation :</p>
      <div><a href="http://media.education.gouv.fr/file/ASH/57/5/guide_eleves_autistes_130575.pdf" target="_blank">media.education.gouv.fr/file/ASH/57/5/guide_eleves_autistes_130575.pdf</a></div>
      <div><a href="https://www.asperansa.org/docs/guide_scolarisation_2016.pdf" target="_blank">www.asperansa.org/docs/guide_scolarisation_2016.pdf</a></div>
      <div><a href="http://cache.media.eduscol.education.fr/file/Handicap/38/3/TED_eduscol_226383.pdf" target="_blank">cache.media.eduscol.education.fr/file/Handicap/38/3/TED_eduscol_226383.pdf</a></div>
      
      <div className={cx('subheader')}>FORMATIONS - OUTILS- RESSOURCES :</div>
      <div><a href="http://www.canalautisme.com" target="_blank">www.canalautisme.com</a></div>
      <div><a href="https://practicalfunctionalassessment.com/about-2/" target="_blank">practicalfunctionalassessment.com/about-2/</a></div>
      <div><a href="http://www.ted-aba.fr" target="_blank">www.ted-aba.fr</a></div>
      <div><a href="http://www.ba-eservice.info" target="_blank">www.ba-eservice.info</a></div>
      <div><a href="http://www.iloveaba.com" target="_blank">www.iloveaba.com</a></div>
      <div><a href="http://www.autismteachingtools.com" target="_blank">www.autismteachingtools.com</a></div>
      
      <div className={cx('subheader')}>RECHERCHE :</div>
      <div><a href="http://www.inshea.fr" target="_blank">www.inshea.fr</a></div>
      <div><a href="http://www.scilogs.fr/ramus-meninges/" target="_blank">www.scilogs.fr/ramus-meninges/</a></div>
      
      <div className={cx('subheader')}>FILMS EN LIGNE :</div>
      <p>Film “Le cerveau d’Hugo” :</p>
      <div className={cx('paddingBottom')}><a href="https://www.youtube.com/watch?v=IcHXwu_TvYU" target="_blank">www.youtube.com/watch?v=IcHXwu_TvYU</a></div>
      
      <p>Films “Enfants autistes : bienvenue à l’école” :</p>
      <div><a href="http://www.dailymotion.com/video/x4esvzg" target="_blank">www.dailymotion.com/video/x4esvzg</a></div>
      <div className={cx('paddingBottom')}><a href="http://www.dailymotion.com/video/x4d2p7a_inclusion-scolaire-en-college-et-lycee_school" target="_blank">www.dailymotion.com/video/x4d2p7a_inclusion-scolaire-en-college-et-lycee_school</a></div>
      
      <p>Film “Autisme et ABA, le bonheur d’apprendre. Quelque chose en plus” :</p>
      <div className={cx('paddingBottom')}><a href="http://www.dailymotion.com/video/x1n1jsc_autisme-et-aba-le-bonheur-d-apprendre-quelque-chose-en-plus_school" target="_blank">www.dailymotion.com/video/x1n1jsc_autisme-et-aba-le-bonheur-d-apprendre-quelque-chose-en-plus_school</a></div>
    
    </div>
  );
};

export default Liens;
