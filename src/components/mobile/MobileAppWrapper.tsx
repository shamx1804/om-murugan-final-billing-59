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
      setStatusBarColor('#ffffff', false);
      
      // Add mobile-specific meta tags
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }

      // Prevent zoom on input focus (iOS)
      const style = document.createElement('style');
      style.innerHTML = `
        input, textarea, select {
          font-size: 16px !important;
        }
        
        /* Prevent pull-to-refresh */
        body {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
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