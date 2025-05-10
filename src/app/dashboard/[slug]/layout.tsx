'use client';
import TaskForm from '@/components/dashboard/TaskForm';
import { BoardContext } from '@/contexts/BoardContext';
import { useContext } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ColumnForm from '@/components/dashboard/ColumnForm';
import BoardForm from '@/components/dashboard/BoardForm';
import DeleteConfirmBox from '@/components/dashboard/DeleteConfirmBox';

const BoardSinglePageLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    createColumn,
    createTask,
    setCreateColumn,
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
    <section className='w-full h-full p-5 overflow-auto dark:bg-slate-950 bg-slate-200 flex gap-5 relative'>
      {children}
      {boardById[0]?.columns.length !== 0 && (
        <div
          className={`w-60 bg-slate-400 dark:bg-slate-800
         dark:hover:bg-slate-800/50  rounded-md flex items-center 
         justify-center cursor-pointer hover:bg-slate-400/50`}
          onClick={() => setCreateColumn(true)}
        >
          <Plus />
          <span className='text-xl font-semibold'>Add Column</span>
        </div>
      )}
      {boardById[0]?.columns.length === 0 && (
        <div
          className={`w-full h-full flex flex-col items-center justify-center gap-5 text-lg font-semibold`}
        >
          <p>This board is empty. Create a new column to get started.</p>
          <Button
            className='w-60 h-12 rounded-full cursor-pointer'
            onClick={() => setCreateColumn(true)}
          >
            <Plus />
            <span className='text-xl font-semibold'>Add Column</span>
          </Button>
        </div>
      )}
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
