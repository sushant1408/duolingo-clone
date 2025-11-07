"use client";

import { useState } from "react";

import { Header } from "@/app/lesson/_components/header";
import type {
  ChallengeOptions,
  Challenges,
  Lessons,
  UserProgress,
} from "@/db/schema";

interface QuizProps {
  initialLessonId: Lessons["id"];
  lessonChallenges: (Challenges & {
    completed: boolean;
    challengeOptions: ChallengeOptions[];
  })[];
  initialHearts: UserProgress["hearts"];
  initialPercentage: number;
  userSubscription: null;
}

const Quiz = ({
  initialHearts,
  initialLessonId,
  initialPercentage,
  lessonChallenges,
  userSubscription,
}: QuizProps) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div></div>
    </>
  );
};

export { Quiz };
