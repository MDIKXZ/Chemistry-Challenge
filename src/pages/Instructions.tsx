import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Zap, Users2, ListOrdered, Clock, Target, RotateCcw, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 relative z-10">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-chemistry-green via-chemistry-purple to-chemistry-gold bg-clip-text text-transparent">
            شرح اللعبة
          </h1>
          <p className="text-xl text-muted-foreground">دليلك الكامل للعب تحدي الكيمياء</p>
        </div>

        {/* Game Concept */}
        <section className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border hover:border-chemistry-green/50 transition-all space-y-4 animate-fade-in">
          <div className="flex items-center gap-3 justify-end mb-4">
            <h2 className="text-3xl font-bold text-chemistry-green">فكرة اللعبة</h2>
            <Target className="w-10 h-10 text-chemistry-green" />
          </div>
          <div className="text-right space-y-3">
            <p className="text-xl leading-relaxed text-foreground">
              مسابقة كيميائية تنافسية بين فريقين في نظام جولتين:
            </p>
            <div className="bg-gradient-to-r from-chemistry-gold/20 to-chemistry-purple/20 rounded-xl p-4 mt-4">
              <ul className="text-right space-y-2 text-lg text-foreground">
                <li>• الجولة الأولى: أسئلة حول المحاليل والخصائص الفيزيائية</li>
                <li>• الجولة الثانية: أسئلة حول الأحماض والقواعد</li>
                <li>• النتيجة النهائية: مجموع النقاط من الجولتين</li>
              </ul>
            </div>
            <p className="text-2xl font-bold text-chemistry-gold mt-4">
              🏆 الفريق الذي يجمع أكبر عدد من النقاط في الجولتين يفوز!
            </p>
          </div>
        </section>

        {/* How to Play */}
        <section className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border hover:border-chemistry-purple/50 transition-all space-y-6 animate-fade-in" style={{animationDelay: "0.1s"}}>
          <div className="flex items-center gap-3 justify-end mb-4">
            <h2 className="text-3xl font-bold text-chemistry-purple">طريقة اللعب</h2>
            <Clock className="w-10 h-10 text-chemistry-purple" />
          </div>
          <div className="space-y-6">
            {[
              { step: "1", text: "يبدأ فريق عشوائي باختيار سؤال من الشبكة", color: "chemistry-purple" },
              { step: "2", text: "لديهم 60 ثانية للإجابة", color: "chemistry-purple" },
              { step: "3", text: "إذا لم يجيبوا، ينتقل السؤال للفريق الآخر (15 ثانية)", color: "chemistry-purple" },
              { step: "4", text: "الإجابة الصحيحة تحصد نقاط السؤال", color: "chemistry-gold" },
              { step: "5", text: "ينتقل الدور للفريق الآخر بعد كل سؤال", color: "chemistry-green" },
              { step: "6", text: "نهاية الجولة الأولى: عرض النتائج والانتقال للجولة الثانية", color: "chemistry-gold" },
              { step: "7", text: "نهاية الجولة الثانية: إعلان الفائز النهائي", color: "chemistry-purple" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-all">
                <div className={`w-12 h-12 rounded-full bg-${item.color}/20 border-2 border-${item.color} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-xl font-bold text-${item.color}`}>{item.step}</span>
                </div>
                <p className="text-lg text-foreground flex-1 text-right">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Help Tools */}
        <section className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border hover:border-chemistry-gold/50 transition-all space-y-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <div className="flex items-center gap-3 justify-end mb-4">
            <h2 className="text-3xl font-bold text-chemistry-gold">وسائل المساعدة</h2>
            <Zap className="w-10 h-10 text-chemistry-gold" />
          </div>
          <p className="text-xl text-center bg-gradient-to-r from-chemistry-gold/20 to-chemistry-purple/20 rounded-xl p-4 font-bold text-foreground mb-6">
            ⭐ كل فريق يستطيع استخدام كل وسيلة مرة واحدة فقط (تُجدّد تلقائياً في الجولة الثانية)
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Double Points */}
            <div className="bg-gradient-to-br from-chemistry-gold/10 to-chemistry-gold/5 rounded-2xl p-6 border-2 border-chemistry-gold/30 hover:border-chemistry-gold transition-all hover:scale-105 duration-300 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-chemistry-gold/20 flex items-center justify-center">
                  <Zap className="w-9 h-9 text-chemistry-gold" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-chemistry-gold text-center">مضاعفة النقاط</h3>
              <div className="space-y-3 text-right">
                <p className="text-lg text-foreground">
                  ⚡ تُفعّل <span className="font-bold text-chemistry-gold">قبل</span> اختيار السؤال
                </p>
                <p className="text-lg text-foreground">
                  ✨ تضاعف النقاط إذا أجاب الفريق صحيحاً
                </p>
                <p className="text-lg font-bold text-chemistry-gold">
                  استخدام واحد لكل فريق
                </p>
              </div>
            </div>

            {/* Multiple Choice */}
            <div className="bg-gradient-to-br from-chemistry-purple/10 to-chemistry-purple/5 rounded-2xl p-6 border-2 border-chemistry-purple/30 hover:border-chemistry-purple transition-all hover:scale-105 duration-300 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-chemistry-purple/20 flex items-center justify-center">
                  <ListOrdered className="w-9 h-9 text-chemistry-purple" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-chemistry-purple text-center">الخيارات المتعددة</h3>
              <div className="space-y-3 text-right">
                <p className="text-lg text-foreground">
                  📝 تُظهر أربعة خيارات للسؤال
                </p>
                <p className="text-lg text-foreground">
                  🎯 تسهّل الإجابة على السؤال
                </p>
                <p className="text-lg font-bold text-chemistry-purple">
                  استخدام واحد لكل فريق
                </p>
              </div>
            </div>

            {/* Teacher Help */}
            <div className="bg-gradient-to-br from-chemistry-green/10 to-chemistry-green/5 rounded-2xl p-6 border-2 border-chemistry-green/30 hover:border-chemistry-green transition-all hover:scale-105 duration-300 space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-chemistry-green/20 flex items-center justify-center">
                  <Users2 className="w-9 h-9 text-chemistry-green" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-chemistry-green text-center">الاستعانة بالمعلم</h3>
              <div className="space-y-3 text-right">
                <p className="text-lg text-foreground">
                  👨‍🏫 تمنح 20 ثانية إضافية
                </p>
                <p className="text-lg text-foreground">
                  💡 المعلم يساعد الفريق في الإجابة
                </p>
                <p className="text-lg font-bold text-chemistry-green">
                  استخدام واحد لكل فريق
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Winning */}
        <section className="bg-gradient-to-r from-chemistry-gold/20 via-chemistry-purple/20 to-chemistry-green/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-chemistry-gold/50 space-y-4 animate-fade-in" style={{animationDelay: "0.3s"}}>
          <div className="flex items-center gap-3 justify-center mb-4">
            <Trophy className="w-12 h-12 text-chemistry-gold" />
            <h2 className="text-3xl font-bold text-chemistry-gold">طريقة الفوز</h2>
            <Trophy className="w-12 h-12 text-chemistry-gold" />
          </div>
          <p className="text-2xl text-center leading-relaxed text-foreground font-semibold">
            بعد الإجابة على جميع الأسئلة في الجولتين، الفريق صاحب أعلى نقاط مجمع يفوز بالتحدي! 🏆
          </p>
          <div className="flex justify-center gap-2 pt-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-4xl animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>⭐</span>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <div className="flex justify-center pt-6 animate-fade-in" style={{animationDelay: "0.4s"}}>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="text-xl px-10 py-7 bg-gradient-to-r from-chemistry-purple to-chemistry-green hover:from-chemistry-purple/90 hover:to-chemistry-green/90 shadow-lg transition-all duration-300 hover:scale-105 gap-3"
          >
            <ArrowRight className="w-6 h-6" />
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;