import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, ArrowRight } from "lucide-react";
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

interface TeamSetupProps {
  onStartGame: (teamAName: string, teamBName: string) => void;
  onBack: () => void;
}

const TeamSetup = ({ onStartGame, onBack }: TeamSetupProps) => {
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamAName.trim() && teamBName.trim()) {
      // Check if team names are identical
      if (teamAName.trim().toLowerCase() === teamBName.trim().toLowerCase()) {
        setShowDuplicateDialog(true);
      } else {
        onStartGame(teamAName.trim(), teamBName.trim());
      }
    }
  };

  const handleConfirmDuplicate = () => {
    setShowDuplicateDialog(false);
    onStartGame(teamAName.trim(), teamBName.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative z-10">
      <div className="max-w-2xl w-full animate-fade-in">
        <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-3xl p-10 space-y-8 shadow-2xl hover:shadow-chemistry-purple/20 transition-all duration-500">
          {/* Back Button */}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Button>
          </div>

          {/* Header */}
          <div className="text-center space-y-5 animate-slide-up" dir="rtl">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <Users className="w-16 h-16 text-primary animate-pulse-glow" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-chemistry-green rounded-full animate-ping" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teamA to-teamB bg-clip-text text-transparent leading-relaxed">
              أدخل أسماء الفريقين
            </h2>
            <p className="text-muted-foreground text-lg">اختر أسماء مميزة للفريقين المتنافسين</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8" dir="rtl">
            {/* Team A */}
            <div className="space-y-3 group animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <label className="text-xl font-semibold flex items-center gap-3 transition-all duration-300 group-hover:gap-4" dir="rtl">
                <div className="w-6 h-6 rounded-full bg-teamA shadow-lg shadow-teamA/50 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-teamA transition-colors duration-300">الفريق الأزرق</span>
              </label>
              <Input
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value)}
                placeholder="أدخل اسم الفريق الأول"
                className="text-lg py-7 bg-background/50 border-2 border-teamA/30 focus:border-teamA focus:ring-2 focus:ring-teamA/20 rounded-xl transition-all duration-300 hover:border-teamA/50 text-right"
                required
                dir="rtl"
              />
            </div>

            {/* Team B */}
            <div className="space-y-3 group animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <label className="text-xl font-semibold flex items-center gap-3 transition-all duration-300 group-hover:gap-4" dir="rtl">
                <div className="w-6 h-6 rounded-full bg-teamB shadow-lg shadow-teamB/50 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-teamB transition-colors duration-300">الفريق الأحمر</span>
              </label>
              <Input
                value={teamBName}
                onChange={(e) => setTeamBName(e.target.value)}
                placeholder="أدخل اسم الفريق الثاني"
                className="text-lg py-7 bg-background/50 border-2 border-teamB/30 focus:border-teamB focus:ring-2 focus:ring-teamB/20 rounded-xl transition-all duration-300 hover:border-teamB/50 text-right"
                required
                dir="rtl"
              />
            </div>

            {/* Submit Button */}
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button
                type="submit"
                size="lg"
                className="w-full text-2xl py-8 bg-gradient-to-r from-teamA via-chemistry-purple to-teamB hover:from-teamA/90 hover:via-chemistry-purple/90 hover:to-teamB/90 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={!teamAName.trim() || !teamBName.trim()}
              >
                ابدأ التحدي! 🚀
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Duplicate Names Dialog */}
      <AlertDialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <AlertDialogContent className="bg-card/95 backdrop-blur-md border-2 border-chemistry-purple/30 shadow-2xl max-w-md">
          <div className="animate-[scale-in_0.3s_ease-out]">
            <AlertDialogHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teamA/20 to-teamB/20 flex items-center justify-center animate-pulse">
                    <span className="text-5xl animate-bounce">⚠️</span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teamA to-teamB opacity-20 blur-xl animate-pulse" />
                </div>
              </div>
              <AlertDialogTitle className="text-3xl text-center font-bold bg-gradient-to-r from-teamA via-chemistry-purple to-teamB bg-clip-text text-transparent leading-relaxed">
                أسماء الفرق متطابقة
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-lg text-muted-foreground leading-relaxed px-4">
                لقد قمت بإدخال نفس الاسم للفريقين. هل أنت متأكد من رغبتك في الاستمرار بنفس الأسماء؟
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-3 mt-8 px-6">
              <AlertDialogAction
                onClick={handleConfirmDuplicate}
                className="w-full bg-gradient-to-r from-teamA via-chemistry-purple to-teamB hover:from-teamA/90 hover:via-chemistry-purple/90 hover:to-teamB/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg py-6 animate-[fade-in_0.4s_ease-out]"
              >
                نعم، استمر
              </AlertDialogAction>
              <AlertDialogCancel className="w-full border-2 hover:bg-accent/50 text-lg py-6 transition-all duration-300 hover:scale-105 animate-[fade-in_0.4s_ease-out_0.1s_both]">
                لا، سأغير الأسماء
              </AlertDialogCancel>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamSetup;
