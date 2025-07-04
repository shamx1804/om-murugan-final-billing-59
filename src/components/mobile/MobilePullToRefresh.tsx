import { useEffect, useState } from 'react';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';

interface MobilePullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

const MobilePullToRefresh = ({ onRefresh, children }: MobilePullToRefreshProps) => {
  const { isNative } = useMobileFeatures();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    if (!isNative) return;

    let touchStartY = 0;
    let touchCurrentY = 0;
    let isAtTop = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      setStartY(touchStartY);
      isAtTop = window.scrollY === 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isAtTop || isRefreshing) return;

      touchCurrentY = e.touches[0].clientY;
      const distance = touchCurrentY - touchStartY;

      if (distance > 0) {
        e.preventDefault();
        setPullDistance(Math.min(distance, 100));
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > 60 && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      setPullDistance(0);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isNative, onRefresh, pullDistance, isRefreshing]);

  if (!isNative) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Pull to refresh indicator */}
      {pullDistance > 0 && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center bg-blue-50 text-blue-600 transition-all duration-200 z-10"
          style={{ 
            height: `${pullDistance}px`,
            transform: `translateY(-${100 - pullDistance}%)`,
            opacity: pullDistance / 60
          }}
        >
          <div className="flex items-center gap-2">
            <div className={`animate-spin ${pullDistance > 60 ? 'block' : 'hidden'}`}>
              ⟳
            </div>
            <span className="text-sm font-medium">
              {pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isRefreshing && (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center bg-blue-50 text-blue-600 h-12 z-10">
          <div className="flex items-center gap-2">
            <div className="animate-spin">⟳</div>
            <span className="text-sm font-medium">Refreshing...</span>
          </div>
        </div>
      )}

      <div style={{ paddingTop: isRefreshing ? '48px' : '0px' }}>
        {children}
      </div>
    </div>
  );
};

export default MobilePullToRefresh;