import { useState } from 'react';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RitualEvent {
  id: string;
  name: string;
  monastery: string;
  date: string;
  time: string;
  type: 'festival' | 'prayer' | 'ceremony';
  description: string;
}

const mockEvents: RitualEvent[] = [
  {
    id: '1',
    name: 'Losar (Tibetan New Year)',
    monastery: 'Rumtek Monastery',
    date: '2024-02-12',
    time: '06:00 AM',
    type: 'festival',
    description: 'Traditional Tibetan New Year celebration with mask dances and prayers'
  },
  {
    id: '2',
    name: 'Morning Prayer Session',
    monastery: 'Pemayangtse Monastery',
    date: '2024-02-15',
    time: '05:30 AM',
    type: 'prayer',
    description: 'Daily morning prayers open to visitors'
  },
  {
    id: '3',
    name: 'Saga Dawa Festival',
    monastery: 'Tashiding Monastery',
    date: '2024-05-23',
    time: '08:00 AM',
    type: 'festival',
    description: 'Celebration of Buddha\'s birth, enlightenment, and parinirvana'
  }
];

interface RitualCalendarPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RitualCalendarPopup = ({ isOpen, onClose }: RitualCalendarPopupProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredEvents = mockEvents.filter(event => {
    if (selectedType !== 'all' && event.type !== selectedType) return false;
    if (selectedDate && event.date !== selectedDate) return false;
    return true;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'festival': return 'bg-primary text-primary-foreground';
      case 'prayer': return 'bg-accent text-accent-foreground';
      case 'ceremony': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl">
            <Calendar className="w-6 h-6 text-primary" />
            Ritual Calendar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
              >
                All Events
              </Button>
              <Button
                variant={selectedType === 'festival' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('festival')}
              >
                Festivals
              </Button>
              <Button
                variant={selectedType === 'prayer' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('prayer')}
              >
                Prayers
              </Button>
              <Button
                variant={selectedType === 'ceremony' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('ceremony')}
              >
                Ceremonies
              </Button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.monastery}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                    </div>
                  </div>
                  <Badge className={getTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                </div>
                <p className="text-muted-foreground font-body">
                  {event.description}
                </p>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No events found for the selected criteria.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};