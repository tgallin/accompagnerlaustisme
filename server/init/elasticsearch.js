import { client } from '../search/elasticsearch';
import { elasticsearchKeys } from '../../config/secrets';

export default () => {
  client.indices.create({
    index: elasticsearchKeys.indexName,
  }, function (error, response) {
    console.log('accompagnerlautisme elasticsearch index created');
  });
};