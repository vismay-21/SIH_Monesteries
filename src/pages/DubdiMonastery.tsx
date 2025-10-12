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
          alt="360° view of Dubdi monastery interior"
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
        <DialogTitle className="font-monastery text-2xl">The Story of Dubdi</DialogTitle>
      </DialogHeader>
      <div className="space-y-10">
        {/* Timeline Graphic */}
        <div className="relative px-2 py-6">
          {/* rail */}
          <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-saffron to-amber-500 rounded-full shadow-[inset_0_0_4px_rgba(0,0,0,0.15)]" />
          <div className="flex flex-col gap-10 ml-0 md:ml-12">
            {/* c.1701 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  c.1701
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Birth of Dubdi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Blessed by venerated Buddhist masters and aided by the first Chogyal of Sikkim, Phuntsog Namgyal, Dubdi Monastery was founded in 1701 as the very first Buddhist monastery in Sikkim. Situated on a picturesque hilltop in Yuksom, the ancient capital, it became the spiritual center of the young kingdom and a lasting symbol of Sikkimese Buddhism.
                </p>
                <img src={rumtekImage} alt="Early Dubdi hilltop" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 18th–19th Century */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  18th–19th C
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Spiritual Foundation & Growth</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dubdi Monastery prospered as a seat of the Nyingma school. It became a hub for religious learning, meditation, and ceremonies, reinforcing the interrelated spiritual and political underpinnings of Sikkim.
                </p>
                <img src={rumtekImage2} alt="Dubdi growth era" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
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
                <h3 className="font-monastery text-lg font-semibold mb-1">Resilience Amid Change</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In spite of modernization and political shifts, Dubdi’s monastic community retained its heritage. Careful restoration kept its colorful murals and structure intact.
                </p>
                <img src={rumtekImage3} alt="Restoration at Dubdi" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* Today */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  Today
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">A Peaceful Haven</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dubdi still resonates with ancient hymns and pious footsteps. Its two-story stonework with a gilded stupa shelters images of founding lamas and sacred texts that whisper the history of resilience and piety.
                </p>
                <img src={rumtekImage} alt="Dubdi today" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
        {/* End Timeline */}

        {/* Additional Details Section */}
        <div className="mt-12">
          <h3 className="font-monastery text-xl font-bold mb-4 text-saffron">Dubdi Today</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A pilgrimage to Dubdi is not an excursion but a journey to Sikkim’s holy roots—where each prayer wheel, fresco, and beam speaks of devotion and endurance.
          </p>
          <img src={rumtekImage} alt="Dubdi courtyard today" className="rounded-lg shadow-md w-full max-w-md mb-4" />
          <p className="text-muted-foreground leading-relaxed">
            In Yuksom’s quiet hills, Dubdi remains a sanctuary of learning, prayer, and living tradition.
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
              <p className="text-sm text-muted-foreground mb-2">From Gangtok: ~120 km (4–5 hrs)</p>
              <p className="text-xs text-muted-foreground">From Pelling: ~40 km (≈2 hrs). Shared taxis & buses to Yuksom.</p>
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
              <p className="text-sm text-muted-foreground mb-2">Private taxi (Gangtok→Yuksom): ₹1500–2000</p>
              <p className="text-xs text-muted-foreground">Mountain roads; check weather during monsoons.</p>
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
              <p className="text-sm text-muted-foreground mb-2">Bagdogra (~150 km; 5–6 hrs)</p>
              <p className="text-xs text-muted-foreground">Helicopter facility Bagdogra ↔ Gangtok (seasonal)</p>
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
                  <p className="text-xs text-muted-foreground">≈ 6:00 AM – 7:00 AM</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Evening Prayers</p>
                  <p className="text-xs text-muted-foreground">≈ 5:30 PM – 6:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Losar Festival</span>
                <Badge className="bg-primary text-primary-foreground">Feb–Mar (lunar)</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tibetan New Year in the Yuksom region; local community prayers and small traditional ceremonies occur around Dubdi.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Monthly / Special Pujas</span>
                <Badge className="bg-secondary text-secondary-foreground">Monthly</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Special pujas and offerings on auspicious lunar days; occasional initiation ceremonies and blessings (generally small-scale).
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
      title: "Coronation Throne of Norbugang",
      distanceText: "≈ 3 km (≈10 min) from Dubdi",
      blurb: "Historic site of the first Chogyal’s coronation (1642) with the celebrated Coronation Throne.",
      link: "#"
    },
    {
      title: "Kathok Lake",
      distanceText: "≈ 6 km (≈15 min) from Dubdi",
      blurb: "A serene holy lake linked to Lama Kathok Kuntu Zangpo; scenic and spiritually significant.",
      link: "#"
    },
    {
      title: "Yuksom Village",
      distanceText: "≈ 3 km (≈10 min) from Dubdi",
      blurb: "Former capital of Sikkim—traditional architecture, local culture, and gorgeous valley views.",
      link: "#"
    },
    {
      title: "Khangchendzonga National Park",
      distanceText: "≈ 5 km (entrance) from Dubdi",
      blurb: "UNESCO World Heritage Site; diverse flora & fauna, treks, and dramatic Himalayan landscapes.",
      link: "#"
    },
    {
      title: "Tashi Tenka",
      distanceText: "≈ 4 km (≈15 min) from Dubdi",
      blurb: "Panoramic viewpoint of Mount Kangchenjunga and the Himalayas, especially stunning at sunrise.",
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
  // Updated to Dubdi Monastery (Yuksom)
  const rumtekCoordinates: L.LatLngExpression = [27.375, 88.258]; 
  const rumtekName = "Dubdi Monastery (Yuksom)";

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
          src="/SIH_monestries_images/dubdi/dubdi.glb"
          alt="Dubdi Monastery 3D Model"
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
    "/SIH_monestries_images/dubdi/dubdi_1.jpg",
    "/SIH_monestries_images/dubdi/dubdi_2.jpg",
    "/SIH_monestries_images/dubdi/dubdi_3.jpg",
    "/SIH_monestries_images/dubdi/dubdi_4.jpg"
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
          <h1 className="font-monastery text-3xl md:text-4xl font-bold">Dubdi Monestery</h1>
          <p className="text-primary-foreground/90 mt-2">The Dharma Chakra Centre - Seat of the Karmapa</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Image Gallery */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 group">
          <img 
            src={images[currentImage]}
            alt="Dubdi Monastery"
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

        {/* --- Popup Triggers ---------------------------------------------------- */}
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
            <source src="/SIH_monestries_images/dubdi/dubdispeech.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
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

        {/* Main Content (Dubdi) — 4 sections, images aligned as before */}
        <div className="flex flex-col gap-12 mt-2 not-prose">
          {/* Section 1: Intro + Sacred Refuge */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                Dubdi Monastery: Sikkim's Spiritual Dawn Sanctuary of Old
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                For the traveler who dreams to tread the footsteps of Sikkim's first Buddhist travelers, Dubdi Monastery is more than architecture or art—it is a view into the fledgling heartbeat of Himalayan religion. Sitting atop a peaceful hill in the ancient capital of Yuksom, Dubdi sits imposing, a guardian of the oldest Tibetan Buddhist heritage in the land, reverently holding centuries of faith, learning, and holy ritual.
              </p>
              <h3 className="font-monastery text-xl font-semibold mt-6 mb-2 text-saffron">The Sacred Refuge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Founded in the early 18th century, Dubdi Monastery was conceived from a divine vision and sanctified with the blessings of the newly enthroned Chogyal of Sikkim, Phuntsog Namgyal. This holy place was designed as a stronghold of religious resilience, envisioned to sustain both the changing political realities and the unshakeable faith of Sikkim's citizens. The monastery is not just a wooden and stone structure—it is a living haven where the prayers resound, and the spiritual lineage whispers softly in all its nooks.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/dubdi/dubdi_1.jpg"
                alt="Dubdi Monastery hillside view"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Section 2: Architectural Serenity */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                Architectural Serenity and Devotional Artistry
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                As one approaches Dubdi, one enters into an intimate yet deep harmony of design and faith. Constructed of local stone and wood, the two-story monastery is imbued with Tibetan monastic flavor tempered by the understatement appropriate to its hill-country setting. The steeply tapering roof surmounted by a gilded stupa glows with symbolic light, a spiritual landmark that welcomes wayfaring spirits.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Within, the central hall is a museum of divinely inspired art. Its walls are covered in rich frescoes, illustrating Buddhist saints, fierce guardians, and cosmic sagas. The vividness of these wall paintings is harmonized with the reverent stillness in the soft flame of candles. Hand-carved wooden pillars—adorned with lotus flowers and auspicious designs—are rising rhythmically, enclosing series of prayer wheels to quietly supplicate.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                The altar is home to venerated images of Shakyamuni Buddha, flanked by Guru Padmasambhava, whose wise presence pervades the whole monastery, and Chenrizi, in whom compassion takes physical form. Here, time appears to stand still, shrouded in the incense mist and the monotonous beat of the temple bell.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/dubdi/dubdi_2.jpg"
                alt="Dubdi Monastery interiors and murals"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Section 3: Rituals of Time */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                The Rituals of Time
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Dubdi’s essence reveals itself fully during its sacred festivals and daily rites. Pilgrims and monks alike gather for Cham dances—masked performances where myth and reality merge, purifying negativity and invoking blessings. The monastery’s spiritual calendar is detailed and deeply woven into the life of the community, marking the passage of seasons and the rhythm of ancient spiritual practices.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/dubdi/dubdi_3.jpg"
                alt="Dubdi Monastery rituals"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Section 4: A Place Beyond Time */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                A Place Beyond Time
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To go to Dubdi Monastery is to witness a prayer in living stone, wood, and tradition. It is a place of spiritual solace, a cultural jewel, and a silent testament to survival. Here, faith is carved into each stroke and cut into every beam. The monastery invites not only the eyes to behold but the heart to feel—to sense the abiding link between land, faith, and people against the resplendent Himalayan backdrop.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Sit for a moment on the monastery’s steps, breathe in its serene air, and listen for the chant that transcends centuries. In Dubdi’s silent sanctuary, the ancient soul of Sikkim quietly lives on.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/dubdi/dubdi_4.jpg"
                alt="Dubdi Monastery prayer courtyard"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        {/* --- END: Main Content --- */}
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
