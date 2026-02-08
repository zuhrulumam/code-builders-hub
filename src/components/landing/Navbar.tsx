import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border-light bg-background/95 backdrop-blur-lg">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-text-heading">CodeWithUmam</span>
            <span className="text-xl">🚀</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-text-body font-medium hover:text-primary-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="text-text-body font-medium hover:text-primary-500 transition-colors"
            >
              Courses
            </button>
          </div>

          {/* Login Button - Desktop */}
          <div className="hidden md:block">
            <button className="btn-secondary">Login</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-body hover:text-primary-500 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border-light animate-fade-in">
          <div className="container-custom py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left text-text-body font-medium hover:text-primary-500 transition-colors py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="text-left text-text-body font-medium hover:text-primary-500 transition-colors py-2"
            >
              Courses
            </button>
            <button className="btn-secondary w-full mt-2">Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
