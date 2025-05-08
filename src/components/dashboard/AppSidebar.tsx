'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../ui/sidebar';
import DarkLogo from '@/assets/logo-dark.svg';
import LightLogo from '@/assets/logo-light.svg';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '@/contexts/BoardContext';
import { ArrowRight, CircuitBoard, Plus } from 'lucide-react';
import Link from 'next/link';

interface boardType {
  _id: string;
  name: string;
  columns: string[];
}

const AppSidebar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const {
    setBoardName,
    openBoard,
    setOpenBoard,
    createBoard,
    setCreateBoard,
    setCreateColumn,
    setOpenTask,
    boards
  } = useContext(BoardContext);
  const handleOpenBoard = (id: string, name: string) => {
    setCreateBoard(false);
    setOpenTask(false);
    setCreateColumn(false);
    setOpenBoard(id);
    setBoardName(name);
  };

  console.log(boards);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until the component has mounted to prevent hydration mismatches.
  if (!mounted) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarHeader className='justify-center mb-4'>
        <Image
          src={theme === 'light' ? DarkLogo : LightLogo}
          alt='Logo'
          priority
          width={20}
          height={20}
          className='w-44 h-8'
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className='space-y-4'>
          <SidebarGroupLabel className='text-lg tracking-widest uppercase'>
            All Board {`(${projects.boards.length})`}
          </SidebarGroupLabel>
          <SidebarGroupContent className='justify-between'>
            <SidebarMenu>
              {boards.map((board: boardType) => (
                <SidebarMenuItem key={board._id}>
                  <SidebarMenuButton
                    className={`hover:bg-indigo-400 hover:text-primary-foreground ${
                      openBoard === board._id
                        ? 'bg-indigo-400 text-primary-foreground'
                        : ''
                    }`}
                    onClick={() => handleOpenBoard(board._id, board.name)}
                    asChild
                  >
                    <Link
                      href={`/dashboard/${board._id}`}
                      className='flex items-center justify-between gap-2'
                    >
                      <div className='flex items-center gap-2'>
                        <CircuitBoard />
                        <span>{board.name}</span>
                      </div>
                      <ArrowRight />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  className='hover:text-indigo-400 cursor-pointer'
                  onClick={() => setCreateBoard(!createBoard)}
                  asChild
                >
                  <Link href={'/dashboard'}>
                    <Plus /> <span>Create A New Board</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
