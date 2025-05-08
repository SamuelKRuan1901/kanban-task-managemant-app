import mongoose, { Schema } from 'mongoose';

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  columns: {
    type: [String],
    default: []
  }
});

export const Board =
  (mongoose.models && mongoose.models.Board) ||
  mongoose.model('Board', BoardSchema);

const TaskSchema = new Schema({
  boardId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  subtasks: [
    {
      title: {
        type: String,
        required: true
      },
      isCompleted: {
        type: Boolean,
        default: false
      }
    }
  ]
});

export const Task =
  (mongoose.models && mongoose.models.Task) ||
  mongoose.model('Task', TaskSchema);
