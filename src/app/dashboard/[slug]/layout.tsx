'use client';
import TaskForm from '@/components/dashboard/TaskForm';
import { BoardContext } from '@/contexts/BoardContext';
import { useContext } from 'react';
import ColumnForm from '@/components/dashboard/ColumnForm';
import BoardForm from '@/components/dashboard/BoardForm';
import DeleteConfirmBox from '@/components/dashboard/DeleteConfirmBox';

const BoardSinglePageLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    createColumn,
    createTask,
    boards,
    slug,
    createBoard,
    exitedTask,
    deleteTask,
    deleteBoard,
    handleDeleteBoard,
    handleDeleteTask,
    setDeleteBoard,
    setDeleteTask
  } = useContext(BoardContext);

  const boardById = boards?.filter((board) => board._id === slug);
  return (
    <section className='w-auto h-full p-5 dark:bg-slate-950 bg-slate-200 flex gap-5 relative overflow-auto'>
      {children}

      {createColumn && <ColumnForm />}
      {createTask === true && exitedTask === false && (
        <TaskForm title={''} desc={''} subtasks={[]} status={''} />
      )}
      {createBoard && slug && (
        <BoardForm
          name={boardById[0]?.name}
          columns={boardById[0]?.columns}
          slug={slug}
        />
      )}
      {deleteTask && (
        <DeleteConfirmBox
          title={'Delete this task?'}
          desc={
            "Are you sure you want to delete the 'Build settings UI' task and its subtasks? This action cannot be reversed."
          }
          handleDelete={handleDeleteTask}
          cancelClose={() => setDeleteTask(false)}
        />
      )}
      {deleteBoard && (
        <DeleteConfirmBox
          title={'Delete this board?'}
          desc={
            "Are you sure you want to delete the 'Platform Launch' board? This action will remove all columns and tasks and cannot be reversed."
          }
          handleDelete={handleDeleteBoard}
          cancelClose={() => setDeleteBoard(false)}
        />
      )}
    </section>
  );
};

export default BoardSinglePageLayout;
