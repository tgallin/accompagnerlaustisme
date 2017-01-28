/* Based on the template in Web Starter Kit :
https://github.com/google/web-starter-kit/blob/master/app/index.html
*/
import favicon from '../images/favicon.ico';

import {
  isDev
}
from '../config/app';

const metaAssets = () => {
  return [{
      charset: 'utf-8'
    },
    // Meta descriptions are commonly used on search engine result pages to
    // display preview snippets for a given page.
    {
      name: 'description',
      content: 'Site de l\'Association Accompagner l\'Autisme'
    },
    // Setting IE=edge tells Internet Explorer to use the latest engine to
    //  render the page and execute Javascript
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge'
    },
    // Using the viewport tag allows you to control the width and scaling of
    // the browser's viewport:
    // - include width=device-width to match the screen's width in
    // device-independent pixels
    // - include initial-scale=1 to establish 1:1 relationship between css pixels
    // and device-independent pixels
    // - ensure your page is accessible by not disabling user scaling.
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ];
};

const linkAssets = () => {
  const links = [
    { rel: 'icon', href: favicon, type: 'image/x-icon'}, 
    { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'},
    { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
    { rel: 'stylesheet', href: '/assets/styles/main.css' }
    // SEO: If your mobile URL is different from the desktop URL,
    // add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones
    // { 'rel': 'canonical', 'href': 'http://www.example.com/' }
  ];
  return isDev() ? links.filter(l => l.rel !== 'stylesheet' || l.href.substr(0,4)==='http') : links;
};

export const title = 'Association Accompagner l\'Autisme';
export const meta = metaAssets();
export const link = linkAssets();
