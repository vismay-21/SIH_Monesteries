import { useState } from 'react';
import { ArrowLeft, Camera, ChevronLeft, ChevronRight, MapPin, Clock, Calendar, Users, Star, Bus, Car, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

// Popup Components
const VirtualTourPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-monastery text-2xl">
          <Camera className="w-6 h-6 text-primary" />
          360° Virtual Tour - Main Prayer Hall
        </DialogTitle>
      </DialogHeader>
      <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop" 
          alt="360° view of Rumtek monastery interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-4 flex space-x-4">
            <Button size="sm" className="btn-saffron">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button size="sm" className="btn-saffron">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <Badge className="bg-saffron text-saffron-foreground">Main Hall</Badge>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">Meditation Hall</Button>
            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">Library</Button>
            <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">Courtyard</Button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const HistoryPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-monastery text-2xl">History & Heritage</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Rumtek Monastery, also known as the Dharma Chakra Centre, was built under the direction of the 16th Karmapa, 
            Rangjung Rigpe Dorje, as his main seat in exile. The monastery serves as the headquarters of the Karma Kagyu lineage.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Foundation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Established in 1966, Rumtek is a replica of the original Tsurphu Monastery in Tibet.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Traditional Tibetan architecture with intricate woodwork and vibrant Buddhist art.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const TravelRoutesPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-monastery text-2xl">Travel Routes & Transportation</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bus className="w-5 h-5 text-primary" />
                By Bus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">From Gangtok: 24 km (45 minutes)</p>
              <p className="text-xs text-muted-foreground">Shared taxis and buses available every 30 minutes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="w-5 h-5 text-primary" />
                By Car
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Private taxi: ₹800-1200</p>
              <p className="text-xs text-muted-foreground">Well-maintained mountain roads</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plane className="w-5 h-5 text-primary" />
                Nearest Airport
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Bagdogra: 125 km (4 hours)</p>
              <p className="text-xs text-muted-foreground">Helicopter service available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const RitualsPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-monastery text-2xl">Rituals & Ceremonies</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Daily Prayer Sessions</span>
                <Badge className="bg-accent text-accent-foreground">Daily</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-sm mb-1">Morning Prayers</p>
                  <p className="text-xs text-muted-foreground">5:30 AM - 7:00 AM</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Evening Prayers</p>
                  <p className="text-xs text-muted-foreground">6:00 PM - 7:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Losar Festival</span>
                <Badge className="bg-primary text-primary-foreground">February 15</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tibetan New Year celebration with traditional mask dances and festivities.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cham Dance</span>
                <Badge className="bg-secondary text-secondary-foreground">Monthly</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Sacred masked dance performed by monks on the 10th day of every Tibetan month.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const FamousPlacesPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-monastery text-2xl">Famous Places Nearby</DialogTitle>
      </DialogHeader>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Institute of Tibetology</CardTitle>
            <CardDescription>2 km away</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Research center for Tibetan studies with rare manuscripts and artifacts.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Flower Exhibition Centre</CardTitle>
            <CardDescription>3 km away</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Beautiful botanical garden showcasing Sikkim's diverse flora.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ganesh Tok</CardTitle>
            <CardDescription>8 km away</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Scenic viewpoint offering panoramic views of Gangtok and surrounding mountains.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hanuman Tok</CardTitle>
            <CardDescription>11 km away</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Temple dedicated to Lord Hanuman with stunning mountain vistas.</p>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  </Dialog>
);

const InteractiveMapPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle className="font-monastery text-2xl">Interactive Location Map</DialogTitle>
      </DialogHeader>
      <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop" 
          alt="Interactive map showing Rumtek monastery location"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
            📍 Rumtek Monastery
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <Button size="sm" className="btn-saffron">Get Directions</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const VideoPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle className="font-monastery text-2xl">Video Tour</DialogTitle>
      </DialogHeader>
      <div className="relative bg-muted rounded-lg overflow-hidden">
        <iframe 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="Rumtek Monastery Video Tour"
          className="w-[95%] h-[95%] mx-auto rounded-lg"
          style={{ aspectRatio: '16/9' }}
          allow="fullscreen"
        />
      </div>
    </DialogContent>
  </Dialog>
);
const ModelPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle className="font-monastery text-2xl">3D Model</DialogTitle>
      </DialogHeader>
      <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
        <iframe 
          src="https://sketchfab.com/models/12345678/embed" 
          title="Rumtek Monastery 3D Model"
          className="w-full h-full"
          allow="fullscreen"
        />
      </div>
    </DialogContent>
  </Dialog>
);

