import { useState } from "react";
import WelcomeScreen from "@/components/game/WelcomeScreen";
import TeamSetup from "@/components/game/TeamSetup";
import GameBoard from "@/components/game/GameBoard";
import ResultsScreen from "@/components/game/ResultsScreen";

export type GameState = "welcome" | "setup" | "playing" | "results";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);

  const handleStartSetup = () => setGameState("setup");
  
  const handleStartGame = (nameA: string, nameB: string) => {
    setTeamAName(nameA);
    setTeamBName(nameB);
    setGameState("playing");
  };

  const handleGameEnd = (scoreA: number, scoreB: number) => {
    setTeamAScore(scoreA);
    setTeamBScore(scoreB);
    setGameState("results");
  };

  const handleBackToHome = () => {
    setGameState("welcome");
    setTeamAName("");
    setTeamBName("");
    setTeamAScore(0);
    setTeamBScore(0);
  };

  const handleRestart = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setGameState("welcome");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Chemistry Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-chemistry-purple/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-40 w-40 h-40 bg-chemistry-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-teamA/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-teamB/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div key={gameState} className="animate-fade-in">
        {gameState === "welcome" && <WelcomeScreen onStart={handleStartSetup} />}
        {gameState === "setup" && <TeamSetup onStartGame={handleStartGame} onBack={handleBackToHome} />}
        {gameState === "playing" && (
        <GameBoard
          teamAName={teamAName}
          teamBName={teamBName}
          onGameEnd={handleGameEnd}
          onBackToHome={handleBackToHome}
        />
      )}
      {gameState === "results" && (
        <ResultsScreen
          teamAName={teamAName}
          teamBName={teamBName}
          teamAScore={teamAScore}
          teamBScore={teamBScore}
          onRestart={handleRestart}
        />
        )}
      </div>
    </div>
  );
};

export default Index;
