import { Button } from "@/components/ui/button";
import { Beaker, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative z-10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-chemistry-green/10 animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-1/4 right-20 w-16 h-16 rounded-full bg-chemistry-purple/10 animate-[float_5s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-chemistry-gold/10 animate-[float_7s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-20 right-1/3 w-12 h-12 rounded-full bg-teamA/10 animate-[float_4s_ease-in-out_infinite_0.5s]" />
      </div>

      <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo & Title */}
        <div className="space-y-6">
          <div className="inline-block p-6 bg-chemistry-green/20 rounded-3xl mb-4 animate-float relative">
            <Beaker className="w-20 h-20 text-chemistry-green animate-[pulse_2s_ease-in-out_infinite]" />
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-chemistry-gold animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-chemistry-purple animate-pulse" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-7xl font-bold leading-tight pb-2 animate-[fade-in_0.6s_ease-out]">
              <span className="bg-gradient-to-r from-chemistry-green via-chemistry-purple to-chemistry-gold bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                تحدي الكيمياء
              </span>
            </h1>
            <p className="text-3xl font-semibold text-muted-foreground tracking-wide animate-[fade-in_0.8s_ease-out_0.2s_both]">Chemistry Challenge</p>
          </div>
        </div>

        {/* School Info */}
        <div className="space-y-6 text-lg max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-chemistry-green/50 hover:shadow-lg hover:shadow-chemistry-green/20 transition-all duration-300 hover:scale-105 animate-[fade-in_0.6s_ease-out_0.3s_both] group">
              <div className="flex items-start gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🏫</span>
                <div className="space-y-1 text-right flex-1">
                  <p className="font-semibold text-chemistry-green text-lg">المدرسة</p>
                  <p className="text-xl font-medium text-foreground">ثانوية الفيصل</p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-chemistry-purple/50 hover:shadow-lg hover:shadow-chemistry-purple/20 transition-all duration-300 hover:scale-105 animate-[fade-in_0.6s_ease-out_0.4s_both] group">
              <div className="flex items-start gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">👨‍🏫</span>
                <div className="space-y-1 text-right flex-1">
                  <p className="font-semibold text-chemistry-purple text-lg">إشراف المعلم</p>
                  <p className="text-xl font-medium text-foreground">عصام الشهري</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-chemistry-gold/50 hover:shadow-lg hover:shadow-chemistry-gold/20 transition-all duration-300 hover:scale-105 animate-[fade-in_0.6s_ease-out_0.5s_both] group">
            <div className="flex items-start gap-4">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">👨‍💼</span>
              <div className="space-y-1 text-right flex-1">
                <p className="font-semibold text-chemistry-gold text-lg">مدير المدرسة</p>
                <p className="text-xl font-medium text-foreground">محمد بن عبدالله الباحوث</p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-chemistry-green/50 hover:shadow-lg hover:shadow-chemistry-green/20 transition-all duration-300 hover:scale-105 animate-[fade-in_0.6s_ease-out_0.6s_both] group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">👥</span>
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fade-in_0.8s_ease-out_0.7s_both]">
          <Button
            onClick={onStart}
            size="lg"
            className="text-2xl px-12 py-8 bg-gradient-to-r from-chemistry-purple to-chemistry-green hover:from-chemistry-purple/90 hover:to-chemistry-green/90 shadow-lg hover:shadow-chemistry-purple/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="group-hover:animate-bounce inline-block">🧪</span>
              ابدأ اللعبة
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-chemistry-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <Button
            onClick={() => navigate("/instructions")}
            variant="outline"
            size="lg"
            className="text-xl px-8 py-6 border-2 border-chemistry-purple/50 hover:border-chemistry-purple hover:bg-chemistry-purple/10 transition-all duration-300 hover:scale-105 group"
          >
            كيف تلعب؟
            <HelpCircle className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
