import { elasticsearchKeys } from '../../config/secrets';
var elasticsearch = require('elasticsearch');

export var client =
  new elasticsearch.Client({
    host: elasticsearchKeys.connectionString
  });

export function indexToy(toy) {
  client.index({
    index: elasticsearchKeys.indexName,
    type: 'toy',
    id: toy.id,
    body: {
      name: toy.name,
      content: toy.content,
      description: toy.description,
      categories: toy.categories,
      tags: toy.tags,
      hasPictures: (toy.pictures && toy.pictures.length > 0),
      owner: { 
        id: toy.owner.id, 
        name: toy.owner.profile.displayName
      },
      toyLibrary: toy.toyLibrary ? { 
        id: toy.toyLibrary.id, 
        complement1: toy.toyLibrary.address.complement1 ? toy.toyLibrary.address.complement1 : '',
        street: toy.toyLibrary.address.street,
        postalCode: toy.toyLibrary.address.postalCode,
        city: toy.toyLibrary.address.city
      } : null,
      online: toy.online,
      approved: toy.approved,
      available: toy.available,
      currentBooking: toy.currentBooking,
      waitingCount: toy.waiting ? toy.waiting.length : 0,
      created: toy.created,
      updated: toy.updated
    }
  }, function(error, response) {
    if (error) {
      console.log('there was a problem indexing the toy :' + error);
    }
    else {
      console.log('toy indexed succesfully');
    }
  });
}

export function deleteToy(toyId) {
  client.delete({
    index: elasticsearchKeys.indexName,
    type: 'toy',
    id: toyId
  }, function(error, response) {
    if (error) {
      console.log('there was a problem removing the toy from the index :' + error);
    }
    else {
      console.log('toy removed from index');
    }
  });
}


export default {
  client,
  indexToy,
  deleteToy
};
