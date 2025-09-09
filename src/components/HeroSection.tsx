import { useState } from 'react';
import { ArrowDown, MapPin, Calendar, BookOpen, Camera, Compass, Users, Menu } from 'lucide-react';
import heroImage from '@/assets/hero-monastery.jpg';
import { RitualCalendarPopup } from './RitualCalendarPopup';
import { ExplorePopup } from './ExplorePopup';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


export const HeroSection = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  const handleScrollToContent = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Rumtek Monastery at golden hour with prayer flags and Himalayan backdrop"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Solid Navigation Bar */}
      <nav className="relative z-50 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Monastery360
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setExploreOpen(true)}
                className="font-body"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Explore
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setCalendarOpen(true)}
                className="font-body"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Ritual Calendar
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-body">
                    <Camera className="w-4 h-4 mr-2" />
                    Virtual Tours
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>360° Monastery Tours</DropdownMenuItem>
                  <DropdownMenuItem>Sacred Art Gallery</DropdownMenuItem>
                  <DropdownMenuItem>Architecture Views</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-body">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Archives
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Digital Manuscripts</DropdownMenuItem>
                  <DropdownMenuItem>Historical Documents</DropdownMenuItem>
                  <DropdownMenuItem>Photo Collections</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" className="font-body">
                <Users className="w-4 h-4 mr-2" />
                Plan Visit
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
            Monastery360
          </h1>
          
          {/* Subtitle */}
          <div className="text-primary text-lg md:text-xl font-serif font-semibold mb-4">
            Sikkim's Sacred Heritage
          </div>
          
          {/* Tagline */}
          <p className="text-muted-foreground text-xl md:text-2xl font-body mb-12 max-w-2xl mx-auto">
            Journey Through 200+ Sacred Sanctuaries
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" onClick={handleScrollToContent} className="font-body">
              Start Exploring
            </Button>
            <Button size="lg" variant="outline" onClick={() => setExploreOpen(true)} className="font-body">
              Browse Monasteries
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center animate-bounce">
            <p className="text-muted-foreground text-sm mb-2 font-body">
              Discover Sacred Spaces Below
            </p>
            <ArrowDown className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Popups */}
      <RitualCalendarPopup isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} />
      <ExplorePopup isOpen={exploreOpen} onClose={() => setExploreOpen(false)} />
    </div>
  );
};