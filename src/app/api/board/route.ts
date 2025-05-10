import { connectDB } from '@/lib/connectDB';
import { Board, Task } from '@/lib/models';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { boardName, columns } = await req.json();
  const checkedColumns = columns.filter((item: string) => item !== '');
  const formedBoardName = boardName[0].toUpperCase() + boardName.slice(1);
  const formedColumns = checkedColumns.map((column: string) =>
    column.toUpperCase()
  );
  await connectDB();

  try {
    const newBoard = new Board({
      name: formedBoardName,
      columns: formedColumns
    });
    await newBoard.save();
  } catch (error) {
    return Response.json({ status: 500, error });
  }
  return Response.json({ status: 200 });
}

export async function GET() {
  await connectDB();
  const boards = await Board.find({}).exec();
  return Response.json(boards);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const slug = body.slug;
  const boardName = body.data.boardName;
  const columns = body.data.boardColumn;
  const checkedColumns = columns.filter((item: string) => item !== '');
  const formedBoardName = boardName[0].toUpperCase() + boardName.slice(1);
  const formedColumns = checkedColumns.map((column: string) =>
    column.toUpperCase()
  );
  console.log(slug, formedBoardName, formedColumns);
  await connectDB();
  try {
    await Board.updateOne(
      { _id: slug },
      { name: formedBoardName, columns: formedColumns }
    );
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500, error });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const slug = body.slug;
  await connectDB();
  try {
    await Board.deleteOne({ _id: slug });
    await Task.deleteMany({ boardId: slug });
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500, error });
  }
}
