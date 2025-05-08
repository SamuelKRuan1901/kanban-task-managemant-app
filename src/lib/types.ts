export interface subtaskType {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export interface taskType {
  _id: string;
  boardId: string;
  title: string;
  description: string;
  subtasks: {
    _id: string;
    title: string;
    isCompleted: boolean;
  }[];
  status: string;
}

export interface columnType {
  name: string;
  tasks: taskType[];
}

export interface boardType {
  _id: string;
  name: string;
  columns: string[];
}
