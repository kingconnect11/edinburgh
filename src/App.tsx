import React, { useState, useEffect, useRef } from 'react';
import { X, Navigation, Coffee, Utensils, Wine, Music, MapPin, DollarSign, ChevronLeft, Map as MapIcon, List } from 'lucide-react';
import { VENUES_DATA, Venue } from './data/venues';
import slateBackground from './slate-background.jpeg';
import scrollBackground from './scroll-background.jpg';
import leatherBook from './leather-book.png';
import backgroundMusic from './background.mp3';
import conciergeWelcome from './concierge-welcome.mp3';
import conciergeIcon from './SVG_Butler_Good.svg';

const CATEGORIES = [
  { id: 'drinks', label: 'Drinks', icon: Wine, angle: -60 },
  { id: 'meals', label: 'Meals', icon: Utensils, angle: -30 },
  { id: 'quick-bites', label: 'Quick Bites', icon: Coffee, angle: 0 },
  { id: 'huzz', label: 'Huzz', icon: Music, angle: 30 },
  { id: 'free', label: 'Free', icon: MapPin, angle: 60 }
];

const App = () => {
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'guide', 'concierge', 'itinerary'
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [itinerary, setItinerary] = useState<number[]>([]);
  const [conciergeMessages, setConciergeMessages] = useState<Array<{role: string, content: string}>>([]);
  const [userInput, setUserInput] = useState('');
  const [showMapView, setShowMapView] = useState(false);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const welcomeSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize background music
    bgMusicRef.current = new Audio(backgroundMusic);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.6; // 60% volume

    // Initialize welcome sound
    welcomeSoundRef.current = new Audio(conciergeWelcome);

    // Try to play background music (might need user interaction)
    const playBgMusic = () => {
      bgMusicRef.current?.play().catch(err => {
        // Autoplay was prevented, will play on first user interaction
        console.log('Autoplay prevented, waiting for user interaction');
      });
    };

    // Start music on first user interaction
    const handleFirstInteraction = () => {
      playBgMusic();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      bgMusicRef.current?.pause();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('guide');
  };

  const handleConcierge = () => {
    // Play welcome sound
    if (welcomeSoundRef.current) {
      welcomeSoundRef.current.currentTime = 0;
      welcomeSoundRef.current.play().catch(err => console.log('Sound play prevented'));
    }

    setCurrentView('concierge');
    if (conciergeMessages.length === 0) {
      setConciergeMessages([{
        role: 'assistant',
        content: "Fàilte Lord Lord! I'm your Edinburgh concierge, here to serve your every whim and desire. What kind of experience are you looking for today? I can recommend from our curated collection of the city's finest establishments. Shall I procure some whoores for this evening's activities?"
      }]);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages = [
      ...conciergeMessages,
      { role: 'user', content: userInput }
    ];

    // Enhanced search logic
    const query = userInput.toLowerCase();
    let recommendations: Venue[] = [];

    // Search by tags, category, name, and description
    const scored = VENUES_DATA.map(venue => {
      let score = 0;
      const searchableText = `${venue.name} ${venue.description} ${venue.tags.join(' ')} ${venue.category}`.toLowerCase();

      // Check if query words match
      const queryWords = query.split(' ').filter(w => w.length > 2);
      queryWords.forEach(word => {
        if (searchableText.includes(word)) score += 10;
        if (venue.tags.some(tag => tag.toLowerCase().includes(word))) score += 20;
        if (venue.category.includes(word)) score += 30;
      });

      return { venue, score };
    });

    // Get top 3 matches
    recommendations = scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.venue);

    // Fallback to category if no matches
    if (recommendations.length === 0) {
      if (query.includes('drink') || query.includes('cocktail') || query.includes('bar') || query.includes('whisky') || query.includes('wine')) {
        recommendations = VENUES_DATA.filter(v => v.category === 'drinks').slice(0, 3);
      } else if (query.includes('eat') || query.includes('dinner') || query.includes('lunch') || query.includes('food') || query.includes('restaurant')) {
        recommendations = VENUES_DATA.filter(v => v.category === 'meals').slice(0, 3);
      } else if (query.includes('coffee') || query.includes('quick') || query.includes('grab') || query.includes('bite') || query.includes('cafe')) {
        recommendations = VENUES_DATA.filter(v => v.category === 'quick-bites').slice(0, 3);
      } else if (query.includes('dance') || query.includes('club') || query.includes('party') || query.includes('night')) {
        recommendations = VENUES_DATA.filter(v => v.category === 'huzz').slice(0, 2);
      } else if (query.includes('free') || query.includes('park') || query.includes('museum') || query.includes('view') || query.includes('walk')) {
        recommendations = VENUES_DATA.filter(v => v.category === 'free').slice(0, 3);
      }
    }

    const response = recommendations.length > 0
      ? `Based on what you're looking for, I'd recommend:\n\n${recommendations.map(v => `• ${v.name} - ${v.description}`).join('\n\n')}`
      : "Could you tell me more about what you're in the mood for? Perhaps drinks, meals, coffee, dancing, or free attractions?";

    newMessages.push({ role: 'assistant', content: response });
    setConciergeMessages(newMessages);
    setUserInput('');
  };

  const addToItinerary = (venueId: number) => {
    setItinerary(prev =>
      prev.includes(venueId)
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    );
  };

  const filteredVenues = selectedCategory
    ? VENUES_DATA.filter(v => v.category === selectedCategory)
    : VENUES_DATA;

  const itineraryVenues = VENUES_DATA.filter(v => itinerary.includes(v.id));

  // Menu View (Slate Circle)
  if (currentView === 'menu') {
    return (
      <div className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${slateBackground})`
        }}>
        <div className="relative w-full max-w-3xl h-screen flex items-center justify-center px-4">
          {/* Category Buttons in Arc - Lower positioning */}
          {CATEGORIES.map((cat) => {
            const radius = 42;
            const centerY = 65;
            const angleRad = (cat.angle * Math.PI) / 180;
            const x = 50 + radius * Math.sin(angleRad);
            const y = centerY - radius * Math.cos(angleRad);
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 px-5 sm:px-6 py-3 sm:py-3 rounded-lg shadow-2xl transition-all hover:scale-110 border-2 border-green-950 active:scale-95"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon className="w-6 h-6 sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-sm font-bold">{cat.label}</span>
                </div>
              </button>
            );
          })}

          {/* Central Concierge Button */}
          <button
            onClick={handleConcierge}
            className="relative bg-gradient-to-br from-green-700 to-green-950 hover:from-green-600 hover:to-green-900 text-white px-16 sm:px-20 py-16 sm:py-20 rounded-full shadow-2xl transition-all hover:scale-105 border-4 border-green-950 active:scale-95"
          >
            <div className="flex flex-col items-center gap-2">
              <img
                src={conciergeIcon}
                alt="Concierge butler"
                className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
              />
              <span className="text-xl sm:text-2xl font-bold font-serif">
                Concierge
              </span>
            </div>
          </button>

          {/* Itinerary Button */}
          {itinerary.length > 0 && (
            <button
              onClick={() => setCurrentView('itinerary')}
              className="absolute bottom-8 right-8 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 px-6 py-3 rounded-full shadow-xl transition-all hover:scale-110 border-2 border-green-950 active:scale-95"
            >
              <div className="flex items-center gap-2">
                <List className="w-5 h-5" />
                <span className="font-bold">{itinerary.length}</span>
              </div>
            </button>
          )}

          {/* Title - Updated text with lower z-index */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-0 pointer-events-none">
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2 font-serif drop-shadow-lg">
              Lord Kyle of California
            </h1>
            <p className="text-base sm:text-lg text-slate-300 drop-shadow-md">Dùn Èideann</p>
          </div>
        </div>
      </div>
    );
  }

  // Guide View (Open Book with leather book background)
  if (currentView === 'guide') {
    return (
      <div className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${leatherBook})`
        }}>
        <div className="h-full overflow-y-auto scroll-smooth">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-b from-black/70 to-transparent p-4 sm:p-6 backdrop-blur-sm z-10">
            <button
              onClick={() => setCurrentView('menu')}
              className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors mb-4 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="text-lg font-semibold">Back to Menu</span>
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-100 text-center font-serif">
              {CATEGORIES.find(c => c.id === selectedCategory)?.label}
            </h1>
          </div>

          {/* Venues Grid */}
          <div className="px-4 sm:px-6 pb-20 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-6">
              {filteredVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-amber-50/95 rounded-lg shadow-lg p-4 sm:p-6 border-2 border-amber-900/30 hover:shadow-xl transition-all cursor-pointer backdrop-blur-sm"
                  onClick={() => setSelectedVenue(venue)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-amber-900 font-serif pr-2">
                      {venue.name}
                    </h2>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToItinerary(venue.id);
                      }}
                      className={`p-2 rounded-full transition-all flex-shrink-0 active:scale-90 ${
                        itinerary.includes(venue.id)
                          ? 'bg-gradient-to-br from-green-800 to-green-950 text-green-50'
                          : 'bg-green-100 text-green-900 hover:bg-green-200'
                      }`}
                    >
                      <List className={`w-4 h-4 sm:w-5 sm:h-5 ${itinerary.includes(venue.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <p className="text-amber-800 text-sm mb-3">{venue.address}</p>
                  <p className="text-amber-900 mb-4 italic text-sm sm:text-base">{venue.description}</p>

                  <div className="flex items-center gap-3 sm:gap-4 text-sm text-amber-800 flex-wrap">
                    <span className="font-bold">{'£'.repeat(venue.priceRange || 1)}</span>
                    {venue.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-amber-200 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Venue Detail Modal */}
        {selectedVenue && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => setSelectedVenue(null)}>
            <div className="bg-amber-50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border-4 border-amber-900" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif pr-4">
                  {selectedVenue.name}
                </h2>
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors flex-shrink-0 active:scale-90"
                >
                  <X className="w-6 h-6 text-green-900" />
                </button>
              </div>

              <p className="text-amber-800 mb-4">{selectedVenue.address}</p>
              <p className="text-amber-900 text-base sm:text-lg mb-6 italic">{selectedVenue.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-amber-900">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-bold">{'£'.repeat(selectedVenue.priceRange || 1)}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedVenue.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-amber-200 rounded-full text-sm text-amber-900">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  {selectedVenue.reviews.map((review, idx) => (
                    <p key={idx} className="text-amber-800 italic border-l-4 border-amber-400 pl-4 text-sm sm:text-base">
                      "{review}"
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.open(`https://www.openstreetmap.org/directions?from=&to=${selectedVenue.lat}%2C${selectedVenue.lng}#map=16/${selectedVenue.lat}/${selectedVenue.lng}`)}
                  className="flex-1 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 font-bold py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <Navigation className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Directions</span>
                </button>
                <button
                  onClick={() => addToItinerary(selectedVenue.id)}
                  className={`flex-1 font-bold py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    itinerary.includes(selectedVenue.id)
                      ? 'bg-gradient-to-br from-green-900 to-green-950 text-green-50'
                      : 'bg-green-100 text-green-900 hover:bg-green-200'
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span className="text-sm sm:text-base">
                    {itinerary.includes(selectedVenue.id) ? 'Remove' : 'Add to Itinerary'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Concierge View (Scroll)
  if (currentView === 'concierge') {
    return (
      <div className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${scrollBackground})`
        }}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-b from-black/60 to-transparent p-4 sm:p-6 backdrop-blur-sm">
            <button
              onClick={() => setCurrentView('menu')}
              className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors mb-4 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="text-lg font-semibold">Back to Menu</span>
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-100 text-center font-serif">
              Your Concierge
            </h1>
            <p className="text-center text-amber-200 mt-2">Ask me anything about Edinburgh</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 max-w-4xl mx-auto w-full scroll-smooth">
            <div className="space-y-4">
              {conciergeMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 sm:p-4 rounded-lg shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-green-800 to-green-950 text-green-50'
                        : 'bg-green-50/90 text-green-900 border-2 border-green-900/20'
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm sm:text-base">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto flex gap-2 sm:gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="What are you in the mood for?"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-green-50 border-2 border-green-900/20 text-green-900 placeholder-green-700 focus:outline-none focus:border-green-700 text-sm sm:text-base"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 font-bold rounded-lg transition-colors active:scale-95 text-sm sm:text-base"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Itinerary View with Map
  if (currentView === 'itinerary') {
    return (
      <div className="fixed inset-0 bg-amber-100">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-b from-amber-900 to-amber-800 p-4 sm:p-6 shadow-lg">
            <button
              onClick={() => setCurrentView('menu')}
              className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors mb-4 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="text-lg font-semibold">Back to Menu</span>
            </button>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-amber-100 font-serif">
                Your Itinerary
              </h1>
              <button
                onClick={() => setShowMapView(!showMapView)}
                className="flex items-center gap-2 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 px-3 sm:px-4 py-2 rounded-lg transition-colors active:scale-95"
              >
                {showMapView ? <List className="w-5 h-5" /> : <MapIcon className="w-5 h-5" />}
                <span className="text-sm sm:text-base font-bold hidden sm:inline">
                  {showMapView ? 'List' : 'Map'}
                </span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {showMapView ? (
              // Map View
              <div className="h-full flex flex-col md:flex-row">
                {/* List Column */}
                <div className="w-full md:w-2/5 h-1/2 md:h-full overflow-y-auto bg-amber-50 border-r-2 border-amber-200 scroll-smooth">
                  <div className="p-4 space-y-3">
                    {itineraryVenues.map((venue, index) => (
                      <div
                        key={venue.id}
                        className="bg-white rounded-lg shadow p-3 sm:p-4 border-2 border-amber-900/20 hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => setSelectedVenue(venue)}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-800 to-green-950 text-green-50 rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-amber-900 text-sm sm:text-base truncate">{venue.name}</h3>
                            <p className="text-xs sm:text-sm text-amber-700">{venue.address}</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://www.openstreetmap.org/directions?from=&to=${venue.lat}%2C${venue.lng}#map=16/${venue.lat}/${venue.lng}`);
                                }}
                                className="text-xs px-2 py-1 bg-gradient-to-r from-green-800 to-green-950 text-green-50 rounded hover:from-green-700 hover:to-green-900 transition-colors active:scale-95"
                              >
                                <Navigation className="w-3 h-3 inline mr-1" />
                                Navigate
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToItinerary(venue.id);
                                }}
                                className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors active:scale-95"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Column */}
                <div className="w-full md:w-3/5 h-1/2 md:h-full relative">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${(itineraryVenues[0]?.lng || -3.1983) - 0.02},${(itineraryVenues[0]?.lat || 55.9533) - 0.02},${(itineraryVenues[0]?.lng || -3.1983) + 0.02},${(itineraryVenues[0]?.lat || 55.9533) + 0.02}&layer=mapnik&marker=${itineraryVenues[0]?.lat || 55.9533},${itineraryVenues[0]?.lng || -3.1883}`}
                  ></iframe>
                  <div className="absolute bottom-4 left-4 right-4 bg-green-950/90 text-white p-3 rounded-lg backdrop-blur-sm">
                    <p className="text-xs sm:text-sm">
                      <strong>Note:</strong> Click below to see all locations with directions
                    </p>
                    <button
                      onClick={() => {
                        const firstVenue = itineraryVenues[0];
                        if (firstVenue) {
                          window.open(`https://www.openstreetmap.org/directions?from=&to=${firstVenue.lat}%2C${firstVenue.lng}#map=14/${firstVenue.lat}/${firstVenue.lng}`);
                        }
                      }}
                      className="mt-2 w-full bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 px-4 py-2 rounded-lg transition-colors active:scale-95 text-sm"
                    >
                      Open in OpenStreetMap
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // List Only View
              <div className="h-full overflow-y-auto p-4 sm:p-6 scroll-smooth">
                <div className="max-w-4xl mx-auto space-y-4">
                  {itineraryVenues.map((venue, index) => (
                    <div
                      key={venue.id}
                      className="bg-amber-50 rounded-lg shadow-lg p-4 sm:p-6 border-2 border-amber-900/30 hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => setSelectedVenue(venue)}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-800 to-green-950 text-green-50 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl sm:text-2xl font-bold text-amber-900 font-serif mb-2">
                            {venue.name}
                          </h2>
                          <p className="text-amber-800 text-sm mb-2">{venue.address}</p>
                          <p className="text-amber-900 italic mb-4 text-sm sm:text-base">{venue.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-amber-200 rounded-full text-sm font-bold">
                              {'£'.repeat(venue.priceRange || 1)}
                            </span>
                            {venue.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-3 py-1 bg-amber-200 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-2 sm:gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`https://www.openstreetmap.org/directions?from=&to=${venue.lat}%2C${venue.lng}#map=16/${venue.lat}/${venue.lng}`);
                              }}
                              className="flex-1 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 font-bold py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95 text-sm sm:text-base"
                            >
                              <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                              Navigate
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToItinerary(venue.id);
                              }}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 rounded-lg transition-colors active:scale-95 text-sm sm:text-base"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {itineraryVenues.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-amber-800 text-lg mb-4">Your itinerary is empty</p>
                      <button
                        onClick={() => setCurrentView('menu')}
                        className="bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 px-6 py-3 rounded-lg font-bold transition-colors active:scale-95"
                      >
                        Explore Venues
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Venue Detail Modal */}
        {selectedVenue && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => setSelectedVenue(null)}>
            <div className="bg-amber-50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border-4 border-amber-900" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif pr-4">
                  {selectedVenue.name}
                </h2>
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors flex-shrink-0 active:scale-90"
                >
                  <X className="w-6 h-6 text-green-900" />
                </button>
              </div>

              <p className="text-amber-800 mb-4">{selectedVenue.address}</p>
              <p className="text-amber-900 text-base sm:text-lg mb-6 italic">{selectedVenue.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-amber-900">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-bold">{'£'.repeat(selectedVenue.priceRange || 1)}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedVenue.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-amber-200 rounded-full text-sm text-amber-900">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  {selectedVenue.reviews.map((review, idx) => (
                    <p key={idx} className="text-amber-800 italic border-l-4 border-amber-400 pl-4 text-sm sm:text-base">
                      "{review}"
                    </p>
                  ))}
                </div>
              </div>

              <button
                onClick={() => window.open(`https://www.openstreetmap.org/directions?from=&to=${selectedVenue.lat}%2C${selectedVenue.lng}#map=16/${selectedVenue.lat}/${selectedVenue.lng}`)}
                className="w-full bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 font-bold py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default App;
