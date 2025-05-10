import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Button } from '../ui/button';

const DeleteConfirmBox = ({
  title,
  desc,
  handleDelete,
  cancelClose
}: {
  title: string;
  desc: string;
  handleDelete: () => void;
  cancelClose: () => void;
}) => {
  return (
    <div className='absolute top-0 left-0 w-full h-screen bg-slate-500/50 flex items-center justify-center'>
      <Card className='w-96'>
        <CardHeader>
          <CardTitle className='text-red-300'>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>{desc}</p>
        </CardContent>
        <CardFooter className='flex justify-around'>
          <Button
            className='cursor-pointer rounded-full w-32'
            variant='destructive'
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            className='cursor-pointer rounded-full w-32'
            variant={'outline'}
            onClick={cancelClose}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteConfirmBox;
