import { taskType } from '@/lib/types';
const ColumnItem = ({
  children,
  columnName,
  tasks
}: {
  children?: React.ReactNode;
  columnName: string;
  tasks: taskType[];
}) => {
  return (
    <div className=' flex flex-col gap-5 w-60'>
      <div className={`font-semibold `}>
        {columnName} ({tasks.length})
      </div>
      {children}
    </div>
  );
};

export default ColumnItem;
