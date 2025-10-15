import React, { useState, useEffect } from 'react';
import { X, Navigation, Coffee, Utensils, Beer, Wine, ShoppingBag, Music, Heart, MapPin, Clock, DollarSign, ChevronLeft, MessageCircle, Calendar, Share2, Copy } from 'lucide-react';
import { generateItineraryWithClaude } from './claudeAPI.js';

const VENUES_DATA = [
  {
    id: 1,
    name: "The Witchery by the Castle",
    category: "meals",
    address: "Castlehill, Royal Mile",
    lat: 55.9489,
    lng: -3.1948,
    priceRange: 3,
    tags: ["romantic", "fireplace", "date-worthy", "cozy"],
    hours: { mon: "17:00-22:30", tue: "17:00-22:30", wed: "17:00-22:30", thu: "17:00-22:30", fri: "17:00-23:30", sat: "12:00-23:30", sun: "12:00-22:30" },
    reviews: ["Gothic romance at its finest", "Candlelit perfection for special occasions"],
    description: "Spectacular gothic dining in the shadow of Edinburgh Castle"
  },
  {
    id: 2,
    name: "The Devil's Advocate",
    category: "drinks",
    address: "9 Advocate's Close",
    lat: 55.9502,
    lng: -3.1918,
    priceRange: 2,
    tags: ["cocktails", "locals-only", "intimate", "whisky"],
    hours: { mon: "12:00-01:00", tue: "12:00-01:00", wed: "12:00-01:00", thu: "12:00-01:00", fri: "12:00-01:00", sat: "12:00-01:00", sun: "12:00-01:00" },
    reviews: ["Hidden gem down a close", "Exceptional whisky selection"],
    description: "Subterranean cocktail bar with 300+ whiskies"
  },
  {
    id: 3,
    name: "Oink",
    category: "quick-bites",
    address: "34 Victoria Street",
    lat: 55.9489,
    lng: -3.1928,
    priceRange: 1,
    tags: ["casual", "quick", "local-favorite"],
    hours: { mon: "11:00-18:00", tue: "11:00-18:00", wed: "11:00-18:00", thu: "11:00-18:00", fri: "11:00-18:00", sat: "11:00-18:00", sun: "11:00-18:00" },
    reviews: ["Best hog roast in town", "Queue worth it"],
    description: "Legendary slow-roasted pork rolls on colorful Victoria Street"
  },
  {
    id: 4,
    name: "Whiski Rooms",
    category: "drinks",
    address: "4-7 North Bank Street",
    lat: 55.9510,
    lng: -3.1922,
    priceRange: 2,
    tags: ["cozy", "fireplace", "whisky", "pub"],
    hours: { mon: "10:00-01:00", tue: "10:00-01:00", wed: "10:00-01:00", thu: "10:00-01:00", fri: "10:00-01:00", sat: "10:00-01:00", sun: "10:00-01:00" },
    reviews: ["400+ whiskies", "Warm Highland atmosphere"],
    description: "Traditional whisky bar with roaring fires and expert staff"
  },
  {
    id: 5,
    name: "Hula Juice Bar",
    category: "drinks",
    address: "103-105 West Bow",
    lat: 55.9486,
    lng: -3.1932,
    priceRange: 2,
    tags: ["healthy", "coffee", "breakfast"],
    hours: { mon: "08:00-18:00", tue: "08:00-18:00", wed: "08:00-18:00", thu: "08:00-18:00", fri: "08:00-18:00", sat: "09:00-18:00", sun: "09:00-18:00" },
    reviews: ["Fresh açai bowls", "Perfect morning fuel"],
    description: "Vibrant juice bar and healthy breakfast spot"
  },
  {
    id: 6,
    name: "Brew Lab Coffee",
    category: "drinks",
    address: "6-8 South College Street",
    lat: 55.9470,
    lng: -3.1880,
    priceRange: 2,
    tags: ["specialty-coffee", "minimalist", "wifi"],
    hours: { mon: "08:00-18:00", tue: "08:00-18:00", wed: "08:00-18:00", thu: "08:00-18:00", fri: "08:00-18:00", sat: "09:00-18:00", sun: "09:00-18:00" },
    reviews: ["Pour-over perfection", "Hip coffee lab vibe"],
    description: "Scientific approach to coffee in a converted warehouse"
  },
  {
    id: 7,
    name: "Cabaret Voltaire",
    category: "huzz",
    address: "36-38 Blair Street",
    lat: 55.9498,
    lng: -3.1868,
    priceRange: 2,
    tags: ["underground", "techno", "historic", "late-night"],
    hours: { mon: "closed", tue: "closed", wed: "22:00-03:00", thu: "22:00-03:00", fri: "22:00-03:00", sat: "22:00-03:00", sun: "closed" },
    reviews: ["Legendary underground club", "Proper techno cave"],
    description: "Historic vaulted club hosting cutting-edge electronic music"
  },
  {
    id: 8,
    name: "The Bongo Club",
    category: "huzz",
    address: "66 Cowgate",
    lat: 55.9490,
    lng: -3.1890,
    priceRange: 2,
    tags: ["eclectic", "live-music", "student-friendly", "dancing"],
    hours: { mon: "closed", tue: "closed", wed: "22:00-03:00", thu: "22:00-03:00", fri: "22:00-03:00", sat: "22:00-03:00", sun: "closed" },
    reviews: ["Diverse music policy", "Sweaty dance floor energy"],
    description: "Alternative club with live bands and DJ nights"
  },
  {
    id: 9,
    name: "Urban Outfitters",
    category: "free",
    address: "12 North Bridge",
    lat: 55.9512,
    lng: -3.1892,
    priceRange: 2,
    tags: ["shopping", "fashion", "trendy"],
    hours: { mon: "10:00-20:00", tue: "10:00-20:00", wed: "10:00-20:00", thu: "10:00-20:00", fri: "10:00-20:00", sat: "10:00-20:00", sun: "11:00-18:00" },
    reviews: ["Edinburgh's trendiest fashion", "Great vintage finds"],
    description: "Fashion and lifestyle store in striking building"
  },
  {
    id: 10,
    name: "Holyrood Park",
    category: "free",
    address: "Queen's Drive",
    lat: 55.9411,
    lng: -3.1614,
    priceRange: 0,
    tags: ["scenic", "hiking", "nature", "views"],
    hours: { mon: "06:00-21:00", tue: "06:00-21:00", wed: "06:00-21:00", thu: "06:00-21:00", fri: "06:00-21:00", sat: "06:00-21:00", sun: "06:00-21:00" },
    reviews: ["Arthur's Seat is a must", "Stunning city views"],
    description: "Royal park with extinct volcano and panoramic Edinburgh views"
  },
  {
    id: 11,
    name: "The Piemaker",
    category: "quick-bites",
    address: "38 South Bridge",
    lat: 55.9495,
    lng: -3.1882,
    priceRange: 1,
    tags: ["comfort-food", "late-night", "takeaway"],
    hours: { mon: "11:00-03:00", tue: "11:00-03:00", wed: "11:00-03:00", thu: "11:00-03:00", fri: "11:00-04:00", sat: "11:00-04:00", sun: "11:00-03:00" },
    reviews: ["Perfect post-pub pie", "Open late thank god"],
    description: "Scottish pies available until the wee hours"
  },
  {
    id: 12,
    name: "Twelve Triangles",
    category: "quick-bites",
    address: "90 Brunswick Street",
    lat: 55.9545,
    lng: -3.1850,
    priceRange: 2,
    tags: ["bakery", "breakfast", "pastries", "coffee"],
    hours: { mon: "08:00-17:00", tue: "08:00-17:00", wed: "08:00-17:00", thu: "08:00-17:00", fri: "08:00-17:00", sat: "09:00-17:00", sun: "09:00-17:00" },
    reviews: ["Flaky croissant heaven", "Morning queue moves fast"],
    description: "Artisan bakery with incredible pastries and coffee"
  },
  {
    id: 13,
    name: "Taco Bell",
    category: "quick-bites",
    address: "38 Princes Street",
    lat: 55.9520,
    lng: -3.1950,
    priceRange: 1,
    tags: ["american", "fast-food", "late-night"],
    hours: { mon: "11:00-03:00", tue: "11:00-03:00", wed: "11:00-03:00", thu: "11:00-03:00", fri: "11:00-04:00", sat: "11:00-04:00", sun: "11:00-03:00" },
    reviews: ["Taste of home", "Late night savior"],
    description: "American fast food on Princes Street"
  },
  {
    id: 14,
    name: "Panda & Sons",
    category: "drinks",
    address: "79 Queen Street",
    lat: 55.9542,
    lng: -3.1978,
    priceRange: 3,
    tags: ["speakeasy", "cocktails", "intimate", "hidden"],
    hours: { mon: "16:00-01:00", tue: "16:00-01:00", wed: "16:00-01:00", thu: "16:00-01:00", fri: "16:00-01:00", sat: "16:00-01:00", sun: "16:00-01:00" },
    reviews: ["Hidden barbershop entrance", "Creative cocktail wizardry"],
    description: "Prohibition-style speakeasy behind a barbershop facade"
  },
  {
    id: 15,
    name: "National Museum of Scotland",
    category: "free",
    address: "Chambers Street",
    lat: 55.9471,
    lng: -3.1908,
    priceRange: 0,
    tags: ["museum", "culture", "free-entry", "historic"],
    hours: { mon: "10:00-17:00", tue: "10:00-17:00", wed: "10:00-17:00", thu: "10:00-17:00", fri: "10:00-17:00", sat: "10:00-17:00", sun: "10:00-17:00" },
    reviews: ["World-class collections", "Rooftop terrace views"],
    description: "Scotland's history, culture, and natural world under one roof"
  },
  {
    id: 16,
    name: "The Dome",
    category: "meals",
    address: "14 George Street",
    lat: 55.9533,
    lng: -3.1977,
    priceRange: 3,
    tags: ["grand", "cocktails", "festive", "impressive"],
    hours: { mon: "10:00-00:00", tue: "10:00-00:00", wed: "10:00-00:00", thu: "10:00-00:00", fri: "10:00-01:00", sat: "09:00-01:00", sun: "09:00-00:00" },
    reviews: ["Stunning interior", "Perfect for special occasions"],
    description: "Grand former bank with magnificent domed ceiling"
  },
  {
    id: 17,
    name: "Dishoom",
    category: "meals",
    address: "3A St Andrew Square",
    lat: 55.9547,
    lng: -3.1939,
    priceRange: 2,
    tags: ["indian", "brunch", "stylish", "popular"],
    hours: { mon: "09:00-23:00", tue: "09:00-23:00", wed: "09:00-23:00", thu: "09:00-23:00", fri: "09:00-23:00", sat: "09:00-23:00", sun: "09:00-23:00" },
    reviews: ["Bombay café vibes", "Bacon naan is legendary"],
    description: "Bombay-style café with all-day dining"
  },
  {
    id: 18,
    name: "Calton Hill",
    category: "free",
    address: "Regent Road",
    lat: 55.9551,
    lng: -3.1820,
    priceRange: 0,
    tags: ["views", "sunset", "monuments", "photography"],
    hours: { mon: "00:00-23:59", tue: "00:00-23:59", wed: "00:00-23:59", thu: "00:00-23:59", fri: "00:00-23:59", sat: "00:00-23:59", sun: "00:00-23:59" },
    reviews: ["Best sunset spot", "360° city views"],
    description: "Iconic hill with monuments and panoramic city views"
  }
];

