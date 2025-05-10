import { connectDB } from '@/lib/connectDB';
import { Task } from '@/lib/models';
import { subtaskType } from '@/lib/types';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { boardId, taskTitle, desc, subtasks, status } = body;
  const checkedSubtasks = subtasks.filter((item: string) => item !== '');
  const objectSubtasks = checkedSubtasks.map((item: string) => ({
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

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const taskId = body.taskId;
  const slug = body.slug;
  await connectDB();
  try {
    await Task.deleteOne({ _id: taskId, boardId: slug });
    return Response.json({ body });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { taskId, slug, data } = body;
  const checkedSubtasks = data.subtasks.filter((item: string) => item !== '');
  console.log(data);
  await connectDB();
  try {
    const task = await Task.findOne({ _id: taskId, boardId: slug }).exec();
    if (!task) return Response.json({ status: 404, message: 'Task not found' });
    task.title = data.taskTitle;
    task.description = data.desc;
    task.status = data.status;
    const updatedSubtasks = checkedSubtasks.map(
      (item: string, index: string | number) => {
        // If an existing subtask exists at this index, update it.
        if (task.subtasks && task.subtasks[index]) {
          const existingSubtask = task.subtasks[index];
          // If the title differs from the new title, update it
          if (existingSubtask.title !== item) {
            return { ...existingSubtask, title: item };
          }
          // Otherwise, keep the existing object.
          return existingSubtask;
        } else {
          // If there is no subtask at this index, create a new one.
          return { title: item, isCompleted: false, _id: new Object() };
        }
      }
    );
    task.subtasks = updatedSubtasks;

    console.log('Updated subtasks:', task.subtasks);
    await task.save();
    console.log(task.subtasks);
    return Response.json({ body });
  } catch (error) {
    return Response.json({ error });
  }
}
