'use server';

import TaskClientComponent from '@/components/dashboard/TaskClientComponent';

interface TaskPageProps {
  params: Promise<{ slug: string; task: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] }>;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { slug, task } = await params;

  return (
    <>
      <TaskClientComponent slug={slug} task={task} />
    </>
  );
}
