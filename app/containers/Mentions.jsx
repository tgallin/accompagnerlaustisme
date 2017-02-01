import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/mentions';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Mentions = () => {
  return (
    <div>
      <h1>Mentions légales</h1>
      <div className={cx('mentions-header')}>Édition</div>
      <p className={'text-justify ' + cx('mentions-content')}>Éditeur du site et responsable de la publication: Association Accompagner l’Autisme, présidée par Josselin MONTAGU.</p>
      <div className={cx('mentions-content')}>siret : 823 522 354 00013</div>
      <div className={cx('mentions-content')}>siren : 823 522 354</div>
      <div className={cx('mentions-header')}>Reproduction</div>
      <p className={'text-justify ' + cx('mentions-content')}>Le contenu de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables, notamment les représentations iconographiques et photographiques.</p>
      <p className={'text-justify ' + cx('mentions-content')}>La reproduction de tout ou partie de ce site sur un support électronique quel qu’il soit est formellement interdite, sauf autorisation expresse de l’association.</p>
      <div className={cx('mentions-header')}>Données personnelles</div>
      <p className={'text-justify ' + cx('mentions-content')}>Conformément à la loi « informatique et libertés » du 6 janvier 1978, vous bénéficiez d’un droit d’accès et de rectification aux informations qui vous concernent. Si vous souhaitez exercer ce droit et obtenir communication des informations vous concernant, veuillez prendre contact avec l’association.</p>
      <div className={cx('mentions-header')}>Hébergement</div>
      <p className={'text-justify ' + cx('mentions-content')}>Le site est hébergé par Heroku.com.</p>
      <div className={cx('mentions-header')}>Webmaster</div>
      <p className={'text-justify ' + cx('mentions-content')}>Thomas Gallin assure la direction technique du site.</p>
    </div>
  );
};

export default Mentions;
