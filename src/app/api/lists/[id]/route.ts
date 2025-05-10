import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const id = Number(context.params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  await prisma.list.delete({
    where: { id },
  })

  return NextResponse.json({ message: 'Deleted' })
}

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const id = Number(context.params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const { completed } = await req.json()

  const updated = await prisma.list.update({
    where: { id },
    data: { completed },
  })

  return NextResponse.json(updated)
}
