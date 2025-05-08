import { connectDB } from '@/lib/connectDB';
import { Board } from '@/lib/models';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { boardName, columns } = await req.json();
  const formedBoardName = boardName[0].toUpperCase() + boardName.slice(1);
  const formedColumns = columns.map((column: string) => column.toUpperCase());
  console.log(formedBoardName, formedColumns);
  await connectDB();

  try {
    const newBoard = new Board({
      name: formedBoardName,
      columns: formedColumns
    });
    await newBoard.save();
  } catch (error) {
    return Response.json({ error });
  }
  return Response.json({ formedBoardName, formedColumns });
}

export async function GET() {
  await connectDB();
  const boards = await Board.find({}).exec();
  return Response.json(boards);
}
