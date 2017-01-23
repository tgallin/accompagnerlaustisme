/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const GoingSchema = new mongoose.Schema({
  barId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Going' collection in the MongoDB database
export default mongoose.model('Going', GoingSchema);

