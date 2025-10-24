import { Button } from "@/components/ui/button";
import { Trophy, Sparkles, RotateCcw } from "lucide-react";
interface ResultsScreenProps {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  onRestart: () => void;
}
const ResultsScreen = ({
  teamAName,
  teamBName,
  teamAScore,
  teamBScore,
  onRestart
}: ResultsScreenProps) => {
  const winner = teamAScore > teamBScore ? "A" : teamBScore > teamAScore ? "B" : "tie";
  const winnerName = winner === "A" ? teamAName : winner === "B" ? teamBName : null;
  return <div className="min-h-screen flex items-center justify-center p-8 relative z-10">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
        {/* Trophy Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Trophy className="w-32 h-32 text-chemistry-gold animate-float" />
            <Sparkles className="w-16 h-16 text-chemistry-gold absolute -top-4 -right-4 animate-pulse" />
            <Sparkles className="w-12 h-12 text-chemistry-gold absolute -bottom-2 -left-2 animate-pulse" style={{
            animationDelay: "0.5s"
          }} />
          </div>
        </div>

        {/* Winner Announcement */}
        <div className="space-y-6">
          {winner === "tie" ? (
            <div className="relative">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teamA/20 via-chemistry-gold/30 to-teamB/20 blur-3xl animate-pulse" />
              
              <div className="relative space-y-6">
                <div className="flex justify-center items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-teamA/30 border-4 border-teamA animate-pulse" style={{animationDelay: "0s"}} />
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-teamA via-chemistry-gold to-teamB bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] py-3 overflow-visible">
                    🤝 تعادل مثير!
                  </h1>
                  <div className="w-20 h-20 rounded-full bg-teamB/30 border-4 border-teamB animate-pulse" style={{animationDelay: "0.5s"}} />
                </div>
                
                <div className="bg-card/60 backdrop-blur-md border-2 border-chemistry-gold/30 rounded-3xl p-8 shadow-2xl">
                  <p className="text-3xl font-bold text-foreground mb-3">
                    أداء استثنائي من الفريقين! 🎉
                  </p>
                  <p className="text-xl text-muted-foreground">
                    المنافسة الشريفة هي روح الرياضة
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Winner Celebration */}
              <div className="relative">
                {/* Fireworks Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-firework"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${10 + Math.random() * 30}%`,
                        animationDelay: `${i * 0.4}s`,
                      }}
                    >
                      <div className="relative w-2 h-2">
                        {[...Array(8)].map((_, j) => (
                          <div
                            key={j}
                            className="absolute w-1 h-1 rounded-full bg-chemistry-gold animate-sparkle"
                            style={{
                              transform: `rotate(${j * 45}deg) translateY(-20px)`,
                              animationDelay: `${i * 0.4 + 0.2}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Winner Text */}
                <div className="overflow-visible space-y-6 relative z-10">
                  <div className="space-y-4">
                    <h1 className="font-bold bg-gradient-to-r from-chemistry-gold via-chemistry-purple to-chemistry-green bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] text-6xl leading-tight py-4">
                      🎉 {winnerName}
                    </h1>
                    <h2 className="text-5xl font-bold text-chemistry-gold animate-bounce">
                      بطل الكيمياء!
                    </h2>
                  </div>
                  
                  <div className="flex justify-center gap-6">
                    <div className="animate-float" style={{animationDelay: "0s"}}>
                      <Sparkles className="w-14 h-14 text-chemistry-gold" />
                    </div>
                    <div className="animate-bounce">
                      <Trophy className="w-20 h-20 text-chemistry-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                    </div>
                    <div className="animate-float" style={{animationDelay: "0.5s"}}>
                      <Sparkles className="w-14 h-14 text-chemistry-gold" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-chemistry-gold/20 via-chemistry-purple/20 to-chemistry-green/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-chemistry-gold/30 shadow-2xl">
                    <p className="text-3xl text-foreground font-bold mb-2">
                      تهانينا على الفوز المستحق! 🏆
                    </p>
                    <p className="text-xl text-muted-foreground font-semibold">
                      أداء رائع ومميز
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-4xl animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Scores */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className={`bg-card/50 backdrop-blur-sm border-2 rounded-3xl p-8 transition-all duration-300 ${winner === "A" ? "border-teamA shadow-2xl shadow-teamA/50 scale-110" : "border-border"}`}>
            <div className="space-y-3">
              {winner === "A" && <Trophy className="w-12 h-12 text-chemistry-gold mx-auto mb-4 animate-bounce" />}
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teamA shadow-lg shadow-teamA/50" />
                <h3 className="text-3xl font-bold text-foreground">{teamAName}</h3>
              </div>
              <div className="text-6xl font-bold text-teamA">{teamAScore}</div>
              <div className="text-lg text-muted-foreground">نقطة</div>
            </div>
          </div>

          <div className={`bg-card/50 backdrop-blur-sm border-2 rounded-3xl p-8 transition-all duration-300 ${winner === "B" ? "border-teamB shadow-2xl shadow-teamB/50 scale-110" : "border-border"}`}>
            <div className="space-y-3">
              {winner === "B" && <Trophy className="w-12 h-12 text-chemistry-gold mx-auto mb-4 animate-bounce" />}
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teamB shadow-lg shadow-teamB/50" />
                <h3 className="text-3xl font-bold text-foreground">{teamBName}</h3>
              </div>
              <div className="text-6xl font-bold text-teamB">{teamBScore}</div>
              <div className="text-lg text-muted-foreground">نقطة</div>
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <Button onClick={onRestart} size="lg" className="text-2xl px-12 py-8 bg-gradient-to-r from-chemistry-purple to-chemistry-green hover:from-chemistry-purple/90 hover:to-chemistry-green/90 shadow-lg transition-all duration-300 hover:scale-105 gap-3">
          <RotateCcw className="w-6 h-6" />
          لعبة جديدة
        </Button>
      </div>
    </div>;
};
export default ResultsScreen;