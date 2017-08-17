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
      online: toy.online,
      approved: toy.approved
    }
  }, function(error, response) {
    if (error) {
      console.log('there was a problem indexing the toy :' + error);
    } else {
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
    } else {
      console.log('toy removed from index');
    }
  });
}


export default {
  client,
  indexToy,
  deleteToy
};
