import rumtekImage from '../assets/rumtek.jpg';
import rumtekImage2 from '../assets/architecture_rumtek.jpg';
import rumtekImage3 from '../assets/golden_heart_rumtek.jpg';
import rumtekImage4 from '../assets/seekers_rumtek.jpg';
import rumtekImage5 from '../assets/living_heart_rumtek.jpg';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, ChevronLeft, ChevronRight, MapPin, Calendar, Users, Star, Bus, Car, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import '@google/model-viewer';
import { LeafletMapComponent } from '@/components/LeafletMapComponent';
//kunj is here

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
        <DialogTitle className="font-monastery text-2xl">The Story of Rumtek</DialogTitle>
      </DialogHeader>
      <div className="space-y-10">
        {/* Timeline Graphic */}
        <div className="relative px-2 py-6">
          {/* rail: more vibrant and visible */}
          <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-saffron to-amber-500 rounded-full shadow-[inset_0_0_4px_rgba(0,0,0,0.15)]" />
          <div className="flex flex-col gap-10 ml-0 md:ml-12">
            {/* 1734 */}
            <div className="relative flex items-start gap-6">
              {/* year badge: fits all labels */}
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1734
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Birth of Rumtek</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With blessings from the 9th Karmapa, Wangchuk Dorje, and patronage from Sikkim’s King, the first Rumtek Monastery rises—a jewel of Kagyu Buddhism in the Eastern Himalayas.
                </p>
                <img src={rumtekImage} alt="Old Rumtek Monastery" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
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
                <h3 className="font-monastery text-lg font-semibold mb-1">A Time of Change</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rumtek thrives for generations, but political shifts and time leave it weakened; by the mid-20th century, its once-grand halls fall into disrepair.
                </p>
                <img src={rumtekImage2} alt="Rumtek in Disrepair" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1959 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1959
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Exile and Renewal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The 16th Karmapa, Rangjung Rigpe Dorje, escapes Tibet after the Chinese invasion, carrying relics, texts, and the spiritual legacy of the Karma Kagyu lineage.
                </p>
                <img src={rumtekImage3} alt="Karmapa's Arrival" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1960–1966 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1960–66
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Rebuilding Faith</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Invited by Sikkim’s Chogyal, the 16th Karmapa selects Rumtek’s auspicious site. With donations from devotees across India and abroad, a magnificent new monastery is constructed—faith and community chiseling stone into sanctuary.
                </p>
                {/* Replaced placeholder with actual Rumtek image */}
                <img src={rumtekImage} alt="Construction of New Rumtek" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1966 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1966
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">A New Seat-in-Exile</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The 16th Karmapa enthrones Rumtek as his seat-in-exile. Sacred treasures—silk thangkas, statues, the 108-volume Kangyur—are installed, transforming Rumtek into the heartbeat of Tibetan Buddhism outside Tibet.
                </p>
                {/* Replaced placeholder with actual Rumtek image */}
                <img src={rumtekImage} alt="Installation of Sacred Treasures" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 1981 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1981
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Legacy Sealed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Upon the Karmapa’s passing, his relics are enshrined within a glittering Golden Stupa, sealing Rumtek’s role as both refuge and eternal symbol of resilience.
                </p>
                {/* Replaced placeholder with actual Rumtek image */}
                <img src={rumtekImage} alt="Golden Stupa & Relics" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
        {/* End Timeline */}

        {/* Additional Details Section */}
        <div className="mt-12">
          <h3 className="font-monastery text-xl font-bold mb-4 text-saffron">Rumtek Today</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Rumtek Monastery stands as a living testament to the resilience of Tibetan Buddhism. Its halls echo with the chants of monks, the debates of scholars, and the footsteps of pilgrims from around the world.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The monastery is not only a spiritual center but also a hub for cultural preservation, hosting vibrant festivals, sacred rituals, and teachings that keep centuries-old traditions alive.
          </p>
          <img src={rumtekImage} alt="Rumtek Today" className="rounded-lg shadow-md w-full max-w-md mb-4" />
          <p className="text-muted-foreground leading-relaxed">
            Visitors can explore its ornate architecture, meditate in tranquil courtyards, and witness the living heritage of the Karma Kagyu lineage—where every stone, thangka, and prayer wheel tells a story of faith and survival.
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

const FamousPlacesPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const nearbyPlaces = [
    {
      title: "Tashi View Point",
      distanceText: "≈ 1 hr 30 min drive (35–40 km) from Rumtek",
      blurb: "Sunrise hotspot with sweeping views of Kangchenjunga and the Eastern Himalayas.",
      link: "https://www.indianholiday.com/sikkim/tourist-attraction/gangtok/tashi-view-point.html"
    },
    {
      title: "Do Drul Chorten",
      distanceText: "≈ 45–50 min drive (22–25 km) from Rumtek",
      blurb: "A striking white stupa encircled by 108 prayer wheels, radiating peace and devotion.",
      link: "http://sikkimstdc.com/GeneralPages/Details/Do-Drul-Chorten/"
    },
    {
      title: "Enchey Monastery",
      distanceText: "≈ 1 hr 10 min drive (32–35 km) from Rumtek",
      blurb: "200-year-old monastery famed for its Cham mask dances and ornate Sikkimese murals.",
      link: "https://gangtokdistrict.nic.in/tourist-place/enchey-monastery/"
    },
    {
      title: "Banjhakri Falls & Energy Park",
      distanceText: "≈ 45 min drive (20 km) from Rumtek",
      blurb: "Lush green park with a roaring waterfall, bridges, and shamanic folklore sculptures.",
      link: "https://www.indianholiday.com/sikkim/tourist-attraction/gangtok/banjhakri-falls-and-energy-park.html"
    },
    {
      title: "Namgyal Institute of Tibetology",
      distanceText: "≈ 50 min drive (23 km) from Rumtek",
      blurb: "Premier research hub showcasing rare Tibetan manuscripts, thangkas, and relics.",
      link: "https://www.tibetology.sikkim.gov.in/"
    },
    {
      title: "Hanuman Tok",
      distanceText: "≈ 1 hr 15 min drive (30 km) from Rumtek",
      blurb: "Hilltop Hanuman temple maintained by the Indian Army, offering pristine mountain vistas.",
      link: "https://gangtokdistrict.nic.in/tourist-place/hanuman-tok/"
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
  const rumtekCoordinates: L.LatLngExpression = [27.3197, 88.5975]; // Latitude, Longitude for Rumtek
  const rumtekName = "Rumtek Monastery";

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
        {/* The "Get Directions" button can be removed or re-implemented separately
            if you desire a more advanced directions feature.
        */}
        {/* <div className="absolute bottom-4 right-4">
          <Button size="sm" className="btn-saffron">Get Directions</Button>
        </div> */}
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
  src="/SIH_monestries_images/rumtek/rumtek.glb"
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

  // Ensure the page is scrolled to top when this route/component mounts
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (e) {
      // fallback for older browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);


const images = [
  "/SIH_monestries_images/rumtek/rumtek_1.jpg",
  "/SIH_monestries_images/rumtek/rumtek_2.jpg",
  "/SIH_monestries_images/rumtek/rumtek_3.jpg",
  "/SIH_monestries_images/rumtek/rumtek_4.jpg"
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


 {/* Quick Info Cards – beautified */}
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

          
        {/* Simplified Audio Box */}
        <div className="mb-6">
          <audio
            controls
            className="w-[50%] md:w-[25%] rounded-lg shadow-md"
          >
            <source src="/SIH_monestries_images/rumtek/rumtekspeech.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
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

        {/* --- BEGIN: Extended Story Section --- */}
        <div className="flex flex-col gap-12 mt-16">
          {/* Section 1 */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">Rumtek Monastery: The Living Heart of Tibet in Sikkim</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                For the traveler who seeks more than landscapes—for the one who listens for stories in stones and silence—Rumtek Monastery is not just a stop on the map. It is a journey into Tibet’s living heartbeat, carried across borders, revived in exile, and still breathing in the emerald folds of Sikkim’s hills.
              </p>
              <p className="text-muted-foreground mt-4">
                Founded in the 16th century and rebuilt by the 16th Karmapa after his flight from Tibet, Rumtek is less a monument than a vessel of resilience. Every carved beam and prayer wheel tells a tale of survival, faith, and the timeless rhythm of devotion.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
              <img src="/SIH_monestries_images/rumtek/rumtek_1.jpg" alt="Rumtek" />            </div>
          </div>

          {/* Section 2 */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">An Architectural Mandala</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Approaching Rumtek feels like stepping into a sacred universe painted in wood and stone. Modeled after the legendary Tsurphu Monastery of Tibet, its three-story structure fuses fortress strength with mandala symmetry.
              </p>
              <p className="text-muted-foreground mt-4">
                Vibrant murals splash across walls with scenes of Buddhas, Bodhisattvas, and guardian deities. Carved dragons curl around golden pillars. Sunlight falls across silk thangkas and hand-woven carpets, setting them aglow. In the main hall, a ten-foot Sakyamuni Buddha watches with a serene gravity that seems to slow time.
              </p>
              <p className="text-muted-foreground mt-4">
                As visitors walk a kora—the circular path around the monastery—every spin of the prayer wheel, etched with ancient mantras, whispers blessings into the mountain wind.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
              <img src="/SIH_monestries_images/rumtek/rumtek_2.jpg" alt="Rumtek" />
            </div>
          </div>

          {/* Section 3 */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">The Golden Heart</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At the center of Rumtek lies its spiritual treasure: the Golden Stupa. Inlaid with jewels and precious metals, it houses the relics of the 16th Karmapa. Surrounding murals depict cosmic landscapes where myth and mountain merge.
              </p>
              <p className="text-muted-foreground mt-4">
                Across the courtyard stands the Karma Shri Nalanda Institute for Higher Buddhist Studies—an academic sanctum where monks debate, learn, and keep alive centuries of Buddhist philosophy. To witness them in debate, voices rising and hands clapping in ritual rhythm, is to glimpse an education system older than most nations.
              </p>
              <p className="text-muted-foreground mt-4">
                And then come the festivals. During Vajrakilaya Drupchen or Losar, the courtyard bursts with color and sound—masked dancers whirl, cymbals clash, and chants rise into the sky, drawing pilgrims, photographers, and seekers alike into an unforgettable celebration.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
              <img src="/SIH_monestries_images/rumtek/rumtek_3.jpg" alt="Rumtek" />            </div>
          </div>

          {/* Section 4 */}
          <div className="md:flex md:gap-8 items-start">
            <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">A Sanctuary for Seekers</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Rumtek is not designed for casual glances—it rewards those who linger. For the historian, it offers archives of rare Buddhist texts. For the spiritual traveler, it provides spaces scented with incense and draped with prayer flags that frame sweeping Himalayan vistas. For the storyteller, it is a canvas where devotion, art, and survival paint their intertwined tale.
              </p>
              <p className="text-muted-foreground mt-4">
                Sit quietly on the stone steps, and you may hear the steady drone of monks chanting at dawn. Watch prayer flags flutter against snow peaks, and you may feel something shift within—something that belongs not just to the monastery, but to you.
              </p>
              <p className="text-muted-foreground mt-4">
                Rumtek is less about visiting and more about returning—with more questions, more stillness, and a deeper reverence for a culture that endures in every stone, song, and shadow.
              </p>
            </div>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
              <img src="/SIH_monestries_images/rumtek/rumtek_4.jpg" alt="Rumtek" />            </div>
          </div>
        </div>
        {/* --- END: Extended Story Section --- */}
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
