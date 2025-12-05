import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ProductSection() {
  const productImage = PlaceHolderImages.find(p => p.id === 'product-image');

  return (
    <section id="product" className="py-20 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              About the Photo
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              This is not just about taking pictures. It's about capturing a feeling, a moment in time that tells a story. My work as a GAMER informs my perspective, bringing a dynamic and immersive quality to every shot. I aim to create visuals that are not only seen but felt.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Each photograph is a piece of a larger narrative, meticulously crafted with a cinematic eye. From the lighting to the composition, every detail is considered to produce a premium, unforgettable image.
            </p>
          </div>
          <div className="flex justify-center">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={productImage.description}
                width={600}
                height={600}
                className="rounded-lg shadow-2xl"
                data-ai-hint={productImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
