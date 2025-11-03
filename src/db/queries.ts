import { cache } from "react";

import { db } from "@/db/drizzle";

const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

export { getCourses };
