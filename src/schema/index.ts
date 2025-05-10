import { z } from 'zod';

export const BoardSchema = z.object({
  boardName: z.string().min(2, {
    message: 'Board name must be at least 2 characters.'
  }),
  boardColumn: z.array(z.string())
});

export const ColumnSchema = z.object({
  columnName: z.array(z.string()).min(1, {
    message: 'Column name is required.'
  })
});

export const TaskSchema = z.object({
  boardId: z.string(),
  taskTitle: z.string().min(2, {
    message: 'Title is required.'
  }),
  desc: z.string().min(2, {
    message: 'description is required.'
  }),
  subtasks: z.array(z.string()),
  status: z.string().min(1, {
    message: 'Status is required.'
  })
});

export const TaskSubtaskSchema = z.object({
  subtasks: z.array(z.string()).optional(),
  status: z.string()
});
