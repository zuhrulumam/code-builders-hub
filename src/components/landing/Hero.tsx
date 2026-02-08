import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToCourses = () => {
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden" style={{ background: 'hsl(152, 76%, 97%)' }}>
      {/* Decorative Blobs */}
      <div className="blob w-[400px] h-[400px] -top-20 -right-20 md:w-[600px] md:h-[600px]" />
      <div className="blob w-[300px] h-[300px] bottom-20 -left-32 md:w-[400px] md:h-[400px]" />
      
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 dot-pattern" />
      
      <div className="container-custom section-padding relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="fade-up inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-sm mb-8">
            <span className="text-lg">🎓</span>
            <span className="text-sm font-medium text-text-body">
              Platform Belajar #1 untuk Builder Indonesia
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="fade-up delay-100 mb-6">
            Dari Ide Jadi <span className="highlight">Cuan</span>, Tanpa Jago Coding
          </h1>
          
          {/* Sub-headline */}
          <p className="fade-up delay-200 text-lg md:text-xl text-text-body max-w-2xl mb-10">
            Platform belajar build bisnis digital untuk pemula dan vibe coder. Deploy, payment gateway, automation — yang penting ide kamu jalan dan menghasilkan.
          </p>
          
          {/* CTA Group */}
          <div className="fade-up delay-300 flex flex-col sm:flex-row gap-4 mb-10">
            <button onClick={scrollToCourses} className="btn-primary group">
              Lihat Course
              <ArrowDown size={18} className="ml-2 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <a
              href="https://wa.me/62xxx"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Gabung WhatsApp Group
            </a>
          </div>
          
          {/* Social Proof */}
          <div className="fade-up delay-400 flex flex-col sm:flex-row items-center gap-4">
            {/* Avatar Stack */}
            <div className="flex -space-x-3">
              {['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'].map((color, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white"
                  style={{ background: color }}
                />
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <span className="text-sm text-text-muted">Sudah 50+ builder bergabung</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">⭐</span>
                ))}
                <span className="text-sm font-semibold text-text-heading ml-1">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
