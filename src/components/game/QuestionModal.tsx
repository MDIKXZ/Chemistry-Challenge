import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Eye, Pause, RotateCcw, ListOrdered, Users2, Zap } from "lucide-react";
import { Question } from "./GameBoard";
import Timer from "./Timer";

interface HelpUsage {
  multipleChoice: boolean;
  teacher: boolean;
  doublePoints: boolean;
}

interface QuestionModalProps {
  question: Question;
  onClose: () => void;
  onAnswer: (
    team: "A" | "B" | "none", 
    points: number, 
    helpUsed: { 
      multipleChoiceTeam?: "A" | "B"; 
      teacherA?: boolean; 
      teacherB?: boolean; 
      doublePoints?: boolean;
    }
  ) => void;
  currentTeam: "A" | "B";
  teamAName: string;
  teamBName: string;
  teamAHelp: HelpUsage;
  teamBHelp: HelpUsage;
  activeDoublePoints: boolean;
}

type ModalView = "question" | "answer" | "who-answered";
type HelpType = "multiple-choice" | "teacher" | null;

const QuestionModal = ({ question, onClose, onAnswer, currentTeam, teamAName, teamBName, teamAHelp, teamBHelp, activeDoublePoints }: QuestionModalProps) => {
  const [view, setView] = useState<ModalView>("question");
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [isTeamBTimer, setIsTeamBTimer] = useState(false);
  const [activeHelp, setActiveHelp] = useState<HelpType>(null);
  const [helpUsed, setHelpUsed] = useState<{ multipleChoiceTeam?: "A" | "B"; teacherA?: boolean; teacherB?: boolean }>({});
  const [teacherTimerActive, setTeacherTimerActive] = useState(false);
  const [teacherTimerKey, setTeacherTimerKey] = useState(0);
  const [teacherTimerPaused, setTeacherTimerPaused] = useState(false);
  const [mainTimerEnded, setMainTimerEnded] = useState(false);
  
  // Get the current team's help status based on which timer is active
  const activeTeam = isTeamBTimer ? (currentTeam === "A" ? "B" : "A") : currentTeam;
  const activeTeamHelp = activeTeam === "A" ? teamAHelp : teamBHelp;

  const handleTimerEnd = () => {
    // Mark main timer as ended and wait for teacher timer if active
    if (!isTeamBTimer) {
      setMainTimerEnded(true);
      if (!teacherTimerActive) {
        setIsTeamBTimer(true);
        setTimerKey(prev => prev + 1);
      }
    }
  };

  const handleStartOpponentTimer = () => {
    if (!isTeamBTimer) {
      // Hide teacher timer smoothly before starting opponent timer
      if (teacherTimerActive) {
        setTeacherTimerActive(false);
        setActiveHelp(null);
        setTimeout(() => {
          setIsTeamBTimer(true);
          setTimerKey(prev => prev + 1);
        }, 300);
      } else {
        setIsTeamBTimer(true);
        setTimerKey(prev => prev + 1);
      }
    }
  };

  const handleShowAnswer = () => {
    setView("answer");
  };

  const handleBackToQuestion = () => {
    setView("question");
  };

  const handleWhoAnswered = () => {
    setView("who-answered");
  };

  const handleTeamAnswer = (team: "A" | "B" | "none") => {
    const points = activeDoublePoints ? question.points * 2 : question.points;
    const finalHelpUsed = { ...helpUsed, doublePoints: activeDoublePoints };
    onAnswer(team, points, finalHelpUsed);
  };

  const handleToggleHelp = (type: HelpType) => {
    if (type === "multiple-choice") {
      if (!question.options) return;
      // Check if the active team has already used multiple choice
      const hasUsedHelp = activeTeamHelp.multipleChoice;
      if (hasUsedHelp) return;
      
      setActiveHelp(activeHelp === type ? null : type);
      if (activeHelp !== type) {
        setHelpUsed(prev => ({ ...prev, multipleChoiceTeam: activeTeam }));
      }
    } else if (type === "teacher") {
      // Check if the active team has already used teacher help
      const hasUsedHelp = activeTeamHelp.teacher;
      if (hasUsedHelp) return;
      
      if (activeHelp !== type) {
        setActiveHelp(type);
        setTeacherTimerActive(true);
        setTeacherTimerKey(prev => prev + 1);
        // Mark that this specific team used teacher help
        if (activeTeam === "A") {
          setHelpUsed(prev => ({ ...prev, teacherA: true }));
        } else {
          setHelpUsed(prev => ({ ...prev, teacherB: true }));
        }
      } else {
        setActiveHelp(null);
        setTeacherTimerActive(false);
      }
    }
  };

  const handleTeacherTimerEnd = () => {
    // Smooth fade out animation before starting opponent timer
    setTimeout(() => {
      setTeacherTimerActive(false);
      setActiveHelp(null);
      // If main timer has ended, start opponent timer now with smooth transition
      if (mainTimerEnded && !isTeamBTimer) {
        setTimeout(() => {
          setIsTeamBTimer(true);
          setTimerKey(prev => prev + 1);
        }, 300); // Small delay for smooth transition
      }
    }, 100);
  };

  const handleResetTeacherTimer = () => {
    setTeacherTimerKey(prev => prev + 1);
    setTeacherTimerPaused(false);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-xl font-bold text-xl ${
              question.points === 200 ? "bg-chemistry-green/20 text-chemistry-green" :
              question.points === 400 ? "bg-chemistry-purple/20 text-chemistry-purple" :
              "bg-chemistry-gold/20 text-chemistry-gold"
            }`}>
              {activeDoublePoints ? question.points * 2 : question.points} نقطة
            </div>
            {activeDoublePoints && (
              <div className="px-3 py-1 rounded-lg bg-chemistry-gold/20 text-chemistry-gold text-sm font-semibold animate-pulse-glow">
                ⚡ مضاعفة
              </div>
            )}
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="hover:bg-destructive/20 hover:text-destructive"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {view === "question" && (
            <>
              {/* Question */}
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-foreground leading-relaxed">
                  {question.question}
                </h3>
              </div>

              {/* Multiple Choice Options */}
              {activeHelp === "multiple-choice" && question.options && (
                <div className="grid grid-cols-2 gap-3 mt-6 animate-slide-up">
                  {question.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/30 border border-border rounded-xl p-4 text-center text-lg font-semibold"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

              {/* Timer */}
              <div className="flex flex-col gap-4 items-center">
                {/* Main Timer */}
                <div className={teacherTimerActive ? "animate-fade-in" : ""}>
                  <Timer
                    key={timerKey}
                    duration={isTeamBTimer ? 15 : 60}
                    isPaused={timerPaused}
                    onEnd={handleTimerEnd}
                    team={isTeamBTimer ? (currentTeam === "A" ? "B" : "A") : currentTeam}
                  />
                </div>
                
                {/* Teacher Timer */}
                {teacherTimerActive && (
                  <div className="animate-fade-in">
                    <div className="text-center mb-2 text-sm font-semibold text-chemistry-green">
                      ⏱️ وقت المعلم
                    </div>
                    <Timer
                      key={teacherTimerKey}
                      duration={20}
                      isPaused={teacherTimerPaused}
                      onEnd={handleTeacherTimerEnd}
                      team={activeTeam}
                      variant="teacher"
                    />
                  </div>
                )}
              </div>

              {/* Teacher Timer Controls - Only show when teacher timer is active */}
              {teacherTimerActive && (
                <div className="flex gap-3 justify-center animate-fade-in">
                  <Button
                    onClick={() => setTeacherTimerPaused(!teacherTimerPaused)}
                    variant="outline"
                    className="gap-2 border-chemistry-gold/50 hover:bg-chemistry-gold/20"
                  >
                    <Pause className="w-4 h-4" />
                    {teacherTimerPaused ? "استئناف المعلم" : "إيقاف المعلم"}
                  </Button>
                  <Button
                    onClick={handleResetTeacherTimer}
                    variant="outline"
                    className="gap-2 border-chemistry-gold/50 hover:bg-chemistry-gold/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                    إعادة وقت المعلم
                  </Button>
                </div>
              )}

              {/* Help Tools */}
              <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={() => handleToggleHelp("multiple-choice")}
                disabled={!question.options || activeTeamHelp.multipleChoice}
                variant={activeHelp === "multiple-choice" ? "default" : "outline"}
                className={`gap-2 ${activeTeamHelp.multipleChoice ? "opacity-40" : ""}`}
              >
                <ListOrdered className="w-4 h-4" />
                الخيارات المتعددة {activeTeamHelp.multipleChoice && "✓"}
              </Button>
              <Button
                onClick={() => handleToggleHelp("teacher")}
                disabled={activeTeamHelp.teacher}
                variant={activeHelp === "teacher" ? "default" : "outline"}
                className={`gap-2 ${activeTeamHelp.teacher ? "opacity-40" : ""}`}
              >
                <Users2 className="w-4 h-4" />
                {teacherTimerActive ? "إيقاف المعلم" : "الاستعانة بالمعلم"} {activeTeamHelp.teacher && "✓"}
              </Button>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-3 justify-center pt-4 border-t border-border">
                <Button
                  onClick={() => setTimerPaused(!timerPaused)}
                  variant="outline"
                  className="gap-2"
                >
                  <Pause className="w-4 h-4" />
                  {timerPaused ? "استئناف" : "إيقاف مؤقت"}
                </Button>
                <Button
                  onClick={() => setTimerKey(prev => prev + 1)}
                  variant="outline"
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  إعادة الوقت
                </Button>
                {!isTeamBTimer && (
                  <Button
                    onClick={handleStartOpponentTimer}
                    variant="outline"
                    className="gap-2 border-chemistry-green hover:bg-chemistry-green/20"
                  >
                    ▶️ بدء دور الخصم
                  </Button>
                )}
                <Button
                  onClick={handleShowAnswer}
                  className="gap-2 bg-primary"
                >
                  <Eye className="w-4 h-4" />
                  إظهار الإجابة
                </Button>
              </div>
            </>
          )}

          {view === "answer" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-4">
                <h4 className="text-2xl font-bold text-muted-foreground">الإجابة الصحيحة:</h4>
                <p className="text-4xl font-bold text-chemistry-green leading-relaxed">
                  {question.answer}
                </p>
              </div>

              <div className="flex gap-3 justify-center pt-6">
                <Button onClick={handleBackToQuestion} variant="outline">
                  🔙 العودة للسؤال
                </Button>
                <Button onClick={handleWhoAnswered} className="bg-primary">
                  ✅ من أجاب؟
                </Button>
              </div>
            </div>
          )}

          {view === "who-answered" && (
            <div className="space-y-4 animate-slide-up">
              <h4 className="text-2xl font-bold text-center mb-6">من أجاب على السؤال؟</h4>
              <div className="grid gap-4">
                <Button
                  onClick={() => handleTeamAnswer("A")}
                  className="h-20 text-xl bg-teamA hover:bg-teamA/90 shadow-lg hover:shadow-teamA/50"
                >
                  {teamAName}
                </Button>
                <Button
                  onClick={() => handleTeamAnswer("B")}
                  className="h-20 text-xl bg-teamB hover:bg-teamB/90 shadow-lg hover:shadow-teamB/50"
                >
                  {teamBName}
                </Button>
                <Button
                  onClick={() => handleTeamAnswer("none")}
                  variant="outline"
                  className="h-20 text-xl"
                >
                  محد جاوب
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