export default function RumtekMonastery() {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1628624747186-a88c31695b88?w=800&h=600&fit=crop'
  ];

  const openPopup = (popupName: string) => setActivePopup(popupName);
  const closePopup = () => setActivePopup(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="max-w-7xl mx-auto px-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-primary-foreground/20 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="font-monastery text-3xl md:text-4xl font-bold">Rumtek Monastery</h1>
          <p className="text-primary-foreground/90 mt-2">The Dharma Chakra Centre - Seat of the Karmapa</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Image Gallery */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 group">
          <img 
            src={images[currentImage]}
            alt="Rumtek Monastery"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Navigation */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button 
              size="sm" 
              className="bg-black/50 text-white hover:bg-black/70"
              onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-black/50 text-white hover:bg-black/70"
              onClick={() => setCurrentImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* 360° Tour Button */}
          <div className="absolute bottom-4 right-4">
            <Button 
              className="btn-saffron"
              onClick={() => openPopup('virtualTour')}
            >
              <Camera className="w-4 h-4 mr-2" />
              360° Virtual Tour
            </Button>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium">24 km from Gangtok</p>
              <p className="text-sm text-muted-foreground">East Sikkim</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium">Founded 1966</p>
              <p className="text-sm text-muted-foreground">16th Karmapa</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium">300+ Monks</p>
              <p className="text-sm text-muted-foreground">Karma Kagyu</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium">Most Important</p>
              <p className="text-sm text-muted-foreground">Monastery in Sikkim</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid md:grid-cols-8 gap-4 mb-8">
          <Button 
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('history')}
          >
            <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
              📖
            </div>
            History
          </Button>
          <Button 
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('travelRoutes')}
          >
            <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
              🚌
            </div>
            Travel Routes
          </Button>
          <Button 
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('rituals')}
          >
            <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
              🙏
            </div>
            Rituals
          </Button>
          <Button 
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('famousPlaces')}
          >
            <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
              🏔️
            </div>
            Nearby Places
          </Button>
          <Button 
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('interactiveMap')}
          >
            <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
              🗺️
            </div>
            Interactive Map
          </Button>
          <Button 
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('virtualTour')}
          >
            <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
              📹
            </div>
            360° Tour
          </Button>
          <Button 
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('video')}
          >
            <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
              🎥
            </div>
            Video
          </Button>
          <Button 
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('3dModel')}
          >
            <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
              🖼️
            </div>
            3D Model
          </Button>
        </div>

        {/* Main Content */}
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Rumtek Monastery, also known as the Dharma Chakra Centre, stands as the largest monastery in Sikkim 
            and serves as the seat-in-exile of the Karmapa Lama. Built in the 1960s under the direction of the 
            16th Karmapa, this magnificent monastery houses precious Buddhist artifacts and serves as a major 
            center for Buddhist learning and meditation.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            The monastery's architecture reflects traditional Tibetan design, featuring intricate woodwork, 
            vibrant murals, and golden stupas. The main shrine hall contains statues of Buddha and the 16th Karmapa, 
            along with precious manuscripts and thangkas that represent centuries of Buddhist wisdom and artistry.
          </p>
        </div>
      </div>

      {/* Popups */}
      <VirtualTourPopup isOpen={activePopup === 'virtualTour'} onClose={closePopup} />
      <HistoryPopup isOpen={activePopup === 'history'} onClose={closePopup} />
      <TravelRoutesPopup isOpen={activePopup === 'travelRoutes'} onClose={closePopup} />
      <RitualsPopup isOpen={activePopup === 'rituals'} onClose={closePopup} />
      <FamousPlacesPopup isOpen={activePopup === 'famousPlaces'} onClose={closePopup} />
      <InteractiveMapPopup isOpen={activePopup === 'interactiveMap'} onClose={closePopup} />
      <VideoPopup isOpen={activePopup === 'video'} onClose={closePopup} />
      <ModelPopup isOpen={activePopup === '3dModel'} onClose={closePopup} />
    </div>
  );
}