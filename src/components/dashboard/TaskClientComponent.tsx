'use client';

import ColumnItem from '@/components/dashboard/ColumnItem';
import TaskItem from '@/components/dashboard/TaskItem';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '@/contexts/BoardContext';
import { taskType, boardType } from '@/lib/types';
import TaskView from '@/components/dashboard/TaskView';
import AddColumn from '@/components/dashboard/AddColumn';

const TaskClientComponent = ({
  slug,
  task
}: {
  slug: string;
  task: string;
}) => {
  const { boards, setSlug, tasks, taskId, setTaskId } =
    useContext(BoardContext);
  const [board, setBoard] = useState({} as boardType);
  const [tasksByBoardId, setTasksByBoardId] = useState([] as taskType[]);
  const [chosenTask, setChosenTask] = useState({} as taskType);

  const statuses = (board?.columns as string[]) || [];

  useEffect(() => {
    const getBoardAndTasks = () => {
      const boardsArray = Array.isArray(boards) ? boards : [];
      const chosenBoard = boardsArray.find((board) => board._id === slug);
      const tasksByBoardId = tasks.filter((task) => task.boardId === slug);
      const chosenTask = tasksByBoardId.find(
        (item) => (item._id as string) === task
      );
      setSlug(slug);
      setTaskId(task);
      setBoard(chosenBoard as boardType);
      setTasksByBoardId(tasksByBoardId as taskType[]);
      setChosenTask(chosenTask as taskType);
    };
    getBoardAndTasks();
  }, [boards, setSlug, tasks, setTaskId, slug, task]);

  return (
    <section className='w-full h-full overflow-auto dark:bg-slate-950 bg-slate-200 flex gap-5'>
      <div className='w-full flex gap-5'>
        {board?.columns?.map((item, index) => (
          <ColumnItem key={index} columnName={item}>
            {tasksByBoardId
              .filter((t) => t.status.toLowerCase() === item.toLowerCase())
              .map((task) => (
                <div key={task._id} className='m-0 p-0 flex flex-col gap-5'>
                  {task.status.toLowerCase() === item.toLowerCase() && (
                    <Link
                      href={`/dashboard/${slug}/${task.status}/${task._id}`}
                    >
                      <TaskItem title={task.title} subtasks={task.subtasks} />
                    </Link>
                  )}
                </div>
              ))}
          </ColumnItem>
        ))}
        <div className='w-60'>
          <AddColumn />
        </div>
      </div>
      <TaskView
        chosenTask={chosenTask}
        statuses={statuses}
        slug={slug}
        taskId={taskId}
      />
    </section>
  );
};

export default TaskClientComponent;
