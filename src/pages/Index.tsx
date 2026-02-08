import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import WaveDivider from '@/components/landing/WaveDivider';
import Features from '@/components/landing/Features';
import Courses from '@/components/landing/Courses';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WaveDivider fromColor="#ecfdf5" toColor="#fffbeb" />
      <Features />
      <WaveDivider fromColor="#fffbeb" toColor="#ffffff" />
      <Courses />
      <Footer />
    </div>
  );
};

export default Index;
