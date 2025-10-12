import rumtekImage from '../assets/rumtek.jpg';
import rumtekImage2 from '../assets/rumtek2.jpg';
import rumtekImage3 from '../assets/rumtek3.jpg';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
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
        <DialogTitle className="font-monastery text-2xl">The Story of Enchey</DialogTitle>
      </DialogHeader>
      <div className="space-y-10">
        {/* Timeline Graphic */}
        <div className="relative px-2 py-6">
          {/* rail */}
          <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-saffron to-amber-500 rounded-full shadow-[inset_0_0_4px_rgba(0,0,0,0.15)]" />
          <div className="flex flex-col gap-10 ml-0 md:ml-12">
            {/* c.1840 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  c.1840
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Beginnings and Foundations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lama Drubthob Karpo, famed for his occult powers and spiritual mastery, establishes a humble hermitage on the hill above Gangtok—planting the seed of Enchey Monastery.
                </p>
                <img src={rumtekImage} alt="Early Enchey hermitage" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1908–1909 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1908–1909
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Reconstruction & Architectural Flourish</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Under the 10th Chogyal, Sidkeong Tulku Namgyal, Enchey is rebuilt into its present form. The design blends Chinese pagoda cues with Tibetan–Sikkimese styles: whitewashed walls, reddish trims, and intricate wooden windows.
                </p>
                <img src={rumtekImage2} alt="Reconstruction of Enchey Monastery" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 20th Century */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  20th C
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Preservation & Growing Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Despite urban pressures, Enchey remains a vital religious center. Ongoing conservation safeguards murals, statues, and ritual practice—keeping meditation, study, and ceremony alive.
                </p>
                <img src={rumtekImage3} alt="Preservation work at Enchey" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* Present Day */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  Today
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">A Living Spiritual Center</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Monks recite daily prayers; pilgrims gather for Pang Lhabsol and vibrant Cham dances each year. Enchey remains rooted in local spirituality, offering calm and continuity to visitors.
                </p>
                <img src={rumtekImage} alt="Enchey today" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
        {/* End Timeline */}

        {/* Additional Details Section */}
        <div className="mt-12">
          <h3 className="font-monastery text-xl font-bold mb-4 text-saffron">Enchey Today</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A thriving haven of devotion and culture, Enchey’s serene courtyards and hillside views continue to offer a peaceful refuge for meditation, study, and ritual in Gangtok.
          </p>
          <img src={rumtekImage} alt="Enchey Monastery courtyard today" className="rounded-lg shadow-md w-full max-w-md mb-4" />
          <p className="text-muted-foreground leading-relaxed">
            From its prayer halls to its festivals, Enchey keeps centuries of Buddhist heritage alive—welcoming seekers into a space of quiet strength and living tradition.
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
              <p className="text-sm text-muted-foreground mb-2">From Gangtok: ~3 km (10–15 min)</p>
              <p className="text-xs text-muted-foreground">Frequent shared taxis and local buses from town</p>
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
              <p className="text-sm text-muted-foreground mb-2">Private taxi: ₹800–₹1200</p>
              <p className="text-xs text-muted-foreground">Good motorable mountain roads, open year-round</p>
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
              <p className="text-sm text-muted-foreground mb-2">Pakyong (~30 km)</p>
              <p className="text-xs text-muted-foreground">Seasonal helicopter facility Bagdogra ↔ Gangtok</p>
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
                  <p className="text-xs text-muted-foreground">6:00 AM - 7:30 AM</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Evening Prayers</p>
                  <p className="text-xs text-muted-foreground">5:30 PM - 7:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pang Lhabsol Festival</span>
                <Badge className="bg-primary text-primary-foreground">Late Sep / Oct</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Annual celebration honoring Mount Kanchenjunga, Sikkim’s protector deity—marked by vibrant rituals and community prayers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cham Dance Festival</span>
                <Badge className="bg-secondary text-secondary-foreground">Annual / Ceremonial</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sacred masked dances during Pang Lhabsol and other ceremonies—believed to cleanse evil energies and bless land and people.
              </p>
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
      title: "Banjhakri Falls & Energy Park",
      distanceText: "≈ 30 min drive (6 km) from Enchey",
      blurb: "A green park with a 100-ft waterfall and thematic shamanic sculptures—great for nature and culture lovers.",
      link: "#"
    },
    {
      title: "Do-Drul Chorten",
      distanceText: "≈ 10 min drive (3 km) from Enchey",
      blurb: "One of Sikkim’s largest stupas, ringed by 108 prayer wheels—quiet, contemplative, and close to town.",
      link: "#"
    },
    {
      title: "Namgyal Institute of Tibetology",
      distanceText: "≈ 15 min drive (4 km) from Enchey",
      blurb: "Premier research center with rare manuscripts, thangkas, and cultural exhibits on Tibetan Buddhism.",
      link: "#"
    },
    {
      title: "Tashi View Point",
      distanceText: "≈ 1 hr drive (35 km) from Enchey",
      blurb: "Famed sunrise vantage with sweeping views of Kanchenjunga and the Eastern Himalaya.",
      link: "#"
    },
    {
      title: "Hanuman Tok",
      distanceText: "≈ 45 min drive (12 km) from Enchey",
      blurb: "Hilltop temple overseen by the Indian Army—offers pristine mountain and valley panoramas.",
      link: "#"
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
  // Updated to Enchey Monastery (Gangtok)
  const rumtekCoordinates: L.LatLngExpression = [27.3418, 88.6200];
  const rumtekName = "Enchey Monastery";

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
          src="https://www.youtube.com/embed/_49F7N9SgxM?si=_rkwChKaOtPs5aAe" 
          className="w-[95%] h-[95%] mx-auto rounded-lg"
          style={{ aspectRatio: '16/9' }}
          allow="fullscreen"
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
          src="/SIH_monestries_images/ency/recy.glb"
          alt="Rumtek Monastery 3D Model"
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
    "/SIH_monestries_images/ency/ency_1.jpg",
    "/SIH_monestries_images/ency/ency_2.jpg",
    "/SIH_monestries_images/ency/ency_3.jpg",
    "/SIH_monestries_images/ency/ency_4.jpg"
  ];

  const openPopup = (popupName: string) => setActivePopup(popupName);
  const closePopup = () => setActivePopup(null);


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header/>
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
          <h1 className="font-monastery text-3xl md:text-4xl font-bold">Enchey Monestery</h1>
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

        {/* Quick Info Cards – unchanged */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-saffron ring-2 ring-saffron/40 group-hover:scale-110 transform transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">24 km from Gangtok</p>
              <p className="text-sm text-stone-600 mt-1">East Sikkim</p>
            </CardContent>
          </Card>

          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-red-50 to-pink-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-rose-500 ring-2 ring-rose-200 group-hover:scale-110 transform transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">Founded 1966</p>
              <p className="text-sm text-stone-600 mt-1">16th Karmapa</p>
            </CardContent>
          </Card>

          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-emerald-50 to-teal-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-emerald-600 ring-2 ring-emerald-200 group-hover:scale-110 transform transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">300+ Monks</p>
              <p className="text-sm text-stone-600 mt-1">Karma Kagyu</p>
            </CardContent>
          </Card>

          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-indigo-50 to-violet-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-violet-600 ring-2 ring-violet-200 group-hover:scale-110 transform transition-transform">
                <Star className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">Sikkim’s Most Important</p>
              <p className="text-sm text-stone-600 mt-1">Monastery</p>
            </CardContent>
          </Card>
        </div>

{/* Action Buttons Grid (restored) */}
<div className="grid md:grid-cols-8 gap-4 mb-8">
  <Button
    className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
    onClick={() => openPopup('history')}
  >
    <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">📖</div>
    History
  </Button>

  <Button
    className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
    onClick={() => openPopup('travelRoutes')}
  >
    <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">🚌</div>
    Travel Routes
  </Button>

  <Button
    className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
    onClick={() => openPopup('rituals')}
  >
    <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">🙏</div>
    Rituals
  </Button>

  <Button
    className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
    onClick={() => openPopup('famousPlaces')}
  >
    <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">🏔️</div>
    Nearby Places
  </Button>

  <Button
    className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
    onClick={() => openPopup('interactiveMap')}
  >
    <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">🗺️</div>
    Interactive Map
  </Button>

  <Button
    className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
    onClick={() => openPopup('virtualTour')}
  >
    <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">📹</div>
    360° Tour
  </Button>

  <Button
    className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
    onClick={() => openPopup('video')}
  >
    <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">🎥</div>
    Video
  </Button>

  <Button
    className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
    onClick={() => openPopup('3dModel')}
  >
    <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">🖼️</div>
    3D Model
  </Button>
</div>
        {/* Simplified Audio Box */}
        <div className="mb-6">
          <audio
            controls
            className="w-[50%] md:w-[25%] rounded-lg shadow-md"
          >
            <source src="/SIH_monestries_images/ency/encyspeech.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Main Content (Enchey) */}
        <div className="flex flex-col gap-12 mt-2 not-prose">
          {/* Intro */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                Enchey Monastery: A Divine Jewel in the Heart of Gangtok
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Situated on a peaceful hillside with a view overlooking the lively town of Gangtok, Enchey Monastery is a peaceful retreat immersed in spiritual heritage and vibrant Tibetan Buddhist culture. Established in the early 19th century by Lama Dorjee Phagpa, a devoted follower of the sacred Saint Padmasambhava, the monastery is affiliated with the Nyingma sect—the oldest order of Tibetan Buddhism. Though small in comparison with other monasteries in the Himalayas, Enchey stands highly respected in Sikkimese people and pilgrims who make the trip here in hopes of spiritual comfort and enlightenment.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/ency/ency_1.jpg"
                alt="Enchey Monastery hillside view"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* A Passage Through Time and Spirit */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                A Passage Through Time and Spirit
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The early history of the monastery is entwined with stories of God's intervention and the spiritual protection that presided over its existence. It was said that Enchey was constructed to protect Gangtok from evil spirits and bad influences, acting as a spiritual stronghold for the town's population. Over centuries of its history, the monastery has been an integral center of Buddhist practitioners, cultivating meditation, scholarship, and ritual. Its hilltop site not only offers stunning panoramic views of Gangtok and the Himalayan peaks surrounding it but also represents its function as a watchful guardian of the valley below.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/ency/ency_2.jpg"
                alt="Enchey Monastery Gangtok landscape"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Architectural Harmony and Artistic Splendor */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                Architectural Harmony and Artistic Splendor
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Enchey Monastery's architecture perfectly reflects traditional Tibetan architecture blended with Sikkimese elements. The monastery is colored brilliant white with rich crimson and gold trim, providing a stark contrast to the vegetation on the hillside. Its wooden windows and elaborately carved pillars feature brilliant motifs of Buddhist gods, guardian spirits, and auspicious symbols. Within the central prayer hall, worshippers are welcomed by lavishly adorned murals that narrate Buddhist texts, with vivid representations of Bodhisattvas, fierce protectors, and realized masters.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                The tranquil ambiance is complemented by the monotonous chanting of monks, the smell of smoldering incense, and the soft flutter of prayer flags surrounding the compound. These sensory cues highlight the monastery as a site of meditation and spiritual rejuvenation. The monastery compound also contains a compact but venerated community of monks who have daily prayers and ceremonies, upholding centuries-old practices in an increasingly secularizing world.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Other essential rituals are daily prayer ceremonies, meditation routines, and devotions that keep the spiritual energy of the monastery going all year round. Enchey is not just a house of prayer but also a living cultural hub where Buddhist teachings are passed down to generations.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/ency/ency_3.jpg"
                alt="Enchey Monastery interiors and murals"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* A Quiet Sanctuary Amid Urban Life */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                A Quiet Sanctuary Amid Urban Life
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                For those looking for an inner connection more profound than the crowded streets of Gangtok, Enchey Monastery provides a calm oasis where time appears to stand still. Its serene courtyards, which are shaded by centuries-old trees, encourage contemplative thought and introspection. One can observe monks chanting ritually or experience the calm atmosphere oneself by spinning prayer wheels and lighting butter lamps—simple actions indicating devotion and mindfulness.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Its lofty location provides breathtaking scenery of surrounding mountains and the town lying below, incorporating nature with spiritual peace. Enchey is not just a monument to the past; it is a pulsating core of Gangtok's spiritual life, where spiritual tradition and mundane life both exist and progress together in harmony.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/ency/ency_4.jpg"
                alt="Enchey Monastery prayer courtyard"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        {/* END Main Content */}
      </div>
    <Footer/>
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
