const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  column: {
    type: ObjectId,
    ref: 'Column',
    required: true,
  },
  subtasks: [{ type: ObjectId, ref: 'Subtask', default: [] }],
});

module.exports = mongoose.model('Task', TaskSchema);
