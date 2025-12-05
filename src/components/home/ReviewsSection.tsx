import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Johnson",
    handle: "@alexj",
    text: "Munir's work is simply breathtaking. The attention to detail and the cinematic quality of the photos are unparalleled. Highly recommended!",
    avatarId: "avatar-1",
  },
  {
    name: "Samantha Bee",
    handle: "@sam_b",
    text: "Working with Munir was a dream. Professional, creative, and delivered a final product that exceeded all my expectations. The photos are pure art.",
    avatarId: "avatar-2",
  },
  {
    name: "Chris Evans",
    handle: "@chrise",
    text: "The best photographer I've had the pleasure of working with. The shots have a unique energy and depth that's hard to find. 10/10.",
    avatarId: "avatar-3",
  },
];

export function ReviewsSection() {
  const avatarImages = PlaceHolderImages;

  return (
    <section id="reviews" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            What Clients Are Saying
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Real feedback from happy clients who have experienced the magic.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto mt-12 w-full max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatar = avatarImages.find(img => img.id === testimonial.avatarId);
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col justify-between p-6">
                        <div>
                          <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                            ))}
                          </div>
                          <p className="mt-4 text-foreground/80">"{testimonial.text}"</p>
                        </div>
                        <div className="mt-6 flex items-center gap-4">
                          {avatar && (
                             <Avatar>
                              <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
