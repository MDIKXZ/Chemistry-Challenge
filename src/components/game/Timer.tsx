import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  duration: number;
  isPaused: boolean;
  onEnd: () => void;
  team: "A" | "B";
  variant?: "default" | "teacher";
}

const Timer = ({ duration, isPaused, onEnd, team, variant = "default" }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused, onEnd]);

  const percentage = (timeLeft / duration) * 100;
  const isLowTime = timeLeft <= 10;
  const isTeacher = variant === "teacher";

  return (
    <div className="space-y-3">
      <div className={`flex items-center justify-center gap-3 ${isLowTime ? "animate-pulse" : ""}`}>
        <Clock className={`w-8 h-8 ${
          isTeacher ? "text-chemistry-gold" : team === "A" ? "text-teamA" : "text-teamB"
        }`} />
        <span className={`text-5xl font-bold ${
          isTeacher ? "text-chemistry-gold" : team === "A" ? "text-teamA" : "text-teamB"
        } ${isLowTime ? "text-destructive" : ""}`}>
          {timeLeft}
        </span>
        <span className="text-2xl text-muted-foreground">ثانية</span>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            isTeacher ? "bg-chemistry-gold" : team === "A" ? "bg-teamA" : "bg-teamB"
          } ${isLowTime ? "bg-destructive" : ""}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
