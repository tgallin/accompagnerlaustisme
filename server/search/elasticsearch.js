import { elasticsearchKeys } from '../../config/secrets';
var elasticsearch = require('elasticsearch');

export var client =
  new elasticsearch.Client({
    host: elasticsearchKeys.connectionString
  });

export function indexToy(toy) {
  
  var catArr = toy.categories ? toy.categories.reduce(( acc, cur ) => acc.concat(cur.name),[]): [];
  var tagArr = toy.tags ? toy.tags.reduce(( acc, cur ) => acc.concat(cur.name),[]) : [];

  client.index({
    index: elasticsearchKeys.indexName,
    type: 'toy',
    id: toy.id,
    body: {
      name: toy.name,
      content: toy.content,
      description: toy.description,
      categories: catArr.join(' '),
      tags: tagArr.join(' '),
      hasPictures: (toy.pictures && toy.pictures.length > 0),
      online: toy.online,
      approved: toy.approved,
      available: toy.available,
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

export function removeToyFromIndex(toyId) {
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

export function searchToys(text) {
  client.search({
    index: elasticsearchKeys.indexName,
    type: 'toy',
    body: {
      "query": {
          "bool": {
            "should": [
              { "match": { "name": text }},
              { "match": { "content": text }},
              { "match": { "description": text }},
              { "match": { "categories": text }},
              { "match": { "tags": text }}
            ],
            "filter": [ 
              { "term":  { "online": true }}
            ]
          }
        }
    }
  }, function (error, response) {
    return response;
  });
}

export default {
  client,
  indexToy,
  removeToyFromIndex,
  searchToys
};
