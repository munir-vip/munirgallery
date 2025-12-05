"use client";

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { variants } from '@/data/variants';

interface LoadingScreenProps {
  onLoaded: () => void;
}

const getFrameUrl = (frame: number): string => {
  const variant = variants[0]; // Preload first variant
  const paddedFrame = String(frame).padStart(3, '0');
  return variant.sequence.url.replace('{frame}', paddedFrame);
};

export function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ensure this runs only on the client
    let isMounted = true;

    const preloadImages = async () => {
      const frameCount = variants[0].sequence.frameCount;
      const frameUrls = Array.from({ length: frameCount }, (_, i) => getFrameUrl(i));
      let loadedCount = 0;

      const promises = frameUrls.map(url => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          const onFinish = () => {
            if (isMounted) {
                loadedCount++;
                setProgress((loadedCount / frameCount) * 100);
            }
            resolve();
          };
          img.onload = onFinish;
          img.onerror = onFinish; // Resolve even on error to not block the app
        });
      });

      await Promise.all(promises);
      
      if (isMounted) {
        // A small delay to appreciate the loaded bar
        setTimeout(() => onLoaded(), 500);
      }
    };

    preloadImages();

    return () => {
        isMounted = false;
    }
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold">Munir</h1>
        <div className="mt-8 w-64">
          <Progress value={progress} className="h-2" />
          <p className="mt-4 text-sm text-muted-foreground">
            Loading {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
