import { client } from '../search/elasticsearch';
import { elasticsearchKeys } from '../../config/secrets';

export default () => {
  client.indices.create({
    index: elasticsearchKeys.indexName,
  }, function(error, response) {
    if (error) {
      console.log('accompagnerlautisme elasticsearch index already exists');
    }
    else {
      console.log('accompagnerlautisme elasticsearch index created');
    }

    var body = {
      toy: {
        properties: {
          name: { "type": "string" },
          content: { "type": "string", "analyzer": "french" },
          description: { "type": "string", "analyzer": "french" },
          categories: { "type": "string" },
          tags: { "type": "string" },
          hasPictures: { "type": "boolean" },
          online: { "type": "boolean" },
          approved: { "type": "boolean" },
          available: { "type": "boolean" },
          created: { "type": "date" },
          updated: { "type": "date" }
        }
      }
    };

    client.indices.putMapping({ index: elasticsearchKeys.indexName, type: "toy", body: body });
  });
};
