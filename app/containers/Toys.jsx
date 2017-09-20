import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import aStripes from '../images/Araye.png';

import classNames from 'classnames/bind';
import styles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);

class Toys extends Component {

  render() {

    const { toys, children } = this.props;

    return (
      <div>
      { !children && 
        <div>
          <ScrollToTopOnMount/>
          <div>
            {toys && toys.length > 0 &&
              <div>
                <div className={cx('header')}>Catalogue de jeux</div>
                
                {
                  toys.map((toy) => (
                    <div key={toy._id}>
                      <ul className={cx('toy_list', 'grid')}>
                        <li className="col-xs-12 col-sm-4 col-md-3">
                          <div className={cx('toy-container')}>
                            <div>
                              <div className={cx('toy-image-container')}>
                                <Link className={cx('toy_img_link')} to={'/ludotheque/toys/' + toy._id + '?back=catalog'} title={toy.name}>
                                  <div>{toy.pictures && toy.pictures.length > 0 && <img className="img-responsive" src={toy.pictures[0].eager[2].secure_url} alt={toy.name} title={toy.name} />}</div>
                                  <div>{(!toy.pictures || toy.pictures.length == 0) && <img src="http://via.placeholder.com/200x200?text=Aucune+image" /> }</div>
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h5>
                                <Link className={cx('toy-name')} to={'/ludotheque/toys/' + toy._id} title={toy.name}>
                                {toy.name}
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                ))}
              </div>
            }
          </div>
          
        </div>
      }
      {children}
      </div>
    );
  };
}

Toys.propTypes = {
  toys: PropTypes.array,
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    toys: state.toyLibrary.toys
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Toys);
