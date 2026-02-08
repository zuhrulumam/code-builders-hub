import { Twitter, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'hsl(162, 73%, 17%)' }}>
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left - Branding */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-extrabold text-text-on-dark">CodeWithUmam</span>
              <span className="text-xl">🚀</span>
            </div>
            <p className="text-white/60">Untuk Yang Pengen Mulai 🇮🇩</p>
          </div>
          
          {/* Right - Social Links */}
          <div className="flex items-center gap-4 md:justify-end">
            <a
              href="https://twitter.com/codewithmam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-primary-500 transition-colors"
            >
              <Twitter size={22} />
            </a>
            <a
              href="https://wa.me/62xxx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-primary-500 transition-colors"
            >
              <MessageCircle size={22} />
            </a>
            <a
              href="mailto:hello@codewithmam.com"
              className="text-white/50 hover:text-primary-500 transition-colors"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-sm text-white/40 text-center md:text-left">
            © 2026 CodeWithUmam. Build with ❤️ in Surakarta.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
