/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');
var Schema    = mongoose.Schema;
  
const ToyBookingSchema = new mongoose.Schema({
  borrower: { type: Schema.Types.ObjectId, ref: 'User' },
  toy: { type: Schema.Types.ObjectId, ref: 'Toy' },
  reference: String,
  start: { type: Date },
  end: { type: Date },
  returnedDate: { type: Date }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Booking' collection in the MongoDB database
export default mongoose.model('ToyBooking', ToyBookingSchema);



