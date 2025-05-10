'use client';
const ColumnItem = ({
  children,
  columnName
}: {
  children?: React.ReactNode;
  columnName: string;
}) => {
  return (
    <div className=' flex flex-col gap-5 w-60'>
      <div className={`font-semibold `}>{columnName}</div>
      {children}
    </div>
  );
};

export default ColumnItem;
