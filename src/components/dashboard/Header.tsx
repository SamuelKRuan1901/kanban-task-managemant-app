'use client';
import Image from 'next/image';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import Logo from '@/assets/logo-mobile.svg';
import { EllipsisVertical, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { ModeToggle } from './ModeToggle';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { BoardContext } from '@/contexts/BoardContext';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

const Header = () => {
  const { setCreateTask, createTask } = useContext(BoardContext);
  const { open } = useSidebar();
  const path = usePathname();
  const pathname = path.split('/')[path.split('/').length - 1];

  return (
    <header className='w-full h-16 flex items-center justify-between p-2 dark:bg-slate-900'>
      <div className='flex items-center justify-center gap-5'>
        <SidebarTrigger className='cursor-pointer hover:bg-gray-300 rounded-full dark:hover:bg-gray-600' />
        <div className='max-md:inline hidden'>
          <Image
            src={Logo}
            alt='Logo'
            width={24}
            height={24}
            className='w-8 h-8'
          />
        </div>
        <div className='max-md:hidden inline'>
          {open !== true && (
            <Image
              src={Logo}
              alt='Logo'
              width={24}
              height={24}
              className='w-8 h-8'
            />
          )}
        </div>
      </div>
      <div className='flex items-center justify-center gap-5'>
        <ModeToggle />
        <Button
          variant={'default'}
          className='cursor-pointer rounded-full font-semibold'
          disabled={pathname === 'dashboard' ? true : false}
          onClick={() => setCreateTask(!createTask)}
        >
          <Plus />
          <span>New Task</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className='p-0 cursor-pointer' asChild>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuCheckboxItem className='cursor-pointer font-semibold'>
              Edit Board
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className='cursor-pointer text-red-500 font-semibold'>
              Delete Board
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
