import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SacredSpaces } from '@/components/SacredSpaces';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<string>('hero');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content Area */}
      <div id="main-content" className="relative">
        <SacredSpaces />
      </div>
    </div>
  );
};

export default Index;
