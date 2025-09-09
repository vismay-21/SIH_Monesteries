import { useState } from 'react';
import { MapPin, Clock, Calendar, Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MonasteryCardProps {
  name: string;
  location: string;
  founded: string;
  description: string;
  image: string;
  hasVirtualTour: boolean;
  nextCeremony?: string;
  onClick: () => void;
}

export const MonasteryCard = ({
  name,
  location,
  founded,
  description,
  image,
  hasVirtualTour,
  nextCeremony,
  onClick
}: MonasteryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="monastery-glow bg-card rounded-2xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-[1.02]"
         onClick={onClick}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image}
          alt={`${name} monastery exterior view`}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        {/* Virtual Tour Badge */}
        {hasVirtualTour && (
          <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 flex items-center space-x-1">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground">360°</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Founded Date */}
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-xs font-medium opacity-90">Founded</p>
          <p className="text-lg font-monastery font-semibold">{founded}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-monastery text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Next Ceremony */}
        {nextCeremony && (
          <div className="flex items-center text-accent mb-4 p-3 bg-accent/10 rounded-lg">
            <Calendar className="w-4 h-4 mr-2" />
            <div>
              <p className="text-xs font-medium opacity-90">Next Ceremony</p>
              <p className="text-sm font-semibold">{nextCeremony}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 btn-monastery"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Clock className="w-4 h-4 mr-2" />
            Visit Info
          </Button>
          {hasVirtualTour && (
            <Button 
              size="sm" 
              className="btn-saffron"
              onClick={(e) => {
                e.stopPropagation();
                // Handle virtual tour
              }}
            >
              <Camera className="w-4 h-4 mr-2" />
              Tour
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};