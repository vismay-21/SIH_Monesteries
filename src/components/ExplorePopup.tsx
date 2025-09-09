import { useState } from 'react';
import { Search, MapPin, Calendar, Users, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Monastery {
  id: string;
  name: string;
  tibetanName: string;
  location: string;
  founded: string;
  sect: string;
  significance: string;
  visitors: string;
}

const mockMonasteries: Monastery[] = [
  {
    id: '1',
    name: 'Rumtek Monastery',
    tibetanName: 'རུམ་ཐེག་དགོན།',
    location: 'Gangtok, East Sikkim',
    founded: '1966',
    sect: 'Kagyu',
    significance: 'Seat of the Karmapa',
    visitors: 'Open Daily'
  },
  {
    id: '2',
    name: 'Pemayangtse Monastery',
    tibetanName: 'པདྨ་ཡང་རྩེ་དགོན།',
    location: 'Pelling, West Sikkim',
    founded: '1705',
    sect: 'Nyingma',
    significance: 'One of the oldest monasteries',
    visitors: 'Open Daily'
  },
  {
    id: '3',
    name: 'Tashiding Monastery',
    tibetanName: 'བཀྲ་ཤིས་སྡིང་དགོན།',
    location: 'Tashiding, West Sikkim',
    founded: '1717',
    sect: 'Nyingma',
    significance: 'Sacred hill monastery',
    visitors: 'Open Daily'
  },
  {
    id: '4',
    name: 'Enchey Monastery',
    tibetanName: 'ཨེན་ཅེ་དགོན།',
    location: 'Gangtok, East Sikkim',
    founded: '1909',
    sect: 'Nyingma',
    significance: 'City monastery',
    visitors: 'Open Daily'
  },
  {
    id: '5',
    name: 'Dubdi Monastery',
    tibetanName: 'དུབ་སྡི་དགོན།',
    location: 'Yuksom, West Sikkim',
    founded: '1701',
    sect: 'Nyingma',
    significance: 'First monastery in Sikkim',
    visitors: 'Limited Access'
  }
];

interface ExplorePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExplorePopup = ({ isOpen, onClose }: ExplorePopupProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSect, setSelectedSect] = useState<string>('all');

  const filteredMonasteries = mockMonasteries.filter(monastery => {
    const matchesSearch = monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monastery.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSect = selectedSect === 'all' || monastery.sect === selectedSect;
    return matchesSearch && matchesSect;
  });

  const getSectColor = (sect: string) => {
    switch (sect) {
      case 'Kagyu': return 'bg-primary text-primary-foreground';
      case 'Nyingma': return 'bg-accent text-accent-foreground';
      case 'Gelug': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const sects = Array.from(new Set(mockMonasteries.map(m => m.sect)));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl">
            <MapPin className="w-6 h-6 text-primary" />
            Explore Monasteries
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search monasteries by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedSect('all')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedSect === 'all' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                All Sects
              </button>
              {sects.map(sect => (
                <button
                  key={sect}
                  onClick={() => setSelectedSect(sect)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedSect === sect 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {sect}
                </button>
              ))}
            </div>
          </div>

          {/* Monasteries Grid */}
          <div className="grid gap-4">
            {filteredMonasteries.map((monastery) => (
              <div key={monastery.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {monastery.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-serif">
                      {monastery.tibetanName}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {monastery.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Founded {monastery.founded}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {monastery.visitors}
                      </div>
                    </div>
                  </div>
                  <Badge className={getSectColor(monastery.sect)}>
                    {monastery.sect}
                  </Badge>
                </div>
                <p className="text-muted-foreground font-body">
                  {monastery.significance}
                </p>
              </div>
            ))}
          </div>

          {filteredMonasteries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No monasteries found matching your search criteria.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};