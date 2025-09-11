import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Coffee, Mountain, Heart, Compass, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { JourneyModal } from '@/components/JourneyModal';
import { useNavigate } from 'react-router-dom';

// Import all images
import seekerImage from '@/assets/meditation.jpg';
import pilgrimImage from '@/assets/spiritual.jpg';
import loversImage from '@/assets/lover.jpg';
import familyImage from '@/assets/family.jpg';
import adventurersImage from '@/assets/adventure.jpg';

export interface PersonaData {
  id: string;
  title: string;
  emoji: string;
  hoverQuestion: string;
  image: string;
  modalTitle: string;
  story: string;
  bannerImage: string;
  itinerary: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }[];
  insiderTip: string;
}

const personas: PersonaData[] = [
  {
    id: 'seeker',
    title: 'The Seeker',
    emoji: '🙏',
    hoverQuestion: 'Seeking inner peace?',
    image: seekerImage,
    modalTitle: 'A Journey to Stillness: A Seeker\'s Retreat',
    story: 'In the quiet hum of the Himalayas, there exists a silence that isn\'t empty, but full of answers. This journey is crafted for the soul that yearns to listen, to learn, and to simply be, guided by the wisdom of the mountains and the enduring peace of the Dharma.',
    bannerImage: '/src/assets/seeker-banner.jpg',
    itinerary: [
      {
        icon: Mountain,
        title: 'Days 1-2: Gentle Acclimatization at Enchey Monastery, Gangtok',
        description: 'Begin your spiritual journey with peaceful morning meditations and gentle walks through the monastery grounds.'
      },
      {
        icon: Sparkles,
        title: 'Days 3-5: Deep Practice & Chants at Rumtek Monastery',
        description: 'Immerse yourself in daily prayer sessions, meditation retreats, and learn ancient Buddhist chanting techniques.'
      },
      {
        icon: Compass,
        title: 'Days 6-7: Solitude with a View at Pemayangtse Monastery',
        description: 'Find inner peace in contemplative solitude while enjoying breathtaking mountain vistas.'
      }
    ],
    insiderTip: 'Ask your guesthouse about arranging a silent breakfast to start your day with complete mindfulness before you explore.'
  },
  {
    id: 'pilgrim',
    title: 'The Pilgrim',
    emoji: '☸️',
    hoverQuestion: 'Ready to walk the sacred path?',
    image: pilgrimImage,
    modalTitle: 'The Path of Merit: A Pilgrim\'s Passage',
    story: 'For centuries, devotees have journeyed to Sikkim\'s sacred peaks and hidden valleys. This path is not merely a tour, but an act of devotion, connecting you to a lineage of faith that has echoed through these mountains for generations. Follow the footsteps of masters and earn your own merit.',
    bannerImage: '/src/assets/pilgrim-banner.jpg',
    itinerary: [
      {
        icon: Calendar,
        title: 'Days 1-2: Begin at Dubdi, Sikkim\'s oldest monastery',
        description: 'Start your pilgrimage at the most ancient sacred site, steeped in centuries of spiritual tradition.'
      },
      {
        icon: Sparkles,
        title: 'Days 3-4: Circumambulate the sacred Tashiding Monastery',
        description: 'Perform the sacred ritual walk around this blessed monastery, said to cleanse all sins.'
      },
      {
        icon: Mountain,
        title: 'Days 5-6: Marvel at the giant Buddha Park in Ravangla',
        description: 'Witness the magnificent 130-foot statue of Buddha and experience profound spiritual awakening.'
      }
    ],
    insiderTip: 'Bring a small, blank notebook. At each sacred site, take a moment to write down a reflection or a wish before moving on.'
  },
  {
    id: 'lovers',
    title: 'The Lovers',
    emoji: '❤️',
    hoverQuestion: 'Searching for a romantic escape?',
    image: loversImage,
    modalTitle: 'Himalayan Serenade: A Romantic Escape',
    story: 'Some places are not just seen, but felt together. In Sikkim, the grandeur of the Himalayas creates the perfect backdrop for intimacy and connection. This journey is a collection of shared moments, from misty morning sunrises to quiet evenings under a blanket of stars.',
    bannerImage: '/src/assets/lovers-banner.jpg',
    itinerary: [
      {
        icon: Mountain,
        title: 'Days 1-3: Witness the legendary sunrise on Kanchenjunga from Pelling',
        description: 'Share magical dawn moments as the first light illuminates the world\'s third-highest peak.'
      },
      {
        icon: Heart,
        title: 'Day 4: A gentle, hand-in-hand walk around the sacred Khecheopalri Lake',
        description: 'Stroll together around this wish-fulfilling lake, surrounded by pristine forest and mountain serenity.'
      },
      {
        icon: MapPin,
        title: 'Days 5-6: A private guided tour of the beautiful Pemayangtse Monastery',
        description: 'Explore ancient halls and courtyards in intimate, private setting with panoramic mountain views.'
      }
    ],
    insiderTip: 'We can help you arrange a private butter lamp lighting ceremony for two at a local monastery—a truly unforgettable and meaningful experience.'
  },
  {
    id: 'family',
    title: 'The Family',
    emoji: '👨‍👩‍👧‍👦',
    hoverQuestion: 'Time for a family adventure?',
    image: familyImage,
    modalTitle: 'Mountain Wonders & Monk Mischief: A Family Story',
    story: 'Create memories that will be told for years to come. This journey is designed for wonder, learning, and laughter. From colossal statues that inspire awe to the playful smiles of young monks, Sikkim is a storybook waiting to be explored by the whole family.',
    bannerImage: '/src/assets/family-banner.jpg',
    itinerary: [
      {
        icon: Mountain,
        title: 'Days 1-2: Ride the Gangtok Ropeway for thrilling city views',
        description: 'Enjoy exciting cable car rides with panoramic views that will amaze both kids and adults.'
      },
      {
        icon: Users,
        title: 'Days 3-4: Explore the grand courtyards of Rumtek Monastery',
        description: 'Discover spacious monastery grounds where children can safely run and play while learning about Buddhist culture.'
      },
      {
        icon: MapPin,
        title: 'Days 5-6: Discover the myths and legends at the Char Dham complex in Namchi',
        description: 'Marvel at the impressive religious complex with stories and legends that will captivate young imaginations.'
      }
    ],
    insiderTip: 'The younger monks are often curious and playful. A respectful smile and a simple \'Tashi Delek\' can lead to wonderful, spontaneous interactions for your children.'
  },
  {
    id: 'adventurers',
    title: 'The Adventurers',
    emoji: '🌄',
    hoverQuestion: 'Ready for a challenge?',
    image: adventurersImage,
    modalTitle: 'Peaks & Prayers: An Adventurer\'s Quest',
    story: 'The greatest rewards are earned, not given. This journey is for those who believe the destination is worth the climb. We blend challenging treks through pristine Himalayan wilderness with the profound serenity of reaching remote, high-altitude monasteries that few ever see.',
    bannerImage: '/src/assets/adventurers-banner.jpg',
    itinerary: [
      {
        icon: Mountain,
        title: 'Days 1-3: The Yuksom to Goecha La trek base, the gateway to Kanchenjunga',
        description: 'Embark on challenging high-altitude trekking through pristine alpine wilderness.'
      },
      {
        icon: Compass,
        title: 'Days 4-5: Visit the incredibly remote and cliff-side Lachen Monastery',
        description: 'Reach one of the most isolated monasteries, perched dramatically on mountain cliffs.'
      },
      {
        icon: Coffee,
        title: 'Day 6: Combine a visit to Phodong Monastery with thrilling river rafting on the Teesta',
        description: 'Experience the perfect blend of spiritual exploration and adrenaline-pumping water sports.'
      }
    ],
    insiderTip: 'The best views and most authentic monastery experiences are often off the beaten path. A good pair of broken-in hiking boots is your most essential piece of luggage.'
  }
];

