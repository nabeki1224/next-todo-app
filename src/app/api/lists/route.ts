import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
  const lists = await prisma.list.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(lists)
}

export async function POST(req: Request){
  const body = await req.json();
  const { title } = body;

  if(!title || typeof title !== 'string'){
    return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
  }

  const newList = await prisma.list.create({
    data: {
      title,
    },
  })

  return NextResponse.json(newList)
}

