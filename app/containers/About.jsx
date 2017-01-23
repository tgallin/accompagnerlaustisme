import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div>
      <h1>About this Nightlife Coordinator application</h1>
      <div>
        <span>This nightlife coordinator app is built by <a href="http://freecodecamp.com/tgallin">@tgallin</a> of freecodecamp,</span>
        <br/>
        <span>following the instructions of  <a href="https://www.freecodecamp.com/challenges/build-a-nightlife-coordination-app" target="_blank">"Build a Nightlife Coordination App | Free Code Camp"</a>.</span>
        <br/>
        <span>Github repository: <a href="https://github.com/tgallin/nightlife-coordinator">tgallin/nightlife-coordinator</a></span>
        <br/>
        <span>based on <a href="https://github.com/reactGo/reactGo">reactGo</a>, a boilerplate solution for a full-stack app with ES6/ES2015 React.js 
        featuring universal Redux, React Router, React Router Redux Hot reloading, CSS modules, Express 4.x and multiple ORMs</span>
        <br/>
        <span>It is using the Foursquare API to search venues near a location</span>
      </div>
    </div>
  );
};

export default About;
