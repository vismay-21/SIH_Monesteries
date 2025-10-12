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
          360° Virtual Tour - Main Prayer Hall
        </DialogTitle>
      </DialogHeader>
      <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop" 
          alt="360° view of Sangachoeling monastery interior"
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
        <DialogTitle className="font-monastery text-2xl">The Story of Sangachoeling</DialogTitle>
      </DialogHeader>
      <div className="space-y-10">
        {/* Timeline Graphic */}
        <div className="relative px-2 py-6">
          {/* rail */}
          <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-saffron to-amber-500 rounded-full shadow-[inset_0_0_4px_rgba(0,0,0,0.15)]" />
          <div className="flex flex-col gap-10 ml-0 md:ml-12">
            {/* 1697 — Birth */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1697
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Sangachoeling's Birth</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Established by Lama Lhatsun Chempo in 1697, Sangachoeling Monastery emerged as the first major Buddhist monastery in Sikkim, situated on a hilltop in Pelling. It became a stronghold of the Nyingma tradition and a spiritual hub within the Himalayas.
                </p>
                <img src={rumtekImage} alt="Early Sangachoeling" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 18th Century */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  18th C
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Spread & Religious Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  During the 1700s, Sangachoeling flourished as an important hub of Vajrayana Buddhist meditation and scholarship, attracting scholars, monks, and pilgrims that kept its religious and cultural standing.
                </p>
                <img src={rumtekImage2} alt="Growth of Sangachoeling" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* 19th Century */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  19th C
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Trials & Renewal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The monastery endured numerous trials, such as natural disasters and political changes, yet was repeatedly restored by faithful practitioners. Murals, statues, and writings from the period remained, cementing the monastery's history.
                </p>
                <img src={rumtekImage3} alt="Restoration era" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* Early 20th Century — Fire & Revival */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  Early 20th C
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Revival After Fire</h3>
                <p className="text-muted-foreground leading-relaxed">
                  After a crippling fire, Sangachoeling was reconstructed extensively, restoring its architectural and artistic glory. Preservation of its 17th-century clay sculptures, ancient murals, and holy relics was given prominence in the restoration.
                </p>
                <img src={rumtekImage} alt="Reconstruction works" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
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
                <h3 className="font-monastery text-lg font-semibold mb-1">A Living Legacy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Now a serene retreat for meditation and education, Sangachoeling Monastery remains to provide spiritual mentorship and Tibetan Buddhist teachings. Its peaceful courtyards, intact relics, and stunning Himalayan vistas call pilgrims and travelers who crave the serenity of Sikkim's Buddhist heritage.
                </p>
                <img src={rumtekImage} alt="Sangachoeling today" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
        {/* End Timeline */}

        {/* Additional Details Section */}
        <div className="mt-12">
          <h3 className="font-monastery text-xl font-bold mb-4 text-saffron">Sangachoeling Today</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A serene retreat for meditation and education, Sangachoeling continues to mentor practitioners while preserving sacred relics and murals—offering quiet courtyards and sweeping Himalayan vistas.
          </p>
          <img src={rumtekImage} alt="Sangachoeling courtyard" className="rounded-lg shadow-md w-full max-w-md mb-4" />
          <p className="text-muted-foreground leading-relaxed">
            Its living legacy draws seekers who crave contemplative silence and the subtle power of the Nyingma tradition in Sikkim.
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
              <p className="text-sm text-muted-foreground mb-2">From Gangtok: Around 135 km (4.5–5 hrs)</p>
              <p className="text-xs text-muted-foreground">Services to Pelling / nearby, then local approach</p>
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
              <p className="text-sm text-muted-foreground mb-2">Private taxi: ₹1500–2000</p>
              <p className="text-xs text-muted-foreground">Mountain roads; check weather/season</p>
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
              <p className="text-sm text-muted-foreground mb-2">Bagdogra (~150 km, 5–6 hrs)</p>
              <p className="text-xs text-muted-foreground">Seasonal helicopter service from Pelling helipad</p>
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
              <p className="text-sm text-muted-foreground">
                Monks engage in traditional chanting and meditation, fostering spiritual harmony throughout the day.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Losar Festival</span>
                <Badge className="bg-primary text-primary-foreground">Feb (Tibetan New Year)</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tibetan New Year observances in the region with community prayers and traditional rites.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Monthly Rituals</span>
                <Badge className="bg-secondary text-secondary-foreground">10th Day / Lunar</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Regular pujas and offerings on auspicious Tibetan lunar days.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Saga Dawa Festival</span>
                <Badge className="bg-emerald-600 text-white">Full Moon · 4th Month</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Commemoration of Buddha’s birth, enlightenment, and parinirvana with prayers and merit-making.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Special Pujas</span>
                <Badge className="bg-amber-500 text-amber-50">Occasional</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Periodic blessings and manuscript-based rituals; generally contemplative and small-scale.
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
      title: "Pemayangtse Monastery",
      distanceText: "≈ 15 min drive (7 km) from Sangachoeling",
      blurb: "Sikkim's oldest and most sacred monastery, noted for stunning architecture and medieval murals.",
      link: "#"
    },
    {
      title: "Rabdentse Ruins",
      distanceText: "≈ 25 min drive (12 km) from Sangachoeling",
      blurb: "Ruins of Sikkim's second capital with panoramic Kangchenjunga views and royal heritage.",
      link: "#"
    },
    {
      title: "Khecheopalri Lake",
      distanceText: "≈ 20 min drive (10 km) from Sangachoeling",
      blurb: "Holy lake revered by Hindus and Buddhists—renowned for its serenity and sacred importance.",
      link: "#"
    },
    {
      title: "Singshore Bridge",
      distanceText: "≈ 10 min drive (4 km) from Sangachoeling",
      blurb: "Among Asia's highest suspension bridges, offering breathtaking valley and mountain views.",
      link: "#"
    },
    {
      title: "Kanchenjunga Falls",
      distanceText: "≈ 40 min drive (18 km) from Sangachoeling",
      blurb: "Spectacular cascade set in dense forest—a peaceful spot for nature lovers and photographers.",
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
  // Approximate coordinates for Sangachoeling Monastery (near Pelling)
  const sangachoelingCoordinates: L.LatLngExpression = [27.311, 88.233];
  const sangachoelingName = "Sangachoeling Monastery";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-monastery text-2xl">Interactive Location Map</DialogTitle>
        </DialogHeader>
        <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
          <LeafletMapComponent
            monasteryPosition={sangachoelingCoordinates}
            monasteryName={sangachoelingName}
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
          src="/SIH_monestries_images/sanga/sanga.glb"
          alt="Sangachoeling Monastery 3D Model"
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
    "/SIH_monestries_images/sanga/sanga_1.jpg",
    "/SIH_monestries_images/sanga/sanga_2.jpg",
    "/SIH_monestries_images/sanga/sanga_3.jpg",
    "/SIH_monestries_images/sanga/sanga_4.jpg"
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
          <h1 className="font-monastery text-3xl md:text-4xl font-bold">Sangachoeling Monastery</h1>
          <p className="text-primary-foreground/90 mt-2">One of Sikkim’s oldest Nyingma monasteries</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Image Gallery */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 group">
          <img 
            src={images[currentImage]}
            alt="Sangachoeling Monastery"
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

        {/* Quick Info Cards – unchanged visuals */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-saffron ring-2 ring-saffron/40 group-hover:scale-110 transform transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">Pelling region</p>
              <p className="text-sm text-stone-600 mt-1">West Sikkim</p>
            </CardContent>
          </Card>

          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-red-50 to-pink-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-rose-500 ring-2 ring-rose-200 group-hover:scale-110 transform transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">Founded 17th century</p>
              <p className="text-sm text-stone-600 mt-1">Nyingma tradition</p>
            </CardContent>
          </Card>

          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-emerald-50 to-teal-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-emerald-600 ring-2 ring-emerald-200 group-hover:scale-110 transform transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">Monastic Community</p>
              <p className="text-sm text-stone-600 mt-1">Meditation & study</p>
            </CardContent>
          </Card>

          <Card className="group text-center min-h-[150px] rounded-2xl border-0 bg-gradient-to-br from-indigo-50 to-violet-100 shadow-md hover:shadow-xl transition-all cursor-pointer">
            <CardContent className="py-8">
              <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-full bg-white shadow-inner text-violet-600 ring-2 ring-violet-200 group-hover:scale-110 transform transition-transform">
                <Star className="w-6 h-6" />
              </div>
              <p className="text-base font-bold tracking-tight text-stone-800">Historic Hilltop</p>
              <p className="text-sm text-stone-600 mt-1">Scenic vistas</p>
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
        
        {/* Audio (left as-is) */}
        <ScrollReveal>
          <div className="mb-6">
            <audio
              controls
              className="w-[50%] md:w-[25%] rounded-lg shadow-md"
            >
              <source src="/audio/Rumtek_monastery.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </ScrollReveal>
        
        {/* Main Content – INTRO (exact text provided) */}
        <div className="flex flex-col gap-12 mt-2 not-prose">
          {/* Intro */}
          <div className="md:flex md:gap-8 items-start">
            <ScrollReveal>
              <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                Sangachoeling Monastery: An Everlasting Retreat of Sikkim's Heritage
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                For the visitor looking not only for a place but an experience that is infused with history and faith, Sangachoeling Monastery presents a journey to the essence of Buddhist determination and enigma. Perched deep in the remote hills of South Sikkim, Sangachoeling is one of the region's oldest monasteries—a steadfast vessel filled with the echoes of early masters, monks, and pilgrims across centuries of transition.
              </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
                <img
                  src="/SIH_monestries_images/sanga/sanga_1.jpg"
                  alt="Sangachoeling Monastery hillside view"
                  className="block w-full h-[300px] object-cover rounded-lg shadow-md"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* The Sacred Center of Spiritual Legacy */}
          <div className="md:flex md:gap-8 items-start">
            <ScrollReveal>
              <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                The Sacred Center of Spiritual Legacy
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Established by the venerated Lama Lhatsun Chempo in the 17th century, Sangachoeling was founded as a haven for deep meditation and Buddhist education. It was the spiritual wellspring for the Nyingma tradition in Sikkim, silently fostering generations of practitioners seeking refuge, wisdom, and connection with the divine. The monastery itself is less visited by tourists, so its holy places remain a pristine and reflective environment, which makes every visit feel as if one is stepping back into some timeless world.
              </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>

            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/sanga/sanga_2.jpg"
                alt="Sangachoeling landscape"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
                />
            </div>
                </ScrollReveal>
          </div>

          {/* Architectural Poetry in Stone and Timber */}
          <div className="md:flex md:gap-8 items-start">
            <ScrollReveal>
              <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                Architectural Poetry in Stone and Timber
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Approach to Sangachoeling is as stepping into a peaceful poem chiselled in stone and wood. The monastery's traditional Tibetan building style mirrors the rugged beauty and spiritual function of Himalayan Buddhist architecture. Constructed on a steep ridge overlooking mighty valleys, the building is a balance of power and elegance, ascending tier upon tier against a background of towering pines and snow-capped peaks.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                The interior walls feature ornate murals of deities, guardians, and enlightened teachers, painted in rich earth tones that have remained unscathed over centuries. Prayer wheels flank the corridors, their constant rotation marked by the gentle hum of monks' mantras that resonate within the holy halls. The central shrine, humble but beautiful, contains statues of Guru Padmasambhava, the Buddha, and local protectors who strengthen the spiritual hold of the monastery.
              </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>

            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/sanga/sanga_3.jpg"
                alt="Sangachoeling interiors and murals"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
                />
            </div>
                </ScrollReveal>
          </div>

          {/* The Rhythm of Ritual and Reflection */}
          <div className="md:flex md:gap-8 items-start">
            <ScrollReveal>
              <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                The Rhythm of Ritual and Reflection
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sangachoeling lives on the rhythms of daily rituals that spin the tapestry of monastic existence. Monks conduct early morning and vespers prayers, the air thick with recitations from the old books and the scent of incense. Though it does not have the big festivals one finds at larger monasteries, Sangachoeling's more subdued ceremonies represent a profound, persistent dedication to meditation, study, and spiritual practice.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                This sacred rhythm appeals to those drawn to contemplative silence and profound personal connection. The monastery’s relative remoteness offers pilgrims and visitors a rare chance to experience Buddhism’s subtle power, undiluted by crowds or commercialization.
              </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/sanga/sanga_4.jpg"
                alt="Sangachoeling prayer courtyard"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
            </ScrollReveal>
          </div>

          {/* A Sanctuary for Seekers and Scholars */}
          <div className="md:flex md:gap-8 items-start">
            <ScrollReveal>
              <div className="md:w-3/5">
              <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">
                A Sanctuary for Seekers and Scholars
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sangachoeling is not just a site to witness but a site to experience—to sit in silence, to listen for the eternal voice of belief carried on flapping prayer flags and the whispered forest in the background. For scholars, the monastery contains relics and manuscripts tracing the religious history of Sikkim. For seekers, it provides sacred spaces imbued with sandalwood scent and laced with centuries of devotion.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Sitting atop sweeping Himalayan scenery, the monastery is an invitation for a solitary pilgrimage—one that defies cartography or travel guides. Here, each turn, each intricately carved beam, each prayer said in hushed tones is a testament to unyielding faith, fortitude, and the transcendent holiness of the mountains.
              </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
            <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0 self-start not-prose">
              <img
                src="/SIH_monestries_images/sanga/sanga_1.jpg"
                alt="Sangachoeling seekers and scholars"
                className="block w-full h-[300px] object-cover rounded-lg shadow-md"
                />
            </div>
                </ScrollReveal>
          </div>
        </div>
        {/* --- END: Intro/Story Section --- */}
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
