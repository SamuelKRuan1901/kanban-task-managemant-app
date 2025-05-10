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
import { BoardSchema } from '@/schema';
import { BoardContext } from '@/contexts/BoardContext';
import { useContext } from 'react';
import MultiplyValueInput from './MultiplyValueInput';

const BoardForm = ({
  name = '',
  columns = [],
  slug = ''
}: {
  name: string;
  columns: string[];
  slug: string;
}) => {
  const { setCreateBoard, getBoard } = useContext(BoardContext);
  const form = useForm<z.infer<typeof BoardSchema>>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      boardName: name,
      boardColumn: columns
    }
  });

  const onSubmit = async (data: z.infer<typeof BoardSchema>) => {
    try {
      if (slug) {
        console.log(data, slug);
        const res = await fetch('/api/board', {
          method: 'PATCH',
          body: JSON.stringify({ data, slug })
        });
        console.log(res);
        await getBoard();
        return;
      }
      const res = await fetch('/api/board', {
        method: 'POST',
        body: JSON.stringify({
          boardName: data.boardName,
          columns: data.boardColumn
        })
      });
      console.log(res);
      await getBoard();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='absolute top-0 left-0 w-full h-full bg-slate-500/50 flex items-center justify-center'>
      <Card className='w-96 max-md:w-80 rounded-md'>
        <CardHeader>
          <CardTitle>{slug ? 'Edit Board' : 'Add New Board'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='boardName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Board Name</FormLabel>
                    <FormControl>
                      <Input
                        className='rounded-none'
                        placeholder='Enter board name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='boardColumn'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Board Column</FormLabel>
                    <FormControl>
                      <MultiplyValueInput
                        {...field}
                        onChange={field.onChange}
                        initialValues={field.value}
                        buttonDefaultContent='Add New Column'
                        buttonDynamicContent='Add Another Column'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={'default'}
                className='w-full rounded-full cursor-pointer bg-indigo-400 hover:bg-indigo-400/50 text-md font-bold'
                type='submit'
              >
                {slug ? 'Save Edit' : 'Create New Board'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            variant={'outline'}
            className='w-full rounded-full cursor-pointer'
            onClick={() => setCreateBoard(false)}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BoardForm;
