const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const SubtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  task: {
    type: ObjectId,
    ref: 'Task',
    required: true,
  },
});

module.exports = mongoose.model('Subtask', SubtaskSchema);
