import rumtekImage from '../assets/rumtek.jpg';
import rumtekImage2 from '../assets/rumtek2.jpg';
import rumtekImage3 from '../assets/rumtek3.jpg';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useState } from 'react';
import { ArrowLeft, Camera, ChevronLeft, ChevronRight, MapPin, Calendar, Users, Star, Bus, Car, Plane, Train } from 'lucide-react';
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
          <div className="absolute left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-saffron to-amber-500 rounded-full shadow-[inset_0_0_4px_rgba(0,0,0,0.15)]" />
          <div className="flex flex-col gap-10 ml-0 md:ml-12">
            {/* Foundation and Early Years (1647–1651) */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1647–1651
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Foundation & Early Years</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Traditionally attributed to Lama Lhatsun Chempo, Pemayangtse’s earliest shrine emerges in this period as part of the movement that crowned Sikkim’s first Chogyal.
                </p>
                <img src={rumtekImage} alt="Early shrine at Pemayangtse" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* Formal Monastery / 1705 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1705
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Perfect Sublime Lotus</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The shrine is enlarged into a full monastery and recognized within the Nyingma order—its name “Pemayangtse” symbolizing the perfect, sublime lotus.
                </p>
                <img src={rumtekImage2} alt="Pemayangtse growth period" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* Monastic Institution (18th–19th C) */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  18th–19th C
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Monastic Institution & Culture</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A principal Nyingma seat in Sikkim, home to ta-tshang (celibate) monks of pure Tibetan descent, and a hub of ritual, festivals, and ties to the Sikkimese monarchy.
                </p>
                <img src={rumtekImage3} alt="Monastic traditions at Pemayangtse" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* Earthquakes & Restoration */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  1913 & 1960
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">Quakes & Restoration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Major earthquakes damage structures; careful repairs preserve sacred art, statues, and murals while retaining architectural integrity.
                </p>
                <img src={rumtekImage} alt="Restoration efforts" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>

            {/* Contemporary */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 grid place-items-center rounded-full bg-white ring-2 ring-saffron text-saffron font-bold shadow-lg z-10 w-14 h-14 md:w-12 md:h-12">
                <span className="px-1 text-center text-[10px] md:text-[11px] leading-[1.05] tracking-tight break-words">
                  21st C
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-monastery text-lg font-semibold mb-1">A Living Heritage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Pemayangtse remains a vibrant spiritual center and pilgrimage site. Festivals—especially Pang Lhabsol—animate its courtyards with masked Cham dances.
                </p>
                <img src={rumtekImage2} alt="Pemayangtse today" className="mt-3 rounded-lg shadow-md w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="mt-12">
          <h3 className="font-monastery text-xl font-bold mb-4 text-saffron">Pemayangtse Today</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Overlooking the ruins of Rabdentse and the valleys around Pelling, Pemayangtse remains a sanctuary where ritual, scholarship, and community are braided into daily life.
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
                <Car className="w-5 h-5 text-primary" />
                By Car
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Private taxis/cabs from Gangtok to Pelling (~110–130 km).</p>
              <p className="text-xs text-muted-foreground">Approx fare ₹3,800–₹5,800 for a car (route/season dependent).</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Train className="w-5 h-5 text-primary" />
                By Train
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Nearest stations: New Jalpaiguri (NJP) & Siliguri.</p>
              <p className="text-xs text-muted-foreground">~120–135 km from Pemayangtse; continue by road.</p>
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
              <p className="text-sm text-muted-foreground mb-2">Pakyong Airport (~110 km; 4–5 hrs by road).</p>
              <p className="text-xs text-muted-foreground">Taxis available from Pakyong/Gangtok towards Pelling.</p>
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
        <DialogTitle className="font-monastery text-2xl">Rituals & Festivals</DialogTitle>
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
                  <p className="text-xs text-muted-foreground">5:30 AM – 7:00 AM</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Evening Prayers</p>
                  <p className="text-xs text-muted-foreground">6:00 PM – 7:30 PM</p>
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
              <p className="text-sm text-muted-foreground">Tibetan New Year celebrations with traditional masked dances and festivities.</p>
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
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{place.blurb}</p>
                  </div>
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
  const rumtekCoordinates: [number, number] = [27.3017, 88.2394]; // Pemayangtse (near Pelling)
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
          src="https://www.youtube.com/embed/9JvxfFO2a6c?si=t6H2Mc6BvRTv14d_"
          className="w-[95%] h-[95%] mx-auto rounded-lg"
          style={{ aspectRatio: '16/9' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
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
          src="/SIH_monestries_images/pema/pega.glb"
          alt="Pemayangtse Monastery 3D Model"
          camera-controls
          auto-rotate
          style={{ width: '100%', height: '500px', background: '#f3f4f6', borderRadius: '1rem' }}
        />
      </div>
    </DialogContent>
  </Dialog>
);

export default function PemayangtseMonastery() {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);


  
  // Images (unchanged)
  const images = [
    "/SIH_monestries_images/pema/pema_1.jpg",
    "/SIH_monestries_images/pema/pema_2.jpg",
    "/SIH_monestries_images/pema/pema_3.jpg",
    "/SIH_monestries_images/pema/pema_4.jpg"
  ];

  // INTRO sections mapped 1:1 with paragraphs, each paired with an image
  const introSections = [
    {
      title: "A Himalayan Spiritual Lotus",
      text:
        "Pemayangtse Monastery, towering on a lush hill above the peaceful town of Pelling in West Sikkim, is a radiant tribute to historic Tibetan Buddhist heritage and religious sanctity. Founded in 1705 by the illustrious Lama Lhatsun Chempo, the monastery is one of the oldest and most prestigious of the Nyingma Order—the elder of the four great schools of Tibetan Buddhism. Its title, Pemayangtse, means \"Perfect Sublime Lotus,\" representing the flowering of spiritual wisdom in the midst of harsh Himalayan terrain.",
    },
    {
      title: "A Pilgrimage Through Nature",
      text:
        "The trip to Pemayangtse is in itself a peaceful pilgrimage, which winds along verdant rhododendron forests exploding into riotous color in the spring and providing dramatic panoramic views of the stunning Kanchenjunga, the world's third-highest mountain. From its hilltop vantage point, the monastery gazes out over the ancient remains of Rabdentse, the former royal capital of the Sikkim kingdom, producing a poignant mix of history, nature, and spirituality that imbues the site with an atmosphere of eternal reverence.",
    },
    {
      title: "Architectural Wonder of Tibetan Culture",
      text:
        "Architecturally, Pemayangtse is a masterpiece, a breathing canvas of traditional Tibetan woodwork and symbolic religious art. Its three-story structure is adorned with intricately carved wooden pillars and beams, richly decorated doors and windows, and seven-tiered wooden roofs to symbolize the heavenly residence of Guru Rinpoche (Padmasambhava), the revered father of Tibetan Buddhism. The walls of the monastery are painted in bright murals representing Buddhist deities, passages from ancient texts, and the wrathful manifestations of Padmasambhava and his emanations, a testament to centuries of devotional artistry and religious fervor.",
    },
    {
      title: "Sacred Heart of Devotion",
      text:
        "Lying at the very heart of Pemayangtse is its main prayer hall, the Lakhang. Here lies the powerful likeness of Padmasambhava in the form of Dorje Phurba (Vajrakila), a fierce guardian deity with several heads and arms, representing the power to defeat evil forces. Adorning this are old statues, fragile thangkas (traditional Tibetan paintings), and sacred ritual implements, all carefully preserved. The resident monks are of the 'ta-tshang' order, referring to celibate monks of pure Tibetan descent who maintain an unbroken tradition of spiritual discipline and high ritual practice, thus making the monastery an important institution for intense meditation and spiritual training.",
    },
    {
      title: "A Living Cultural Festival",
      text:
        "Pemayangtse Monastery rises above its architectural splendor and historical value to become a living, breathing place of faith. The air itself is redolent with incense, and the monotonous chanting of monks conducting daily prayers creates a contemplative tapestry. Festival time is alive in the monastery courtyard during festivities such as the cheerful Pang Lhabsol, which is celebrated to honor Mt. Kanchenjunga with masked Cham dances of vibrant color, drumming, and ecstatic communal rites that bring together pilgrims, tourists, and believers to the ferment of a lively celebration of life and piety.",
    },
    {
      title: "Sanctuary of Timeless Heritage",
      text:
        "A temple complex greater than mere religious structure, Pemayangtse Monastery is a meticulously preserved oasis of Tibetan Buddhist thought, consecrated art, and cultural tradition. It is a shining testament to the strength and persistent heritage of Sikkim's Buddhist traditions, inextricably tied with adjacent sacred sites like Dubdi Monastery, Tashiding, and holy Khecheopalri Lake. Together, they create a consecrated landscape that remains to inspire and nourish seekers from all corners of the globe.",
    },
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
          <h1 className="font-monastery text-3xl md:text-4xl font-bold">Pemayangtse Monastery</h1>
          <p className="text-primary-foreground/90 mt-2">Perfect Sublime Lotus above Pelling, principal Nyingma seat of Sikkim</p>
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
              <p className="text-sm text-stone-600 mt-1">Lama Lhatsun Chempo</p>
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
              <p className="text-base font-bold tracking-tight text-stone-800">Perfect Sublime Lotus</p>
              <p className="text-sm text-stone-600 mt-1">Principal Nyingma Seat</p>
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
              🛣
            </div>
            Travel Routes
          </Button>
          <Button
            className="h-20 flex-col border border-muted bg-white text-muted-foreground shadow-sm rounded-lg hover:btn-saffron bg-saffron hover:text-white transition-colors"
            onClick={() => openPopup('rituals')}
          >
            <div className="W-8 h-8 mb-2 bg-muted/10 rounded-full flex items-center justify-center">
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

        {/* Audio Box */}
        <div className="mb-6">
          <ScrollReveal>
            <audio
              controls
              className="w-[50%] md:w-[25%] rounded-lg shadow-md"
            >
              <source src="/SIH_monestries_images/pema/pemaspeech.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </ScrollReveal>
        </div>

        {/* INTRO: each paragraph with an image */}
        <div className="flex flex-col gap-12 mt-6">
          {introSections.map((sec, idx) => (
            <div key={sec.title} className="md:flex md:gap-8 items-start">
              <div className="md:w-3/5">
                <ScrollReveal>
                  <h2 className="font-monastery text-2xl md:text-3xl font-bold mb-4 text-saffron">{sec.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">{sec.text}</p>
                </ScrollReveal>
              </div>
              <ScrollReveal>
                <div className="md:w-2/5 mt-6 md:mt-0 flex-shrink-0">
                  <img
                    src={images[idx % images.length]}
                    alt={sec.title}
                    className="w-full h-[300px] object-cover rounded-lg shadow-md"
                  />
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
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