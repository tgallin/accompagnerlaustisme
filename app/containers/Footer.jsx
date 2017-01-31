import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/footer';

var tetherUrl = require("file-loader?name=js/[name].[ext]!../../static/js/tether.min.js");
var bootstrapUrl = require("file-loader?name=js/[name].[ext]!../../static/js/bootstrap.min.js");
var ie10WorkaroundUrl = require("file-loader?name=js/[name].[ext]!../../static/js/ie10-viewport-bug-workaround.js");
var jqueryUrl = require("file-loader?name=js/[name].[ext]!../../static/js/jquery.slim.js");

const cx = classNames.bind(styles);

const Footer = () => {
    return (
      <div>
        <footer className={cx('footer')}>
          <div className={cx('footer-container')}>
            <Link to="/mentionslegales" activeClassName='active'>Mentions légales</Link>
          </div>
        </footer>
        <script src={tetherUrl}></script>
        <script src={jqueryUrl}></script>
        <script src={bootstrapUrl}></script>
        <script src={ie10WorkaroundUrl}></script>
    </div>
    );
};

export default Footer;