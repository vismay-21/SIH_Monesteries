import rumtekImage from '../assets/rumtek.jpg';
import rumtekImage2 from '../assets/rumtek2.jpg';
import rumtekImage3 from '../assets/rumtek3.jpg';
import { useState } from 'react';
import { ArrowLeft, Camera, ChevronLeft, ChevronRight, MapPin, Calendar, Users, Star, Bus, Car, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import '@google/model-viewer';
import { LeafletMapComponent } from '@/components/LeafletMapComponent';

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
          alt="360° view of Pemayangtse monastery interior"
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
            <Button size="sm" variant="outline" className="text-black border-white hover:bg-white/20">Meditation Hall</Button>
            <Button size="sm" variant="outline" className="text-black border-white hover:bg-white/20">Library</Button>
            <Button size="sm" variant="outline" className="text-black border-white hover:bg-white/20">Courtyard</Button>
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
        <DialogTitle className="font-monastery text-2xl">The Story of Pemayangtse</DialogTitle>
      </DialogHeader>
      <div className="space-y-10">
        {/* Timeline Graphic */}
        <div className="relative px-2 py-6">
          {/* rail */}
          <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-saffron to-amber-500 rounded-full shadow-[inset_0_0_4px_rgba(0,0,0,0.15)]" />
          <div className="flex flex-col gap-10 ml-0 md:ml-12">
            {/* ~1650–51 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  c.1650–51
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Seeds of Devotion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lama Lhatsun Chempo establishes a small Lhakhang called Tsangkhang on this ridge—planting the first seeds of Pemayangtse’s destiny.
                </p>
                <img src={rumtekImage} alt="Early shrine at Pemayangtse" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1705 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1705
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Becoming a Monastery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Under Chogyal Chakdor Namgyal, the shrine is enlarged into a full monastery—its role in Sikkim’s sacred geography secured.
                </p>
                <img src={rumtekImage2} alt="Pemayangtse growth period" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1710 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1710
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Consecration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Consecrated by the third Lhatsun Chempo (Dzogchen Jigme Pawo), the monastery is affirmed as a principal seat of the Nyingma order.
                </p>
                <img src={rumtekImage3} alt="Consecration of Pemayangtse" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1700s onward */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1700s →
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Parent Monastery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pemayangtse becomes the parent monastery for Nyingma in Sikkim. Ta-tshang monks are chosen from Bhutia families—celibate, of pure lineage, and without physical deformity—preserving strict tradition.
                </p>
                <img src={rumtekImage} alt="Monastic traditions" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 20th century */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  20th C
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Quakes & Restoration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Major earthquakes (1913, 1960) damage structures, but careful restoration preserves sacred art, sculptures, murals, and the monastery’s integrity.
                </p>
                <img src={rumtekImage} alt="Restoration efforts" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
        {/* End Timeline */}

        {/* Additional Details Section */}
        <div className="mt-12">
          <h3 className="font-monastery text-xl font-bold mb-4 text-saffron">Pemayangtse Today</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Overlooking Yuksom—the cradle of Sikkim’s monarchy—Pemayangtse remains a living sanctuary of the Nyingma tradition, where ritual, scholarship, and community are braided into daily life.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            From carved wooden deities to ancient thangkas, every corner holds memory. Festivals and daily chants keep a centuries-old cadence alive for monks, locals, and travelers alike.
          </p>
          <img src={rumtekImage} alt="Pemayangtse Today" className="rounded-lg shadow-md w-full max-w-md mb-4" />
          <p className="text-muted-foreground leading-relaxed">
            To visit is to step into a continuity—where the mountain wind carries mantras, and time feels lovingly unhurried.
          </p>
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
              <p className="text-sm text-muted-foreground mb-2">From Pelling: ~2 km (10 min)</p>
              <p className="text-xs text-muted-foreground">From Gangtok: ~115 km (4–5 hrs), shared taxis & buses available</p>
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
              <p className="text-sm text-muted-foreground mb-2">Local taxi from Pelling town</p>
              <p className="text-xs text-muted-foreground">Well-maintained mountain roads; check weather in monsoon</p>
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
              <p className="text-sm text-muted-foreground mb-2">Bagdogra: ~140 km (5–6 hrs)</p>
              <p className="text-xs text-muted-foreground">Helicopter service to Gangtok (seasonal), then by road</p>
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
                <Badge className="bg-primary text-primary-foreground">February (Tibetan New Year)</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Traditional festivities, prayers, and community gatherings.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cham Dance</span>
                <Badge className="bg-secondary text-secondary-foreground">Annual/Seasonal</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Masked ritual dances believed to cleanse obstacles and protect the land.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const FamousPlacesPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const nearbyPlaces = [
    {
      title: "Sanga Choeling Monastery",
      distanceText: "≈ Short trek from Pelling ridge",
      blurb: "One of the oldest monasteries in Sikkim, perched on a ridge above Pelling.",
      link: "https://www.oyorooms.com/travel-guide/travel-guide/pelling-sikkim-travel-guide/"
    },
    {
      title: "Rabdentse Ruins",
      distanceText: "≈ Short forest walk from Pemayangtse",
      blurb: "The moss-covered remains of Sikkim’s old royal capital, a short trek from Pemayangtse.",
      link: "https://traveltriangle.com/blog/pemayangtse-monastery/"
    },
    {
      title: "Khecheopalri Lake",
      distanceText: "≈ 35–45 min drive",
      blurb: "A sacred “wish-fulfilling” lake surrounded by forests and legends.",
      link: "https://www.naturediary.in/pelling-travel-guide/"
    },
    {
      title: "Singshore Bridge",
      distanceText: "≈ 1 hr drive",
      blurb: "One of India’s highest suspension bridges, offering sweeping mountain views.",
      link: "https://sikkimtourism.org/10-best-things-to-do-in-pelling/"
    },
    {
      title: "Pelling Skywalk & Chenrezig Statue",
      distanceText: "≈ 15–25 min drive",
      blurb: "Glass skywalk with Himalayan views, leading up to a massive statue of Chenrezig.",
      link: "https://www.naturediary.in/pelling-travel-guide/"
    },
    {
      title: "Darap Village",
      distanceText: "≈ 20–30 min drive",
      blurb: "A traditional Limboo village with homestays, farms, and forest trails.",
      link: "https://www.naturediary.in/pelling-travel-guide/"
    },
    {
      title: "Rimbi Waterfall",
      distanceText: "≈ 30–40 min drive",
      blurb: "A scenic cascade near Pelling, perfect for a refreshing stop.",
      link: "https://www.travtasy.com/2019/06/places-to-visit-in-pelling-things-to-do.html"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-monastery text-2xl">Famous Places Nearby</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          {nearbyPlaces.map((place) => (
            <Card
              key={place.title}
              className="rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{place.title}</CardTitle>
                <CardDescription>{place.distanceText}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 md:items-start">
                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{place.blurb}</p>
                  </div>
                  {/* Image / Link */}
                  <div className="md:w-48">
                    <a
                      href={place.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open more about ${place.title}`}
                      className="group block"
                    >
                      <img
                        src={rumtekImage}
                        alt={place.title}
                        className="aspect-[4/3] w-full rounded-lg object-cover shadow transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};



const InteractiveMapPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const rumtekCoordinates: L.LatLngExpression = [27.3017, 88.2394]; // Pemayangtse (near Pelling)
  const rumtekName = "Pemayangtse Monastery";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-monastery text-2xl">Interactive Location Map</DialogTitle>
        </DialogHeader>
        <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
          <LeafletMapComponent
            monasteryPosition={rumtekCoordinates}
            monasteryName={rumtekName}
            zoom={13}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VideoPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle className="font-monastery text-2xl">Video Tour</DialogTitle>
      </DialogHeader>
      <div className="relative bg-muted rounded-lg overflow-hidden">
        <iframe 
          src="https://www.youtube.com/embed/LL48yM1nFp8?si=6LlgacCDMllELS5Z" 
          className="w-[95%] h-[95%] mx-auto rounded-lg"
          style={{ aspectRatio: '16/9' }}
          allow="fullscreen"
          title="Pemayangtse Monastery Video Tour"
        />
      </div>
    </DialogContent>
  </Dialog>
);
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        style?: React.CSSProperties;
      };
    }
  }
}
const ModelPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle className="font-monastery text-2xl">3D Model</DialogTitle>
      </DialogHeader>
      <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
        <model-viewer
          src="/models/pemayangtse.glb"
          alt="Pemayangtse Monastery 3D Model"
          camera-controls
          auto-rotate
          style={{ width: '100%', height: '500px', background: '#f3f4f6', borderRadius: '1rem' }}
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
    rumtekImage, rumtekImage2, rumtekImage3
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
          <h1 className="font-monastery text-3xl md:text-4xl font-bold">Pemayangtse Monastery</h1>
          <p className="text-primary-foreground/90 mt-2">Oldest Nyingma Seat of Sikkim, watching over Yuksom & Pelling</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Image Gallery */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 group">
          <img 
            src={images[currentImage]}
            alt="Pemayangtse Monastery"
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
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-saffron ring-2 ring-saffron/40 group-hover:scale-110 transform transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">~2 km from Pelling</p>
              <p className="text-sm text-stone-600 mt-1">West Sikkim</p>
            </CardContent>
          </Card>

          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-red-50 to-pink-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-rose-500 ring-2 ring-rose-200 group-hover:scale-110 transform transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">Founded 1705</p>
              <p className="text-sm text-stone-600 mt-1">Chogyal Chakdor Namgyal</p>
            </CardContent>
          </Card>

          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-emerald-50 to-teal-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-emerald-600 ring-2 ring-emerald-200 group-hover:scale-110 transform transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">Ta-tshang Monks</p>
              <p className="text-sm text-stone-600 mt-1">Nyingma Tradition</p>
            </CardContent>
          </Card>

          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-indigo-50 to-violet-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-violet-600 ring-2 ring-violet-200 group-hover:scale-110 transform transition-transform">
                <Star className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">Parent Nyingma Seat</p>
              <p className="text-sm text-stone-600 mt-1">Sikkim</p>
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
            Pemayangtse Monastery is less a monument than a memory carved into the spine of Sikkim. Founded in the late 17th century under the patronage of the Chogyal rulers, it has long been the spiritual seat of the Nyingma tradition—the “ancient ones” of Tibetan Buddhism. Unlike later monasteries shaped by exile or politics, Pemayangtse’s identity is inward-facing, built to serve the land, the monarchy, and the spiritual continuity of Sikkim itself.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            Step inside Pemayangtse and the air feels older than stone. Its walls carry intricate wooden carvings, many depicting Padmasambhava—the guru-saint who tamed Himalayan demons into protectors. At the heart of the monastery lies the fabled seven-tiered wooden model of Sangtok Palri, a cosmic palace crafted over years by a single devoted lama. Every tier narrates realms of gods, demons, and guardians—turning the monastery itself into a map of unseen worlds.
          </p>
        </div>

        {/* --- BEGIN: Extended Story Section --- */}
        <div className="flex flex-col gap-12 mt-16">
          {/* Section 1 */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">The Oldest Voice of Sikkim</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Pemayangtse Monastery is less a monument than a memory carved into the spine of Sikkim. Founded in the late 17th century under the patronage of Chogyal rulers, it has long been the spiritual seat of the Nyingma tradition—the “ancient ones” of Tibetan Buddhism.
              </p>
              <p className="text-muted-foreground mt-4">
                Unlike later monasteries shaped by exile or politics, Pemayangtse’s identity is inward-facing, built to serve the land, the monarchy, and the spiritual continuity of Sikkim itself.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
              <img src={rumtekImage} alt="Pemayangtse Monastery - Oldest Voice" className="rounded-xl shadow-lg w-full h-56 object-cover" />
            </div>
          </div>

          {/* Section 2 */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">A Temple Woven in Wood and Myth</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Its walls carry intricate wooden carvings, many depicting Padmasambhava. At its heart lies the seven-tiered wooden model of Sangtok Palri—a cosmic palace painstakingly crafted by a single devoted lama.
              </p>
              <p className="text-muted-foreground mt-4">
                Each tier narrates realms of gods, demons, and guardians—turning the monastery itself into a map of unseen worlds.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
              <img src={rumtekImage} alt="Pemayangtse Monastery - Wood & Myth" className="rounded-xl shadow-lg w-full h-56 object-cover" />
            </div>
          </div>

          {/* Section 3 */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">Rituals of the Land and People</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                During the Cham festival, masked monks perform dances that locals believe cleanse the land of dark forces, their movements echoing storms, fire, and renewal.
              </p>
              <p className="text-muted-foreground mt-4">
                Incense curls through the air while villagers gather with quiet reverence—seeing not just religion, but protection for harvests, homes, and the fragile balance of life in the mountains.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
              <img src={rumtekImage} alt="Pemayangtse Monastery - Rituals" className="rounded-xl shadow-lg w-full h-56 object-cover" />
            </div>
          </div>

          {/* Section 4 */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">A Sanctuary Beyond Time</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sitting atop a ridge that surveys the ancient capital of Yuksom, the monastery feels like a guardian keeping watch over Sikkim’s origins. Prayer flags ripple against Kanchenjunga’s white face.
              </p>
              <p className="text-muted-foreground mt-4">
                To linger here is to feel time loosen—where history, myth, and mountain meet in a silence that reshapes the traveler as much as the place.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
              <img src={rumtekImage} alt="Pemayangtse Monastery - Sanctuary" className="rounded-xl shadow-lg w-full h-56 object-cover" />
            </div>
          </div>
        </div>
        {/* --- END: Extended Story Section --- */}
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
