import { subTaskType } from '@/lib/types';

const TaskItem = ({
  title,
  subtasks
}: {
  title: string;
  subtasks: subTaskType[];
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 dark:hover:bg-slate-900/50 w-60 
    hover:bg-slate-100 flex flex-col gap-3 p-3 rounded-md shadow-md cursor-pointer`}
    >
      <h3 className='text-sm font-bold'>{title}</h3>
      <div className='text-xs text-slate-600 font-medium'>
        {subtasks.filter((item) => item.isCompleted).length} of{' '}
        {subtasks.length} subtasks
      </div>
    </div>
  );
};

export default TaskItem;
