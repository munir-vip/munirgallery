'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductSection } from '@/components/home/ProductSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { FaqSection } from '@/components/home/FaqSection';
import { CtaSection } from '@/components/home/CtaSection';
import { LoadingScreen } from '@/components/home/LoadingScreen';
import { variants } from '@/data/variants';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoaded={() => setIsLoading(false)} />
      ) : (
        <>
          <Header />
          <main>
            <HeroSection />
            <ProductSection />
            <ReviewsSection />
            <FaqSection />
            <CtaSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
