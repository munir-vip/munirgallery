import { Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-neutral-400 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <a href="#" className="font-headline text-2xl text-white">Munir</a>
            <p className="text-sm mt-2">Cinematic Photography</p>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#product" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
          <div className="flex gap-6">
            <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-white transition-colors" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-white transition-colors" /></a>
            <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-white transition-colors" /></a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm">
          <p>&copy; {currentYear} Munir Gallery. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
