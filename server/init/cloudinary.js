import { cloudinaryKeys } from '../../config/secrets';
var cloudinary = require('cloudinary');

export default () => {
  cloudinary.config({
    cloud_name: cloudinaryKeys.cloudName,
    api_key: cloudinaryKeys.apiKey,
    api_secret: cloudinaryKeys.secretKey
  });
};
