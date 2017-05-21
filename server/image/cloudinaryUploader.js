'use strict';

var cloudinary = require('cloudinary');

export function uploadImage(imageFile, callback) {
    if (!imageFile || imageFile === ''){
        callback(null, null);
    }
    
    var options = {
        folder: imageFile.folder,
        eager: [
            { width: 300, crop: 'scale', quality: 'auto'}
        ]
    };
    
    cloudinary.uploader.upload(imageFile.path, options, function(result) {
        callback(null, result);
    });
}
