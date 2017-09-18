import React, { Component, PropTypes } from 'react';
import ImageGallery from 'react-image-gallery';


class ToysImageGallery extends Component {
  
  render() {
    
    const { pictures } = this.props;
    
    const pics = [];
    var showThumbnails = true;
    
    if (!pictures || pictures.length == 0) {
      pics.push({
        original: 'http://via.placeholder.com/400x400?text=Aucune+image'
        });
      showThumbnails = false;
    } else {
      pictures.map(p => {
       pics.push({
        original: p.secure_url,
        thumbnail: p.eager[2].secure_url
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