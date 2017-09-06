/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');
var Schema    = mongoose.Schema;
  
const BookingSchema = new mongoose.Schema({
  borrowedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  toy: { type: Schema.Types.ObjectId, ref: 'Toy' },
  start: { type: Date },
  end: { type: Date },
  returned: { type: Date }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Toy' collection in the MongoDB database
export default mongoose.model('Booking', BookingSchema);



