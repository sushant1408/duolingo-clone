import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { courseId } = await params;

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId as unknown as number),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { courseId } = await params;

  const body = await req.json();
  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, courseId as unknown as number))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { courseId } = await params;

  const data = await db
    .delete(courses)
    .where(eq(courses.id, courseId as unknown as number))
    .returning();

  return NextResponse.json(data[0]);
};
