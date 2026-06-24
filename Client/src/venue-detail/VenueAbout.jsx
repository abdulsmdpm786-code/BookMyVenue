import React, { useState } from 'react';

export function VenueAbout({ venue }) {
  const [expanded, setExpanded] = useState(false);

  // Generate some extra paragraph content dynamically to fill out the page luxuriously,
  // matching the screenshot's three full paragraphs!
  const getExtendedParagraphs = () => {
    return [
      venue.description,
      `Each area features floor-to-ceiling windows, premium finishes, and state-of-the-art appliances. The spacious open-concept living spaces flow seamlessly into chef-inspired kitchens with custom island seating, while the master suite includes a spa-like ensuite bathroom with custom tiles, heated floors, and a rainfall shower.`,
      `The property boasts world-class building amenities including a fully equipped gymnasium, rooftop terrace with breathtaking city views, dedicated concierge services, secure underground garage parking, and a premium resident lounge perfect for private entertainment.`
    ];
  };

  const paragraphs = getExtendedParagraphs();

  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in-up">
      <h3 className="text-xl font-bold text-slate-800 tracking-tight">
        About {venue.name}
      </h3>
      
      <div className={`flex flex-col gap-4 text-sm text-slate-650 leading-relaxed font-normal transition-all duration-505 overflow-hidden ${
        expanded ? 'max-h-[1000px]' : 'max-h-[160px] md:max-h-[220px]'
      }`}>
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-left font-bold text-xs text-ticket-orange hover:text-ticket-orange/80 transition-colors uppercase tracking-wider mt-1"
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
}

export default VenueAbout;
