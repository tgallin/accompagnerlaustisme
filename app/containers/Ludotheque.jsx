import React from 'react';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import classNames from 'classnames/bind';
import styles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Ludotheque = () => {
  return (
    <div>
      <ScrollToTopOnMount/>

      <p className={'text-justify ' + cx('content', 'paddingBottom')}>Les enfants autistes ont tous une capacité d’apprentissage. Pour les aider à apprendre, les accompagnants et éducateurs ont très souvent recours à des outils ludo-éducatifs pour susciter leur intérêt. 	Il peut s’agir de jeux ou jouets très basiques mais bien souvent ces outils éducatifs ont une conception bien adaptées aux enfants à besoin spécifique. Ces derniers sont très chers. </p>
      
      <p className={'text-justify ' + cx('content', 'lastPaddingBottom')}>Vous pourrez bientôt, en tant que membre de l’association et via cette page,  emprunter des jouets et matériel pédagogique pour une période déterminée. Cela permettra notamment de valider que ce matériel est adapté à l’enfant, avant de l'acheter.</p>
      
    </div>
  );
};

export default Ludotheque;
