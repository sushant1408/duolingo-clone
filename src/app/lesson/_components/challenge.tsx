import { Card } from "@/app/lesson/_components/card";
import type { ChallengeOptions, Challenges } from "@/db/schema";
import { cn } from "@/lib/utils";

interface ChallengeProps {
  options: ChallengeOptions[];
  onSelect: (id: ChallengeOptions["id"]) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: ChallengeOptions["id"];
  disabled?: boolean;
  type: Challenges["type"];
}

const Challenge = ({
  disabled,
  onSelect,
  options,
  selectedOption,
  status,
  type,
}: ChallengeProps) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      )}
    >
      {options.map((option, index) => (
        <Card
          key={option.id}
          shortcut={`${index + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          disabled={disabled}
          type={type}
          {...option}
        />
      ))}
    </div>
  );
};

export { Challenge };
