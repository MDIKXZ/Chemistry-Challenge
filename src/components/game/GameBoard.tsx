import { useState } from "react";
import QuestionGrid from "./QuestionGrid";
import ScoreBoard from "./ScoreBoard";
import QuestionModal from "./QuestionModal";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Home, Trophy, RotateCcw, Users2, Zap, ListOrdered } from "lucide-react";

interface GameBoardProps {
  teamAName: string;
  teamBName: string;
  onGameEnd: (teamAScore: number, teamBScore: number) => void;
  onBackToHome: () => void;
}

interface HelpUsage {
  multipleChoice: boolean;
  teacher: boolean;
  doublePoints: boolean;
}

export interface Question {
  id: number;
  category: string;
  points: number;
  question: string;
  answer: string;
  options?: string[];
  answered: boolean;
}

// Temporary questions - will be replaced later
const initialQuestions: Question[] = [
  // 200 points
  { id: 1, category: "العناصر", points: 200, question: "ما هو الرمز الكيميائي للذهب؟", answer: "Au", options: ["Au", "Ag", "Fe", "Cu"], answered: false },
  { id: 2, category: "التفاعلات", points: 200, question: "ماذا ينتج عن تفاعل حمض وقاعدة؟", answer: "ملح وماء", options: ["ملح وماء", "غاز وماء", "حمض وقاعدة", "ملح فقط"], answered: false },
  { id: 3, category: "الجدول الدوري", points: 200, question: "كم عدد العناصر في الجدول الدوري؟", answer: "118 عنصر", options: ["118 عنصر", "92 عنصر", "150 عنصر", "100 عنصر"], answered: false },
  { id: 4, category: "الكيمياء العضوية", points: 200, question: "ما هي الصيغة الكيميائية للميثان؟", answer: "CH₄", options: ["CH₄", "C₂H₆", "C₃H₈", "C₄H₁₀"], answered: false },
  
  // 400 points
  { id: 5, category: "العناصر", points: 400, question: "ما هو أخف العناصر؟", answer: "الهيدروجين", options: ["الهيدروجين", "الهيليوم", "الأكسجين", "النيتروجين"], answered: false },
  { id: 6, category: "التفاعلات", points: 400, question: "ما اسم التفاعل الذي يمتص الحرارة؟", answer: "تفاعل ماص للحرارة", options: ["تفاعل ماص للحرارة", "تفاعل طارد للحرارة", "تفاعل محايد", "تفاعل عكسي"], answered: false },
  { id: 7, category: "الجدول الدوري", points: 400, question: "ما هي المجموعة التي تحتوي على الغازات النبيلة؟", answer: "المجموعة 18", options: ["المجموعة 18", "المجموعة 1", "المجموعة 17", "المجموعة 8"], answered: false },
  { id: 8, category: "الكيمياء العضوية", points: 400, question: "ما هي المجموعة الوظيفية في الكحولات؟", answer: "OH-", options: ["OH-", "COOH-", "NH₂-", "CHO-"], answered: false },
  
  // 600 points
  { id: 9, category: "العناصر", points: 600, question: "ما هو العنصر الأكثر وفرة في القشرة الأرضية؟", answer: "الأكسجين", options: ["الأكسجين", "السيليكون", "الألومنيوم", "الحديد"], answered: false },
  { id: 10, category: "التفاعلات", points: 600, question: "ما هو اسم عملية فقدان الإلكترونات؟", answer: "الأكسدة", options: ["الأكسدة", "الاختزال", "التحلل", "الاتحاد"], answered: false },
  { id: 11, category: "الجدول الدوري", points: 600, question: "من اكتشف الجدول الدوري؟", answer: "ديمتري مندليف", options: ["ديمتري مندليف", "جون دالتون", "ماري كوري", "إرنست رذرفورد"], answered: false },
  { id: 12, category: "الكيمياء العضوية", points: 600, question: "ما اسم البوليمر الطبيعي الموجود في الحرير؟", answer: "الفيبروين", options: ["الفيبروين", "الكيراتين", "الكولاجين", "السليلوز"], answered: false },
];

