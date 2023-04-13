const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const ColumnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  order: [{ type: ObjectId, ref: 'Task', default: [] }],
  board: {
    type: ObjectId,
    ref: 'Board',
    required: true,
  },
  tasks: [{ type: ObjectId, ref: 'Task', default: [] }],
});

module.exports = mongoose.model('Column', ColumnSchema);
