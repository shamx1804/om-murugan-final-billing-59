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
    } else {
      // Reset when keyboard is closed
      root.style.removeProperty('--keyboard-height');
      document.body.classList.remove('keyboard-open');
    }

    // Add CSS for keyboard handling
    const style = document.createElement('style');
    style.id = 'keyboard-handler-styles';
    style.innerHTML = `
      .keyboard-open {
        height: calc(100vh - var(--keyboard-height, 0px));
        overflow: hidden;
      }
      
      .keyboard-open .main-content {
        height: calc(100vh - var(--keyboard-height, 0px));
        overflow-y: auto;
      }
      
      /* Ensure form inputs are visible when keyboard is open */
      .keyboard-open input:focus,
      .keyboard-open textarea:focus {
        transform: translateY(-50px);
        transition: transform 0.3s ease;
      }
    `;

    if (!document.getElementById('keyboard-handler-styles')) {
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById('keyboard-handler-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isNative, keyboardHeight, isKeyboardOpen]);

  return null;
};

export default MobileKeyboardHandler;