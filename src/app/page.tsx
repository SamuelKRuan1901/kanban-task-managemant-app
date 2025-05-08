import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/assets/logo-mobile.svg';
import Image from 'next/image';
// import BoardForm from '@/components/dashboard/BoardForm';

export default function Home() {
  return (
    <div className='w-screen h-screen flex flex-col gap-5 justify-center items-center relative'>
      <Image
        src={Logo}
        alt='Logo'
        priority
        width={32}
        height={32}
        className='w-12 h-12'
      />
      <h1 className='text-3xl max-md:text-2xl text-center'>
        Welcome to Kanban task management
      </h1>
      <Button size={'lg'} variant={'default'} asChild>
        <Link href='/dashboard'>Get Start</Link>
      </Button>
    </div>
  );
}
