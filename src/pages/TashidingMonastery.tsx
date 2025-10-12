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
import ScrollReveal from '@/components/ScrollReveal';

// Popup Components
const VirtualTourPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-monastery text-2xl">
          <Camera className="w-6 h-6 text-primary" />
          360° Virtual Tour - Main Temple
        </DialogTitle>
      </DialogHeader>
      <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop" 
          alt="360° view of Tashiding monastery interior"
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
        <DialogTitle className="font-monastery text-2xl">The History of Tashiding</DialogTitle>
      </DialogHeader>
      <div className="space-y-10">
        {/* Timeline Graphic */}
        <div className="relative px-2 py-6">
          {/* rail: more vibrant and visible */}
          <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-saffron to-amber-500 rounded-full shadow-[inset_0_0_4px_rgba(0,0,0,0.15)]" />
          <div className="flex flex-col gap-10 ml-0 md:ml-12">
            {/* c.1641 */}
            <div className="relative flex items-start gap-6">
              {/* year badge */}
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  c.1641
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Seeds of Sanctity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Founded by Ngadak Sempa Chempo Phunshok Rigzing—one of the three monks who helped establish Sikkim’s Buddhist kingdom—on a heart-shaped hill.
                </p>
                <img src={rumtekImage} alt="Early Tashiding" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1640s–1650s */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1640s–50s
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Selecting a Sacred Site</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Legend says Guru Padmasambhava chose the site by shooting an arrow, consecrating the hill and blessing the land.
                </p>
                <img src={rumtekImage2} alt="Legend of the site" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1700s */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1700s
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Enlargement & Spiritual Power</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Under early Chogyals—especially Chakdor Namgyal—Tashiding gained prominence as a Nyingma learning hub.
                </p>
                <img src={rumtekImage3} alt="Growth of Tashiding" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 18th–19th C */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  18th–19th C
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Architectural Flourishing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Multi-storied wooden temples, curved beams, stupas and grand prayer halls—along with exquisite thangkas and sculptures—defined the complex.
                </p>
                <img src={rumtekImage} alt="Architecture" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
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
                <h3 className="font-monastery text-lg font-semibold mb-1">Challenges & Preservation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Despite earthquakes and time, restoration revived its religious art and architecture for future generations.
                </p>
                <img src={rumtekImage2} alt="Restoration" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
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
                <h3 className="font-monastery text-lg font-semibold mb-1">Living Spiritual Sanctuary</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tashiding draws pilgrims yearly—especially for the Bhumchu sacred-water ceremony—amid serene forests and mountains.
                </p>
                <img src={rumtekImage3} alt="Today" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
        {/* End Timeline */}

        {/* Additional Details Section */}
        <div className="mt-12">
          <h3 className="font-monastery text-xl font-bold mb-4 text-saffron">Tashiding Today</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A revered Nyingma monastery perched above Yuksom, where ritual, scholarship, and mountain silence meet.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Incense, prayer flags, and festival rhythms—especially Bhumchu—keep centuries of living tradition alive.
          </p>
          <img src={rumtekImage} alt="Tashiding Today" className="rounded-lg shadow-md w-full max-w-md mb-4" />
          <p className="text-muted-foreground leading-relaxed">
            To visit is to step into a landscape where legend and nature hold a long, steady conversation.
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
              <p className="text-sm text-muted-foreground mb-2">From Pelling: ~25 km (1–1.5 hrs) by shared taxis/jeeps</p>
              <p className="text-xs text-muted-foreground">From Gangtok: ~100–115 km (4–5 hrs) via Yuksom/Pelling</p>
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
              <p className="text-sm text-muted-foreground mb-2">Taxi/private car from Yuksom or Pelling recommended</p>
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
              <p className="text-sm text-muted-foreground mb-2">Pakyong (~110 km, 4–5 hrs by road)</p>
              <p className="text-xs text-muted-foreground">Helicopter service to Gangtok (seasonal)</p>
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
                <span>Bhumchu Festival</span>
                <Badge className="bg-primary text-primary-foreground">Feb–Mar</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sacred-water ceremony on the 14th–15th day of the first Tibetan lunar month.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Losar Festival</span>
                <Badge className="bg-secondary text-secondary-foreground">February</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tibetan New Year with Cham dances and community prayers.</p>
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
      title: "Dubdi Monastery",
      distanceText: "≈ 10 km (short drive from Tashiding)",
      blurb: "Among Sikkim’s oldest monasteries (1701), near Yuksom; tied to the kingdom’s founding.",
      link: "https://sikkimtourism.gov.in/Public/PlacesToGo/dubdi"
    },
    {
      title: "Rabdentse Ruins",
      distanceText: "≈ 12 km (short drive from Tashiding)",
      blurb: "Moss-covered ruins of Sikkim’s old royal capital in a forest setting.",
      link: "https://sikkimtourism.gov.in/Public/PlacesToGo/rabdentse"
    },
    {
      title: "Khecheopalri Lake",
      distanceText: "≈ 20 km (30–40 min drive)",
      blurb: "A sacred wish-fulfilling lake surrounded by forests and legends.",
      link: "https://sikkimtourism.gov.in/Public/PlacesToGo/khecheopalrilake"
    },
    {
      title: "Kanchenjunga Falls",
      distanceText: "≈ 11 km (20–30 min drive)",
      blurb: "Perennial waterfall sourced from Mt. Kanchenjunga’s glacial melt.",
      link: "https://sikkimtourism.gov.in/Public/PlacesToGo/kanchenjungafalls"
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
  const rumtekCoordinates: [number, number] = [27.294, 88.283]; // Tashiding approx
  const rumtekName = "Tashiding Monastery";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-monastery text-2xl">Interactive Location Map</DialogTitle>
        </DialogHeader>
        {/* REPLACED THIS SECTION with LeafletMapComponent */}
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
          src="https://www.youtube.com/embed/gesLZXRKhGY?si=YFde9bWdnm0Uprvd" 
          className="w-[95%] h-[95%] mx-auto rounded-lg"
          style={{ aspectRatio: '16/9' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title="Tashiding Monastery Video Tour"
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
  src="/SIH_monestries_images/tashi/tashi.glb"
  alt="Tashiding Monastery 3D Model"
  camera-controls
  auto-rotate
  style={{ width: '100%', height: '500px', background: '#f3f4f6', borderRadius: '1rem' }}
/>
      </div>
    </DialogContent>
  </Dialog>
);

export default function TashidingMonastery() {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // ...existing code...
const images = [
  "/SIH_monestries_images/tashi/tashi_1.jpg",
  "/SIH_monestries_images/tashi/tashi_2.jpg",
  "/SIH_monestries_images/tashi/tashi.jpg",
  "/SIH_monestries_images/tashi/tashi_4.jpg"
];
// ...existing code...

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
          <h1 className="font-monastery text-3xl md:text-4xl font-bold">Tashiding Monastery</h1>
          <p className="text-primary-foreground/90 mt-2">The Heart of Sudden Satisfaction</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Image Gallery */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 group">
          <img 
            src={images[currentImage]}
            alt="Tashiding Monastery"
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


 {/* Quick Info Cards – updated for Tashiding */}
<div className="grid md:grid-cols-4 gap-6 mb-12">
  <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
    <CardContent className="py-8">
      <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-saffron ring-2 ring-saffron/40 group-hover:scale-110 transform transition-transform">
        <MapPin className="w-6 h-6" />
      </div>
      <p className="text-base font-bold tracking-tight text-stone-800">West Sikkim, near Yuksom</p>
      <p className="text-sm text-stone-600 mt-1">Hilltop setting</p>
    </CardContent>
  </Card>

  <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-red-50 to-pink-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
    <CardContent className="py-8">
      <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-rose-500 ring-2 ring-rose-200 group-hover:scale-110 transform transition-transform">
        <Calendar className="w-6 h-6" />
      </div>
      <p className="text-base font-bold tracking-tight text-stone-800">Founded 1641</p>
      <p className="text-sm text-stone-600 mt-1">Ngadak Sempa Chempo</p>
    </CardContent>
  </Card>

  <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-emerald-50 to-teal-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
    <CardContent className="py-8">
      <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-emerald-600 ring-2 ring-emerald-200 group-hover:scale-110 transform transition-transform">
        <Users className="w-6 h-6" />
      </div>
      <p className="text-base font-bold tracking-tight text-stone-800">Nyingma Tradition</p>
      <p className="text-sm text-stone-600 mt-1">Living monastic seat</p>
    </CardContent>
  </Card>

  <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-indigo-50 to-violet-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
    <CardContent className="py-8">
      <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-violet-600 ring-2 ring-violet-200 group-hover:scale-110 transform transition-transform">
        <Star className="w-6 h-6" />
      </div>
      <p className="text-base font-bold tracking-tight text-stone-800">Bhumchu Festival</p>
      <p className="text-sm text-stone-600 mt-1">Sacred-water ritual</p>
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
              🏔
            </div>
            Nearby Places
          </Button>
          <Button 
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('interactiveMap')}
          >
            <div className="w-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
              🗺
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
              🖼
            </div>
            3D Model
          </Button>
        </div>

      {/* Simplified Audio Box */}
        <div className="mb-6">
          <ScrollReveal>
            <audio
              controls
              className="w-[50%] md:w-[25%] rounded-lg shadow-md"
            >
              <source src="/SIH_monestries_images/tashi/tashispeech.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </ScrollReveal>
        </div>
        
        {/* Main Content (REPLACED) */}
<div className="flex flex-col gap-12 mt-2">
  {/* 1) Intro */}
  <div className="md:flex md:gap-8 items-start">
    <ScrollReveal>
      <div className="md:w-3/5">
        <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
          Tashiding Monastery: A Divine Shrine of Sikkim
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Sited on a hill in West Sikkim, Tashiding Monastery is a symbol of ancient spiritual heritage and
          cultural resistance. Founded in the 17th century, this monastery is sanctified as one of the holiest
          places of pilgrimage in the region, said to possess great spiritual power and divine grace. It is named,
          after all, "The Heart of Sudden Satisfaction" in the local Dzongkha language, due to its importance as a
          site where believers crave liberation, healing, and spiritual satisfaction.
        </p>
      </div>
    </ScrollReveal>
    <ScrollReveal>
      <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
        <img
          src="/SIH_monestries_images/tashi/tashi_1.jpg"
          alt="Tashiding Monastery hilltop"
          className="w-full h-[300px] object-cover rounded-lg shadow-md"
        />
      </div>
    </ScrollReveal>
  </div>

  {/* 2) Origins and Historical Significance */}
  <div className="md:flex md:gap-8 items-start">
    <ScrollReveal>
      <div className="md:w-3/5">
      <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
        Origins and Historical Significance
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed">
        Established in 1641 by the great Nyingma master Ngadak Sempa Chempo, Tashiding is an important site in
        Sikkimese history. Constructed during a time of political unification, when Tibetan Buddhist power was
        spreading into the Himalayas, the monastery was erected according to traditional geomantic principles,
        positioning itself within harmony with the natural terrain to maximize its spiritual potency.
      </p>
      <p className="text-muted-foreground mt-4 leading-relaxed">
        Legend surrounds the site, with stories of Guru Padmasambhava (also called Guru Rinpoche) meditating
        there and conferring blessings that established the monastery’s spiritual authority. Tashiding’s spiritual
        importance is strongly linked to the belief that it safeguards the region from negative energies and helps
        maintain cosmic balance.
      </p>
      </div>
    </ScrollReveal>
      <ScrollReveal>
    <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
      <img
        src="/SIH_monestries_images/tashi/tashi_2.jpg"
        alt="Origins and historical significance"
        className="w-full h-[300px] object-cover rounded-lg shadow-md"
      />
    </div>
    </ScrollReveal>
  </div>

  {/* 3) Architectural Elegance and Artistic Grandeur */}
  <div className="md:flex md:gap-8 items-start">
    <ScrollReveal>
      <div className="md:w-3/5">
      <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
        Architectural Elegance and Artistic Grandeur
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed">
        Tashiding Monastery is an excellent representation of classical Tibetan Buddhist architecture, with its
        cluster of multi-level buildings that blend harmoniously with their environment. The principal temple,
        constructed of the locally available wood and stone, has fine carvings and colorful paintings recounting
        Buddhist scripture stories. The temple's curved roofs and intricately carved wooden facades are an
        illustration of Sikkimese artisans' fine craftsmanship, combining utility with artistry.
      </p>
      <p className="text-muted-foreground mt-4 leading-relaxed">
        Within, the halls of the monastery are decorated with huge thangkas, relics, and images of Buddhist gods,
        such as Guru Padmasambhava in wrathful and calm manifestations. Murals of heavenly realms, demon gods
        vanquished by divine armies, and Buddha's teachings, created using bold brushstrokes and brilliant colors
        typical of Tibetan art, cover the walls.
      </p>
      </div>
    </ScrollReveal>
    <ScrollReveal>
      
    <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
      <img
        src="/SIH_monestries_images/tashi/tashi.jpg"
        alt="Architecture and art at Tashiding"
        className="w-full h-[300px] object-cover rounded-lg shadow-md"
        />
    </div>
        </ScrollReveal>
  </div>

  {/* 4) Zangdok Palri */}
  <div className="md:flex md:gap-8 items-start">
    <ScrollReveal>
    <div className="md:w-3/5">
      <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">Zangdok Palri</h2>
      <p className="text-muted-foreground text-lg leading-relaxed">
        One of the most dramatic aspects of Tashiding is the "Zangdok Palri," a stunning seven-story wooden
        replica of Guru Rinpoche's heavenly palace, carefully sculpted with exquisite carvings. Each story
        depicts various stories of Buddhist cosmology, making the whole structure a moving chart of spiritual
        worlds.
      </p>
    </div>
    </ScrollReveal>
    <ScrollReveal>

    <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
      <img
        src="/SIH_monestries_images/tashi/tashi_4.jpg"
        alt="Zangdok Palri model"
        className="w-full h-[300px] object-cover rounded-lg shadow-md"
        />
    </div>
        </ScrollReveal>
  </div>
</div>
{/* END Main Content (REPLACED) */}

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