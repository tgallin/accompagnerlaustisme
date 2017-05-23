'use strict';

var cloudinary = require('cloudinary');
import _ from 'lodash';


export function uploadImage(imageFile, callback) {
  if (!imageFile || _.isEmpty(imageFile) || !imageFile.path || imageFile.path === '') {
    callback(null, null);
  }
  else {
    var options = {
      folder: imageFile.folder,
      width: 400,
      crop: 'scale',
      quality: 'auto',
      eager: [{
        width: 50,
        crop: 'scale',
        quality: 'auto'
      }, {
        width: 120,
        crop: 'scale',
        quality: 'auto'
      }, {
        width: 200,
        crop: 'scale',
        quality: 'auto'
      }],
      eager_async: true
    };

    cloudinary.v2.uploader.upload(imageFile.path, options, callback);
  }
}

export function destroyImage(public_id) {
  cloudinary.v2.uploader.destroy(public_id, function(error, result) {
    console.log(result);
  });
}
