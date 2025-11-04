import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db/drizzle";
import type { Courses } from "@/db/schema";
import { courses, userProgress } from "@/db/schema";

const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

const getCourseById = cache(async (courseId: Courses["id"]) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  return data;
});

export { getCourses, getCourseById, getUserProgress };
