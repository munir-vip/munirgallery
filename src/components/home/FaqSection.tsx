import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What kind of photography do you specialize in?",
    answer: "I specialize in portrait and lifestyle photography, focusing on capturing authentic moments and personalities. I also have experience in event and product photography.",
  },
  {
    question: "How can I book a session?",
    answer: "You can book a session by contacting me through the Telegram button on this website or by sending me a direct message on Instagram. We'll discuss your needs and schedule a date.",
  },
  {
    question: "What is your editing process?",
    answer: "My editing process focuses on enhancing the natural beauty of the photos. I adjust colors, contrast, and lighting to create a timeless and cinematic look, consistent with the style you see in my portfolio.",
  },
  {
    question: "How long does it take to receive the final photos?",
    answer: "The turnaround time for final photos is typically 1-2 weeks after our session. I take great care in post-production to ensure every image is perfect.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Have questions? Here are some of the most common things people ask.
          </p>
        </div>
        <Accordion type="single" collapsible className="mx-auto mt-12 max-w-3xl">
          {faqData.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
