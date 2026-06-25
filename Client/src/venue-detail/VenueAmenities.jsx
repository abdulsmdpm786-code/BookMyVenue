import React from 'react';
import * as Icons from 'lucide-react';

export function VenueAmenities({ venue }) {
  const amenitiesList = venue.amenities || [];

  // Helper to map amenity names to Lucide icons dynamically
  const getIcon = (name) => {
    const cleanName = name.toLowerCase();
    
    if (cleanName.includes('wifi')) return 'Wifi';
    if (cleanName.includes('parking') || cleanName.includes('valet')) return 'Car';
    if (cleanName.includes('catering') || cleanName.includes('kitchen')) return 'Utensils';
    if (cleanName.includes('sound') || cleanName.includes('music') || cleanName.includes('audio')) return 'Volume2';
    if (cleanName.includes('barbecue') || cleanName.includes('bonfire') || cleanName.includes('fire')) return 'Flame';
    if (cleanName.includes('heating') || cleanName.includes('air') || cleanName.includes('a/c')) return 'Wind';
    if (cleanName.includes('bar') || cleanName.includes('wine') || cleanName.includes('cocktail')) return 'GlassWater';
    if (cleanName.includes('stage') || cleanName.includes('mic') || cleanName.includes('elevator')) return 'Sparkles';
    if (cleanName.includes('view') || cleanName.includes('scenic')) return 'Compass';
    if (cleanName.includes('accessible') || cleanName.includes('wheelchair')) return 'Accessibility';
    if (cleanName.includes('tent') || cleanName.includes('outdoor')) return 'Tent';
    if (cleanName.includes('pet')) return 'Heart';
    if (cleanName.includes('security')) return 'Shield';
    if (cleanName.includes('pool') || cleanName.includes('swimming')) return 'Droplet';
    if (cleanName.includes('garden') || cleanName.includes('greenhouse')) return 'Flower2';
    
    return 'CheckCircle2'; // fallback icon
  };

  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in-up">
      <h3 className="text-xl font-bold text-slate-800 tracking-tight">
        Building Amenities
      </h3>

      <div className="bg-[#FAF9F6] border border-slate-200/60 rounded-[2rem] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenitiesList.map((amenity, idx) => {
            const iconName = getIcon(amenity);
            const IconComponent = Icons[iconName] || Icons.CheckCircle2;

            return (
              <div 
                key={idx}
                className="bg-white border border-slate-150/70 hover:border-slate-300 hover:shadow-sm rounded-2xl p-4 flex items-center gap-3 transition-all duration-300 group hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-450 group-hover:text-ticket-orange group-hover:bg-ticket-orange/5 transition-all">
                  <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
                </div>
                <span className="text-xs font-bold text-slate-700">{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VenueAmenities;
