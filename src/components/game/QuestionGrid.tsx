import { Button } from "@/components/ui/button";
import { Question } from "./GameBoard";

interface QuestionGridProps {
  questions: Question[];
  onQuestionSelect: (question: Question) => void;
}

const QuestionGrid = ({ questions, onQuestionSelect }: QuestionGridProps) => {
  const pointLevels = [200, 400, 600];

  return (
    <div className="space-y-4">
      {pointLevels.map((points) => (
        <div key={points} className="grid grid-cols-4 gap-4">
          {questions
            .filter((q) => q.points === points)
            .map((question) => (
              <Button
                key={question.id}
                onClick={() => onQuestionSelect(question)}
                disabled={question.answered}
                className={`h-32 text-2xl font-bold rounded-2xl transition-all duration-500 ${
                  question.answered
                    ? "bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50 scale-95"
                    : points === 200
                    ? "bg-gradient-to-br from-chemistry-green/90 via-chemistry-green to-chemistry-green/80 hover:from-chemistry-green hover:via-chemistry-green/95 hover:to-chemistry-green/90 shadow-xl hover:shadow-chemistry-green/60 hover:scale-[1.08] hover:-translate-y-1 animate-pulse-subtle"
                    : points === 400
                    ? "bg-gradient-to-br from-chemistry-purple/90 via-chemistry-purple to-chemistry-purple/80 hover:from-chemistry-purple hover:via-chemistry-purple/95 hover:to-chemistry-purple/90 shadow-xl hover:shadow-chemistry-purple/60 hover:scale-[1.08] hover:-translate-y-1 animate-pulse-subtle"
                    : "bg-gradient-to-br from-chemistry-gold/90 via-chemistry-gold to-chemistry-gold/80 hover:from-chemistry-gold hover:via-chemistry-gold/95 hover:to-chemistry-gold/90 shadow-xl hover:shadow-chemistry-gold/60 hover:scale-[1.08] hover:-translate-y-1 animate-pulse-subtle"
                } border-2 border-white/10 hover:border-white/20`}
              >
                {question.answered ? "✓" : `${points}`}
              </Button>
            ))}
        </div>
      ))}
    </div>
  );
};

export default QuestionGrid;
