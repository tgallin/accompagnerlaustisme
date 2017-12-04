import React, { Component, PropTypes } from 'react';
import ImageGallery from 'react-image-gallery';
import { noImageLargePlaceHolderUrl, mediumToyImageUrl, largeToyImageUrl } from '../js/utils/imageUtils';


class ToysImageGallery extends Component {
  
  render() {
    
    const { pictures } = this.props;
    
    const pics = [];
    
    if (!pictures || pictures.length == 0) {
      pics.push({
        original: noImageLargePlaceHolderUrl()
        });
    } else {
      pictures.map(p => {
       pics.push({
        original: largeToyImageUrl(p),
        thumbnail: mediumToyImageUrl(p)
        });
      });
    }

    return (
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={pics.length > 1}
        items={pics} />
    );
  }
}


ToysImageGallery.propTypes = {
    pictures: PropTypes.array,
};

export default ToysImageGallery;