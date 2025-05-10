'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BoardContext } from '@/contexts/BoardContext';
import { useContext } from 'react';

const AddColumn = () => {
  const { setCreateColumn, boards, slug } = useContext(BoardContext);
  const boardById = boards?.filter((board) => board._id === slug);
  return (
    <>
      {boardById[0]?.columns.length !== 0 && (
        <div
          className={`w-60 h-full bg-slate-400 dark:bg-slate-800
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
          className={`w-full h-full flex flex-col items-center justify-center text-center gap-5 text-lg font-semibold`}
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
    </>
  );
};

export default AddColumn;
