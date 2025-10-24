import { Trophy, Plus, Minus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScoreBoardProps {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  currentTeam: "A" | "B";
  onScoreChange: (team: "A" | "B", amount: number) => void;
  onTeamChange: (team: "A" | "B") => void;
}

const ScoreBoard = ({ teamAName, teamBName, teamAScore, teamBScore, currentTeam, onScoreChange, onTeamChange }: ScoreBoardProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Team A */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-md border-2 rounded-3xl p-8 transition-all duration-500 ${
          currentTeam === "A"
            ? "border-teamA shadow-2xl shadow-teamA/40 scale-105 ring-4 ring-teamA/20"
            : "border-border/50 hover:border-teamA/30"
        }`}
      >
        {/* Background Pattern */}
        {currentTeam === "A" && (
          <div className="absolute inset-0 bg-gradient-to-br from-teamA/5 to-transparent animate-pulse" />
        )}
        
        <div className="relative text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className={`w-5 h-5 rounded-full bg-gradient-to-br from-teamA to-teamA/70 shadow-lg ${
              currentTeam === "A" ? "shadow-teamA/60 animate-pulse" : "shadow-teamA/30"
            }`} />
            <h3 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
              {teamAName}
            </h3>
          </div>
          
          <div className="flex items-center justify-center gap-3 py-2">
            <Trophy className={`w-8 h-8 text-chemistry-gold transition-transform duration-300 ${
              currentTeam === "A" ? "scale-110 animate-pulse" : ""
            }`} />
            <span className="text-6xl font-bold bg-gradient-to-br from-teamA to-teamA/80 bg-clip-text text-transparent">
              {teamAScore}
            </span>
          </div>
          <div className="flex gap-2 justify-center pt-2">
            <Button
              onClick={() => onScoreChange("A", 50)}
              size="sm"
              variant="outline"
              className="gap-1 hover:bg-teamA/20 hover:border-teamA"
            >
              <Plus className="w-4 h-4" />
              50
            </Button>
            <Button
              onClick={() => onScoreChange("A", -50)}
              size="sm"
              variant="outline"
              className="gap-1 hover:bg-destructive/20 hover:border-destructive"
            >
              <Minus className="w-4 h-4" />
              50
            </Button>
          </div>
          {currentTeam === "A" ? (
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-teamA/20 rounded-full border border-teamA/30 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-teamA animate-ping" />
              <span className="text-sm text-teamA font-bold">الدور الحالي</span>
            </div>
          ) : (
            <Button
              onClick={() => onTeamChange("A")}
              size="sm"
              variant="outline"
              className="gap-2 hover:bg-teamA/20 hover:border-teamA w-full"
            >
              <RefreshCw className="w-4 h-4" />
              تحويل الدور
            </Button>
          )}
        </div>
      </div>

      {/* Team B */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-md border-2 rounded-3xl p-8 transition-all duration-500 ${
          currentTeam === "B"
            ? "border-teamB shadow-2xl shadow-teamB/40 scale-105 ring-4 ring-teamB/20"
            : "border-border/50 hover:border-teamB/30"
        }`}
      >
        {/* Background Pattern */}
        {currentTeam === "B" && (
          <div className="absolute inset-0 bg-gradient-to-br from-teamB/5 to-transparent animate-pulse" />
        )}
        
        <div className="relative text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className={`w-5 h-5 rounded-full bg-gradient-to-br from-teamB to-teamB/70 shadow-lg ${
              currentTeam === "B" ? "shadow-teamB/60 animate-pulse" : "shadow-teamB/30"
            }`} />
            <h3 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
              {teamBName}
            </h3>
          </div>
          
          <div className="flex items-center justify-center gap-3 py-2">
            <Trophy className={`w-8 h-8 text-chemistry-gold transition-transform duration-300 ${
              currentTeam === "B" ? "scale-110 animate-pulse" : ""
            }`} />
            <span className="text-6xl font-bold bg-gradient-to-br from-teamB to-teamB/80 bg-clip-text text-transparent">
              {teamBScore}
            </span>
          </div>
          <div className="flex gap-2 justify-center pt-2">
            <Button
              onClick={() => onScoreChange("B", 50)}
              size="sm"
              variant="outline"
              className="gap-1 hover:bg-teamB/20 hover:border-teamB"
            >
              <Plus className="w-4 h-4" />
              50
            </Button>
            <Button
              onClick={() => onScoreChange("B", -50)}
              size="sm"
              variant="outline"
              className="gap-1 hover:bg-destructive/20 hover:border-destructive"
            >
              <Minus className="w-4 h-4" />
              50
            </Button>
          </div>
          {currentTeam === "B" ? (
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-teamB/20 rounded-full border border-teamB/30 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-teamB animate-ping" />
              <span className="text-sm text-teamB font-bold">الدور الحالي</span>
            </div>
          ) : (
            <Button
              onClick={() => onTeamChange("B")}
              size="sm"
              variant="outline"
              className="gap-2 hover:bg-teamB/20 hover:border-teamB w-full"
            >
              <RefreshCw className="w-4 h-4" />
              تحويل الدور
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
