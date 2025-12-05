import { Button } from "@/components/ui/button";
import { Trophy, Sparkles, RotateCcw, Play } from "lucide-react";

interface RoundTransitionScreenProps {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  onNextRound: () => void;
  onRestart: () => void;
  roundOneScores?: { teamA: number; teamB: number } | null;
  cumulativeScoreA?: number;
  cumulativeScoreB?: number;
}

const RoundTransitionScreen = ({
  teamAName,
  teamBName,
  teamAScore,
  teamBScore,
  onNextRound,
  onRestart,
  roundOneScores,
  cumulativeScoreA = 0,
  cumulativeScoreB = 0
}: RoundTransitionScreenProps) => {
  const winner = teamAScore > teamBScore ? "A" : teamBScore > teamAScore ? "B" : "tie";
  const winnerName = winner === "A" ? teamAName : winner === "B" ? teamBName : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative z-10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${Math.random() * 15 + 8}px`,
              height: `${Math.random() * 15 + 8}px`,
              background: `rgba(${Math.random() > 0.5 ? '255, 215, 0' : '128, 0, 128'}, ${Math.random() * 0.1 + 0.05})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in-up">
        {/* Trophy Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Trophy className="w-24 h-24 md:w-32 md:h-32 text-chemistry-gold animate-bounce-subtle" />
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-chemistry-gold absolute -top-3 -right-3 animate-pulse" />
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-chemistry-gold absolute -bottom-1 -left-1 animate-pulse" style={{
              animationDelay: "0.5s"
            }} />
          </div>
        </div>

        {/* Winner Celebration */}
        {winner !== "tie" ? (
          <div className="relative overflow-hidden rounded-3xl bg-card/40 backdrop-blur-lg p-6 md:p-8 border-2 border-chemistry-gold/50 shadow-2xl animate-fade-in-up">
            {/* Fireworks Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-firework"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 30}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <div className="relative w-2 h-2">
                    {[...Array(6)].map((_, j) => (
                      <div
                        key={j}
                        className="absolute w-1 h-1 rounded-full bg-chemistry-gold animate-sparkle"
                        style={{
                          transform: `rotate(${j * 60}deg) translateY(-25px)`,
                          animationDelay: `${i * 0.3 + 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-chemistry-gold">
                🎉 تهانينا للفائز بالجولة الأولى! 🎉
              </h2>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-chemistry-gold via-chemistry-purple to-chemistry-green bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] py-2 md:py-3">
                {winnerName}
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                مع {winner === "A" ? teamAScore : teamBScore} نقطة
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-chemistry-purple/20 to-chemistry-green/20 rounded-3xl p-6 md:p-8 border-2 border-chemistry-gold/50 shadow-2xl animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-chemistry-gold mb-3 md:mb-4">
              🤝 تعادل مثير في الجولة الأولى!
            </h2>
            <p className="text-xl md:text-2xl text-white/90">
              أداء استثنائي من الفريقين! استعدوا للجولة الثانية
            </p>
          </div>
        )}

        {/* Round 1 Results */}
        <div className="space-y-6">
          <div className="relative">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-teamA/10 via-chemistry-gold/20 to-teamB/10 blur-2xl animate-pulse-slow" />
            
            <div className="relative space-y-6 bg-card/40 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-chemistry-gold/30 shadow-2xl animate-fade-in-up animation-delay-200">
              <div className="flex justify-center items-center gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-teamA/30 border-4 border-teamA animate-pulse-subtle" style={{animationDelay: "0s"}} />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teamA via-chemistry-gold to-teamB bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] py-2 md:py-3 overflow-visible">
                  🎉 نهاية الجولة الأولى!
                </h1>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-teamB/30 border-4 border-teamB animate-pulse-subtle" style={{animationDelay: "0.5s"}} />
              </div>
              
              <div className="bg-card/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  الجولة الثانية
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                  استعدوا لأسئلة أكثر تحدياً 🚀
                </p>
                <p className="text-base md:text-lg text-foreground mt-4">
                  ⚠️ ملاحظة: جميع وسائل المساعدة تمت إعادة تنشيطها للجولة الثانية
                </p>
                {/* Cumulative Score Display */}
                <div className="mt-6 p-4 bg-chemistry-gold/10 rounded-xl border border-chemistry-gold/30 animate-fade-in animation-delay-300">
                  <h3 className="text-lg md:text-xl font-bold text-chemistry-gold mb-2">النقاط التراكمية حتى الآن:</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-teamA shadow-lg shadow-teamA/50" />
                      <span className="font-bold">{teamAName}:</span>
                    </div>
                    <span className="text-2xl font-bold text-teamA">{cumulativeScoreA}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-teamB shadow-lg shadow-teamB/50" />
                      <span className="font-bold">{teamBName}:</span>
                    </div>
                    <span className="text-2xl font-bold text-teamB">{cumulativeScoreB}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:mt-12 animate-fade-in-up animation-delay-400">
          <div className={`bg-card/50 backdrop-blur-sm border-2 rounded-3xl p-6 md:p-8 transition-all duration-500 ${winner === "A" ? "border-teamA shadow-2xl shadow-teamA/50 scale-105" : "border-border"}`}>
            <div className="space-y-3">
              {winner === "A" && <Trophy className="w-10 h-10 md:w-12 md:h-12 text-chemistry-gold mx-auto mb-4 animate-bounce-subtle" />}
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-teamA shadow-lg shadow-teamA/50" />
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">{teamAName}</h3>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-teamA">{teamAScore}</div>
              <div className="text-base md:text-lg text-muted-foreground">نقطة</div>
            </div>
          </div>

          <div className={`bg-card/50 backdrop-blur-sm border-2 rounded-3xl p-6 md:p-8 transition-all duration-500 ${winner === "B" ? "border-teamB shadow-2xl shadow-teamB/50 scale-105" : "border-border"}`}>
            <div className="space-y-3">
              {winner === "B" && <Trophy className="w-10 h-10 md:w-12 md:h-12 text-chemistry-gold mx-auto mb-4 animate-bounce-subtle" />}
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-teamB shadow-lg shadow-teamB/50" />
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">{teamBName}</h3>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-teamB">{teamBScore}</div>
              <div className="text-base md:text-lg text-muted-foreground">نقطة</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mt-8 md:mt-12 animate-fade-in-up animation-delay-600">
          <Button 
            onClick={onNextRound} 
            size="lg" 
            className="text-xl md:text-2xl px-8 md:px-12 py-6 md:py-8 bg-gradient-to-r from-chemistry-gold to-chemistry-purple hover:from-chemistry-gold/90 hover:to-chemistry-purple/90 shadow-lg transition-all duration-300 hover:scale-105 gap-3 rounded-2xl"
          >
            <Play className="w-5 h-5 md:w-6 md:h-6" />
            الجولة الثانية
          </Button>
          
          <Button 
            onClick={onRestart} 
            size="lg" 
            variant="outline"
            className="text-xl md:text-2xl px-8 md:px-12 py-6 md:py-8 border-chemistry-green text-chemistry-green hover:bg-chemistry-green/10 shadow-lg transition-all duration-300 hover:scale-105 gap-3 rounded-2xl"
          >
            <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
            إعادة اللعبة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoundTransitionScreen;