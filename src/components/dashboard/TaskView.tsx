'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { TaskSubtaskSchema } from '@/schema';
import { EllipsisVertical } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { taskType } from '@/lib/types';
import { useContext, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { BoardContext } from '@/contexts/BoardContext';

const TaskView = ({
  chosenTask,
  statuses,
  slug,
  taskId
}: {
  chosenTask: taskType;
  statuses: string[];
  slug: string;
  taskId: string;
}) => {
  const { getTasks } = useContext(BoardContext);
  const chosenTaskSubtasks = chosenTask?.subtasks || [];
  const chosenTaskStatus = chosenTask?.status || '';

  const form = useForm<z.infer<typeof TaskSubtaskSchema>>({
    resolver: zodResolver(TaskSubtaskSchema),
    defaultValues: {
      subtasks: chosenTaskSubtasks
        .filter((item) => item.isCompleted === true)
        .map((item) => item._id) as string[],
      status: chosenTaskStatus
    }
  });

  async function onSubmit(data: z.infer<typeof TaskSubtaskSchema>) {
    const formData = new FormData();
    formData.append('subtasks', JSON.stringify(data.subtasks));
    formData.append('status', data.status);
    formData.append('taskId', taskId);
    formData.append('slug', slug);
    try {
      await fetch('/api/task', {
        method: 'PATCH',
        body: JSON.stringify({ data, taskId, slug })
      });
      await getTasks();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (chosenTask?.subtasks) {
      form.reset({
        subtasks: chosenTask.subtasks
          .filter((item) => item.isCompleted)
          .map((item) => item._id)
      });
    }
    if (chosenTask?.status) {
      form.setValue('status', chosenTask.status);
    }
  }, [chosenTask, form]);

  return (
    <div className='w-full h-full bg-slate-500/50 absolute top-0 right-0 flex items-center justify-center'>
      <Card className='w-96'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>{chosenTask?.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'ghost'}
                  className='p-0 cursor-pointer'
                  asChild
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuCheckboxItem className='cursor-pointer font-semibold'>
                  Edit Task
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className='cursor-pointer text-red-500 font-semibold'>
                  Delete Task
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className='text-muted-foreground text-xs'>
            {chosenTask?.description}
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='subtasks'
                render={() => (
                  <FormItem>
                    <div className='mb-4'>
                      <FormLabel className='text-base'>
                        Subtasks{' '}
                        {`(${
                          chosenTaskSubtasks.filter((item) => item.isCompleted)
                            .length
                        } of ${chosenTaskSubtasks.length})`}
                      </FormLabel>
                    </div>
                    {chosenTaskSubtasks.map((item) => (
                      <FormField
                        key={item._id}
                        control={form.control}
                        name='subtasks'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item._id}
                              className='flex flex-row items-center justify-start space-x-3 space-y-0 bg-slate-800 p-2'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item._id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value as string[]),
                                          item._id
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) =>
                                              value !== (item._id as string)
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='text-sm font-normal'>
                                {item.title}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
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
                        {statuses.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className='w-full rounded-full cursor-pointer'
                type='submit'
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            variant={'outline'}
            className='w-full rounded-full cursor-pointer'
            onClick={() => redirect(`/dashboard/${slug}`)}
          >
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskView;
