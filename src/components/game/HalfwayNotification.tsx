import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface HalfwayNotificationProps {
  onClose: () => void;
}

const HalfwayNotification = ({ onClose }: HalfwayNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait 2 seconds before showing the notification
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    // Auto close after 7 seconds (9 seconds total from component mount)
    const closeTimer = setTimeout(() => {
      handleClose();
    }, 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before removing
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-5 pr-14 min-w-[450px] max-w-[90vw] backdrop-blur-md">
        <div className="flex items-start">
          <div className="flex-1 text-center">
            <p className="text-2xl font-semibold text-foreground">
              الله يرزق أستاذ عصام الشهري 10 مليون دينار كويتي 🤲🏻
            </p>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Close notification"
          >
            <X size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HalfwayNotification;