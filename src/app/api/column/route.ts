import { connectDB } from '@/lib/connectDB';
import { Board } from '@/lib/models';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const slug = body.slug;
  const columns = body.data.columnName;
  const checkedColumn = columns
    .filter((item: string) => item !== '')
    .map((item: string) => item.toUpperCase());
  console.log(slug, checkedColumn);
  await connectDB();
  try {
    const board = await Board.findOne({ _id: slug }).exec();
    if (!board)
      return Response.json({ status: 404, message: 'Board not found' });
    const updatedColumns = [
      ...board.columns,
      ...checkedColumn.filter((item: string) => !board.columns.includes(item))
    ];
    await Board.updateOne({ _id: slug }, { columns: updatedColumns });
    return Response.json({ body });
  } catch (error) {
    return Response.json({ error });
  }
}
