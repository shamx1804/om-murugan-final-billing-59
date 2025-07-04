import { useEffect } from 'react';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';

const MobileKeyboardHandler = () => {
  const { isNative, keyboardHeight, isKeyboardOpen } = useMobileFeatures();

  useEffect(() => {
    if (!isNative) return;

    const root = document.documentElement;
    
    if (isKeyboardOpen) {
      // Adjust viewport when keyboard is open
      root.style.setProperty('--keyboard-height', `${keyboardHeight}px`);
      document.body.classList.add('keyboard-open');
      
      // Scroll focused input into view
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        setTimeout(() => {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    } else {
      // Reset when keyboard is closed
      root.style.removeProperty('--keyboard-height');
      document.body.classList.remove('keyboard-open');
    }

    return () => {
      root.style.removeProperty('--keyboard-height');
      document.body.classList.remove('keyboard-open');
    };
  }, [isNative, keyboardHeight, isKeyboardOpen]);

  return null;
};

export default MobileKeyboardHandler;