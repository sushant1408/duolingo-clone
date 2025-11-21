"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Confetti from "react-confetti";
import { useAudio, useWindowSize } from "react-use";
import { toast } from "sonner";

import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";
import { Challenge } from "@/app/lesson/_components/challenge";
import { Footer } from "@/app/lesson/_components/footer";
import { Header } from "@/app/lesson/_components/header";
import { QuestionBubble } from "@/app/lesson/_components/question-bubble";
import { ResultCard } from "@/app/lesson/_components/result-card";
import { MAX_HEARTS } from "@/config/constants";
import type {
  ChallengeOptions,
  Challenges,
  Lessons,
  UserProgress,
} from "@/db/schema";

interface QuizProps {
  initialLessonId: Lessons["id"];
  initialLessonChallenges: (Challenges & {
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
  initialLessonChallenges,
  userSubscription,
}: QuizProps) => {
  const { width, height } = useWindowSize();

  const router = useRouter();

  const [pending, startTransition] = useTransition();
  const [correctAudio, _correctState, correctControls] = useAudio({
    src: "/correct.wav",
  });
  const [incorrectAudio, _incorrectState, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const [finishAudio] = useAudio({
    src: "/finish.mp3",
    autoPlay: true,
  });

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [lessonId] = useState(initialLessonId);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [selectedOption, setSelectedOption] =
    useState<ChallengeOptions["id"]>();

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions || [];

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10_000}
          width={width}
          height={height}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/finish.svg"
            alt="finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/finish.svg"
            alt="finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          status="completed"
          lessonId={lessonId}
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  const onSelect = (id: ChallengeOptions["id"]) => {
    if (status !== "none") {
      return;
    }

    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) {
      return;
    }

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // this is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, MAX_HEARTS));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    } else {
      reduceHearts(challenge.id)
        .then((response) => {
          if (response?.error === "hearts") {
            return;
          }

          incorrectControls.play();
          setStatus("wrong");

          if (!response?.error) {
            setHearts((prev) => Math.max(prev - 1, 0));
          }
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    }
  };

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export { Quiz };
