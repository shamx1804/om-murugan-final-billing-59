import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';
import { toast } from 'sonner';

interface MobileShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

const MobileShareButton = ({ title, text, url, className }: MobileShareButtonProps) => {
  const { shareContent, isNative } = useMobileFeatures();

  const handleShare = async () => {
    try {
      await shareContent(title, text, url);
    } catch (error) {
      toast.error('Unable to share content');
    }
  };

  if (!isNative && !navigator.share) {
    return null; // Don't show share button if not supported
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className={className}
    >
      <Share className="h-4 w-4 mr-2" />
      Share
    </Button>
  );
};

export default MobileShareButton;