const JourneyPlanner = () => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handlePersonaClick = (persona: PersonaData) => {
    if (persona.id === 'lovers') {
      navigate('/lovers-journey');
    } else {
      setSelectedPersona(persona);
      setIsModalOpen(true);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={handleBackClick}
            className="font-body"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sacred Spaces
          </Button>
        </div>
      </div>

      {/* Section 1: The Invitation */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-6">
            Craft Your Sikkim Journey
          </h1>
          <p className="text-xl font-body text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Select your travel style below to reveal a specially curated path through the heart of the Himalayas.
          </p>
          
          {/* Mountain Range Divider */}
          <div className="flex justify-center items-center mb-16">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            <div className="mx-4">
              <Mountain className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Journey Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personas.map((persona, index) => (
              <Card 
                key={persona.id}
                className={`group cursor-pointer overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-1' :
                  index === 1 ? 'lg:col-span-1 lg:row-span-2' :
                  index === 2 ? 'lg:col-span-2 lg:row-span-1' :
                  index === 3 ? 'lg:col-span-1 lg:row-span-1' :
                  'lg:col-span-2 lg:row-span-1'
                }`}
                onClick={() => handlePersonaClick(persona)}
              >
                <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                  <img 
                    src={persona.image} 
                    alt={persona.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500 group-hover:from-saffron/40 group-hover:via-saffron/10"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-serif font-semibold mb-2">
                          {persona.title}
                        </h3>
                        <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                          {persona.emoji}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Hover Question */}
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-lg font-body text-center bg-black/30 backdrop-blur-sm rounded-lg p-4">
                        {persona.hoverQuestion}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
          {selectedPersona && (
            <JourneyModal 
              persona={selectedPersona} 
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JourneyPlanner;