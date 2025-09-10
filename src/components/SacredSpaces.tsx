import { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MonasteryCard } from './MonasteryCard';
import { useNavigate } from 'react-router-dom';

// Sample monastery data - in a real app, this would come from an API
const monasteries = [
  {
    id: '1',
    name: 'Rumtek Monastery',
    location: 'Gangtok, East Sikkim',
    founded: '1966',
    description: 'The largest monastery in Sikkim, Rumtek serves as the seat-in-exile of the Karmapa Lama and houses precious Buddhist artifacts.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
    hasVirtualTour: true,
    nextCeremony: 'Losar Festival - Feb 15'
  },
  {
    id: '2', 
    name: 'Pemayangtse Monastery',
    location: 'Pelling, West Sikkim',
    founded: '1705',
    description: 'One of the oldest and most important monasteries in Sikkim, known for its ancient architecture and spiritual significance.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    hasVirtualTour: true,
    nextCeremony: 'Cham Dance - Mar 2'
  },
  {
    id: '3',
    name: 'Tashiding Monastery',
    location: 'Yuksom, West Sikkim', 
    founded: '1641',
    description: 'Considered the holiest monastery in Sikkim, positioned at the confluence of two sacred rivers with stunning mountain views.',
    image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=300&fit=crop',
    hasVirtualTour: true,
    nextCeremony: 'Bumchu Festival - Feb 28'
  },
  {
    id: '4',
    name: 'Enchey Monastery',
    location: 'Gangtok, East Sikkim',
    founded: '1909', 
    description: 'A significant Nyingma monastery known for its annual Cham dance and beautiful location overlooking Gangtok.',
    image: 'https://images.unsplash.com/photo-1628624747186-a88c31695b88?w=400&h=300&fit=crop',
    hasVirtualTour: true,
    nextCeremony: 'Cham Dance - Dec 18'
  },
  {
    id: '5',
    name: 'Dubdi Monastery',
    location: 'Yuksom, West Sikkim',
    founded: '1701',
    description: 'The first monastery built in Sikkim, situated on a hilltop and known for its historical significance and peaceful atmosphere.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop',
    hasVirtualTour: true,
    nextCeremony: 'Prayer Ceremony - Jan 20'
  },
  {
    id: '6',
    name: 'Sangachoeling Monastery',
    location: 'Pelling, West Sikkim',
    founded: '1697',
    description: 'The second oldest monastery in Sikkim, offering spectacular views of Kanchenjunga and renowned for its meditation retreats.',
    image: 'https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?w=400&h=300&fit=crop',
    hasVirtualTour: true,
    nextCeremony: 'Meditation Retreat - Feb 10'
  }
];

export const SacredSpaces = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMonastery, setSelectedMonastery] = useState<string | null>(null);

  const filteredMonasteries = monasteries.filter(monastery =>
    monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monastery.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monastery.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMonasteryClick = (monasteryId: string) => {
    setSelectedMonastery(monasteryId);
    if (monasteryId === '1') { // Rumtek monastery
    navigate('/monastery/rumtek');
  } else if (monasteryId === '2') { // Pemayangtse monastery
    navigate('/monastery/pemayangtse');
  } else if (monasteryId == '3') {
    navigate('/monastery/Tashiding');
  } else if (monasteryId == '4'){
    navigate('/monastery/Enchey');
  } else if (monasteryId == '5'){
    navigate('/monastery/Dubdi'); 
  } else if (monasteryId == '6'){  
    navigate('/monastery/Sangachoeling');
  }
  else {
    console.log('Selected monastery:', monasteryId);
  }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-monastery text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sacred Spaces
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore over 200 monasteries across Sikkim, each with its unique history, 
            architecture, and spiritual significance.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search monasteries by name, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-base"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="btn-monastery">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className={viewMode === 'grid' ? 'btn-saffron' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className={viewMode === 'list' ? 'btn-saffron' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredMonasteries.length} of {monasteries.length} monasteries
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Monastery Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredMonasteries.map((monastery) => (
            <MonasteryCard
              key={monastery.id}
              name={monastery.name}
              location={monastery.location}
              founded={monastery.founded}
              description={monastery.description}
              image={monastery.image}
              hasVirtualTour={monastery.hasVirtualTour}
              nextCeremony={monastery.nextCeremony}
              onClick={() => handleMonasteryClick(monastery.id)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredMonasteries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-monastery text-xl font-semibold text-foreground mb-2">
              No monasteries found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm('')}
              className="btn-saffron"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};