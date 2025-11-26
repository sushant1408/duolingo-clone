import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { lessonId } = await params;

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId as unknown as number),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { lessonId } = await params;

  const body = await req.json();
  const data = await db
    .update(lessons)
    .set({
      ...body,
    })
    .where(eq(lessons.id, lessonId as unknown as number))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { lessonId } = await params;

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, lessonId as unknown as number))
    .returning();

  return NextResponse.json(data[0]);
};
