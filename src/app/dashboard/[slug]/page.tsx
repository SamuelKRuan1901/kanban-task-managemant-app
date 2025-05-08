'use client';
import ColumnItem from '@/components/dashboard/ColumnItem';
import TaskItem from '@/components/dashboard/TaskItem';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '@/contexts/BoardContext';
interface boardType {
  _id: string;
  name: string;
  columns: string[];
}

interface taskType {
  _id: string;
  boardId: string;
  title: string;
  description: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
  status: string;
}
const BoardSinglePage = ({ params }: { params: { slug: string } }) => {
  const [board, setBoard] = useState({} as boardType);
  const [tasksByBoardId, setTasksByBoardId] = useState([] as taskType[]);
  const { boards, slug, setSlug, tasks } = useContext(BoardContext);

  useEffect(() => {
    const getBoardAndTasks = async () => {
      const { slug } = await params;
      const boardsArray = Array.isArray(boards) ? boards : [];
      const chosenBoard = boardsArray.find((board) => board._id === slug);
      const tasksByBoardId = tasks.filter((task) => task.boardId === slug);
      setSlug(slug);
      setBoard(chosenBoard as boardType);
      setTasksByBoardId(tasksByBoardId as unknown as taskType[]);
    };
    getBoardAndTasks();
  }, [params, boards, setSlug, tasks]);

  return (
    <section className='w-auto h-full overflow-auto dark:bg-slate-950 bg-slate-200 flex gap-5 relative'>
      <div className='flex w-full gap-5'>
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
    </section>
  );
};

export default BoardSinglePage;
