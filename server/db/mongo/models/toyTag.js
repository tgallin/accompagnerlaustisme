/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

const ToyTagSchema = new mongoose.Schema({
  name: String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('ToyTag', ToyTagSchema);



