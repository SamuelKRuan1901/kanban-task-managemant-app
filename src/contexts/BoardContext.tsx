'use client';
import { projects } from '@/lib/data';
import { taskType } from '@/lib/types';
import React, { createContext, useEffect, useState } from 'react';

interface BoardContextProps {
  boardName: string;
  setBoardName: React.Dispatch<React.SetStateAction<string>>;
  openBoard: string;
  setOpenBoard: React.Dispatch<React.SetStateAction<string>>;
  createBoard: boolean;
  setCreateBoard: React.Dispatch<React.SetStateAction<boolean>>;
  createColumn: boolean;
  setCreateColumn: React.Dispatch<React.SetStateAction<boolean>>;
  createTask: boolean;
  setCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
  openTask: boolean;
  setOpenTask: React.Dispatch<React.SetStateAction<boolean>>;
  taskData: taskType;
  setTaskData: React.Dispatch<React.SetStateAction<taskType>>;
  boards: boardType[];
  setBoards: React.Dispatch<React.SetStateAction<boardType[]>>;
  tasks: taskType[];
  setTasks: React.Dispatch<React.SetStateAction<taskType[]>>;
  slug: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  getBoard: () => Promise<void>;
  getTasks: () => Promise<void>;
}

export interface boardType {
  find(arg0: (board: { _id: string }) => boolean): unknown;
  filter(arg0: (board: { _id: string }) => boolean): unknown;
  map(arg0: (board: boardType) => React.JSX.Element): React.ReactNode;
  _id: string;
  name: string;
  columns: string[];
}

export const BoardContext = createContext<BoardContextProps>(
  {} as BoardContextProps
);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [boardName, setBoardName] = useState<string>(
    projects.boards[0].name as string
  );
  const [openBoard, setOpenBoard] = useState<string>('');
  const [createBoard, setCreateBoard] = useState<boolean>(false);
  const [createColumn, setCreateColumn] = useState<boolean>(false);
  const [createTask, setCreateTask] = useState<boolean>(false);
  const [openTask, setOpenTask] = useState<boolean>(true);
  const [taskData, setTaskData] = useState<taskType>({} as taskType);
  const [boards, setBoards] = useState<boardType[]>([] as boardType[]);
  const [tasks, setTasks] = useState<taskType[]>([] as taskType[]);
  const [slug, setSlug] = useState<string>('');

  const getBoard = async () => {
    try {
      await fetch('/api/board', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          const isArrayData = Array.isArray(data) ? data : [];
          setBoards(isArrayData as unknown as boardType[]);
        })
        .catch((err) => console.log(err));
      setCreateBoard(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    await fetch('/api/task', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const isArrayData = Array.isArray(data) ? data : [];
        setTasks(isArrayData as unknown as taskType[]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBoard();
    getTasks();
  }, []);

  const values = {
    boardName,
    setBoardName,
    openBoard,
    setOpenBoard,
    createBoard,
    setCreateBoard,
    createColumn,
    setCreateColumn,
    createTask,
    setCreateTask,
    openTask,
    setOpenTask,
    taskData,
    setTaskData,
    boards,
    setBoards,
    tasks,
    setTasks,
    getBoard,
    getTasks,
    slug,
    setSlug
  };
  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
};
