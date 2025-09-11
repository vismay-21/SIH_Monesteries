import { useState } from 'react';
import { X, Calendar, MapPin, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { PersonaData } from '@/pages/JourneyPlanner.tsx';

// Import banner images
import seekerBanner from '@/assets/rumtek.jpg';
import pilgrimBanner from '@/assets/rumtek.jpg';
import loversBanner from '@/assets/rumtek.jpg';
import familyBanner from '@/assets/rumtek.jpg';
import adventurersBanner from '@/assets/rumtek.jpg';

interface JourneyModalProps {
  persona: PersonaData;
  onClose: () => void;
}

const bannerImages: Record<string, string> = {
  seeker: seekerBanner,
  pilgrim: pilgrimBanner,
  lovers: loversBanner,
  family: familyBanner,
  adventurers: adventurersBanner,
};

export const JourneyModal = ({ persona, onClose }: JourneyModalProps) => {
  const [activeSection, setActiveSection] = useState('story');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex h-full max-h-[90vh]">
      {/* Main Content - Left Column */}
      <div className="flex-1 flex flex-col">
        {/* Header Banner */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={bannerImages[persona.id]} 
            alt={persona.modalTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="bg-black/20 hover:bg-black/40 text-white border-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <Badge className="bg-saffron text-saffron-foreground mb-2">
              {persona.emoji} {persona.title}
            </Badge>
            <h2 className="text-3xl font-serif font-bold">
              {persona.modalTitle}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 p-8">
          <div className="space-y-12">
            {/* The Story Section */}
            <section id="story" className="scroll-mt-8">
              <h3 className="text-2xl font-serif font-semibold mb-4 text-foreground">
                The Story
              </h3>
              <p className="text-lg font-body text-muted-foreground leading-relaxed">
                {persona.story}
              </p>
            </section>

            {/* Your Path Section */}
            <section id="path" className="scroll-mt-8">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-foreground">
                Your Path
              </h3>
              <div className="space-y-6">
                {persona.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center group-hover:bg-teal/20 transition-colors">
                      <item.icon className="w-6 h-6 text-teal" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-serif font-semibold text-foreground mb-2">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground font-body">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Plan Your Trip Section */}
            <section id="plan" className="scroll-mt-8">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-foreground">
                Plan Your Trip
              </h3>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="insider-tip" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Coffee className="w-5 h-5 text-saffron" />
                      <span className="font-serif">Insider Tip</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground font-body">
                      {persona.insiderTip}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="best-time" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-saffron" />
                      <span className="font-serif">Best Time to Visit</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground font-body">
                      October to December and March to May offer the clearest mountain views and most pleasant weather. 
                      Avoid monsoon season (June-September) for the best experience.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-to-bring" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-saffron" />
                      <span className="font-serif">What to Bring</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="text-muted-foreground font-body space-y-2">
                      <li>• Comfortable walking shoes</li>
                      <li>• Layered clothing for varying temperatures</li>
                      <li>• Respectful attire for monastery visits</li>
                      <li>• Camera with extra batteries</li>
                      <li>• Small backpack for day trips</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* CTA Button */}
            <div className="pt-8 border-t border-border">
              <Button 
                size="lg" 
                className="w-full bg-saffron hover:bg-saffron/90 text-saffron-foreground font-body text-lg py-6"
              >
                Start Planning This Journey
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Navigation Sidebar - Right Column */}
      <div className="w-64 bg-muted/30 border-l border-border p-6">
        <div className="sticky top-6 space-y-4">
          <h4 className="font-serif font-semibold text-foreground mb-4">
            Quick Navigation
          </h4>
          <nav className="space-y-2">
            <button
              onClick={() => scrollToSection('story')}
              className={`w-full text-left p-3 rounded-lg transition-colors font-body ${
                activeSection === 'story' 
                  ? 'bg-teal/10 text-teal border border-teal/20' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              The Story
            </button>
            <button
              onClick={() => scrollToSection('path')}
              className={`w-full text-left p-3 rounded-lg transition-colors font-body ${
                activeSection === 'path' 
                  ? 'bg-teal/10 text-teal border border-teal/20' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              Your Path
            </button>
            <button
              onClick={() => scrollToSection('plan')}
              className={`w-full text-left p-3 rounded-lg transition-colors font-body ${
                activeSection === 'plan' 
                  ? 'bg-teal/10 text-teal border border-teal/20' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              Plan Your Trip
            </button>
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-background/50 rounded-lg border border-border">
            <h5 className="font-serif font-semibold text-sm text-foreground mb-3">
              Journey Overview
            </h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">6-7 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty:</span>
                <span className="font-medium">
                  {persona.id === 'adventurers' ? 'Challenging' : 
                   persona.id === 'family' ? 'Easy' : 'Moderate'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Group Size:</span>
                <span className="font-medium">2-12 people</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};