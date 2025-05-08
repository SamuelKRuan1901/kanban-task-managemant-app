'use client';
import Image from 'next/image';
import Logo from '@/assets/logo-mobile.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useContext } from 'react';
import { BoardContext } from '@/contexts/BoardContext';
import BoardForm from '@/components/dashboard/BoardForm';

const DashboardPage = () => {
  const { createBoard, setCreateBoard } = useContext(BoardContext);
  return (
    <div className='w-full h-full flex flex-col items-center justify-center space-y-14'>
      <Image
        src={Logo}
        alt='Logo'
        width={96}
        height={96}
        className='w-24 h-24'
      />
      <h1 className='text-3xl max-md:text-2xl text-center'>
        Add A New Project Board Manager.
      </h1>
      <Button
        className='flex items-center rounded-full'
        size={'lg'}
        variant={'default'}
        onClick={() => setCreateBoard(true)}
        asChild
      >
        <Link href='/dashboard' className='flex items-center gap-2'>
          <Plus />
          <span>Add A New Board</span>
        </Link>
      </Button>
      {createBoard === true && <BoardForm />}
    </div>
  );
};

export default DashboardPage;
