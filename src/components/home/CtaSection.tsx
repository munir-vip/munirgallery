import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Ready to Capture Your Moment?
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-xl">
          Get in touch to discuss your next project. Let's create something beautiful together.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href="https://www.instagram.com/munir_ahmed1/" target="_blank">INSTAGRAM</Link>
          </Button>
          <Button size="lg" className="rounded-full" asChild>
            <Link href="https://t.me/munir_ahmed1" target="_blank">TELEGRAM</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
