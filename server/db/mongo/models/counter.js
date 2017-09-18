var mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  seq: {type: Number, default: 0}
});

CounterSchema.statics.increment = function (counter, callback) {
    return this.findOneAndUpdate({name: counter}, { $inc: { seq: 1 } }, {new: true, upsert: true, select: {seq: 1}}, callback);
};

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Counter', CounterSchema);



