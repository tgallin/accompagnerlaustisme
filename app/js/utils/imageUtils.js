// 1 for Cloudinary
// 2 for ...
var imageHostingServiceProvider = 1;

export function thumbnailToyImageUrl(picture) {
  var url = '';
  if (imageHostingServiceProvider==1) {
    url = picture.eager[0].secure_url;
  }
  return url;
}

export function smallToyImageUrl(picture) {
  var url = '';
  if (imageHostingServiceProvider==1) {
    url = picture.eager[1].secure_url;
  }
  return url;
}

export function mediumToyImageUrl(picture) {
  var url = '';
  if (imageHostingServiceProvider==1) {
    url = picture.eager[2].secure_url;
  }
  return url;
}

export function largeToyImageUrl(picture) {
  var url = '';
  if (imageHostingServiceProvider==1) {
    url = picture.secure_url;
  }
  return url;
}

export function noImageLargePlaceHolderUrl() {
  return 'http://via.placeholder.com/400x400?text=Aucune+image';
}

export function noImageMediumPlaceHolderUrl() {
  return 'http://via.placeholder.com/200x200?text=Aucune+image';
}
