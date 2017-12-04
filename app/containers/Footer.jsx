import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/footer';
import facebookLogo from '../images/FB-f-Logo__blue_29.png';

var ie10WorkaroundUrl = require("file-loader?name=js/[name].[ext]!../js/compatibility/ie10-viewport-bug-workaround.js");
var polyfills = require("file-loader?name=js/[name].[ext]!../js/compatibility/polyfills.js");
var customExternal = require("file-loader?name=js/[name].[ext]!../js/custom.js");

const cx = classNames.bind(styles);

const Footer = () => {
    return (
      <div>
        <footer className={cx('footer')}>
          <div className='container'>
            <div className={cx('footer-content')}>
              <div className={cx('leftCol')}><Link to="/mentionslegales" className={cx('footer-link')} activeClassName='active'>Mentions légales</Link></div>
              <div className={cx('rightCol')}>Retrouvez nous sur <a href="https://www.facebook.com\accompagnerlautisme" target="_blank"><img src={facebookLogo}/></a></div>
              <div className={cx('middleCol')}> </div>
            </div>
          </div>
        </footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
        <script src={ie10WorkaroundUrl}></script>
        <script src={polyfills}></script>
        <script src={customExternal}></script>
    </div>
    );
};

export default Footer;