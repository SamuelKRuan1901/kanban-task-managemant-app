'use client';
import ColumnItem from '@/components/dashboard/ColumnItem';
import TaskItem from '@/components/dashboard/TaskItem';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '@/contexts/BoardContext';
// import TaskView from '@/components/dashboard/TaskView';
import { taskType, boardType } from '@/lib/types';
import TaskView from '@/components/dashboard/TaskView';

const TaskSinglePage = ({
  params
}: {
  params: { slug: string; column: string; task: string };
}) => {
  const [board, setBoard] = useState({} as boardType);
  const [tasksByBoardId, setTasksByBoardId] = useState([] as taskType[]);
  const [chosenTask, setChosenTask] = useState({} as taskType);
  const [taskId, setTaskId] = useState('');

  const statuses = (board?.columns as string[]) || [];

  const { boards, slug, setSlug, tasks } = useContext(BoardContext);

  useEffect(() => {
    const getBoardAndTasks = async () => {
      const {
        slug,
        // column,
        task
      } = await params;
      const boardsArray = Array.isArray(boards) ? boards : [];
      const chosenBoard = boardsArray.find((board) => board._id === slug);
      const tasksByBoardId = tasks.filter((task) => task.boardId === slug);
      const chosenTask = tasksByBoardId.find(
        (item) => (item._id as string) === task
      );
      setSlug(slug);
      setTaskId(task);
      setBoard(chosenBoard as boardType);
      setTasksByBoardId(tasksByBoardId as unknown as taskType[]);
      setChosenTask(chosenTask as taskType);
    };
    getBoardAndTasks();
  }, [params, boards, setSlug, tasks]);

  return (
    <section className='w-auto h-full overflow-auto dark:bg-slate-950 bg-slate-200 flex gap-5'>
      <div className='flex gap-5'>
        {board?.columns?.map((item, index) => (
          <ColumnItem key={index} columnName={item} tasks={[]}>
            {tasksByBoardId
              .filter((task) => task.status === item)
              .map((task) => (
                <div key={task._id} className='m-0 p-0 flex flex-col gap-5'>
                  {task.status === item && (
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

export default TaskSinglePage;
