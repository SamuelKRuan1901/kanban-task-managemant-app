'use server';

import BoardClientComponent from '@/components/dashboard/BoardClientComponent';

interface BoardPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] }>;
}
const BoardSinglePage = async ({ params }: BoardPageProps) => {
  const { slug } = (await params) as { slug: string };

  return (
    <>
      <BoardClientComponent slug={slug} />
    </>
  );
};

export default BoardSinglePage;
