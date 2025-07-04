import { useEffect } from 'react';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';

interface MobileAppWrapperProps {
  children: React.ReactNode;
}

const MobileAppWrapper = ({ children }: MobileAppWrapperProps) => {
  const { isNative, setStatusBarColor } = useMobileFeatures();

  useEffect(() => {
    if (isNative) {
      // Set initial status bar styling for the app
      setStatusBarColor('#1d4ed8', false);
      
      // Add mobile-specific meta tags
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }

      // Add mobile-specific styles
      const style = document.createElement('style');
      style.innerHTML = `
        /* Prevent zoom on input focus (iOS) */
        input, textarea, select {
          font-size: 16px !important;
        }
        
        /* Prevent pull-to-refresh */
        body {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          position: fixed;
          width: 100%;
          height: 100%;
        }
        
        #root {
          height: 100vh;
          overflow: hidden;
        }
        
        /* Safe area handling */
        .safe-area-top {
          padding-top: env(safe-area-inset-top);
        }
        
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        .safe-area-left {
          padding-left: env(safe-area-inset-left);
        }
        
        .safe-area-right {
          padding-right: env(safe-area-inset-right);
        }
        
        .safe-area-insets {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        
        /* Mobile optimizations */
        .touch-manipulation {
          touch-action: manipulation;
        }
        
        /* Keyboard handling */
        .keyboard-open {
          height: calc(100vh - var(--keyboard-height, 0px));
        }
        
        .keyboard-open .main-content {
          height: calc(100vh - var(--keyboard-height, 0px) - 60px);
          overflow-y: auto;
        }
        
        /* Bottom navigation safe area */
        .bottom-nav-safe {
          padding-bottom: calc(env(safe-area-inset-bottom) + 8px);
        }
      `;
      document.head.appendChild(style);
    }
  }, [isNative, setStatusBarColor]);

  return (
    <div className={`min-h-screen ${isNative ? 'safe-area-insets' : ''}`}>
      {children}
    </div>
  );
};

export default MobileAppWrapper;