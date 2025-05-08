import { connectDB } from '@/lib/connectDB';
import { Task } from '@/lib/models';
import { subtaskType } from '@/lib/types';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { boardId, taskTitle, desc, subtasks, status } = body;
  const objectSubtasks = subtasks.map((item: string) => ({
    title: item,
    isCompleted: false
  }));
  await connectDB();
  try {
    const newTask = new Task({
      boardId: boardId,
      title: taskTitle,
      description: desc,
      status: status,
      subtasks: objectSubtasks
    });

    await newTask.save();
    console.log(newTask);
    return Response.json({ body });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function GET() {
  await connectDB();
  const tasks = await Task.find({}).exec();
  return Response.json(tasks);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  await connectDB();
  try {
    const { taskId, slug, data } = body;
    const changedStatus = data.status;
    const completedSubtaskIds = data.subtasks;
    const task = await Task.findOne({ _id: taskId, boardId: slug }).exec();
    if (!task) return Response.json({ status: 404, message: 'Task not found' });
    if (task.status !== changedStatus) task.status = changedStatus;

    task.subtasks = task.subtasks.map((subtask: subtaskType) => {
      const subtaskId = subtask._id.toString();
      return {
        ...subtask,
        isCompleted: completedSubtaskIds.includes(subtaskId) // true if found, false otherwise
      };
    });
    await task?.save();
    return Response.json({ body });
  } catch (error) {
    return Response.json({ error });
  }
}
