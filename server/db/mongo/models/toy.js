/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');
var Schema    = mongoose.Schema;

const ToySchema = new mongoose.Schema({
  name: String,
  productCode: String,
  content: String,
  description: String,
  categories: [{ type: Schema.Types.ObjectId, ref: 'ToyCategory' }],
  pictures: Array,
  tags: [{ type: Schema.Types.ObjectId, ref: 'ToyTag' }],
  waiting:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
  online: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  comments: [{
    date: { type: Date, default: Date.now },
    comment: String
  }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  copies: [{
    reference: String,
    toyLibrary: { type: Schema.Types.ObjectId, ref: 'ToyLibrary' },
    borrowedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  }],
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
  // bookings is null || bookings is empty || bookings all returned
  var nbCopiesNotYetBorrowed = this.copies ? this.copies.filter(c => !c.borrowedBy).length : 1;
  var nbPeopleWaiting = this.waiting ? this.waiting.length : 0;
  return nbCopiesNotYetBorrowed > nbPeopleWaiting;
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Toy' collection in the MongoDB database
export default mongoose.model('Toy', ToySchema);



