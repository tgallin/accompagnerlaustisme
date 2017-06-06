import React from 'react';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/home';
import logo from '../images/logo-AAA.png';
import aBlue from '../images/Ableu.png';
import aYellow from '../images/Ajaune.png';
import aStripes from '../images/Araye.png';
import aAndStar from '../images/A-et-etoile.png';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Home = () => {
  return (
    <div>
      <ScrollToTopOnMount/>

      <div className='text-center'><img src={logo} alt="logo"/></div>
      
      <div className='row'>
        <div className='col-xs-2'><div className={cx('image-a-left')}><img src={aBlue} alt="A bleu"/></div></div>
        <div className='col-xs-8'><div className={cx('title')}>Bienvenue sur notre site Accompagner l’Autisme</div></div>
        <div className='col-xs-2'><div className={cx('image-a-right')}><img src={aYellow} alt="A jaune"/></div></div>
      </div>
      
      <p className={cx('content', 'paddingBottom')}> </p>
      
      <p className={'text-justify ' + cx('content', 'bigPaddingBottom')}>Notre philosophie repose sur 2 axes principaux :</p>
      <ul className={cx('listNoType')}>
        <li className={cx('list-item')}><p className={'text-justify ' + cx('content', 'bigPaddingBottom')}><div className={cx('image-a-li')}><img src={aStripes} alt="A rayé"/></div>Avec une prise en charge adaptée et coordonnée, l’enfant et sa famille sont les principaux acteurs du projet. Ainsi, nous proposons d’une part des formations pour parents et professionnels et d’autre part des accompagnements personnalisés à l’école et à domicile.</p></li>
        <li className={cx('list-item')}><p className={'text-justify ' + cx('content', 'paddingBottom')}><div className={cx('image-a-li')}><img src={aStripes} alt="A rayé"/></div>La place des enfants autistes est à l’école. A ce titre nous oeuvrons pour la formation des AVS / AESH, mais nos accompagnants peuvent intervenir à l’école dans le cadre de conventions individuelles avec l’Education Nationale.</p></li>
      </ul>

      <div className={'text-center ' + cx('bigPaddingBottom')}><img src={aAndStar} alt="A et etoile"/></div>

      <p className={'text-center ' + cx('content', 'bigPaddingBottom')}><Link to="/contact" className="btn btn-info">Contactez-nous pour devenir adhérents</Link></p>
      
      <p className={'text-justify ' + cx('content', 'bigPaddingBottom')}>Certaines parties du site sont encore en cours de construction, n'hésitez pas à revenir régulièrement.</p>
      
    </div>
  );
};

export default Home;
