/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

const ToyCatSchema = new mongoose.Schema({
  name: String,
  suggestedTags: [{ type: Schema.Types.ObjectId, ref: 'ToyTag' }]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('ToyCategory', ToyCatSchema);



