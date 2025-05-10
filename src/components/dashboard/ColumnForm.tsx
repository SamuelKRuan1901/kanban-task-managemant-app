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
import { useForm } from 'react-hook-form';
import { ColumnSchema } from '@/schema';
import { BoardContext } from '@/contexts/BoardContext';
import { useContext } from 'react';
import MultiplyValueInput from './MultiplyValueInput';

const ColumnForm = () => {
  const { setCreateColumn, slug, getBoard } = useContext(BoardContext);
  const form = useForm<z.infer<typeof ColumnSchema>>({
    resolver: zodResolver(ColumnSchema),
    defaultValues: {
      columnName: []
    }
  });

  const onSubmit = async (data: z.infer<typeof ColumnSchema>) => {
    try {
      const res = await fetch('/api/column', {
        method: 'PATCH',
        body: JSON.stringify({ data, slug })
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
          <CardTitle>Add New Board</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='columnName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Column Name</FormLabel>
                    <FormControl>
                      <MultiplyValueInput
                        initialValues={field.value}
                        {...field}
                        onChange={field.onChange}
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
                Create New Column
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            variant={'outline'}
            className='w-full rounded-full cursor-pointer'
            onClick={() => setCreateColumn(false)}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ColumnForm;
