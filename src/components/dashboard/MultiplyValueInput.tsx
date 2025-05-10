'use client';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MultiplyValueInputProps {
  initialValues?: string[];
  onChange?: (values: string[]) => void;
  buttonDefaultContent?: string;
  buttonDynamicContent?: string;
}

export default function MultiplyValueInput({
  initialValues = [''],
  onChange,
  buttonDefaultContent,
  buttonDynamicContent
}: MultiplyValueInputProps) {
  const [values, setValues] = useState<string[]>(initialValues);

  const handleAddValue = () => {
    setValues([...values, '']);
    if (onChange) onChange([...values, '']);
  };

  const handleRemoveValue = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
    if (onChange) onChange(newValues);
  };

  const handleValuesChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    if (onChange) onChange(newValues);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-2'>
        {values.map((item, index) => (
          <div key={index} className='flex items-center gap-2'>
            <Input
              value={item}
              onChange={(e) => handleValuesChange(index, e.target.value)}
              placeholder={`e.g. ${index === 0 ? 'Todo' : 'Doing'}`}
              className='flex-1'
            />
            <button
              type='button'
              onClick={() => handleRemoveValue(index)}
              className='text-gray-400 hover:text-gray-600'
              aria-label='Remove subtask'
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
      <Button
        type='button'
        variant='secondary'
        className='w-full text-indigo-500 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-600'
        onClick={handleAddValue}
      >
        <Plus />{' '}
        {values.length >= 1
          ? `${buttonDynamicContent}`
          : `${buttonDefaultContent}`}
      </Button>
    </div>
  );
}
