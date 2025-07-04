import { Button, ButtonProps } from '@/components/ui/button';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';
import { ImpactStyle } from '@capacitor/haptics';
import { cn } from '@/lib/utils';

interface MobileOptimizedButtonProps extends ButtonProps {
  hapticFeedback?: boolean;
  hapticStyle?: ImpactStyle;
}

const MobileOptimizedButton = ({ 
  children, 
  className, 
  onClick, 
  hapticFeedback = true,
  hapticStyle = ImpactStyle.Medium,
  ...props 
}: MobileOptimizedButtonProps) => {
  const { triggerHaptic, isNative } = useMobileFeatures();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hapticFeedback && isNative) {
      await triggerHaptic(hapticStyle);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      {...props}
      className={cn(
        // Mobile-optimized touch targets
        'min-h-[44px] min-w-[44px] touch-manipulation',
        // Better touch feedback
        'active:scale-95 transition-transform duration-75',
        className
      )}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default MobileOptimizedButton;