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
          categories: {
            properties: {
              _id: { "type": "string", "index": "not_analyzed" },
              name: { "type": "string" },
              suggestedTags: { "type": "string", "index": "no" }
            }
          },
          tags: {
            properties: {
              _id: { "type": "string", "index": "not_analyzed" },
              name: { "type": "string" }
            }
          },
          hasPictures: { "type": "boolean" },
          owner: {
            properties: {
              id: { "type": "string", "index": "not_analyzed" },
              name: { "type": "string" }
            }
          },
          toyLibrary: {
            properties: {
              id: { "type": "string", "index": "not_analyzed" },
              complement1: { "type": "string" },
              street: { "type": "string" },
              postalCode: { "type": "integer" },
              city: { "type": "string" }
            }
          },
          online: { "type": "boolean" },
          approved: { "type": "boolean" },
          available: { "type": "boolean" },
          currentBooking: {
            properties: {
              _id: { "type": "string", "index": "no" },
              borrowedBy: { "type": "string", "index": "not_analyzed" },
              toy: { "type": "string", "index": "no" },
              start: { type: Date },
              end: { type: Date },
              returned: { type: Date }
            }
          },
          waitingCount: { "type": "short" },
          created: { "type": "date" },
          updated: { "type": "date" }
        }
      }
    };

    client.indices.putMapping({ index: elasticsearchKeys.indexName, type: "toy", body: body });
  });
};
