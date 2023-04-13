const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: [{ type: ObjectId, ref: 'Column', default: [] }],
});

module.exports = mongoose.model('Board', BoardSchema);
