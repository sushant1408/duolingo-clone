import { redirect } from "next/navigation";

import { Quiz } from "@/app/lesson/_components/quiz";
import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";

interface LessonIdPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export default async function LessonIdPage({ params }: LessonIdPageProps) {
  const { lessonId } = await params;

  const lessonPromise = getLesson(parseInt(lessonId, 10));
  const userProgressPromise = getUserProgress();
  const userSubscriptionPromise = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonPromise,
    userProgressPromise,
    userSubscriptionPromise,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
}
