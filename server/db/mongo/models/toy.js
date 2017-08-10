/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');
var Schema    = mongoose.Schema;
  
const ToySchema = new mongoose.Schema({
  name: String,
  content: String,
  description: String,
  categories: [{ type: Schema.Types.ObjectId, ref: 'ToyCategory' }],
  pictures: Array,
  tags: [{ type: Schema.Types.ObjectId, ref: 'ToyTag' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  borrowedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  waiting:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
  online: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

ToySchema
.virtual('available')
.get(function () {
  return !this.borrowedBy && this.waiting.length === 0;
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Toy' collection in the MongoDB database
export default mongoose.model('Toy', ToySchema);



