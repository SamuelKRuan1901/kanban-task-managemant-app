'use client';
import { useState, useRef, type KeyboardEvent, type ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';

interface SubTaskInputProps {
  placeholder?: string;
  onChange?: (tags: string[]) => void;
  className?: string;
  tagValue?: string[];
}

export default function SubTaskInput({
  placeholder = '',
  onChange,
  className = '',
  tagValue = []
}: SubTaskInputProps) {
  const [subtasks, setSubtasks] = useState<string[]>(tagValue);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '' && subtasks.length > 0) {
      // Remove the last subtask when backspace is pressed and input is empty
      const newSubtasks = [...subtasks.slice(0, -1)];
      setSubtasks(newSubtasks);
      if (onChange) onChange(newSubtasks);
      return;
    }

    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addSubtask(inputValue.trim());
    }
  };

  const addSubtask = (subtask: string) => {
    if (subtask && !subtasks.includes(subtask)) {
      const newTags = [...subtasks, subtask];
      setSubtasks(newTags);
      setInputValue('');
      if (onChange) onChange(newTags);
    }
  };

  const removeSubtask = (indexToRemove: number) => {
    const newSubtask = subtasks.filter((_, index) => index !== indexToRemove);
    setSubtasks(newSubtask);
    if (onChange) onChange(newSubtask);
  };

  const clearAll = () => {
    setSubtasks([]);
    setInputValue('');
    if (onChange) onChange([]);
    inputRef.current?.focus();
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={`flex items-center flex-wrap py-1.5 gap-2 ${className}`}
      onClick={focusInput}
    >
      {subtasks.map((subtask, index) => (
        <div
          key={index}
          className='w-full flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-2  py-0.5 text-md'
        >
          <span>{subtask}</span>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              removeSubtask(index);
            }}
            className='ml-1 text-gray-500 hover:text-gray-700'
            aria-label={`Remove ${subtask}`}
          >
            <X className='h-5 w-5 cursor-pointer' />
          </button>
        </div>
      ))}
      <div className='flex-1 flex items-center gap-2'>
        <Input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={subtasks.length === 0 ? placeholder : ''}
          className='flex-1 outline-none bg-transparent text-sm min-w-[50px] rounded-[2px] px-3 py-2'
          aria-label='Add subtasks'
        />
        {(subtasks.length > 0 || inputValue) && (
          <button
            type='button'
            onClick={clearAll}
            className='ml-auto text-gray-400 hover:text-gray-600'
            aria-label='Clear all tags'
          >
            clear all
          </button>
        )}
      </div>
    </div>
  );
}
