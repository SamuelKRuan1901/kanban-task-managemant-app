'use client';
import { useState, useRef, type KeyboardEvent, type ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';

interface TagInputProps {
  placeholder?: string;
  onChange?: (tags: string[]) => void;
  className?: string;
  tagValue?: string[];
}

export default function ColumnInput({
  placeholder = '',
  onChange,
  className = '',
  tagValue = []
}: TagInputProps) {
  const [columns, setColumns] = useState<string[]>(tagValue);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '' && columns.length > 0) {
      // Remove the last column when backspace is pressed and input is empty
      const newColumns = [...columns.slice(0, -1)];
      setColumns(newColumns);
      if (onChange) onChange(newColumns);
      return;
    }

    if (
      (e.key === 'Enter' ||
        e.key === 'Tab' ||
        e.key === ' ' ||
        e.key === ',') &&
      inputValue.trim()
    ) {
      e.preventDefault();
      addColumn(inputValue.trim());
    }
  };

  const addColumn = (column: string) => {
    if (column && !columns.includes(column)) {
      const newTags = [...columns, column];
      setColumns(newTags);
      setInputValue('');
      if (onChange) onChange(newTags);
    }
  };

  const removeColumn = (indexToRemove: number) => {
    const newColumn = columns.filter((_, index) => index !== indexToRemove);
    setColumns(newColumn);
    if (onChange) onChange(newColumn);
  };

  const clearAll = () => {
    setColumns([]);
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
      {columns.map((column, index) => (
        <div
          key={index}
          className='w-full flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-2  py-0.5 text-md'
        >
          <span>{column}</span>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              removeColumn(index);
            }}
            className='ml-1 text-gray-500 hover:text-gray-700'
            aria-label={`Remove ${column}`}
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
          placeholder={columns.length === 0 ? placeholder : ''}
          className='flex-1 outline-none bg-transparent text-sm min-w-[50px] rounded-[2px] px-3 py-2'
          aria-label='Add columns'
        />
        {(columns.length > 0 || inputValue) && (
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
