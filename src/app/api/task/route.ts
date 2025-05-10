import { connectDB } from '@/lib/connectDB';
import { Task } from '@/lib/models';
import { subtaskType } from '@/lib/types';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
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
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500, error });
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
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500, error });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const taskId = body.taskId;
  const slug = body.slug;
  await connectDB();
  try {
    await Task.deleteOne({ _id: taskId, boardId: slug });
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500, error });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { taskId, slug, data } = body;
  const checkedSubtasks = data.subtasks.filter((item: string) => item !== '');
  const objectSubtasks = checkedSubtasks.map((item: string) => ({
    title: item,
    isCompleted: false
  }));
  await connectDB();
  try {
    const task = await Task.findOne({ _id: taskId, boardId: slug }).exec();
    if (!task) return Response.json({ status: 404 });
    task.title = data.taskTitle;
    task.description = data.desc;
    task.status = data.status;

    function updateSubtasks(original: subtaskType[], modified: subtaskType[]) {
      // Create a Map to quickly look up an original task by its title.
      const originalMap = new Map(original.map((task) => [task.title, task]));

      // Build the updated tasks array based solely on the modified list.
      // This automatically drops any original tasks not present in modified.
      const updated = modified.map((modTask) => {
        if (originalMap.has(modTask.title)) {
          // There is a task with the same title in the original list.
          const origTask = originalMap.get(modTask.title);
          // Retain true if the original had isCompleted true, otherwise use the modified value.
          return {
            title: modTask.title,
            isCompleted: origTask?.isCompleted ? true : modTask.isCompleted,
            _id: origTask?._id
          };
        } else {
          // No matching original task; use the modified one as is.
          return modTask;
        }
      });

      return updated;
    }

    const newSubtasks = updateSubtasks(task.subtasks, objectSubtasks);
    console.log(newSubtasks);
    task.subtasks = newSubtasks;
    await task?.save();
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500, error });
  }
}
