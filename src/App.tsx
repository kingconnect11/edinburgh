import React, { useState, useEffect, useRef } from 'react';
import { X, Navigation, Coffee, Utensils, Wine, Music, MapPin, DollarSign, ChevronLeft, Map as MapIcon, List, Loader2, Copy, Hotel, Share2, Download, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import { VENUES_DATA, Venue } from './data/venues';
import slateBackground from './slate-background.jpeg';
import scrollBackground from './scroll-background.jpg';
import leatherBook from './leather-book.png';
import knightlyItinerary from './knightly_itinerary.png';
import lordLordKyle from './lord-lord-Kyle.svg';
import backgroundMusic from './background1.mp3';
import conciergeWelcome from './concierge-welcome.mp3';
import conciergeIcon from './SVG_Butler_Good.svg';
import { generateItineraryWithClaude, generateConciergeResponse } from './claudeAPI';

const CATEGORIES = [
  { id: 'drinks', label: 'Drinks', icon: Wine, angle: -75 },
  { id: 'meals', label: 'Meals', icon: Utensils, angle: -45 },
  { id: 'quick-bites', label: 'Quick Bites', icon: Coffee, angle: -15 },
  { id: 'huzz', label: 'Huzz', icon: Music, angle: 15 },
  { id: 'free', label: 'Free', icon: MapPin, angle: 45 },
  { id: 'hotels', label: 'Hotels', icon: Hotel, angle: 75 }
];

const App = () => {
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'guide', 'concierge', 'itinerary'
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [itinerary, setItinerary] = useState<number[]>([]);
  const [itineraryDescription, setItineraryDescription] = useState<string>('');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [conciergeMessages, setConciergeMessages] = useState<Array<{role: string, content: string}>>([]);
  const [userInput, setUserInput] = useState('');
  const [showMapView, setShowMapView] = useState(false);
  const [isConciergeThinking, setIsConciergeThinking] = useState(false);
  const [recommendedVenues, setRecommendedVenues] = useState<number[]>([]);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const welcomeSoundRef = useRef<HTMLAudioElement | null>(null);
  const itineraryCardRef = useRef<HTMLDivElement | null>(null);
  const recommendedVenuesRef = useRef<number[]>([]);
  const [isExportingImage, setIsExportingImage] = useState(false);

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

  // Generate Claude AI itinerary description when entering itinerary view
  useEffect(() => {
    if (currentView === 'itinerary' && itinerary.length > 0 && !itineraryDescription) {
      const venues = VENUES_DATA.filter(v => itinerary.includes(v.id));
      setIsGeneratingDescription(true);
      generateItineraryWithClaude(venues)
        .then(description => {
          setItineraryDescription(description);
          setIsGeneratingDescription(false);
        })
        .catch(error => {
          console.error('Failed to generate description:', error);
          setItineraryDescription("A splendid evening awaits you in Edinburgh, Sir! Your carefully curated selection of establishments promises an unforgettable experience through the heart of Dùn Èideann.");
          setIsGeneratingDescription(false);
        });
    }
  }, [currentView, itinerary, itineraryDescription]);

  // Clear recommended venues when leaving concierge view
  useEffect(() => {
    if (currentView !== 'concierge') {
      setRecommendedVenues([]);
      recommendedVenuesRef.current = [];
    }
  }, [currentView]);

  // Helper: Extract venue IDs from text by matching venue names
  const extractVenueIdsFromText = (text: string): number[] => {
    // Strip markdown formatting (**, __, etc.)
    const cleanedText = text.replace(/\*\*/g, '').replace(/__/g, '');
    const lowerText = cleanedText.toLowerCase();
    const foundVenueIds: number[] = [];

    VENUES_DATA.forEach(venue => {
      const venueName = venue.name.toLowerCase();

      // Extract the core name (before any dashes, parentheses, or "at")
      // e.g., "Oink (Victoria Street)" -> "oink"
      // e.g., "The Balmoral - Number One" -> "the balmoral"
      const coreNameMatch = venueName.split(/[-(\uff08]|at /)[0].trim();

      // Check multiple matching strategies:
      // 1. Full venue name appears in text
      // 2. Text contains the core venue name
      // 3. Core name from text matches core name of venue
      const fullMatch = lowerText.includes(venueName);
      const coreMatch = lowerText.includes(coreNameMatch);

      if (fullMatch || coreMatch) {
        foundVenueIds.push(venue.id);
        console.log(`✅ Found venue: ${venue.name} (ID: ${venue.id}) via ${fullMatch ? 'full' : 'core'} match`);
      }
    });

    console.log(`📍 Extracted ${foundVenueIds.length} venues from text:`, foundVenueIds);
    return foundVenueIds;
  };

  // Helper: Detect if user message is a confirmation
  const isConfirmation = (message: string): boolean => {
    const lowerMessage = message.toLowerCase().trim();
    const confirmationPhrases = [
      'ok',
      'okay',
      'sounds good',
      'sounds great',
      'sounds perfect',
      'let\'s do it',
      'let\'s go',
      'lets do it',
      'lets go',
      'sounds like a plan',
      'perfect',
      'yes',
      'yeah',
      'yep',
      'yup',
      'sure',
      'absolutely',
      'definitely',
      'confirmed',
      'confirm',
      'i\'m in',
      'im in',
      'i\'m down',
      'im down',
      'let\'s do that',
      'lets do that',
      'let\'s do those',
      'lets do those',
      'that works',
      'that\'ll work',
      'thatll work',
      'works for me',
      'great',
      'excellent',
      'splendid',
      'wonderful',
      'i\'ll go',
      'ill go',
      'i\'ll take',
      'ill take',
      'go with',
      'i\'ll go with',
      'ill go with',
      'take them',
      'i\'ll take them',
      'ill take them',
      'book them',
      'book it',
      'book those',
      'make it happen',
      'do it',
      'agreed',
      'i agree',
      'deal',
      'done',
      'approved',
      'i concur',
      'concur',
      'go ahead',
      'proceed',
      'your suggestions',
      'your recommendations',
      'what you suggested',
      'what you recommended'
    ];

    const isConfirm = confirmationPhrases.some(phrase => lowerMessage.includes(phrase));
    console.log(`🔍 Checking if "${message}" is confirmation: ${isConfirm}`);
    return isConfirm;
  };

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

  const handleSendMessage = async () => {
    if (!userInput.trim() || isConciergeThinking) return;

    const userMessage = userInput;
    const isUserConfirming = isConfirmation(userMessage);

    const newMessages = [
      ...conciergeMessages,
      { role: 'user', content: userMessage }
    ];

    setConciergeMessages(newMessages);
    setUserInput('');

    // HYBRID APPROACH: Check for confirmation locally first
    // Use REF instead of state to avoid React closure timing issues
    const venuesToConfirm = recommendedVenuesRef.current;
    console.log(`🔍 Confirmation check: isConfirming=${isUserConfirming}, refLength=${venuesToConfirm.length}, stateLength=${recommendedVenues.length}`);

    if (isUserConfirming && venuesToConfirm.length > 0) {
      // Handle confirmation locally WITHOUT calling API (faster + cheaper)
      console.log(`✨ Local confirmation detected! Adding ${venuesToConfirm.length} venues to itinerary...`);

      // Generate a butler-style farewell message locally
      const farewells = [
        "Excellent choice, My Lord! Your evening's itinerary has been prepared. May your night be filled with splendid adventures and questionable decisions. Sláinte mhath!",
        "Splendid! Your itinerary awaits, Sir. Do try not to embarrass the family name too terribly. *Tha mi an dòchas gun còrd e riut* - I hope you enjoy it!",
        "Very good, My Lord. The arrangements have been made. I trust you'll conduct yourself with at least a modicum of dignity. Or not. *Slàinte!*",
        "As you wish, Sir! Tonight's adventure is set. Remember, what happens in Dùn Èideann stays in Dùn Èideann... unless you're photographed.",
        "Perfect! Your evening is secured, M'Lord. I've taken the liberty of pre-booking bail, just in case. *Beannachd leat!* - Farewell!"
      ];
      const farewellMessage = farewells[Math.floor(Math.random() * farewells.length)];

      const messagesWithFarewell = [...newMessages, { role: 'assistant', content: farewellMessage }];
      setConciergeMessages(messagesWithFarewell);

      // Add venues to itinerary and switch view after brief delay
      setTimeout(() => {
        console.log(`🎉 Adding ${venuesToConfirm.length} venues to itinerary:`, venuesToConfirm);
        setItinerary(prev => {
          const combined = [...prev, ...venuesToConfirm];
          const uniqueItinerary = Array.from(new Set(combined));
          console.log(`📝 Itinerary updated to:`, uniqueItinerary);
          return uniqueItinerary;
        });
        setRecommendedVenues([]);
        recommendedVenuesRef.current = []; // Clear ref too
        setCurrentView('itinerary');
      }, 1500);

      return; // Exit early - no API call needed!
    }

    // NOT a confirmation or no venues - proceed with AI conversation
    setIsConciergeThinking(true);
    let allRecommendedVenues = [...recommendedVenues];

    try {
      // Call Claude AI with FULL conversation history
      const aiResponse = await generateConciergeResponse(newMessages, VENUES_DATA);

      if (aiResponse) {
        newMessages.push({ role: 'assistant', content: aiResponse });

        // Extract venue IDs from the AI response
        const venueIds = extractVenueIdsFromText(aiResponse);
        if (venueIds.length > 0) {
          console.log(`🎯 Adding ${venueIds.length} venues to recommended list`);
          // Add to local tracking
          allRecommendedVenues = [...allRecommendedVenues, ...venueIds];
          allRecommendedVenues = Array.from(new Set(allRecommendedVenues)); // Remove duplicates
          console.log(`📋 Total recommended venues now: ${allRecommendedVenues.length}`, allRecommendedVenues);

          // Update state AND ref
          setRecommendedVenues(allRecommendedVenues);
          recommendedVenuesRef.current = allRecommendedVenues;
        }
      } else {
        // Fallback to basic search
        const query = userMessage.toLowerCase();
        let recommendations: Venue[] = [];

        const scored = VENUES_DATA.map(venue => {
          let score = 0;
          const searchableText = `${venue.name} ${venue.description} ${venue.tags.join(' ')} ${venue.category}`.toLowerCase();

          const queryWords = query.split(' ').filter(w => w.length > 2);
          queryWords.forEach(word => {
            if (searchableText.includes(word)) score += 10;
            if (venue.tags.some(tag => tag.toLowerCase().includes(word))) score += 20;
            if (venue.category.includes(word)) score += 30;
          });

          return { venue, score };
        });

        recommendations = scored
          .filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(item => item.venue);

        const response = recommendations.length > 0
          ? `Based on what you're looking for, I'd recommend:\n\n${recommendations.map(v => `• ${v.name} - ${v.description}`).join('\n\n')}`
          : "Could you tell me more about what you're in the mood for? Perhaps drinks, meals, coffee, dancing, or free attractions?";

        newMessages.push({ role: 'assistant', content: response });

        // Add recommended venues from fallback
        if (recommendations.length > 0) {
          const venueIds = recommendations.map(v => v.id);
          allRecommendedVenues = [...allRecommendedVenues, ...venueIds];
          allRecommendedVenues = Array.from(new Set(allRecommendedVenues));
          setRecommendedVenues(allRecommendedVenues);
          recommendedVenuesRef.current = allRecommendedVenues;
        }
      }
    } catch (error) {
      console.error('Error in concierge response:', error);
      newMessages.push({
        role: 'assistant',
        content: "My apologies, Sir. I seem to be having a moment. Could you please repeat your request?"
      });
    }

    setConciergeMessages(newMessages);
    setIsConciergeThinking(false);
  };

  const handleConfirmVenues = () => {
    const venuesToAdd = recommendedVenuesRef.current;
    console.log(`🎯 Manual confirmation button clicked! Adding ${venuesToAdd.length} venues to itinerary:`, venuesToAdd);

    if (venuesToAdd.length === 0) return;

    // Add farewell message to chat
    const farewells = [
      "Excellent choice, My Lord! Your evening's itinerary has been prepared. May your night be filled with splendid adventures and questionable decisions. Sláinte mhath!",
      "Splendid! Your itinerary awaits, Sir. Do try not to embarrass the family name too terribly. *Tha mi an dòchas gun còrd e riut* - I hope you enjoy it!",
      "Very good, My Lord. The arrangements have been made. I trust you'll conduct yourself with at least a modicum of dignity. Or not. *Slàinte!*",
      "As you wish, Sir! Tonight's adventure is set. Remember, what happens in Dùn Èideann stays in Dùn Èideann... unless you're photographed.",
      "Perfect! Your evening is secured, M'Lord. I've taken the liberty of pre-booking bail, just in case. *Beannachd leat!* - Farewell!"
    ];
    const farewellMessage = farewells[Math.floor(Math.random() * farewells.length)];

    setConciergeMessages(prev => [...prev, { role: 'assistant', content: farewellMessage }]);

    // Add venues to itinerary and switch view
    setTimeout(() => {
      setItinerary(prev => {
        const combined = [...prev, ...venuesToAdd];
        const uniqueItinerary = Array.from(new Set(combined));
        console.log(`📝 Itinerary updated via button to:`, uniqueItinerary);
        return uniqueItinerary;
      });
      setRecommendedVenues([]);
      recommendedVenuesRef.current = [];
      setCurrentView('itinerary');
    }, 1500);
  };

  const addToItinerary = (venueId: number) => {
    setItinerary(prev =>
      prev.includes(venueId)
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    );
    // Reset description to trigger regeneration
    setItineraryDescription('');
  };

  const exportItineraryAsImage = async () => {
    if (!itineraryCardRef.current) return;

    setIsExportingImage(true);
    try {
      const canvas = await html2canvas(itineraryCardRef.current, {
        backgroundColor: '#fef3c7',
        scale: 2,
        logging: false,
        useCORS: true
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `edinburgh-itinerary-${new Date().toISOString().split('T')[0]}.png`;
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Failed to export image. Please try again.');
    } finally {
      setIsExportingImage(false);
    }
  };

  const shareItinerary = async () => {
    const venues = VENUES_DATA.filter(v => itinerary.includes(v.id));

    if (venues.length === 0) {
      alert('Add some venues to your itinerary first!');
      return;
    }

    const shareText = `Tonight's Edinburgh Itinerary 🎩

${venues.map((v, i) => `${i + 1}. ${v.name}
   ${v.description}
   📍 ${v.address}
   🗺️ https://www.google.com/maps/search/?api=1&query=${v.lat},${v.lng}`).join('\n\n')}

Created with Edinburgh Concierge`;

    // Try native share API first (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tonight's Edinburgh Itinerary",
          text: shareText
        });
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('📋 Itinerary copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to share. Please try again.');
      }
    }
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

          {/* Title - Updated text with lower z-index */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-0 pointer-events-none">
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2 font-serif drop-shadow-lg">
              Lord Kyle of California
            </h1>
            <p className="text-base sm:text-lg text-slate-300 drop-shadow-md">Dùn Èideann</p>
          </div>

          {/* Tonight's Itinerary Button - Always visible, centered below menu */}
          <button
            onClick={() => setCurrentView('itinerary')}
            className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 px-8 py-4 rounded-lg shadow-xl transition-all hover:scale-105 border-2 border-green-950 active:scale-95 ${
              recommendedVenues.length > 0 ? 'animate-pulse ring-4 ring-amber-400 ring-opacity-75' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <img src={lordLordKyle} alt="Lord Lord" className="w-8 h-8 rounded-full border-2 border-green-50" />
              <span className="text-lg font-bold font-serif">Tonight's Itinerary</span>
              {itinerary.length > 0 && (
                <span className="bg-green-950 px-3 py-1 rounded-full text-sm font-bold">
                  {itinerary.length}
                </span>
              )}
              {recommendedVenues.length > 0 && (
                <span className="bg-amber-500 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  Ready!
                </span>
              )}
            </div>
          </button>
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
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedVenue.lat},${selectedVenue.lng}`, '_blank')}
                  className="flex-1 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 font-bold py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <Navigation className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Google Maps</span>
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

        {/* Tonight's Itinerary Button - Sticky bottom */}
        <button
          onClick={() => setCurrentView('itinerary')}
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 px-6 py-3 rounded-lg shadow-2xl transition-all hover:scale-105 border-2 border-green-950 active:scale-95 z-50 ${
            recommendedVenues.length > 0 ? 'animate-pulse ring-4 ring-amber-400 ring-opacity-75' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <img src={lordLordKyle} alt="Lord Lord" className="w-6 h-6 rounded-full border-2 border-green-50" />
            <span className="font-bold font-serif">Tonight's Itinerary</span>
            {itinerary.length > 0 && (
              <span className="bg-green-950 px-2 py-1 rounded-full text-sm font-bold">
                {itinerary.length}
              </span>
            )}
            {recommendedVenues.length > 0 && (
              <span className="bg-amber-500 px-2 py-1 rounded-full text-sm font-bold animate-pulse">
                Ready!
              </span>
            )}
          </div>
        </button>
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
              {isConciergeThinking && (
                <div className="flex justify-start">
                  <div className="bg-green-50/90 text-green-900 border-2 border-green-900/20 p-3 sm:p-4 rounded-lg shadow-lg flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <p className="text-sm sm:text-base italic">Your butler is thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Confirm Button - Shows when venues are recommended */}
          {recommendedVenues.length > 0 && (
            <div className="px-4 sm:px-6 pb-4">
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={handleConfirmVenues}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold py-4 px-6 rounded-lg shadow-2xl transition-all hover:scale-105 active:scale-95 animate-pulse border-2 border-amber-700 flex items-center justify-center gap-3"
                >
                  <span className="text-lg sm:text-xl">✓ Add These {recommendedVenues.length} Venues to My Itinerary</span>
                </button>
              </div>
            </div>
          )}

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

        {/* Tonight's Itinerary Button - Fixed position above input */}
        <button
          onClick={() => setCurrentView('itinerary')}
          className={`fixed bottom-24 sm:bottom-28 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 px-6 py-3 rounded-lg shadow-2xl transition-all hover:scale-105 border-2 border-green-950 active:scale-95 z-50 ${
            recommendedVenues.length > 0 ? 'animate-pulse ring-4 ring-amber-400 ring-opacity-75' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <img src={lordLordKyle} alt="Lord Lord" className="w-6 h-6 rounded-full border-2 border-green-50" />
            <span className="font-bold font-serif">Tonight's Itinerary</span>
            {itinerary.length > 0 && (
              <span className="bg-green-950 px-2 py-1 rounded-full text-sm font-bold">
                {itinerary.length}
              </span>
            )}
            {recommendedVenues.length > 0 && (
              <span className="bg-amber-500 px-2 py-1 rounded-full text-sm font-bold animate-pulse">
                Ready!
              </span>
            )}
          </div>
        </button>
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
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <img src={lordLordKyle} alt="Lord Lord" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-amber-100" />
                <h1 className="text-3xl sm:text-4xl font-bold text-amber-100 font-serif">
                  Your Itinerary
                </h1>
              </div>
              <div className="flex gap-2">
                {itinerary.length > 0 && (
                  <>
                    <button
                      onClick={shareItinerary}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                      title="Share itinerary"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm sm:text-base font-bold hidden sm:inline">Share</span>
                    </button>
                    <button
                      onClick={exportItineraryAsImage}
                      disabled={isExportingImage}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                      title="Export as image"
                    >
                      {isExportingImage ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <ImageIcon className="w-5 h-5" />
                      )}
                      <span className="text-sm sm:text-base font-bold hidden sm:inline">
                        {isExportingImage ? 'Exporting...' : 'Export'}
                      </span>
                    </button>
                  </>
                )}
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
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Claude AI Description with Knightly Scroll Image */}
            {itinerary.length > 0 && (
              <div className="relative w-full min-h-96 h-auto overflow-visible">
                <img
                  src={knightlyItinerary}
                  alt="Itinerary scroll"
                  className="w-full h-full object-cover min-h-96"
                />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="max-w-2xl text-center max-h-80 overflow-y-auto">
                    {isGeneratingDescription ? (
                      <div className="flex flex-col items-center gap-4 bg-amber-50/60 backdrop-blur-sm rounded-lg p-6">
                        <Loader2 className="w-12 h-12 animate-spin text-amber-900" />
                        <p className="text-amber-900 font-serif italic text-lg">
                          Your butler is preparing the evening's description...
                        </p>
                      </div>
                    ) : (
                      <div className="bg-amber-50/60 backdrop-blur-sm rounded-lg p-6">
                        <p className="text-xl md:text-2xl text-amber-900 font-serif italic leading-relaxed">
                          {itineraryDescription || "Your splendid Edinburgh evening awaits, Sir!"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

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
                                  window.open(`https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`, '_blank');
                                }}
                                className="text-xs px-2 py-1 bg-gradient-to-r from-green-800 to-green-950 text-green-50 rounded hover:from-green-700 hover:to-green-900 transition-colors active:scale-95"
                              >
                                <Navigation className="w-3 h-3 inline mr-1" />
                                Google Maps
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

                {/* Google Maps Export Column */}
                <div className="w-full md:w-3/5 h-1/2 md:h-full bg-gradient-to-br from-amber-50 to-amber-100 p-4 overflow-y-auto">
                  <div className="max-w-2xl mx-auto space-y-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-300">
                      <h3 className="text-xl font-bold text-amber-900 mb-4 font-serif">
                        📍 Google Maps Export
                      </h3>
                      <p className="text-amber-800 mb-4 text-sm">
                        Open all {itineraryVenues.length} locations in Google Maps with turn-by-turn directions
                      </p>

                      {/* Multi-stop directions */}
                      <button
                        onClick={() => {
                          if (itineraryVenues.length === 0) return;

                          // Google Maps multi-stop route format
                          const waypoints = itineraryVenues
                            .slice(1, -1) // Middle stops as waypoints
                            .map(v => `${v.lat},${v.lng}`)
                            .join('|');

                          const origin = `${itineraryVenues[0].lat},${itineraryVenues[0].lng}`;
                          const destination = itineraryVenues.length > 1
                            ? `${itineraryVenues[itineraryVenues.length - 1].lat},${itineraryVenues[itineraryVenues.length - 1].lng}`
                            : origin;

                          const url = waypoints
                            ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`
                            : `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;

                          window.open(url, '_blank');
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg"
                      >
                        <MapIcon className="w-6 h-6" />
                        <span>Open Route in Google Maps</span>
                      </button>
                    </div>

                    {/* Individual locations */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-300">
                      <h3 className="text-lg font-bold text-amber-900 mb-4 font-serif">
                        Individual Locations
                      </h3>
                      <div className="space-y-2">
                        {itineraryVenues.map((venue, index) => (
                          <button
                            key={venue.id}
                            onClick={() => window.open(
                              `https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`,
                              '_blank'
                            )}
                            className="w-full text-left bg-amber-50 hover:bg-amber-100 p-3 rounded-lg transition-colors flex items-start gap-3 border border-amber-200"
                          >
                            <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-green-800 to-green-950 text-green-50 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-amber-900 text-sm truncate">{venue.name}</p>
                              <p className="text-xs text-amber-700">{venue.address}</p>
                            </div>
                            <Navigation className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Copy all locations */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-300">
                      <h3 className="text-lg font-bold text-amber-900 mb-3 font-serif">
                        Export List
                      </h3>
                      <button
                        onClick={() => {
                          const locationsList = itineraryVenues.map((v, i) =>
                            `${i + 1}. ${v.name}\n   ${v.address}\n   https://www.google.com/maps/search/?api=1&query=${v.lat},${v.lng}`
                          ).join('\n\n');

                          navigator.clipboard.writeText(locationsList);
                          alert('📋 Locations copied to clipboard!');
                        }}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                      >
                        <Copy className="w-5 h-5" />
                        <span className="text-sm">Copy All Google Maps Links</span>
                      </button>
                    </div>
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
                                window.open(`https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`, '_blank');
                              }}
                              className="flex-1 bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 font-bold py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95 text-sm sm:text-base"
                            >
                              <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                              Google Maps
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
                      <h2 className="text-3xl font-bold text-amber-900 mb-3 font-serif">Your night is free, M'Lord</h2>
                      <p className="text-amber-700 italic mb-6">Perhaps I might suggest exploring our curated establishments?</p>
                      <button
                        onClick={() => setCurrentView('menu')}
                        className="bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 text-lg"
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
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedVenue.lat},${selectedVenue.lng}`, '_blank')}
                className="w-full bg-gradient-to-r from-green-800 to-green-950 hover:from-green-700 hover:to-green-900 text-green-50 font-bold py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Navigation className="w-5 h-5" />
                Open in Google Maps
              </button>
            </div>
          </div>
        )}

        {/* Hidden Exportable Itinerary Card - Styled for image export */}
        <div
          ref={itineraryCardRef}
          className="fixed -top-[9999px] left-0 w-[600px] bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-xl shadow-2xl border-4 border-amber-900"
        >
          {/* Header */}
          <div className="text-center mb-6 border-b-2 border-amber-900 pb-4">
            <div className="flex justify-center mb-2">
              <img src={lordLordKyle} alt="Lord Lord" className="w-20 h-20 rounded-full border-4 border-amber-900" />
            </div>
            <h1 className="text-3xl font-bold text-amber-900 font-serif mb-1">
              Tonight's Edinburgh Itinerary
            </h1>
            <p className="text-amber-700 italic">
              {new Date().toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Venues List */}
          <div className="space-y-4 mb-6">
            {itineraryVenues.map((venue, index) => (
              <div key={venue.id} className="bg-white rounded-lg p-4 border-2 border-amber-300">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-800 to-green-950 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-900 font-serif mb-1">{venue.name}</h3>
                    <p className="text-sm text-amber-800 italic mb-2">{venue.description}</p>
                    <p className="text-xs text-amber-700 mb-1">📍 {venue.address}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-amber-200 rounded-full font-bold">
                        {'£'.repeat(venue.priceRange || 1)}
                      </span>
                      {venue.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-green-100 text-green-900 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t-2 border-amber-300">
            <p className="text-sm text-amber-700 italic font-serif">
              "An evening worthy of nobility, Sir."
            </p>
            <p className="text-xs text-amber-600 mt-2">
              Created with Edinburgh Concierge • Dùn Èideann
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
