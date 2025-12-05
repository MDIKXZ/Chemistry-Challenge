import { useState, useEffect } from "react";
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
import HalfwayNotification from "./HalfwayNotification";

interface GameBoardProps {
  teamAName: string;
  teamBName: string;
  onGameEnd: (teamAScore: number, teamBScore: number) => void;
  onRoundOneComplete?: (teamAScore: number, teamBScore: number) => void;
  onBackToHome: () => void;
  round?: number;
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

// First round questions with exact options as provided (prefixes removed)
const firstRoundQuestions: Question[] = [
  {
    "id": 1,
    "category": "الكيمياء",
    "points": 200,
    "question": "أذكر مثال على المخلوط الغروي ؟",
    "answer": "الحليب",
    "options": [
      "الماء",
      "الحليب",
      "الحديد",
      "السكر"
    ],
    "answered": false
  },
  {
    "id": 2,
    "category": "الكيمياء",
    "points": 200,
    "question": "العوامل المؤثرة في الذوبان ؟",
    "answer": "التحريك - مساحة السطح - الحرارة",
    "options": [
      "الضغط والضوء فقط",
      "التحريك - مساحة السطح - الحرارة",
      "الكتلة فقط",
      "الكثافة"
    ],
    "answered": false
  },
  {
    "id": 3,
    "category": "الكيمياء",
    "points": 200,
    "question": "ماهو قانون التخفيف ؟",
    "answer": "M1 × V1 = M2 × V2",
    "options": [
      "P = F / A",
      "M1 × V1 = M2 × V2",
      "PV = nRT",
      "d = m / V"
    ],
    "answered": false
  },
  {
    "id": 4,
    "category": "الكيمياء",
    "points": 200,
    "question": "على ماذا تعتمد الخواص الجامعة ؟",
    "answer": "عدد الجسيمات المذاب",
    "options": [
      "نوع المذيب",
      "عدد الجسيمات المذاب",
      "حجم الإناء",
      "درجة الحرارة فقط"
    ],
    "answered": false
  },
  {
    "id": 5,
    "category": "الكيمياء",
    "points": 400,
    "question": "في قانون هنري ماذا يمثل S و P ؟",
    "answer": "الذائبية = S - الضغط = P",
    "options": [
      "الكتلة والسرعة",
      "الذائبية والضغط",
      "الكثافة والحجم",
      "الطاقة والحرارة"
    ],
    "answered": false
  },
  {
    "id": 6,
    "category": "الكيمياء",
    "points": 400,
    "question": "هو الضغط الناتج عن بخار السائل عندما يكون في حالة اتزان ديناميكي ؟",
    "answer": "الضغط البخاري",
    "options": [
      "الضغط الجوي",
      "الضغط البخاري",
      "ضغط الأكسجين",
      "ضغط الغاز المثالي"
    ],
    "answered": false
  },
  {
    "id": 7,
    "category": "الكيمياء",
    "points": 400,
    "question": "الفرق بين درجة حرارة غليان المحلول ودرجة غليان المذيب النقي ؟",
    "answer": "الارتفاع في درجة الغليان",
    "options": [
      "الانخفاض في درجة التجمد",
      "الارتفاع في درجة الغليان",
      "الارتفاع في الضغط",
      "الفرق في الكثافة"
    ],
    "answered": false
  },
  {
    "id": 8,
    "category": "الكيمياء",
    "points": 400,
    "question": "التغير الكلي للطاقة الذي يحدث خلال عملية تكون المحلول؟",
    "answer": "حرارة الذوبان",
    "options": [
      "حرارة التبخر",
      "حرارة الذوبان",
      "حرارة الاحتراق",
      "الطاقة الحركية"
    ],
    "answered": false
  },
  {
    "id": 9,
    "category": "الكيمياء",
    "points": 600,
    "question": "هو درجة تجمد المذيب النقي مطروح منها درجة تجمد المحلول ؟",
    "answer": "الانخفاض في درجة التجمد",
    "options": [
      "الارتفاع في درجة الغليان",
      "الانخفاض في درجة التجمد",
      "الضغط الأسموزي",
      "حرارة الذوبان"
    ],
    "answered": false
  },
  {
    "id": 10,
    "category": "الكيمياء",
    "points": 600,
    "question": "على ماذا يعتمد الضغط الأسموزي ؟",
    "answer": "عدد جسيمات المذاب",
    "options": [
      "نوع المذيب",
      "حجم الإناء",
      "عدد جسيمات المذاب",
      "درجة الحرارة فقط"
    ],
    "answered": false
  },
  {
    "id": 11,
    "category": "الكيمياء",
    "points": 600,
    "question": "تستعمل المولارية غالبًا للتعبير عن ؟",
    "answer": "تركيز المحلول",
    "options": [
      "الكتلة المولية",
      "تركيز المحلول",
      "درجة الحرارة",
      "الحجم الكلي"
    ],
    "answered": false
  },
  {
    "id": 12,
    "category": "الكيمياء",
    "points": 600,
    "question": "أذكر كلمة تعبر عن التركيز وصفيًا ؟",
    "answer": "كلمة مركز أو مخفف",
    "options": [
      "صلب أو سائل",
      "مركز أو مخفف",
      "نقي أو غير نقي",
      "سريع أو بطيء"
    ],
    "answered": false
  }
];

// Second round questions with exact options as provided (prefixes removed and completely different questions)
const secondRoundQuestions: Question[] = [
  {
    "id": 13,
    "category": "الكيمياء",
    "points": 200,
    "question": "ماذا يكون طعم المحاليل الحمضية",
    "answer": "طعمها لاذع",
    "options": [
      "حلو",
      "مالح",
      "لاذع",
      "عديم الطعم"
    ],
    "answered": false
  },
  {
    "id": 14,
    "category": "الكيمياء",
    "points": 200,
    "question": "أذكر خاصية مشتركة بين المحاليل الحمضية والقاعدية ؟",
    "answer": "توصيل الكهرباء",
    "options": [
      "الملمس الزلق",
      "توصيل الكهرباء",
      "تكون غازات",
      "لا تتفاعل"
    ],
    "answered": false
  },
  {
    "id": 15,
    "category": "الكيمياء",
    "points": 200,
    "question": "..ماذا تسمى المواد الأخرى التي تسلك سلوك الأحماض والقواعد",
    "answer": "مواد مترددة",
    "options": [
      "مواد خاملة",
      "مواد مترددة",
      "مواد نقية",
      "مواد صلبة"
    ],
    "answered": false
  },
  {
    "id": 16,
    "category": "الكيمياء",
    "points": 200,
    "question": "ماذا ينتج عن تفاعل قاعدة مع ورق تباع الشمس ؟",
    "answer": "ازرق",
    "options": [
      "أحمر",
      "أزرق",
      "أخضر",
      "لا يتغير"
    ],
    "answered": false
  },
  {
    "id": 17,
    "category": "الكيمياء",
    "points": 400,
    "question": "أذكر مثال على القواعد الضعيفة ؟",
    "answer": "ميثيل أمين",
    "options": [
      "هيدروكسيد الصوديوم",
      "ميثيل أمين",
      "الأمونيا",
      "حمض الهيدروكلوريك"
    ],
    "answered": false
  },
  {
    "id": 18,
    "category": "الكيمياء",
    "points": 400,
    "question": "ماهو محلول المعايرة المعلوم تركيزه ؟",
    "answer": "المحلول القياسي",
    "options": [
      "المحلول المشبع",
      "المحلول القياسي",
      "المحلول المركز",
      "المحلول المتعادل"
    ],
    "answered": false
  },
  {
    "id": 19,
    "category": "الكيمياء",
    "points": 400,
    "question": " ما الذي يعد قياسًا لقوة الحمض أو القاعدة الضعيفة ؟ ",
    "answer": "ثابت تأين الحمض أو القاعدة الضعيفة",
    "options": [
      "ثابت تأين الماء",
      "ثابت تأين الحمض أو القاعدة الضعيفة",
      "ثابت تأين القاعدة الضعيفة",
      " ثابت تأين الحمض الضعيف"
    ],
    "answered": false
  },
  {
    "id": 20,
    "category": "الكيمياء",
    "points": 400,
    "question": "أين تتأين الأحماض والقواعد الضعيفة جزئيًا",
    "answer": "في المحاليل المائية المخففة",
    "options": [
      "في الحالة الصلبة",
      "في المحاليل المائية المخففة",
      "في الغازات",
      "في المواد العضوية"
    ],
    "answered": false
  },
  {
    "id": 21,
    "category": "الكيمياء",
    "points": 600,
    "question": "ما هما المركبان الذان لاتنطبق عليهما نظرية أرهينيوس رغم احتوائهما على مجموعة الهيدروكسيد",
    "answer": "الأمونيا و كربونات الصوديوم",
    "options": [
      "الأمونيا و كربونات الصوديوم",
      "حمض الكبريتيك و الماء",
      "كلوريد الصوديوم و الإيثانول",
      "الميثان و البروبان"
    ],
    "answered": false
  },
  {
    "id": 22,
    "category": "الكيمياء",
    "points": 600,
    "question": "من أول شخص أجاب على تساؤل \"إذا كان الماء النقي متعادل فكيف يصبح المحلول المائي حمضي أو قاعدي\"",
    "answer": "أرهينيوس",
    "options": [
      "دالتون",
      "أرهينيوس",
      "بويل",
      "نيوتن"
    ],
    "answered": false
  },
  {
    "id": 23,
    "category": "الكيمياء",
    "points": 600,
    "question": "يسلك الماء سلوك الحمض أو القاعدة بحسب طبيعة .. ؟",
    "answer": "طبيعة المواد المذابة في المحلول",
    "options": [
      "طبيعة درجة غليان  المواد في المحلول",
      "طبيعة المواد المذابة في المحلول",
      " الضغط الأسموزي",
      " الضغط البخاري "
    ],
    "answered": false
  },
  {
    "id": 24,
    "category": "الكيمياء",
    "points": 600,
    "question": "إذا أدت بضع قطرات من الحمض إلى إنتاج فقاعات ثاني أكسيد الكربون يدل ذلك على أن الصخر يحتوي على؟",
    "answer": "الجير",
    "options": [
      "الطين",
      "الجير",
      "الكبريت",
      "الملح"
    ],
    "answered": false
  }
];

const GameBoard = ({ teamAName, teamBName, onGameEnd, onRoundOneComplete, onBackToHome, round = 1 }: GameBoardProps) => {
  const [questions, setQuestions] = useState<Question[]>(firstRoundQuestions);
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
  const [roundOneScores, setRoundOneScores] = useState<{teamA: number, teamB: number} | null>(null);
  const [showCustomNotification, setShowCustomNotification] = useState(false);
  const [halfwayNotificationShown, setHalfwayNotificationShown] = useState(false);

  // Custom hook for iPhone-style notification
  const showHalfwayNotification = () => {
    if (halfwayNotificationShown) return;
    
    // Show custom notification
    setShowCustomNotification(true);
    setHalfwayNotificationShown(true);
  };

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
      setQuestions(firstRoundQuestions);
      setTeamAScore(0);
      setTeamBScore(0);
      setCurrentTeam("A");
      setTeamAHelp({ multipleChoice: false, teacher: false, doublePoints: false });
      setTeamBHelp({ multipleChoice: false, teacher: false, doublePoints: false });
      setActiveDoublePoints(false);
      setSelectedQuestion(null);
      setRoundOneScores(null);
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

  // Check if all questions are answered
  const allQuestionsAnswered = questions.every(q => q.answered);
  
  // Check if half the questions are answered
  const answeredQuestions = questions.filter(q => q.answered).length;
  const halfQuestions = Math.floor(questions.length / 2);

  // Show notification when half the questions are answered
  useEffect(() => {
    if (answeredQuestions >= halfQuestions && !halfwayNotificationShown) {
      showHalfwayNotification();
    }
  }, [answeredQuestions, halfQuestions, halfwayNotificationShown]);

  // Add a useEffect to handle round transitions
  useEffect(() => {
    if (allQuestionsAnswered && selectedQuestion === null) {
      if (round === 1) {
        // Store round one scores
        setRoundOneScores({ teamA: teamAScore, teamB: teamBScore });
        // Signal completion to parent
        if (onRoundOneComplete) {
          onRoundOneComplete(teamAScore, teamBScore);
        }
      } else if (round === 2) {
        // End the game
        const timer = setTimeout(() => onGameEnd(teamAScore, teamBScore), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [allQuestionsAnswered, selectedQuestion, round, teamAScore, teamBScore, onGameEnd, onRoundOneComplete]);

  // Add a useEffect to handle round 2 start
  useEffect(() => {
    if (round === 2 && questions === firstRoundQuestions) {
      // Reset to second round questions
      setQuestions(secondRoundQuestions.map(q => ({ ...q, answered: false })));
      // Reset help usage for round 2
      setTeamAHelp({ multipleChoice: false, teacher: false, doublePoints: false });
      setTeamBHelp({ multipleChoice: false, teacher: false, doublePoints: false });
      setActiveDoublePoints(false);
    }
  }, [round, questions]);

  const currentHelp = currentTeam === "A" ? teamAHelp : teamBHelp;

  return (
    <div className="min-h-screen p-4 md:p-8 relative z-10">
      {/* Custom Notification */}
      {showCustomNotification && (
        <HalfwayNotification onClose={() => setShowCustomNotification(false)} />
      )}
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Round indicator */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-chemistry-gold">
            {round === 1 ? "الجولة الأولى" : "الجولة الثانية"}
          </h2>
          {roundOneScores && (
            <div className="mt-2 text-lg text-muted-foreground">
              نتيجة الجولة الأولى: {teamAName} {roundOneScores.teamA} - {roundOneScores.teamB} {teamBName}
            </div>
          )}
        </div>

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
