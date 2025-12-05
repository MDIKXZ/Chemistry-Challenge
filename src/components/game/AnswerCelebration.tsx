import { useEffect } from "react";

interface AnswerCelebrationProps {
  team: "A" | "B" | "none";
  onClose: () => void;
}

const AnswerCelebration = ({ team, onClose }: AnswerCelebrationProps) => {
  useEffect(() => {
    if (team === "none") {
      onClose();
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [team, onClose]);

  if (team === "none") {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="relative">
        {/* Celebration particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 rounded-full animate-firework ${
                team === "A" ? "bg-teamA" : "bg-teamB"
              }`}
              style={{
                left: "50%",
                top: "50%",
                animationDelay: `${i * 0.05}s`,
                transform: `translate(-50%, -50%) rotate(${i * 12}deg) translateY(-30px)`,
              }}
            />
          ))}
        </div>

        {/* Celebration text */}
        <div className={`text-5xl font-bold animate-bounce-subtle ${
          team === "A" ? "text-teamA" : "text-teamB"
        }`}>
          {team === "A" ? "صحيح!" : "ممتاز!"}
        </div>
      </div>
    </div>
  );
};

export default AnswerCelebration;