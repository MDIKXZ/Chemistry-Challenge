import { useState } from "react";
import WelcomeScreen from "@/components/game/WelcomeScreen";
import TeamSetup from "@/components/game/TeamSetup";
import GameBoard from "@/components/game/GameBoard";
import ResultsScreen from "@/components/game/ResultsScreen";
import RoundTransitionScreen from "@/components/game/RoundTransitionScreen";
import { ToastProvider } from "@/components/ui/toast";

export type GameState = "welcome" | "setup" | "playing" | "roundTransition" | "results";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [roundOneScores, setRoundOneScores] = useState<{teamA: number, teamB: number} | null>(null);
  // Track cumulative scores for determining overall winner
  const [cumulativeScoreA, setCumulativeScoreA] = useState(0);
  const [cumulativeScoreB, setCumulativeScoreB] = useState(0);

  const handleStartSetup = () => setGameState("setup");
  
  const handleStartGame = (nameA: string, nameB: string) => {
    setTeamAName(nameA);
    setTeamBName(nameB);
    setGameState("playing");
  };

  const handleGameEnd = (scoreA: number, scoreB: number) => {
    // Set final scores for Round 2
    setTeamAScore(scoreA);
    setTeamBScore(scoreB);
    
    // Calculate cumulative scores
    const totalScoreA = roundOneScores ? roundOneScores.teamA + scoreA : scoreA;
    const totalScoreB = roundOneScores ? roundOneScores.teamB + scoreB : scoreB;
    
    setCumulativeScoreA(totalScoreA);
    setCumulativeScoreB(totalScoreB);
    
    setGameState("results");
  };

  const handleRoundOneComplete = (scoreA: number, scoreB: number) => {
    setTeamAScore(scoreA);
    setTeamBScore(scoreB);
    setRoundOneScores({ teamA: scoreA, teamB: scoreB });
    setGameState("roundTransition");
  };

  const handleNextRound = () => {
    setGameState("playing");
  };

  const handleBackToHome = () => {
    setGameState("welcome");
    setTeamAName("");
    setTeamBName("");
    setTeamAScore(0);
    setTeamBScore(0);
    setRoundOneScores(null);
    setCumulativeScoreA(0);
    setCumulativeScoreB(0);
  };

  const handleRestart = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setRoundOneScores(null);
    setCumulativeScoreA(0);
    setCumulativeScoreB(0);
    setGameState("welcome");
  };

  // Chemical elements for floating background
  const chemicalElements = [
    "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne",
    "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca",
    "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
    "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr"
  ];

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background overflow-hidden relative">
        {/* Chemistry Background Effects - Floating Chemical Elements */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const element = chemicalElements[Math.floor(Math.random() * chemicalElements.length)];
            return (
              <div
                key={i}
                className="absolute text-chemistry-gold/20 font-bold animate-float-subtle"
                style={{
                  fontSize: `${Math.random() * 24 + 12}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              >
                {element}
              </div>
            );
          })}
        </div>

        <div key={gameState} className="animate-fade-in">
          {gameState === "welcome" && <WelcomeScreen onStart={handleStartSetup} />}
          {gameState === "setup" && <TeamSetup onStartGame={handleStartGame} onBack={handleBackToHome} />}
          {gameState === "playing" && (
            <GameBoard
              teamAName={teamAName}
              teamBName={teamBName}
              onGameEnd={roundOneScores ? handleGameEnd : handleRoundOneComplete}
              onRoundOneComplete={roundOneScores ? undefined : handleRoundOneComplete}
              onBackToHome={handleBackToHome}
              round={roundOneScores ? 2 : 1} // Pass correct round number
            />
          )}
          {gameState === "roundTransition" && roundOneScores && (
            <RoundTransitionScreen
              teamAName={teamAName}
              teamBName={teamBName}
              teamAScore={teamAScore}
              teamBScore={teamBScore}
              onNextRound={handleNextRound}
              onRestart={handleRestart}
              roundOneScores={roundOneScores}
              cumulativeScoreA={roundOneScores.teamA}
              cumulativeScoreB={roundOneScores.teamB}
            />
          )}
          {gameState === "results" && (
            <ResultsScreen
              teamAName={teamAName}
              teamBName={teamBName}
              teamAScore={cumulativeScoreA}
              teamBScore={cumulativeScoreB}
              onRestart={handleRestart}
              isFinalResult={true}
            />
          )}
        </div>
      </div>
    </ToastProvider>
  );
};

export default Index;