const GameBoard = ({ teamAName, teamBName, onGameEnd, onBackToHome }: GameBoardProps) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  // Random starting team
  const [currentTeam, setCurrentTeam] = useState<"A" | "B">(() => Math.random() < 0.5 ? "A" : "B");
  const [teamAHelp, setTeamAHelp] = useState<HelpUsage>({
    multipleChoice: false,
    teacher: false,
    doublePoints: false,
  });
  const [teamBHelp, setTeamBHelp] = useState<HelpUsage>({
    multipleChoice: false,
    teacher: false,
    doublePoints: false,
  });
  const [activeDoublePoints, setActiveDoublePoints] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<"home" | "end" | "reset" | null>(null);

  const handleQuestionSelect = (question: Question) => {
    if (!question.answered) {
      setSelectedQuestion(question);
    }
  };

  const handleQuestionClose = () => {
    setSelectedQuestion(null);
  };

  const handleAnswer = (
    team: "A" | "B" | "none", 
    points: number, 
    helpUsed: { 
      multipleChoiceTeam?: "A" | "B"; 
      teacherA?: boolean; 
      teacherB?: boolean; 
      doublePoints?: boolean;
    }
  ) => {
    if (team === "A") {
      setTeamAScore(prev => prev + points);
    } else if (team === "B") {
      setTeamBScore(prev => prev + points);
    }

    // Update help usage based on which team actually used it
    if (helpUsed.multipleChoiceTeam === "A") {
      setTeamAHelp(prev => ({ ...prev, multipleChoice: true }));
    } else if (helpUsed.multipleChoiceTeam === "B") {
      setTeamBHelp(prev => ({ ...prev, multipleChoice: true }));
    }
    
    if (helpUsed.teacherA) {
      setTeamAHelp(prev => ({ ...prev, teacher: true }));
    }
    
    if (helpUsed.teacherB) {
      setTeamBHelp(prev => ({ ...prev, teacher: true }));
    }
    
    // Only consume double points if the team that activated it answered correctly
    if (helpUsed.doublePoints && team === currentTeam) {
      if (currentTeam === "A") setTeamAHelp(prev => ({ ...prev, doublePoints: true }));
      else setTeamBHelp(prev => ({ ...prev, doublePoints: true }));
    }

    if (selectedQuestion) {
      setQuestions(prev =>
        prev.map(q =>
          q.id === selectedQuestion.id ? { ...q, answered: true } : q
        )
      );
    }

    setSelectedQuestion(null);
    // Always alternate turns after each question
    setCurrentTeam(currentTeam === "A" ? "B" : "A");
    setActiveDoublePoints(false);
  };

  const handleDoublePointsToggle = () => {
    if (selectedQuestion) {
      alert("⚠️ لا يمكنك تفعيل مضاعفة النقاط بعد اختيار السؤال!");
      return;
    }
    const currentHelp = currentTeam === "A" ? teamAHelp : teamBHelp;
    if (currentHelp.doublePoints) {
      return;
    }
    setActiveDoublePoints(!activeDoublePoints);
  };

  const handleEndGame = () => {
    setConfirmDialog("end");
  };

  const handleResetGame = () => {
    setConfirmDialog("reset");
  };

  const handleBackToHomeClick = () => {
    setConfirmDialog("home");
  };

  const confirmAction = () => {
    if (confirmDialog === "end") {
      onGameEnd(teamAScore, teamBScore);
    } else if (confirmDialog === "reset") {
      setQuestions(initialQuestions);
      setTeamAScore(0);
      setTeamBScore(0);
      setCurrentTeam("A");
      setTeamAHelp({ multipleChoice: false, teacher: false, doublePoints: false });
      setTeamBHelp({ multipleChoice: false, teacher: false, doublePoints: false });
      setActiveDoublePoints(false);
      setSelectedQuestion(null);
    } else if (confirmDialog === "home") {
      onBackToHome();
    }
    setConfirmDialog(null);
  };

  const handleScoreChange = (team: "A" | "B", amount: number) => {
    if (team === "A") {
      setTeamAScore(prev => Math.max(0, prev + amount));
    } else {
      setTeamBScore(prev => Math.max(0, prev + amount));
    }
  };

  const handleTeamChange = (team: "A" | "B") => {
    setCurrentTeam(team);
    setActiveDoublePoints(false);
  };

  const allQuestionsAnswered = questions.every(q => q.answered);

  if (allQuestionsAnswered && selectedQuestion === null) {
    setTimeout(() => onGameEnd(teamAScore, teamBScore), 500);
  }

  const currentHelp = currentTeam === "A" ? teamAHelp : teamBHelp;

  return (
    <div className="min-h-screen p-4 md:p-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <ScoreBoard
          teamAName={teamAName}
          teamBName={teamBName}
          teamAScore={teamAScore}
          teamBScore={teamBScore}
          currentTeam={currentTeam}
          onScoreChange={handleScoreChange}
          onTeamChange={handleTeamChange}
        />
        
        <QuestionGrid
          questions={questions}
          onQuestionSelect={handleQuestionSelect}
        />

        {/* Control Buttons */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border space-y-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={handleBackToHomeClick}
              variant="outline"
              className="gap-2 h-12 px-6 text-lg hover:border-chemistry-green/50"
            >
              <Home className="w-5 h-5" />
              الصفحة الرئيسية
            </Button>
            <Button
              onClick={handleEndGame}
              variant="outline"
              className="gap-2 h-12 px-6 text-lg hover:border-chemistry-gold/50"
            >
              <Trophy className="w-5 h-5" />
              إنهاء المباراة
            </Button>
            <Button
              onClick={handleResetGame}
              variant="outline"
              className="gap-2 h-12 px-6 text-lg hover:border-chemistry-purple/50"
            >
              <RotateCcw className="w-5 h-5" />
              إعادة المباراة
            </Button>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-xl font-bold text-center mb-4">
              وسائل المساعدة - {currentTeam === "A" ? teamAName : teamBName}
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={handleDoublePointsToggle}
                disabled={currentHelp.doublePoints || !!selectedQuestion}
                variant={activeDoublePoints ? "default" : "outline"}
                className={`gap-2 h-14 px-6 text-lg transition-all ${
                  currentHelp.doublePoints 
                    ? "opacity-40 cursor-not-allowed" 
                    : activeDoublePoints
                    ? "bg-chemistry-gold hover:bg-chemistry-gold/90 border-chemistry-gold shadow-lg"
                    : "hover:border-chemistry-gold/50"
                }`}
              >
                <Zap className="w-5 h-5" />
                مضاعفة النقاط {currentHelp.doublePoints && "✓"}
              </Button>
              <Button
                disabled={currentHelp.multipleChoice || !selectedQuestion}
                variant="outline"
                className={`gap-2 h-14 px-6 text-lg ${
                  currentHelp.multipleChoice 
                    ? "opacity-40 cursor-not-allowed" 
                    : "hover:border-chemistry-purple/50"
                }`}
              >
                <ListOrdered className="w-5 h-5" />
                الخيارات المتعددة {currentHelp.multipleChoice && "✓"}
              </Button>
              <Button
                disabled={currentHelp.teacher || !selectedQuestion}
                variant="outline"
                className={`gap-2 h-14 px-6 text-lg ${
                  currentHelp.teacher 
                    ? "opacity-40 cursor-not-allowed" 
                    : "hover:border-chemistry-green/50"
                }`}
              >
                <Users2 className="w-5 h-5" />
                الاستعانة بالمعلم {currentHelp.teacher && "✓"}
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3">
              {selectedQuestion ? "اختر وسيلة مساعدة من داخل السؤال" : "فعّل مضاعفة النقاط قبل اختيار السؤال"}
            </p>
          </div>
        </div>

        {selectedQuestion && (
          <QuestionModal
            question={selectedQuestion}
            onClose={handleQuestionClose}
            onAnswer={handleAnswer}
            currentTeam={currentTeam}
            teamAName={teamAName}
            teamBName={teamBName}
            teamAHelp={teamAHelp}
            teamBHelp={teamBHelp}
            activeDoublePoints={activeDoublePoints}
          />
        )}

        {/* Confirmation Dialog */}
        <AlertDialog open={!!confirmDialog} onOpenChange={() => setConfirmDialog(null)}>
          <AlertDialogContent className="animate-scale-in">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl text-center">
                {confirmDialog === "end" && "إنهاء المباراة"}
                {confirmDialog === "reset" && "إعادة المباراة"}
                {confirmDialog === "home" && "العودة للصفحة الرئيسية"}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-lg text-center">
                {confirmDialog === "end" && "هل أنت متأكد من إنهاء المباراة على النتيجة الحالية؟"}
                {confirmDialog === "reset" && "هل أنت متأكد من إعادة المباراة من البداية؟ سيتم فقد التقدم الحالي."}
                {confirmDialog === "home" && "هل تريد العودة للصفحة الرئيسية؟ سيتم فقد التقدم الحالي."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-center gap-3">
              <AlertDialogCancel className="text-lg px-8">إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={confirmAction} className="text-lg px-8 bg-chemistry-purple hover:bg-chemistry-purple/90">
                موافق
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default GameBoard;
