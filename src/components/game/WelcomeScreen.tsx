import { Button } from "@/components/ui/button";
import { Beaker, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative z-10">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo & Title */}
        <div className="space-y-6">
          <div className="inline-block p-6 bg-chemistry-green/20 rounded-3xl mb-4 animate-float">
            <Beaker className="w-20 h-20 text-chemistry-green" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-7xl font-bold leading-tight pb-2">
              <span className="bg-gradient-to-r from-chemistry-green via-chemistry-purple to-chemistry-gold bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                تحدي الكيمياء
              </span>
            </h1>
            <p className="text-3xl font-semibold text-muted-foreground tracking-wide">Chemistry Challenge</p>
          </div>
        </div>

        {/* School Info */}
        <div className="space-y-6 text-lg max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-chemistry-green/50 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🏫</span>
                <div className="space-y-1 text-right flex-1">
                  <p className="font-semibold text-chemistry-green text-lg">المدرسة</p>
                  <p className="text-xl font-medium text-foreground">ثانوية الفيصل</p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-chemistry-purple/50 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-3xl">👨‍🏫</span>
                <div className="space-y-1 text-right flex-1">
                  <p className="font-semibold text-chemistry-purple text-lg">إشراف المعلم</p>
                  <p className="text-xl font-medium text-foreground">عصام الشهري</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-chemistry-gold/50 transition-all">
            <div className="flex items-start gap-4">
              <span className="text-3xl">👨‍💼</span>
              <div className="space-y-1 text-right flex-1">
                <p className="font-semibold text-chemistry-gold text-lg">مدير المدرسة</p>
                <p className="text-xl font-medium text-foreground">محمد بن عبدالله الباحوث</p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-chemistry-green/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">👥</span>
              <p className="font-semibold text-chemistry-green text-xl">فريق العمل</p>
            </div>
            <div className="space-y-3 text-lg text-right">
              <div>
                <p>
                  <span className="text-chemistry-purple font-semibold">تصميم وبرمجة:</span> <span className="text-foreground font-bold text-xl">هيثم منير الجبري</span>
                </p>
              </div>
              <div>
                <p>
                  <span className="text-chemistry-gold font-semibold">كتابة الأسئلة والإعداد:</span> <span className="text-foreground">رياض عبده - صقر القحطاني - أحمد وائل</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onStart}
            size="lg"
            className="text-2xl px-12 py-8 bg-gradient-to-r from-chemistry-purple to-chemistry-green hover:from-chemistry-purple/90 hover:to-chemistry-green/90 shadow-lg hover:shadow-chemistry-purple/50 transition-all duration-300 hover:scale-105"
          >
            🧪 ابدأ اللعبة
          </Button>
          <Button
            onClick={() => navigate("/instructions")}
            variant="outline"
            size="lg"
            className="text-xl px-8 py-6 border-2 border-chemistry-purple/50 hover:border-chemistry-purple hover:bg-chemistry-purple/10 transition-all duration-300"
          >
            كيف تلعب؟
            <HelpCircle className="w-6 h-6 mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
