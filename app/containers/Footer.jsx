import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/footer';

var ie10WorkaroundUrl = require("file-loader?name=js/[name].[ext]!../js/ie10-viewport-bug-workaround.js");

const cx = classNames.bind(styles);

const Footer = () => {
    return (
      <div>
        <footer className={cx('footer')}>
          <div className='container'>
            <p className={cx('footer-content')}>
              <Link to="/mentionslegales" className={cx('footer-link')} activeClassName='active'>Mentions légales</Link>
            </p>
          </div>
        </footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha256-gL1ibrbVcRIHKlCO5OXOPC/lZz/gpdApgQAzskqqXp8=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha256-/SIrNqv8h6QGKDuNoLGA4iret+kyesCkHGzVUUV0shc=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src={ie10WorkaroundUrl}></script>
    </div>
    );
};

export default Footer;