import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { TaskSchema } from '@/schema';
import { BoardContext, boardType } from '@/contexts/BoardContext';
import { useContext } from 'react';
import { Textarea } from '../ui/textarea';
import SubTaskInput from './SubTaskInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

const TaskForm = () => {
  const { setCreateTask, boards, slug } = useContext(BoardContext);
  const board = boards.find((board) => board._id === slug) as boardType;
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      boardId: slug,
      taskTitle: '',
      desc: '',
      subtasks: [],
      status: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    console.log(data);
    try {
      const res = await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-slate-500/50 flex items-center justify-center'>
      <Card className='w-96 max-md:w-80 rounded-md'>
        <CardHeader>
          <CardTitle>Add New Board</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='boardId'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} hidden />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='taskTitle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input
                        className='rounded-[2px]'
                        placeholder='e.g. Take coffee break'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='desc'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className='rounded-[2px]'
                        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='subtasks'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtasks</FormLabel>
                    <FormControl>
                      <SubTaskInput {...field} placeholder='e.g. Make coffee' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full rounded-xs'>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='w-full rounded-xs'>
                        {board.columns.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={'default'}
                className='w-full rounded-full cursor-pointer bg-indigo-400 hover:bg-indigo-400/50 text-md font-bold'
                type='submit'
              >
                Create New Board
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            variant={'outline'}
            className='w-full rounded-full cursor-pointer'
            onClick={() => setCreateTask(false)}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskForm;
