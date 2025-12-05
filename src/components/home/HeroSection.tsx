"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { variants } from '@/data/variants';
import type { Variant } from '@/data/variants';
import { ArrowLeft, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Helper to generate the full URL for a specific frame
const getFrameUrl = (variant: Variant, frame: number): string => {
  const paddedFrame = String(frame).padStart(3, '0');
  return variant.sequence.url.replace('{frame}', paddedFrame);
};

export function HeroSection() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isLoadingSequence, setIsLoadingSequence] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const currentVariant = useMemo(() => variants[currentVariantIndex], [currentVariantIndex]);

  const preloadSequence = useCallback(async (variant: Variant) => {
    setIsLoadingSequence(true);
    setLoadingProgress(0);
    const frameCount = variant.sequence.frameCount;
    const frameUrls = Array.from({ length: frameCount }, (_, i) => getFrameUrl(variant, i));
    let loadedCount = 0;

    const promises = frameUrls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / frameCount) * 100);
          resolve();
        };
        img.onerror = () => {
          // Even if one frame fails, we resolve to not block the UI.
          // The browser will show a broken image for that frame.
          loadedCount++;
          setLoadingProgress((loadedCount / frameCount) * 100);
          resolve();
        }
      });
    });

    await Promise.all(promises);
    setIsLoadingSequence(false);
  }, []);

  const changeVariant = useCallback((newIndex: number) => {
    if (newIndex === currentVariantIndex || isLoadingSequence) return;
    
    setIsFading(true);
    setTimeout(() => {
      setCurrentVariantIndex(newIndex);
      setCurrentFrame(0); // Reset frame on variant change
      preloadSequence(variants[newIndex]).then(() => {
        setIsFading(false);
      });
    }, 300); // Wait for fade-out animation
  }, [currentVariantIndex, isLoadingSequence, preloadSequence]);

  const handlePrev = () => {
    changeVariant((currentVariantIndex - 1 + variants.length) % variants.length);
  };

  const handleNext = () => {
    changeVariant((currentVariantIndex + 1) % variants.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Animate over the first 300vh of scroll
      const animationScrollHeight = window.innerHeight * 2;
      
      let scrollFraction = scrollY / animationScrollHeight;
      if (scrollFraction < 0) scrollFraction = 0;
      if (scrollFraction > 1) scrollFraction = 1;

      const frameIndex = Math.floor(scrollFraction * (currentVariant.sequence.frameCount - 1));
      setCurrentFrame(frameIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentVariant]);

  const currentFrameUrl = useMemo(() => getFrameUrl(currentVariant, currentFrame), [currentVariant, currentFrame]);

  return (
    <section className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Image Sequence */}
        <img
          src={currentFrameUrl}
          alt="Parallax background"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          key={currentVariant.name}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content Overlay */}
        <div className="relative z-10 grid h-full grid-cols-12 grid-rows-6 p-8 text-primary-foreground">
          {/* Left Text Block */}
          <div className="col-span-10 md:col-span-5 row-start-2 row-span-4 flex flex-col justify-center">
            <h1 className="text-xs tracking-[0.3em] font-light">MUNIR</h1>
            <div className={cn(
                "transition-opacity duration-300",
                isFading ? "opacity-0" : "opacity-100"
            )}>
              <p className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter my-4">
                {currentVariant.name}
              </p>
              <p className="text-lg font-light tracking-widest uppercase">
                {currentVariant.subtitle}
              </p>
              <p className="mt-6 max-w-md text-base font-light text-neutral-300">
                {currentVariant.description}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <Button size="lg" variant="outline" className="rounded-full bg-transparent text-white border-white hover:bg-white hover:text-black" asChild>
                <Link href="https://www.instagram.com/munir_ahmed1/" target="_blank">INSTAGRAM</Link>
              </Button>
              <Button size="lg" className="rounded-full" asChild>
                <Link href="https://t.me/munir_ahmed1" target="_blank">TELEGRAM</Link>
              </Button>
            </div>
          </div>

          {/* Right Variant Navigation */}
          <div className="col-span-2 md:col-span-1 md:col-start-12 row-start-2 row-span-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-sm font-light">
              <button onClick={handlePrev} disabled={variants.length <= 1} className="flex flex-col items-center gap-2 hover:text-primary-foreground/80 disabled:opacity-50">
                <span>PREV</span>
              </button>
              <div className="h-24 w-px bg-white/30 my-2"></div>
              <button onClick={handleNext} disabled={variants.length <= 1} className="flex flex-col items-center gap-2 hover:text-primary-foreground/80 disabled:opacity-50">
                <span>NEXT</span>
              </button>
            </div>
          </div>
          <div className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 flex items-center">
             {isLoadingSequence && <div className="w-16"><Progress value={loadingProgress} className="h-1 bg-white/20" /></div>}
            <span className={cn(
                "font-headline text-8xl md:text-9xl transition-opacity duration-300",
                isFading ? 'opacity-0' : 'opacity-100'
            )}>
              {String(currentVariantIndex + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Bottom Social Icons */}
          <div className="col-span-12 row-start-6 flex items-center justify-center gap-6">
            <a href="https://www.instagram.com/munir_ahmed1/" target="_blank" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-primary-foreground/80" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
