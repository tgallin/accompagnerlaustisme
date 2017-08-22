/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');
var Schema    = mongoose.Schema;
  
const ToyLibrarySchema = new mongoose.Schema({
  address: {},
  openings:  [{
    date: Date,
    startTime: { type: String, default: '09:30' },
    endTime: { type: String, default: '12:30' }
  }]
});


// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'ToyLibrary' collection in the MongoDB database
export default mongoose.model('ToyLibrary', ToyLibrarySchema);



