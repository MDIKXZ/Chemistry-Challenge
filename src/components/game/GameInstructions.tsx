import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Trophy, Zap, Users2, ListOrdered } from "lucide-react";

const GameInstructions = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="text-xl px-8 py-6 border-2 border-chemistry-purple/50 hover:border-chemistry-purple hover:bg-chemistry-purple/10 transition-all duration-300"
        >
          <HelpCircle className="w-6 h-6 ml-2" />
          كيف تلعب؟
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center mb-6 bg-gradient-to-r from-chemistry-green via-chemistry-purple to-chemistry-gold bg-clip-text text-transparent">
            شرح اللعبة
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-right">
          {/* Game Concept */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-chemistry-green flex items-center gap-2 justify-end">
              <span>💡 فكرة اللعبة</span>
            </h3>
            <p className="text-foreground leading-relaxed">
              مسابقة كيميائية تنافسية بين فريقين، يختار كل فريق أسئلة بنقاط مختلفة (200، 400، 600) من أربع فئات. الفريق الذي يجمع أكبر عدد من النقاط يفوز!
            </p>
          </section>

          {/* How to Play */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-chemistry-purple flex items-center gap-2 justify-end">
              <span>🎮 طريقة اللعب</span>
            </h3>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-chemistry-purple font-bold">1.</span>
                <span>يبدأ فريق عشوائي باختيار سؤال من الشبكة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-chemistry-purple font-bold">2.</span>
                <span>لديهم 60 ثانية للإجابة، وإذا لم يجيبوا ينتقل السؤال للفريق الآخر (15 ثانية)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-chemistry-purple font-bold">3.</span>
                <span>الإجابة الصحيحة تحصد نقاط السؤال</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-chemistry-purple font-bold">4.</span>
                <span>ينتقل الدور للفريق الآخر بعد كل سؤال</span>
              </li>
            </ul>
          </section>

          {/* Help Tools */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-chemistry-gold flex items-center gap-2 justify-end">
              <span>🛠️ وسائل المساعدة</span>
            </h3>
            <div className="space-y-3">
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3 justify-end mb-2">
                  <span className="font-semibold text-chemistry-gold">مضاعفة النقاط</span>
                  <Zap className="w-5 h-5 text-chemistry-gold" />
                </div>
                <p className="text-sm text-muted-foreground">
                  تُفعل قبل اختيار السؤال - تضاعف النقاط إذا أجاب الفريق صحيحاً. تُستخدم مرة واحدة لكل فريق.
                </p>
              </div>
              
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3 justify-end mb-2">
                  <span className="font-semibold text-chemistry-purple">الخيارات المتعددة</span>
                  <ListOrdered className="w-5 h-5 text-chemistry-purple" />
                </div>
                <p className="text-sm text-muted-foreground">
                  تُظهر أربعة خيارات للسؤال. إذا استخدمها أي فريق، لا يستطيع أي فريق استخدامها مرة أخرى.
                </p>
              </div>
              
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3 justify-end mb-2">
                  <span className="font-semibold text-chemistry-green">الاستعانة بالمعلم</span>
                  <Users2 className="w-5 h-5 text-chemistry-green" />
                </div>
                <p className="text-sm text-muted-foreground">
                  تمنح 20 ثانية إضافية للمعلم لمساعدة الفريق. كل فريق يستطيع استخدامها مرة واحدة فقط.
                </p>
              </div>
            </div>
          </section>

          {/* Winning */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-chemistry-green flex items-center gap-2 justify-end">
              <Trophy className="w-6 h-6" />
              <span>طريقة الفوز</span>
            </h3>
            <p className="text-foreground leading-relaxed">
              بعد الإجابة على جميع الأسئلة، الفريق صاحب أعلى نقاط يفوز بالتحدي! 🏆
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameInstructions;