const CATEGORIES = [
  { id: 'drinks', label: 'Drinks', icon: Wine, angle: -60 },
  { id: 'meals', label: 'Meals', icon: Utensils, angle: -30 },
  { id: 'quick-bites', label: 'Quick Bites', icon: Coffee, angle: 0 },
  { id: 'huzz', label: 'Huzz', icon: Music, angle: 30 },
  { id: 'free', label: 'Free', icon: MapPin, angle: 60 }
];

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeFading, setWelcomeFading] = useState(false);
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'guide', 'concierge', 'itinerary'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [itineraryDescription, setItineraryDescription] = useState('');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [conciergeMessages, setConciergeMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Welcome screen fade-out effect
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setWelcomeFading(true);
    }, 1800);

    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Generate Claude AI description when itinerary modal is opened
  useEffect(() => {
    if (showItineraryModal && itinerary.length > 0 && !itineraryDescription) {
      const venues = itinerary.map(id => VENUES_DATA.find(v => v.id === id)).filter(Boolean);
      setIsGeneratingDescription(true);
      generateItineraryWithClaude(venues)
        .then(description => {
          setItineraryDescription(description);
          setIsGeneratingDescription(false);
        })
        .catch(error => {
          console.error('Failed to generate description:', error);
          setItineraryDescription(generateItineraryDescription());
          setIsGeneratingDescription(false);
        });
    }
  }, [showItineraryModal, itinerary]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView('guide');
  };

  const handleConcierge = () => {
    setCurrentView('concierge');
    if (conciergeMessages.length === 0) {
      setConciergeMessages([{
        role: 'assistant',
        content: 'Fàilte! I\'m your Edinburgh concierge. What kind of experience are you looking for today? I can recommend from our curated collection of the city\'s finest establishments.'
      }]);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const newMessages = [
      ...conciergeMessages,
      { role: 'user', content: userInput }
    ];
    
    // Simple recommendation logic
    const keywords = userInput.toLowerCase();
    let recommendations = [];
    
    if (keywords.includes('drink') || keywords.includes('cocktail') || keywords.includes('bar')) {
      recommendations = VENUES_DATA.filter(v => v.category === 'drinks').slice(0, 3);
    } else if (keywords.includes('eat') || keywords.includes('dinner') || keywords.includes('food')) {
      recommendations = VENUES_DATA.filter(v => v.category === 'meals').slice(0, 3);
    } else if (keywords.includes('quick') || keywords.includes('grab') || keywords.includes('bite')) {
      recommendations = VENUES_DATA.filter(v => v.category === 'quick-bites').slice(0, 3);
    } else if (keywords.includes('dance') || keywords.includes('club') || keywords.includes('party')) {
      recommendations = VENUES_DATA.filter(v => v.category === 'huzz').slice(0, 2);
    } else if (keywords.includes('free') || keywords.includes('park') || keywords.includes('view')) {
      recommendations = VENUES_DATA.filter(v => v.category === 'free').slice(0, 3);
    } else {
      recommendations = [VENUES_DATA[Math.floor(Math.random() * VENUES_DATA.length)]];
    }
    
    const response = recommendations.length > 0
      ? `Based on what you're looking for, I'd recommend:\n\n${recommendations.map(v => `• ${v.name} - ${v.description}`).join('\n\n')}`
      : 'Could you tell me more about what you\'re in the mood for? Perhaps drinks, meals, dancing, or exploring?';
    
    newMessages.push({ role: 'assistant', content: response });
    setConciergeMessages(newMessages);
    setUserInput('');
  };

  const toggleFavorite = (venueId) => {
    setFavorites(prev =>
      prev.includes(venueId)
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    );
  };

  const addToItinerary = (venueId) => {
    if (!itinerary.includes(venueId)) {
      setItinerary(prev => [...prev, venueId]);
      setItineraryDescription(''); // Reset description to trigger regeneration
    }
  };

  const removeFromItinerary = (venueId) => {
    setItinerary(prev => prev.filter(id => id !== venueId));
    setItineraryDescription(''); // Reset description to trigger regeneration
  };

  const generateItineraryDescription = () => {
    if (itinerary.length === 0) return "Start building your perfect Edinburgh evening by adding venues to your itinerary!";

    const venues = itinerary.map(id => VENUES_DATA.find(v => v.id === id)).filter(Boolean);
    const categories = [...new Set(venues.map(v => v.category))];

    let description = "Experience the best of Edinburgh with ";

    if (categories.includes('drinks') && categories.includes('meals')) {
      description += "a curated journey through fine dining and craft cocktails";
    } else if (categories.includes('huzz')) {
      description += "an unforgettable night of entertainment and nightlife";
    } else if (categories.includes('drinks')) {
      description += "a tour of Edinburgh's finest bars and beverage experiences";
    } else if (categories.includes('meals')) {
      description += "a culinary adventure through the city's top restaurants";
    } else {
      description += "your personalized Edinburgh experience";
    }

    description += `. This ${itinerary.length}-stop itinerary showcases `;

    if (venues.some(v => v.tags.includes('romantic') || v.tags.includes('date-worthy'))) {
      description += "romantic atmospheres and intimate settings";
    } else if (venues.some(v => v.tags.includes('locals-only') || v.tags.includes('hidden'))) {
      description += "hidden gems known only to locals";
    } else {
      description += "the authentic heart of Dùn Èideann";
    }

    description += ".";

    return description;
  };

  const generateShareableText = () => {
    const description = itineraryDescription || generateItineraryDescription();
    const venues = itinerary.map(id => VENUES_DATA.find(v => v.id === id)).filter(Boolean);

    let text = `${description}\n\n`;
    text += "MY EDINBURGH ITINERARY\n";
    text += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

    venues.forEach((venue, idx) => {
      text += `${idx + 1}. ${venue.name}\n`;
      text += `   ${venue.description}\n`;
      text += `   ${venue.address}\n`;
      text += `   ${venue.priceRange ? '£'.repeat(venue.priceRange) : 'Free'}\n\n`;
    });

    text += "\nView all locations on map:\n";
    venues.forEach((venue, idx) => {
      text += `${idx + 1}. https://maps.google.com/?q=${venue.lat},${venue.lng}\n`;
    });

    text += `\n✨ Created with Lord Lord - Edinburgh Concierge`;

    return text;
  };

  const filteredVenues = selectedCategory
    ? VENUES_DATA.filter(v => v.category === selectedCategory)
    : VENUES_DATA;

  // Welcome Screen
  if (showWelcome) {
    return (
      <div
        className={`fixed inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center transition-opacity duration-500 ${
          welcomeFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-center space-y-6 animate-pulse">
          <h1 className="text-7xl font-bold text-amber-100 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Lord Lord
          </h1>
          <p className="text-3xl text-amber-200" style={{ fontFamily: 'Georgia, serif' }}>
            Dùn Èideann
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 text-amber-300">
            <Wine className="w-8 h-8" />
            <Utensils className="w-8 h-8" />
            <Coffee className="w-8 h-8" />
            <Music className="w-8 h-8" />
          </div>
        </div>
      </div>
    );
  }

  // Menu View (Slate Circle)
  if (currentView === 'menu') {
    return (
      <div className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("data:image/svg+xml,%3Csvg width=\'1200\' height=\'800\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect fill=\'%231e293b\' width=\'1200\' height=\'800\'/%3E%3Ccircle cx=\'600\' cy=\'400\' r=\'200\' fill=\'%23334155\' opacity=\'0.3\'/%3E%3C/svg%3E")'
        }}>
        <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
          {/* Celtic Knot Decorations */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M20,100 Q20,20 100,20 Q180,20 180,100 Q180,180 100,180 Q20,180 20,100 Z" 
                fill="none" stroke="#94a3b8" strokeWidth="1"/>
            </svg>
          </div>

          {/* Category Buttons in Arc */}
          {CATEGORIES.map((cat) => {
            const radius = 45;
            const angleRad = (cat.angle * Math.PI) / 180;
            const x = 50 + radius * Math.sin(angleRad);
            const y = 30 - radius * Math.cos(angleRad);
            const Icon = cat.icon;
            
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-amber-700 hover:bg-amber-600 text-amber-100 px-6 py-3 rounded-lg shadow-2xl transition-all hover:scale-110 border-2 border-amber-900"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-bold">{cat.label}</span>
                </div>
              </button>
            );
          })}

          {/* Central Concierge Button */}
          <button
            onClick={handleConcierge}
            className="relative bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white px-12 py-12 rounded-full shadow-2xl transition-all hover:scale-105 border-4 border-amber-900"
          >
            <div className="flex flex-col items-center gap-2">
              <MessageCircle className="w-10 h-10" />
              <span className="text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                Concierge
              </span>
            </div>
          </button>

          {/* Title */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-20 text-center">
            <h1 className="text-5xl font-bold text-amber-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Lord Lord
            </h1>
            <p className="text-xl text-slate-300">Dùn Èideann</p>
          </div>

          {/* Itinerary Button */}
          <button
            onClick={() => setShowItineraryModal(true)}
            className="absolute top-8 right-8 bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-6 py-3 rounded-lg shadow-2xl transition-all hover:scale-105 border-2 border-green-900 flex items-center gap-2"
          >
            <Calendar className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold">My Itinerary</span>
              {itinerary.length > 0 && (
                <span className="text-xs opacity-90">({itinerary.length} stops)</span>
              )}
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Guide View (Open Book)
  if (currentView === 'guide') {
    return (
      <div className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'1200\' height=\'800\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3ClinearGradient id=\'bookGrad\' x1=\'0%25\' y1=\'0%25\' x2=\'0%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23d4a574;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23b8935f;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=\'url(%23bookGrad)\' width=\'1200\' height=\'800\'/%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'1200\' height=\'800\' filter=\'url(%23noise)\' opacity=\'0.1\'/%3E%3C/svg%3E")'
        }}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-b from-amber-900/90 to-transparent p-6 backdrop-blur-sm z-10">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentView('menu')}
                className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="text-lg font-semibold">Back to Menu</span>
              </button>
              <button
                onClick={() => setShowItineraryModal(true)}
                className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all hover:scale-105 border-2 border-green-900 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-bold">
                  Itinerary {itinerary.length > 0 && `(${itinerary.length})`}
                </span>
              </button>
            </div>
            <h1 className="text-4xl font-bold text-amber-100 text-center" style={{ fontFamily: 'Georgia, serif' }}>
              {CATEGORIES.find(c => c.id === selectedCategory)?.label}
            </h1>
          </div>

          {/* Venues Grid */}
          <div className="px-6 pb-20 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-amber-50/95 rounded-lg shadow-lg p-6 border-2 border-amber-900/30 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedVenue(venue)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                      {venue.name}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToItinerary(venue.id);
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          itinerary.includes(venue.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-amber-200 text-amber-900 hover:bg-green-100'
                        }`}
                        title={itinerary.includes(venue.id) ? 'In itinerary' : 'Add to itinerary'}
                      >
                        <Calendar className={`w-5 h-5 ${itinerary.includes(venue.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(venue.id);
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(venue.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(venue.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-amber-800 text-sm mb-3">{venue.address}</p>
                  <p className="text-amber-900 mb-4 italic">{venue.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-amber-800">
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
            <div className="bg-amber-50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border-4 border-amber-900" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                  {selectedVenue.name}
                </h2>
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="p-2 bg-amber-200 hover:bg-amber-300 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-amber-900" />
                </button>
              </div>

              <p className="text-amber-800 mb-4">{selectedVenue.address}</p>
              <p className="text-amber-900 text-lg mb-6 italic">{selectedVenue.description}</p>

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
                    <p key={idx} className="text-amber-800 italic border-l-4 border-amber-400 pl-4">
                      "{review}"
                    </p>
                  ))}
                </div>
              </div>

              <button
                onClick={() => window.open(`https://maps.google.com/?q=${selectedVenue.lat},${selectedVenue.lng}`)}
                className="w-full bg-amber-700 hover:bg-amber-600 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
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

  // Concierge View (Scroll)
  if (currentView === 'concierge') {
    return (
      <div className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'800\' height=\'1200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3ClinearGradient id=\'scrollGrad\' x1=\'0%25\' y1=\'0%25\' x2=\'0%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23d4a574;stop-opacity:1\' /%3E%3Cstop offset=\'50%25\' style=\'stop-color:%23e8c794;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23d4a574;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=\'url(%23scrollGrad)\' width=\'800\' height=\'1200\'/%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'800\' height=\'1200\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")'
        }}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-b from-amber-900/80 to-transparent p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentView('menu')}
                className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="text-lg font-semibold">Back to Menu</span>
              </button>
              <button
                onClick={() => setShowItineraryModal(true)}
                className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all hover:scale-105 border-2 border-green-900 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-bold">
                  Itinerary {itinerary.length > 0 && `(${itinerary.length})`}
                </span>
              </button>
            </div>
            <h1 className="text-4xl font-bold text-amber-900 text-center" style={{ fontFamily: 'Georgia, serif' }}>
              Your Concierge
            </h1>
            <p className="text-center text-amber-800 mt-2">Ask me anything about Edinburgh</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 max-w-4xl mx-auto w-full">
            <div className="space-y-4">
              {conciergeMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-amber-700 text-white'
                        : 'bg-amber-50/95 text-amber-900 border-2 border-amber-900/30'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="bg-gradient-to-t from-amber-900/80 to-transparent p-6 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="What are you in the mood for?"
                className="flex-1 px-4 py-3 rounded-lg bg-amber-50 border-2 border-amber-900/30 text-amber-900 placeholder-amber-600 focus:outline-none focus:border-amber-700"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Itinerary Modal
  return (
    <>
      {showItineraryModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setShowItineraryModal(false)}
        >
          <div
            className="bg-amber-50 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 border-4 border-amber-900"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-green-700" />
                <h2 className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                  My Itinerary
                </h2>
              </div>
              <button
                onClick={() => setShowItineraryModal(false)}
                className="p-2 bg-amber-200 hover:bg-amber-300 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-amber-900" />
              </button>
            </div>

            {itinerary.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <p className="text-xl text-amber-800 mb-2">Your itinerary is empty</p>
                <p className="text-amber-700">Add venues from the guide to build your perfect Edinburgh experience</p>
              </div>
            ) : (
              <>
                {/* Description with Image Overlay */}
                <div className="relative mb-6 rounded-lg overflow-hidden shadow-xl">
                  {/* Background Image */}
                  <div
                    className="w-full h-80 bg-cover bg-center"
                    style={{
                      backgroundImage: 'url("/knightly_itinerary.png")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Text Overlay on Scroll */}
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <div className="max-w-2xl text-center">
                        {isGeneratingDescription ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
                            <p className="text-amber-900 font-serif italic">
                              Your butler is preparing the evening's description...
                            </p>
                          </div>
                        ) : (
                          <p className="text-xl md:text-2xl text-amber-900 font-serif italic leading-relaxed drop-shadow-lg px-8 py-6 bg-amber-50/40 rounded-lg backdrop-blur-sm">
                            {itineraryDescription || generateItineraryDescription()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venues List */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Your Stops ({itinerary.length})
                  </h3>
                  {itinerary.map((venueId, idx) => {
                    const venue = VENUES_DATA.find(v => v.id === venueId);
                    if (!venue) return null;

                    return (
                      <div
                        key={venueId}
                        className="bg-white rounded-lg p-5 border-2 border-amber-300 shadow-md hover:shadow-lg transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-3 flex-1">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                                {venue.name}
                              </h4>
                              <p className="text-amber-800 text-sm mb-2">{venue.address}</p>
                              <p className="text-amber-900 italic text-sm mb-2">{venue.description}</p>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="font-bold text-amber-800">
                                  {venue.priceRange ? '£'.repeat(venue.priceRange) : 'Free'}
                                </span>
                                {venue.tags.slice(0, 2).map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-amber-200 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromItinerary(venueId)}
                            className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors ml-2"
                            title="Remove from itinerary"
                          >
                            <X className="w-5 h-5 text-red-700" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Map View */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Map View
                  </h3>
                  <div className="bg-white rounded-lg p-4 border-2 border-amber-300">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDummyKey&q=${
                        itinerary.map(id => {
                          const venue = VENUES_DATA.find(v => v.id === id);
                          return venue ? `${venue.lat},${venue.lng}` : '';
                        }).filter(Boolean).join('|')
                      }`}
                      className="w-full h-64 rounded-lg"
                      style={{ border: 0 }}
                      loading="lazy"
                      title="Itinerary Map"
                      onError={(e) => {
                        // If embed fails, show a link instead
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden space-y-2">
                      <p className="text-amber-800 text-center mb-4">View your itinerary locations on Google Maps:</p>
                      {itinerary.map((venueId, idx) => {
                        const venue = VENUES_DATA.find(v => v.id === venueId);
                        if (!venue) return null;
                        return (
                          <a
                            key={venueId}
                            href={`https://maps.google.com/?q=${venue.lat},${venue.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-amber-100 hover:bg-amber-200 p-3 rounded-lg transition-colors"
                          >
                            <span className="font-bold text-green-700">{idx + 1}.</span> {venue.name} - {venue.address}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateShareableText());
                      alert('Itinerary copied to clipboard!');
                    }}
                    className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-4 rounded-lg shadow-lg transition-all hover:scale-105 border-2 border-blue-900 flex items-center justify-center gap-2 font-bold"
                  >
                    <Copy className="w-5 h-5" />
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={() => {
                      const shareText = generateShareableText();
                      if (navigator.share) {
                        navigator.share({
                          title: 'My Edinburgh Itinerary',
                          text: shareText
                        }).catch(err => console.log('Share canceled'));
                      } else {
                        navigator.clipboard.writeText(shareText);
                        alert('Copied to clipboard! You can now paste and share it anywhere.');
                      }
                    }}
                    className="flex-1 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-4 rounded-lg shadow-lg transition-all hover:scale-105 border-2 border-purple-900 flex items-center justify-center gap-2 font-bold"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;