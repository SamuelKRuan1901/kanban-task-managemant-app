import { z } from 'zod';

export const BoardSchema = z.object({
  boardName: z.string().min(2, {
    message: 'Board name must be at least 2 characters.'
  }),
  boardColumn: z.array(z.string())
});

export const ColumnSchema = z.object({
  columnName: z.string().min(2, {
    message: 'Column name must be at least 2 characters.'
  })
});

export const TaskSchema = z.object({
  boardId: z.string(),
  taskTitle: z.string().min(2, {
    message: 'Task title must be at least 2 characters.'
  }),
  desc: z.string().min(2, {
    message: 'description must be at least 2 characters.'
  }),
  subtasks: z.array(z.string()),
  status: z.string()
});

export const TaskSubtaskSchema = z.object({
  subtasks: z.array(z.string()).optional(),
  status: z.string()
});
