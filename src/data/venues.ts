export interface Venue {
  id: number;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  priceRange: number;
  tags: string[];
  hours: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  };
  reviews: string[];
  description: string;
}

const VENUES_DATA = [
  {
    "name": "The Kitchin",
    "category": "meals",
    "address": "78 Commercial Quay, Leith, EH6 6LX",
    "lat": 55.977161,
    "lng": -3.172738,
    "priceRange": 3,
    "tags": ["fine-dining", "michelin-star", "scottish-cuisine", "seasonal", "seafood"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "12:00-14:30",
      "thu": "12:00-14:30",
      "fri": "12:00-14:30",
      "sat": "12:00-14:30",
      "sun": "closed"
    },
    "reviews": [
      "No better place to eat in Scotland",
      "French techniques with Scottish ingredients"
    ],
    "description": "Michelin-starred temple to seasonal Scottish produce on Leith waterfront"
  },
  {
    "name": "Heron",
    "category": "meals",
    "address": "87-91 Henderson Street, Leith, EH6 6ED",
    "lat": 55.9770,
    "lng": -3.1685,
    "priceRange": 3,
    "tags": ["michelin-star", "fine-dining", "modern-scottish", "seafood", "contemporary"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "17:30-21:00",
      "thu": "17:30-21:00",
      "fri": "12:00-14:00",
      "sat": "12:00-14:00",
      "sun": "12:00-14:00"
    },
    "reviews": [
      "Every course a winner",
      "Scotland's youngest Michelin chef"
    ],
    "description": "Refined modern cuisine from Scotland's youngest Michelin-starred chef"
  },
  {
    "name": "Timberyard",
    "category": "meals",
    "address": "10 Lady Lawson Street, EH3 9DS",
    "lat": 55.9469,
    "lng": -3.2035,
    "priceRange": 3,
    "tags": ["michelin-star", "fine-dining", "scottish-cuisine", "rustic", "foraged-ingredients"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "closed",
      "thu": "17:00-23:00",
      "fri": "12:00-23:00",
      "sat": "12:00-23:00",
      "sun": "12:00-23:00"
    },
    "reviews": [
      "Hyper-seasonal foraged Scottish fare",
      "Atmospheric converted warehouse setting"
    ],
    "description": "Michelin-starred warehouse serving hyper-seasonal foraged cuisine"
  },
  {
    "name": "The Witchery by the Castle",
    "category": "meals",
    "address": "352 Castlehill, Royal Mile, EH1 2NF",
    "lat": 55.948811,
    "lng": -3.19563,
    "priceRange": 3,
    "tags": ["fine-dining", "scottish-cuisine", "romantic", "historic", "atmospheric"],
    "hours": {
      "mon": "12:00-16:00",
      "tue": "12:00-16:00",
      "wed": "12:00-16:00",
      "thu": "12:00-16:00",
      "fri": "12:00-16:00",
      "sat": "12:00-16:00",
      "sun": "12:00-16:00"
    },
    "reviews": [
      "Best haggis I've had",
      "Outrageously gothic surroundings"
    ],
    "description": "Legendary 16th-century dining rooms steps from Edinburgh Castle"
  },
  {
    "name": "Dishoom",
    "category": "meals",
    "address": "3a St Andrews Square, EH2 2BD",
    "lat": 55.9550,
    "lng": -3.1930,
    "priceRange": 2,
    "tags": ["indian-cuisine", "bombay-cafe", "all-day-dining", "art-deco", "casual"],
    "hours": {
      "mon": "08:00-23:00",
      "tue": "08:00-23:00",
      "wed": "08:00-23:00",
      "thu": "08:00-00:00",
      "fri": "08:00-00:00",
      "sat": "09:00-00:00",
      "sun": "09:00-23:00"
    },
    "reviews": [
      "Reminds me of Mumbai",
      "Bacon naan is legendary"
    ],
    "description": "Bombay Irani cafe culture in stunning art deco New Town setting"
  },
  {
    "name": "Noto",
    "category": "meals",
    "address": "47A Thistle Street, EH2 1DY",
    "lat": 55.954007,
    "lng": -3.199440,
    "priceRange": 2,
    "tags": ["asian-fusion", "small-plates", "new-york-inspired", "michelin-bib-gourmand", "casual"],
    "hours": {
      "mon": "12:00-21:00",
      "tue": "12:00-21:00",
      "wed": "12:00-21:00",
      "thu": "12:00-21:00",
      "fri": "12:00-21:00",
      "sat": "12:00-21:00",
      "sun": "12:00-21:00"
    },
    "reviews": [
      "Well-conceived dishes at sensible prices",
      "Michelin Bib Gourmand excellence"
    ],
    "description": "NYC-inspired Asian fusion small plates with Michelin Bib Gourmand"
  },
  {
    "name": "Café St Honoré",
    "category": "meals",
    "address": "34 Thistle Street Lane NW, EH2 1EA",
    "lat": 55.9545,
    "lng": -3.1995,
    "priceRange": 2,
    "tags": ["french-bistro", "sustainable", "new-town", "seasonal", "local-produce"],
    "hours": {
      "mon": "12:00-14:00",
      "tue": "12:00-14:00",
      "wed": "12:00-14:00",
      "thu": "12:00-14:00",
      "fri": "12:00-14:00",
      "sat": "12:00-14:00",
      "sun": "12:00-14:00"
    },
    "reviews": [
      "Wonderful oasis of calm",
      "Sustainable Scottish produce, Parisian style"
    ],
    "description": "Hidden lane bistro serving sustainable Scottish produce Parisian-style"
  },
  {
    "name": "Angels with Bagpipes",
    "category": "meals",
    "address": "343 High Street, Royal Mile, EH1 1PW",
    "lat": 55.949853,
    "lng": -3.191088,
    "priceRange": 2,
    "tags": ["scottish-cuisine", "royal-mile", "old-town", "seasonal", "romantic"],
    "hours": {
      "mon": "08:00-23:00",
      "tue": "08:00-23:00",
      "wed": "08:00-23:00",
      "thu": "08:00-23:00",
      "fri": "08:00-23:00",
      "sat": "08:00-23:00",
      "sun": "09:00-23:00"
    },
    "reviews": [
      "Amazing Scottish produce",
      "Chic Royal Mile dining"
    ],
    "description": "Seasonal Scottish ingredients showcased on the Royal Mile"
  },
  {
    "name": "The Palmerston",
    "category": "meals",
    "address": "1 Palmerston Place, EH12 5AF",
    "lat": 55.947308,
    "lng": -3.215172,
    "priceRange": 2,
    "tags": ["gastropub", "modern-european", "bakery", "sustainable", "west-end"],
    "hours": {
      "mon": "closed",
      "tue": "09:00-22:00",
      "wed": "09:00-22:00",
      "thu": "09:00-22:00",
      "fri": "09:00-22:00",
      "sat": "09:00-22:00",
      "sun": "09:00-22:00"
    },
    "reviews": [
      "Inventive and high-quality dishes",
      "Former bank with in-house bakery"
    ],
    "description": "West End gastropub in former bank with acclaimed in-house bakery"
  },
  {
    "name": "Barry Fish",
    "category": "meals",
    "address": "62 Shore, Leith, EH6 6RA",
    "lat": 55.9771,
    "lng": -3.1700,
    "priceRange": 3,
    "tags": ["seafood", "waterfront", "fine-dining", "scottish-produce", "contemporary"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "16:30-20:30",
      "thu": "12:00-14:30",
      "fri": "16:30-20:30",
      "sat": "12:00-14:30",
      "sun": "closed"
    },
    "reviews": [
      "Best octopus I have had in a restaurant!",
      "Chef Barry Bryson's seafood excellence"
    ],
    "description": "Leith's newest seafood specialist from Chef Barry Bryson (opened 2024)"
  },
  {
    "name": "Dulse Leith",
    "category": "meals",
    "address": "49A The Shore, Leith, EH6 6QU",
    "lat": 55.9764,
    "lng": -3.1699,
    "priceRange": 3,
    "tags": ["seafood", "wine-bar", "scottish-seafood", "intimate", "contemporary"],
    "hours": {
      "mon": "closed",
      "tue": "17:00-22:00",
      "wed": "17:00-22:00",
      "thu": "17:00-22:00",
      "fri": "12:00-14:30",
      "sat": "12:00-14:30",
      "sun": "12:00-14:30"
    },
    "reviews": [
      "Michelin star quality dishes",
      "Charming seafood and wine haven"
    ],
    "description": "Charming new seafood and wine haven on the Shore (opened Nov 2024)"
  },
  {
    "name": "The Ship on the Shore",
    "category": "meals",
    "address": "24-26 The Shore, Leith, EH6 6QN",
    "lat": 55.9766,
    "lng": -3.1696,
    "priceRange": 3,
    "tags": ["seafood", "champagne-bar", "waterfront", "scottish-produce", "romantic"],
    "hours": {
      "mon": "12:00-15:00",
      "tue": "12:00-15:00",
      "wed": "12:00-15:00",
      "thu": "12:00-15:00",
      "fri": "12:00-15:00",
      "sat": "12:00-22:00",
      "sun": "12:00-22:00"
    },
    "reviews": [
      "Fresh fish in all variants just top",
      "Sustainable Scottish fish with champagne"
    ],
    "description": "Sustainable Scottish fish paired with champagne by Water of Leith"
  },
  {
    "name": "Mirin",
    "category": "meals",
    "address": "9 Albert Place, EH7 5HN",
    "lat": 55.9615,
    "lng": -3.1745,
    "priceRange": 2,
    "tags": ["asian-fusion", "small-plates", "casual", "leith-walk", "innovative"],
    "hours": {
      "mon": "17:00-22:00",
      "tue": "closed",
      "wed": "closed",
      "thu": "17:00-22:00",
      "fri": "17:00-22:00",
      "sat": "17:00-22:00",
      "sun": "17:00-22:00"
    },
    "reviews": [
      "Every single dish delicious",
      "Inventive Asian-Scottish fusion"
    ],
    "description": "Tiny Leith spot serving inventive Asian-Scottish fusion small plates"
  },
  {
    "name": "Teuchters Landing",
    "category": "meals",
    "address": "1c Dock Place, Leith, EH6 6LU",
    "lat": 55.9789,
    "lng": -3.1722,
    "priceRange": 2,
    "tags": ["gastropub", "waterfront", "whisky-bar", "beer-garden", "scottish-seafood"],
    "hours": {
      "mon": "10:00-01:00",
      "tue": "10:00-01:00",
      "wed": "10:00-01:00",
      "thu": "10:00-01:00",
      "fri": "10:00-01:00",
      "sat": "10:00-01:00",
      "sun": "10:00-01:00"
    },
    "reviews": [
      "Best fish and chips incredible",
      "350 malt whiskies with waterside terrace"
    ],
    "description": "Old ferry waiting room with waterside terrace and 350 whiskies"
  },
  {
    "name": "The Scran & Scallie",
    "category": "meals",
    "address": "1 Comely Bank Road, Stockbridge, EH4 1DR",
    "lat": 55.9642,
    "lng": -3.2145,
    "priceRange": 2,
    "tags": ["gastropub", "scottish-food", "family-friendly", "seasonal", "tom-kitchin"],
    "hours": {
      "mon": "12:00-15:00",
      "tue": "12:00-15:00",
      "wed": "12:00-15:00",
      "thu": "12:00-15:00",
      "fri": "12:00-15:00",
      "sat": "08:30-11:00",
      "sun": "08:30-11:00"
    },
    "reviews": [
      "Best Steak and Ale pie!",
      "Tom Kitchin's gastropub excellence"
    ],
    "description": "Tom Kitchin's acclaimed Stockbridge gastropub with seasonal Scottish food"
  },
  {
    "name": "Eòrna",
    "category": "meals",
    "address": "68 Hamilton Place, Stockbridge, EH3 5AZ",
    "lat": 55.9587,
    "lng": -3.2098,
    "priceRange": 3,
    "tags": ["chef's-table", "tasting-menu", "intimate", "seasonal", "scottish-produce"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "19:00-23:00",
      "thu": "19:00-23:00",
      "fri": "19:00-23:00",
      "sat": "19:00-23:00",
      "sun": "closed"
    },
    "reviews": [
      "Near perfection dining experience",
      "Intimate 12-seat chef's table"
    ],
    "description": "Intimate 12-seat chef's table with seasonal tasting menu"
  },
  {
    "name": "Sotto Enoteca & Trattoria",
    "category": "meals",
    "address": "28-32 Deanhaugh Street, Stockbridge, EH4 1LY",
    "lat": 55.9609,
    "lng": -3.2117,
    "priceRange": 2,
    "tags": ["italian", "wine-bar", "enoteca", "trattoria", "neighborhood-dining"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "10:00-23:00",
      "thu": "10:00-23:00",
      "fri": "10:00-00:00",
      "sat": "10:00-00:00",
      "sun": "10:00-23:00"
    },
    "reviews": [
      "Beautiful authentic Italian food",
      "200+ Italian wines"
    ],
    "description": "New Italian enoteca with 200+ wines (opened October 2024)"
  },
  {
    "name": "Nok's Kitchen Stockbridge",
    "category": "meals",
    "address": "8 Gloucester Street, Stockbridge, EH3 6EG",
    "lat": 55.9592,
    "lng": -3.2082,
    "priceRange": 2,
    "tags": ["thai", "authentic", "cozy", "romantic", "family-run"],
    "hours": {
      "mon": "12:00-15:00",
      "tue": "12:00-15:00",
      "wed": "12:00-15:00",
      "thu": "12:00-15:00",
      "fri": "12:00-15:00",
      "sat": "12:00-15:00",
      "sun": "12:00-15:00"
    },
    "reviews": [
      "Best Thai dining experience in Edinburgh",
      "Authentic in 17th-century townhouse"
    ],
    "description": "Authentic Thai in charming 17th-century Stockbridge townhouse"
  },
  {
    "name": "Ting Thai Caravan",
    "category": "quick-bites",
    "address": "8-9 Teviot Place, EH1 2QZ",
    "lat": 55.9456,
    "lng": -3.1902,
    "priceRange": 1,
    "tags": ["thai", "street-food", "student-friendly", "affordable", "old-town"],
    "hours": {
      "mon": "12:00-22:00",
      "tue": "12:00-22:00",
      "wed": "12:00-22:00",
      "thu": "12:00-22:00",
      "fri": "12:00-23:00",
      "sat": "12:00-23:00",
      "sun": "12:00-22:00"
    },
    "reviews": [
      "Best pad thai in Edinburgh",
      "Student-friendly fast Thai"
    ],
    "description": "Fast Thai street food near university at student-friendly prices"
  },
  {
    "name": "Oink (Victoria Street)",
    "category": "quick-bites",
    "address": "34 Victoria Street, EH1 2JW",
    "lat": 55.9486,
    "lng": -3.1937,
    "priceRange": 1,
    "tags": ["hog-roast", "scottish", "street-food", "old-town", "affordable"],
    "hours": {
      "mon": "11:00-17:00",
      "tue": "11:00-17:00",
      "wed": "11:00-17:00",
      "thu": "11:00-17:00",
      "fri": "11:00-17:00",
      "sat": "11:00-17:00",
      "sun": "11:00-17:00"
    },
    "reviews": [
      "Crackling good lunch",
      "Best hog roast in town"
    ],
    "description": "Farm-to-fork hog roast rolls on iconic Victoria Street"
  },
  {
    "name": "Chorrito Cantina",
    "category": "quick-bites",
    "address": "126 Leith Walk, EH6 5DT",
    "lat": 55.9638,
    "lng": -3.1779,
    "priceRange": 2,
    "tags": ["mexican", "tacos", "brunch", "hot-sauce", "leith"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "closed",
      "thu": "17:00-21:00",
      "fri": "17:00-21:00",
      "sat": "12:00-21:00",
      "sun": "12:00-17:00"
    },
    "reviews": [
      "Tongue-numbing iconic sauces",
      "Vibrant Mexican handmade tacos"
    ],
    "description": "Vibrant Mexican tacos with legendary hot sauces on Leith Walk"
  },
  {
    "name": "Roseleaf Bar Cafe",
    "category": "meals",
    "address": "23-24 Sandport Place, Leith, EH6 6EW",
    "lat": 55.9765,
    "lng": -3.1689,
    "priceRange": 2,
    "tags": ["gastropub", "brunch", "scottish", "leith", "teapot-cocktails"],
    "hours": {
      "mon": "10:00-01:00",
      "tue": "10:00-01:00",
      "wed": "10:00-01:00",
      "thu": "10:00-01:00",
      "fri": "10:00-01:00",
      "sat": "10:00-01:00",
      "sun": "10:00-01:00"
    },
    "reviews": [
      "Quirky cocktails in teapots",
      "Cosy bar with exceptional food"
    ],
    "description": "Seasonal Scottish food and teapot cocktails in quirky Leith setting"
  },
  {
    "name": "Urban Angel",
    "category": "quick-bites",
    "address": "121 Hanover Street, EH2 1DJ",
    "lat": 55.9559,
    "lng": -3.1955,
    "priceRange": 2,
    "tags": ["brunch", "healthy", "organic", "new-town", "cafe"],
    "hours": {
      "mon": "08:30-17:00",
      "tue": "08:30-17:00",
      "wed": "08:30-17:00",
      "thu": "08:30-17:00",
      "fri": "08:30-17:00",
      "sat": "09:00-17:00",
      "sun": "09:00-17:00"
    },
    "reviews": [
      "Edinburgh brunch institution",
      "Organic seasonal produce champion"
    ],
    "description": "New Town brunch institution championing organic seasonal produce"
  },
  {
    "name": "The Edinburgh Larder",
    "category": "quick-bites",
    "address": "15 Blackfriars Street, EH1 1NB",
    "lat": 55.9498,
    "lng": -3.1862,
    "priceRange": 2,
    "tags": ["scottish", "brunch", "local-produce", "breakfast", "old-town"],
    "hours": {
      "mon": "08:00-16:00",
      "tue": "08:00-16:00",
      "wed": "08:00-16:00",
      "thu": "08:00-16:00",
      "fri": "08:00-16:00",
      "sat": "09:00-16:00",
      "sun": "09:00-16:00"
    },
    "reviews": [
      "Legendary Scottish breakfast",
      "Locally sourced perfection"
    ],
    "description": "Scottish produce celebration off Royal Mile with legendary breakfast"
  },
  {
    "name": "Paradise Palms",
    "category": "meals",
    "address": "41 Lothian Street, EH1 1HB",
    "lat": 55.9466,
    "lng": -3.1893,
    "priceRange": 2,
    "tags": ["vegetarian", "vegan", "tropical-vibes", "cocktails", "lgbtq-friendly"],
    "hours": {
      "mon": "closed",
      "tue": "16:00-01:00",
      "wed": "16:00-01:00",
      "thu": "16:00-01:00",
      "fri": "12:00-01:00",
      "sat": "12:00-01:00",
      "sun": "12:00-01:00"
    },
    "reviews": [
      "Amazing vegan food and quirky atmosphere",
      "Tropical vibes with vegetarian magic"
    ],
    "description": "Vegetarian/vegan magic with tropical vibes and creative cocktails"
  },
  {
    "name": "Singh Street",
    "category": "meals",
    "address": "88 Bruntsfield Place, EH10 4HG",
    "lat": 55.9398,
    "lng": -3.2056,
    "priceRange": 2,
    "tags": ["punjabi", "indian-fusion", "brunch", "new-opening-2024", "bruntsfield"],
    "hours": {
      "mon": "10:00-22:00",
      "tue": "10:00-22:00",
      "wed": "10:00-22:00",
      "thu": "10:00-22:00",
      "fri": "10:00-22:00",
      "sat": "10:00-22:00",
      "sun": "10:00-22:00"
    },
    "reviews": [
      "Haggis keema is revolutionary",
      "Punjabi-Scottish fusion excellence"
    ],
    "description": "Punjabi-Scottish fusion blending cultures (opened September 2024)"
  },
  {
    "name": "Panda & Sons",
    "category": "drinks",
    "address": "79 Queen Street, EH2 4NF",
    "lat": 55.9541,
    "lng": -3.1998,
    "priceRange": 3,
    "tags": ["speakeasy", "craft-cocktails", "award-winning", "barbershop-entrance", "freeze-distillation"],
    "hours": {
      "mon": "16:00-00:30",
      "tue": "16:00-01:00",
      "wed": "16:00-01:00",
      "thu": "16:00-01:00",
      "fri": "16:00-01:00",
      "sat": "15:00-01:00",
      "sun": "15:00-00:30"
    },
    "reviews": [
      "Ranked #34 World's 50 Best Bars 2025",
      "Hidden barbershop entrance magic"
    ],
    "description": "Scotland's most awarded bar, #34 World's 50 Best, behind barbershop"
  },
  {
    "name": "Bramble Bar & Lounge",
    "category": "drinks",
    "address": "16A Queen Street, EH2 1JE",
    "lat": 55.9551,
    "lng": -3.1954,
    "priceRange": 2,
    "tags": ["basement-speakeasy", "craft-cocktails", "live-dj", "intimate-atmosphere", "award-winning"],
    "hours": {
      "mon": "16:00-01:00",
      "tue": "16:00-01:00",
      "wed": "16:00-01:00",
      "thu": "16:00-01:00",
      "fri": "16:00-01:00",
      "sat": "16:00-01:00",
      "sun": "16:00-01:00"
    },
    "reviews": [
      "Unpretentious excellence",
      "#36 UK Top 50 Cocktail Bars 2025"
    ],
    "description": "Edinburgh's original speakeasy, #36 UK Top 50, underground since 2006"
  },
  {
    "name": "Nauticus Bar",
    "category": "drinks",
    "address": "142 Duke Street, Leith, EH6 8HR",
    "lat": 55.9694,
    "lng": -3.1679,
    "priceRange": 2,
    "tags": ["maritime-theme", "leith-port", "scottish-produce", "craft-cocktails", "bartenders-bar"],
    "hours": {
      "mon": "16:00-00:00",
      "tue": "16:00-00:00",
      "wed": "16:00-00:00",
      "thu": "16:00-00:00",
      "fri": "16:00-00:00",
      "sat": "16:00-00:00",
      "sun": "16:00-00:00"
    },
    "reviews": [
      "Leith's port-town heritage in cocktails",
      "Famous Porridge Colada"
    ],
    "description": "Maritime-themed bar championing Scottish spirits, #12 UK Top 50"
  },
  {
    "name": "Hey Palu",
    "category": "drinks",
    "address": "49 Bread Street, EH3 9AH",
    "lat": 55.9467,
    "lng": -3.2042,
    "priceRange": 2,
    "tags": ["italian-aperitivo", "amari-specialist", "modern-italian", "craft-cocktails", "dog-friendly"],
    "hours": {
      "mon": "17:00-23:30",
      "tue": "17:00-23:30",
      "wed": "17:00-23:30",
      "thu": "17:00-23:30",
      "fri": "17:00-23:30",
      "sat": "16:00-01:00",
      "sun": "closed"
    },
    "reviews": [
      "Negroni flights are must-try",
      "#5 UK cocktail bars"
    ],
    "description": "#5 UK cocktail bar with Italy's largest Amari collection (75+ bottles)"
  },
  {
    "name": "Lucky Liquor Co.",
    "category": "drinks",
    "address": "39A Queen Street, EH2 3NH",
    "lat": 55.9545,
    "lng": -3.1994,
    "priceRange": 2,
    "tags": ["rotating-menu", "craft-cocktails", "vinyl-soundtrack", "pool-table", "creative-serves"],
    "hours": {
      "mon": "16:00-01:00",
      "tue": "16:00-01:00",
      "wed": "16:00-01:00",
      "thu": "16:00-01:00",
      "fri": "16:00-01:00",
      "sat": "16:00-01:00",
      "sun": "16:00-01:00"
    },
    "reviews": [
      "100% vinyl soundtrack, pool table",
      "Experimental cocktails rotate every 13 weeks"
    ],
    "description": "Bramble sister venue rotating 13 cocktails from 13 bottles every 13 weeks"
  },
  {
    "name": "Juniper",
    "category": "drinks",
    "address": "20 Princes Street, Hotel Indigo, EH2 2AN",
    "lat": 55.9514,
    "lng": -3.1943,
    "priceRange": 2,
    "tags": ["rooftop-views", "hotel-bar", "scottish-gin", "whisky-cocktails", "castle-views"],
    "hours": {
      "mon": "08:00-00:00",
      "tue": "08:00-00:00",
      "wed": "08:00-00:00",
      "thu": "08:00-00:00",
      "fri": "08:00-00:00",
      "sat": "08:00-00:00",
      "sun": "08:00-00:00"
    },
    "reviews": [
      "Sweeping Edinburgh Castle vistas",
      "Smoking teapot tipsy teas"
    ],
    "description": "Rooftop bar with Edinburgh Castle views and extensive Scottish spirits"
  },
  {
    "name": "Joao's Place",
    "category": "drinks",
    "address": "11th Floor, W Edinburgh, St James Square, EH1 3AX",
    "lat": 55.9555,
    "lng": -3.1852,
    "priceRange": 3,
    "tags": ["rooftop-speakeasy", "hotel-bar", "brazilian-inspired", "panoramic-views", "intimate-apartment"],
    "hours": {
      "mon": "closed",
      "tue": "17:00-01:00",
      "wed": "17:00-01:00",
      "thu": "17:00-01:00",
      "fri": "17:00-01:00",
      "sat": "17:00-01:00",
      "sun": "closed"
    },
    "reviews": [
      "Stunning 360° Edinburgh skyline",
      "Reservations required for exclusivity"
    ],
    "description": "Exclusive 11th-floor speakeasy with Brazilian-Japanese cocktails"
  },
  {
    "name": "Nightcap",
    "category": "drinks",
    "address": "3 York Place, EH1 3EB",
    "lat": 55.9563,
    "lng": -3.1888,
    "priceRange": 2,
    "tags": ["basement-speakeasy", "intimate-lounge", "late-night", "craft-cocktails", "vinyl-music"],
    "hours": {
      "mon": "17:00-03:00",
      "tue": "17:00-03:00",
      "wed": "17:00-03:00",
      "thu": "17:00-03:00",
      "fri": "17:00-03:00",
      "sat": "17:00-03:00",
      "sun": "17:00-03:00"
    },
    "reviews": [
      "Perfect nightcap with premium whiskies",
      "Cloud 17 cocktail is signature serve"
    ],
    "description": "Intimate basement speakeasy open until 3am with premium spirits"
  },
  {
    "name": "The Voodoo Rooms",
    "category": "drinks",
    "address": "19A West Register Street, EH2 2AA",
    "lat": 55.9541,
    "lng": -3.1899,
    "priceRange": 2,
    "tags": ["victorian-venue", "live-music", "rum-specialist", "tequila-collection", "opulent-decor"],
    "hours": {
      "mon": "17:00-01:00",
      "tue": "17:00-01:00",
      "wed": "17:00-01:00",
      "thu": "17:00-01:00",
      "fri": "15:00-01:00",
      "sat": "13:00-01:00",
      "sun": "15:00-01:00"
    },
    "reviews": [
      "Stunning architecture, incredible cocktails",
      "60+ rums and 60+ tequilas"
    ],
    "description": "Six rooms, four bars, 60+ rums in restored 200-year-old building"
  },
  {
    "name": "The Bow Bar",
    "category": "drinks",
    "address": "80 West Bow, EH1 2HH",
    "lat": 55.9478,
    "lng": -3.1933,
    "priceRange": 2,
    "tags": ["traditional-pub", "scotch-whisky", "historic", "local-favorite", "award-winning"],
    "hours": {
      "mon": "12:00-00:00",
      "tue": "12:00-00:00",
      "wed": "12:00-00:00",
      "thu": "12:00-00:00",
      "fri": "12:00-00:00",
      "sat": "12:00-00:00",
      "sun": "12:30-00:00"
    },
    "reviews": [
      "Best bar in Scotland",
      "300+ whiskies, knowledgeable staff"
    ],
    "description": "Traditional Scottish alehouse with 300+ whiskies, Best Bar in Scotland"
  },
  {
    "name": "Tipsy Midgie",
    "category": "drinks",
    "address": "67 St Leonard's Hill, EH8 9SB",
    "lat": 55.9420,
    "lng": -3.1839,
    "priceRange": 2,
    "tags": ["whisky-bar", "award-winning", "scotch-whisky", "whisky-tastings", "local-gem"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "closed",
      "thu": "17:00-23:00",
      "fri": "17:00-23:00",
      "sat": "17:00-23:00",
      "sun": "16:00-23:00"
    },
    "reviews": [
      "Scotland's Whisky Bar of Year 2023-2025",
      "Colin's knowledge is exceptional"
    ],
    "description": "Scotland's Whisky Bar of Year with Edinburgh's largest single malt selection"
  },
  {
    "name": "Kaleidoscope Bar (SMWS)",
    "category": "drinks",
    "address": "28 Queen Street, EH2 1JX",
    "lat": 55.9545,
    "lng": -3.1977,
    "priceRange": 3,
    "tags": ["whisky-bar", "single-cask", "scotch-whisky", "exclusive", "members-club"],
    "hours": {
      "mon": "12:00-23:00",
      "tue": "12:00-23:00",
      "wed": "12:00-23:00",
      "thu": "12:00-23:00",
      "fri": "12:00-23:00",
      "sat": "12:00-23:00",
      "sun": "closed"
    },
    "reviews": [
      "Whisky Magazine Global Bar of Year 2022",
      "Fantastic selection, welcoming atmosphere"
    ],
    "description": "Scotch Malt Whisky Society's award-winning single cask bar"
  },
  {
    "name": "SCOTCH at The Balmoral",
    "category": "drinks",
    "address": "1 Princes Street, The Balmoral Hotel, EH2 2EQ",
    "lat": 55.9523,
    "lng": -3.1892,
    "priceRange": 3,
    "tags": ["whisky-bar", "luxury", "scotch-whisky", "hotel-bar", "high-end"],
    "hours": {
      "mon": "16:00-00:30",
      "tue": "16:00-00:30",
      "wed": "16:00-00:30",
      "thu": "16:00-00:30",
      "fri": "16:00-00:30",
      "sat": "16:00-00:30",
      "sun": "16:00-00:30"
    },
    "reviews": [
      "World-class whisky bar",
      "500+ Scottish whiskies"
    ],
    "description": "Luxury hotel bar curating 500+ Scottish whiskies with expert ambassadors"
  },
  {
    "name": "Whiski Rooms",
    "category": "drinks",
    "address": "4-7 North Bank Street, EH1 2LP",
    "lat": 55.9499,
    "lng": -3.1935,
    "priceRange": 2,
    "tags": ["whisky-bar", "restaurant", "scotch-whisky", "whisky-tastings", "touristy"],
    "hours": {
      "mon": "11:00-00:00",
      "tue": "11:00-00:00",
      "wed": "11:00-00:00",
      "thu": "11:00-00:00",
      "fri": "11:00-01:00",
      "sat": "11:00-01:00",
      "sun": "11:00-00:00"
    },
    "reviews": [
      "300+ whiskies with daily tastings",
      "Stunning views over Princes Street"
    ],
    "description": "300+ whiskies with daily tastings and Princes Street views"
  },
  {
    "name": "Devil's Advocate",
    "category": "drinks",
    "address": "9 Advocate's Close, EH1 1ND",
    "lat": 55.9502,
    "lng": -3.1895,
    "priceRange": 2,
    "tags": ["whisky-bar", "cocktail-bar", "victorian-pumphouse", "historic", "scotch-whisky"],
    "hours": {
      "mon": "12:00-00:00",
      "tue": "12:00-00:00",
      "wed": "12:00-00:00",
      "thu": "12:00-00:00",
      "fri": "12:00-01:00",
      "sat": "12:00-01:00",
      "sun": "12:00-00:00"
    },
    "reviews": [
      "Beautiful Victorian pump house setting",
      "300+ whiskies in hidden close"
    ],
    "description": "Victorian pump house hiding 300+ whiskies down Advocate's Close"
  },
  {
    "name": "Usquabae Whisky Bar",
    "category": "drinks",
    "address": "2-4 Hope Street, EH2 4DB",
    "lat": 55.9514,
    "lng": -3.2058,
    "priceRange": 2,
    "tags": ["whisky-bar", "restaurant", "scotch-whisky", "west-end", "underground"],
    "hours": {
      "mon": "closed",
      "tue": "12:00-00:00",
      "wed": "12:00-00:00",
      "thu": "12:00-00:00",
      "fri": "12:00-00:00",
      "sat": "12:00-00:00",
      "sun": "12:00-00:00"
    },
    "reviews": [
      "Unrivalled selection",
      "400+ whiskies in subterranean bothy"
    ],
    "description": "Subterranean bothy featuring 400+ whiskies with excellent food"
  },
  {
    "name": "The Abbey Whisky Bar",
    "category": "drinks",
    "address": "65 South Clerk Street, EH8 9PP",
    "lat": 55.9415,
    "lng": -3.1826,
    "priceRange": 1,
    "tags": ["traditional-pub", "whisky-bar", "scotch-whisky", "local-gem", "family-run"],
    "hours": {
      "mon": "10:00-00:00",
      "tue": "10:00-00:00",
      "wed": "10:00-00:00",
      "thu": "10:00-00:00",
      "fri": "10:00-01:00",
      "sat": "10:00-01:00",
      "sun": "10:00-00:00"
    },
    "reviews": [
      "Real Edinburgh life",
      "700+ whiskies, excellent value"
    ],
    "description": "Family-run pub with 700+ whiskies offering real Edinburgh experience"
  },
  {
    "name": "The Auld Hundred",
    "category": "drinks",
    "address": "100 Rose Street, EH2 2NN",
    "lat": 55.9532,
    "lng": -3.1972,
    "priceRange": 1,
    "tags": ["traditional-pub", "scotch-whisky", "live-music", "historic", "rose-street"],
    "hours": {
      "mon": "11:00-00:00",
      "tue": "11:00-00:00",
      "wed": "11:00-00:00",
      "thu": "11:00-00:00",
      "fri": "11:00-00:00",
      "sat": "11:00-00:00",
      "sun": "11:00-00:00"
    },
    "reviews": [
      "Authentic Scottish pub experience",
      "Live Scottish music nightly"
    ],
    "description": "100+ local whiskies with live Scottish music nightly on Rose Street"
  },
  {
    "name": "Whiski Bar & Restaurant",
    "category": "drinks",
    "address": "119 High Street, Royal Mile, EH1 1SG",
    "lat": 55.9506,
    "lng": -3.1879,
    "priceRange": 2,
    "tags": ["whisky-bar", "restaurant", "scotch-whisky", "royal-mile", "live-music"],
    "hours": {
      "mon": "10:00-01:00",
      "tue": "10:00-01:00",
      "wed": "10:00-01:00",
      "thu": "10:00-01:00",
      "fri": "10:00-01:00",
      "sat": "09:00-01:00",
      "sun": "09:00-01:00"
    },
    "reviews": [
      "Award-winning haggis",
      "300 whiskies with free live music"
    ],
    "description": "300 whiskies with free live Scottish music nightly on Royal Mile"
  },
  {
    "name": "Abbotsford Bar",
    "category": "drinks",
    "address": "3-5 Rose Street, EH2 2PR",
    "lat": 55.9530,
    "lng": -3.1959,
    "priceRange": 2,
    "tags": ["historic-pub", "real-ale", "victorian-interior", "rose-street"],
    "hours": {
      "mon": "11:00-23:00",
      "tue": "11:00-23:00",
      "wed": "11:00-23:00",
      "thu": "11:00-23:00",
      "fri": "11:00-00:00",
      "sat": "11:00-00:00",
      "sun": "11:00-23:00"
    },
    "reviews": [
      "Magnificent mahogany bar and ceiling",
      "Edinburgh's best preserved pub"
    ],
    "description": "1902 Edwardian magnificence, Edinburgh's best preserved Victorian pub"
  },
  {
    "name": "The Guildford Arms",
    "category": "drinks",
    "address": "1 West Register Street, EH2 2AA",
    "lat": 55.9537,
    "lng": -3.1904,
    "priceRange": 2,
    "tags": ["real-ale", "victorian-pub", "historic-interior", "gallery-restaurant"],
    "hours": {
      "mon": "11:00-23:00",
      "tue": "11:00-23:00",
      "wed": "11:00-23:00",
      "thu": "11:00-23:00",
      "fri": "11:00-00:30",
      "sat": "11:00-00:30",
      "sun": "12:30-23:00"
    },
    "reviews": [
      "One of Scotland's People's Palaces",
      "Ornate rococo plaster ceiling"
    ],
    "description": "Ornate rococo ceiling in preserved 1896 Victorian palace pub"
  },
  {
    "name": "Bennets Bar",
    "category": "drinks",
    "address": "8 Leven Street, EH3 9LG",
    "lat": 55.9417,
    "lng": -3.2033,
    "priceRange": 2,
    "tags": ["historic-pub", "real-ale", "whisky-bar", "victorian-interior"],
    "hours": {
      "mon": "12:00-01:00",
      "tue": "12:00-01:00",
      "wed": "12:00-01:00",
      "thu": "12:00-01:00",
      "fri": "12:00-01:00",
      "sat": "12:00-01:00",
      "sun": "12:00-01:00"
    },
    "reviews": [
      "Beautiful ornate Victorian fixtures",
      "150+ single malt whiskies"
    ],
    "description": "Ornate Victorian fixtures since 1906 with 150+ single malts"
  },
  {
    "name": "The Sheep Heid Inn",
    "category": "drinks",
    "address": "43-45 The Causeway, Duddingston, EH15 3QA",
    "lat": 55.9445,
    "lng": -3.1589,
    "priceRange": 2,
    "tags": ["historic-pub", "real-ale", "gastropub", "oldest-pub", "skittles-alley"],
    "hours": {
      "mon": "11:00-23:00",
      "tue": "11:00-23:00",
      "wed": "11:00-23:00",
      "thu": "11:00-23:00",
      "fri": "11:00-00:00",
      "sat": "11:00-00:00",
      "sun": "12:30-23:00"
    },
    "reviews": [
      "Edinburgh's oldest pub since 1360",
      "Charming with excellent food"
    ],
    "description": "Edinburgh's oldest pub (1360) with traditional skittles alley"
  },
  {
    "name": "Café Royal",
    "category": "drinks",
    "address": "19 West Register Street, EH2 2AA",
    "lat": 55.9539,
    "lng": -3.1904,
    "priceRange": 3,
    "tags": ["historic-pub", "oyster-bar", "victorian-interior", "fine-dining"],
    "hours": {
      "mon": "11:00-23:00",
      "tue": "11:00-23:00",
      "wed": "11:00-23:00",
      "thu": "11:00-00:00",
      "fri": "11:00-01:00",
      "sat": "11:00-01:00",
      "sun": "11:00-23:00"
    },
    "reviews": [
      "Beautiful Royal Doulton tilework",
      "Victorian architecture masterpiece"
    ],
    "description": "Victorian architecture with famous oyster bar since 1861"
  },
  {
    "name": "Athletic Arms (Diggers)",
    "category": "drinks",
    "address": "1-3 Angle Park Terrace, EH11 2JX",
    "lat": 55.9389,
    "lng": -3.2208,
    "priceRange": 1,
    "tags": ["historic-pub", "real-ale", "whisky-bar", "traditional-pub"],
    "hours": {
      "mon": "11:00-01:00",
      "tue": "11:00-01:00",
      "wed": "11:00-01:00",
      "thu": "11:00-01:00",
      "fri": "11:00-01:00",
      "sat": "11:00-01:00",
      "sun": "11:00-01:00"
    },
    "reviews": [
      "Traditional Edinburgh institution",
      "500+ whiskies, famous for McEwan's 80/-"
    ],
    "description": "Since 1897 between graveyards with 500+ whiskies and famous ales"
  },
  {
    "name": "The Cumberland Bar",
    "category": "drinks",
    "address": "1-3 Cumberland Street, EH3 6RT",
    "lat": 55.9590,
    "lng": -3.1971,
    "priceRange": 2,
    "tags": ["real-ale", "new-town", "beer-garden", "gastropub"],
    "hours": {
      "mon": "12:00-23:00",
      "tue": "12:00-23:00",
      "wed": "12:00-23:00",
      "thu": "12:00-23:00",
      "fri": "12:00-00:00",
      "sat": "12:00-00:00",
      "sun": "12:00-00:00"
    },
    "reviews": [
      "Elegant traditional New Town pub",
      "Real ale haven with open fire"
    ],
    "description": "New Town's only beer garden with real ales and open fires"
  },
  {
    "name": "The Holyrood 9A",
    "category": "drinks",
    "address": "9A Holyrood Road, EH8 8AE",
    "lat": 55.9495,
    "lng": -3.1828,
    "priceRange": 2,
    "tags": ["craft-beer", "gastropub", "burger-bar", "modern-pub"],
    "hours": {
      "mon": "10:00-01:00",
      "tue": "10:00-01:00",
      "wed": "10:00-01:00",
      "thu": "10:00-01:00",
      "fri": "10:00-01:00",
      "sat": "10:00-01:00",
      "sun": "10:00-01:00"
    },
    "reviews": [
      "Best craft beer selection in Edinburgh",
      "Excellent gourmet burgers"
    ],
    "description": "25 craft beer taps with gourmet burgers and modern pub atmosphere"
  },
  {
    "name": "The Pear Tree",
    "category": "drinks",
    "address": "38 West Nicolson Street, EH8 9DD",
    "lat": 55.9456,
    "lng": -3.1878,
    "priceRange": 2,
    "tags": ["beer-garden", "student-bar", "live-sports", "historic-pub", "outdoor-screen"],
    "hours": {
      "mon": "12:00-00:00",
      "tue": "12:00-00:00",
      "wed": "12:00-00:00",
      "thu": "12:00-00:00",
      "fri": "12:00-01:00",
      "sat": "12:00-01:00",
      "sun": "12:00-01:00"
    },
    "reviews": [
      "Edinburgh's largest beer garden",
      "170-year-old pear trees"
    ],
    "description": "Edinburgh's largest beer garden (1759) with biggest outdoor screen"
  },
  {
    "name": "56 North",
    "category": "drinks",
    "address": "2 West Crosscauseway, EH8 9JP",
    "lat": 55.9445,
    "lng": -3.1813,
    "priceRange": 2,
    "tags": ["gin-bar", "distillery", "craft-cocktails", "beer-garden", "scottish-gin"],
    "hours": {
      "mon": "11:00-01:00",
      "tue": "11:00-01:00",
      "wed": "11:00-01:00",
      "thu": "11:00-01:00",
      "fri": "11:00-01:00",
      "sat": "11:00-01:00",
      "sun": "11:00-01:00"
    },
    "reviews": [
      "Scotland's original gin bar",
      "400+ gins with working distillery"
    ],
    "description": "Scotland's original gin bar with 400+ gins and South Loch Distillery"
  },
  {
    "name": "The Jolly Botanist",
    "category": "drinks",
    "address": "256-260 Morrison Street, EH3 8DT",
    "lat": 55.9425,
    "lng": -3.2145,
    "priceRange": 2,
    "tags": ["gin-bar", "victorian-interior", "craft-cocktails", "west-end", "botanical"],
    "hours": {
      "mon": "12:00-00:00",
      "tue": "12:00-00:00",
      "wed": "12:00-00:00",
      "thu": "12:00-00:00",
      "fri": "12:00-00:00",
      "sat": "12:00-00:00",
      "sun": "12:00-00:00"
    },
    "reviews": [
      "Victorian style meets gin culture",
      "60+ specialist gins"
    ],
    "description": "Best New Pub 2015 with 60+ specialist gins in Victorian setting"
  },
  {
    "name": "Malones Edinburgh",
    "category": "drinks",
    "address": "242 Morrison Street, EH3 8DT",
    "lat": 55.9425,
    "lng": -3.2132,
    "priceRange": 2,
    "tags": ["irish-pub", "sports-bar", "live-music", "irish-whiskey", "guinness"],
    "hours": {
      "mon": "12:00-00:00",
      "tue": "12:00-00:00",
      "wed": "12:00-00:00",
      "thu": "12:00-00:00",
      "fri": "12:00-01:00",
      "sat": "12:00-01:00",
      "sun": "12:00-00:00"
    },
    "reviews": [
      "Best pint of Guinness in Edinburgh",
      "Award-winning Irish atmosphere"
    ],
    "description": "Award-winning Irish bar with 250+ whiskies and 4K sports screens"
  },
  {
    "name": "Finnegan's Wake",
    "category": "drinks",
    "address": "9-9A Victoria Street, EH1 2HE",
    "lat": 55.9491,
    "lng": -3.1921,
    "priceRange": 2,
    "tags": ["irish-pub", "live-music", "guinness", "traditional-pub", "old-town"],
    "hours": {
      "mon": "12:00-01:00",
      "tue": "12:00-01:00",
      "wed": "12:00-01:00",
      "thu": "12:00-01:00",
      "fri": "12:00-01:00",
      "sat": "12:00-01:00",
      "sun": "12:00-01:00"
    },
    "reviews": [
      "Live music every night",
      "Perfect Guinness on Victoria Street"
    ],
    "description": "Authentic Irish pub with live music nightly on historic Victoria Street"
  },
  {
    "name": "Good Brothers",
    "category": "drinks",
    "address": "34 Northumberland Street, EH3 6LS",
    "lat": 55.9569,
    "lng": -3.1986,
    "priceRange": 2,
    "tags": ["wine-bar", "cheese-bar", "natural-wine", "organic-wine", "wine-flights"],
    "hours": {
      "mon": "closed",
      "tue": "16:00-23:00",
      "wed": "16:00-23:00",
      "thu": "16:00-23:00",
      "fri": "12:00-00:00",
      "sat": "12:00-00:00",
      "sun": "12:00-21:00"
    },
    "reviews": [
      "Perfect wine and cheese pairings",
      "Stockbridge neighborhood wine gem"
    ],
    "description": "Natural wines paired with artisan cheeses in Stockbridge"
  },
  {
    "name": "Artisan Roast (Broughton Street)",
    "category": "quick-bites",
    "address": "57 Broughton Street, EH1 3RJ",
    "lat": 55.9586,
    "lng": -3.1889,
    "priceRange": 1,
    "tags": ["specialty-coffee", "coffee-roastery", "independent", "brunch"],
    "hours": {
      "mon": "08:00-18:30",
      "tue": "08:00-18:30",
      "wed": "08:00-18:30",
      "thu": "08:00-18:30",
      "fri": "08:00-18:30",
      "sat": "09:00-18:30",
      "sun": "09:00-18:00"
    },
    "reviews": [
      "Award-winning coffee",
      "Scotland's specialty coffee pioneer"
    ],
    "description": "Scotland's specialty coffee pioneer since 2007 with single origin beans"
  },
  {
    "name": "Brew Lab Coffee",
    "category": "quick-bites",
    "address": "6-8 South College Street, EH8 9AA",
    "lat": 55.9470,
    "lng": -3.1880,
    "priceRange": 2,
    "tags": ["specialty-coffee", "minimalist", "wifi"],
    "hours": {
      "mon": "08:00-18:00",
      "tue": "08:00-18:00",
      "wed": "08:00-18:00",
      "thu": "08:00-18:00",
      "fri": "08:00-18:00",
      "sat": "09:00-18:00",
      "sun": "09:00-18:00"
    },
    "reviews": [
      "Pour-over perfection",
      "Hip coffee lab vibe"
    ],
    "description": "Scientific approach to coffee in converted warehouse"
  },
  {
    "name": "Fortitude Coffee",
    "category": "quick-bites",
    "address": "3C York Place, New Town, EH1 3EB",
    "lat": 55.9560,
    "lng": -3.1923,
    "priceRange": 1,
    "tags": ["specialty-coffee", "coffee-roastery", "independent", "brunch"],
    "hours": {
      "mon": "09:00-17:00",
      "tue": "09:00-17:00",
      "wed": "09:00-17:00",
      "thu": "09:00-17:00",
      "fri": "09:00-17:00",
      "sat": "09:00-17:00",
      "sun": "09:00-16:00"
    },
    "reviews": [
      "Best coffee near Portrait Gallery",
      "Exceptional single-origin coffees"
    ],
    "description": "New Town specialty coffee with exceptional single-origin selections"
  },
  {
    "name": "Williams & Johnson Coffee Co.",
    "category": "quick-bites",
    "address": "1 Customs Wharf, Custom Lane, Leith, EH6 6AL",
    "lat": 55.9761,
    "lng": -3.1697,
    "priceRange": 1,
    "tags": ["specialty-coffee", "coffee-roastery", "waterfront", "leith"],
    "hours": {
      "mon": "08:00-17:00",
      "tue": "08:00-17:00",
      "wed": "08:00-17:00",
      "thu": "08:00-17:00",
      "fri": "08:00-17:00",
      "sat": "09:00-17:00",
      "sun": "10:00-16:00"
    },
    "reviews": [
      "Fresh roasted on-site daily",
      "Waterfront Leith roastery"
    ],
    "description": "Waterfront coffee roasting beans on-site with harbor views"
  },
  {
    "name": "The Milkman",
    "category": "quick-bites",
    "address": "7 Cockburn Street, Old Town, EH1 1BP",
    "lat": 55.9507,
    "lng": -3.1909,
    "priceRange": 1,
    "tags": ["specialty-coffee", "cafe", "old-town", "independent", "pastries"],
    "hours": {
      "mon": "08:00-18:00",
      "tue": "08:00-18:00",
      "wed": "08:00-18:00",
      "thu": "08:00-18:00",
      "fri": "08:00-18:00",
      "sat": "09:00-18:00",
      "sun": "09:00-18:00"
    },
    "reviews": [
      "Instagram-famous sweet shop frontage",
      "Exceptional cakes and coffee"
    ],
    "description": "Charming Old Town cafe with Instagram-famous facade and pastries"
  },
  {
    "name": "Twelve Triangles",
    "category": "quick-bites",
    "address": "90 Brunswick Street",
    "lat": 55.9545,
    "lng": -3.1850,
    "priceRange": 2,
    "tags": ["bakery", "breakfast", "pastries", "coffee"],
    "hours": {
      "mon": "08:00-17:00",
      "tue": "08:00-17:00",
      "wed": "08:00-17:00",
      "thu": "08:00-17:00",
      "fri": "08:00-17:00",
      "sat": "09:00-17:00",
      "sun": "09:00-17:00"
    },
    "reviews": [
      "Flaky croissant heaven",
      "Morning queue moves fast"
    ],
    "description": "Artisan bakery with incredible pastries and coffee"
  },
  {
    "name": "The Piemaker",
    "category": "quick-bites",
    "address": "38 South Bridge",
    "lat": 55.9495,
    "lng": -3.1882,
    "priceRange": 1,
    "tags": ["comfort-food", "late-night", "takeaway"],
    "hours": {
      "mon": "11:00-03:00",
      "tue": "11:00-03:00",
      "wed": "11:00-03:00",
      "thu": "11:00-03:00",
      "fri": "11:00-04:00",
      "sat": "11:00-04:00",
      "sun": "11:00-03:00"
    },
    "reviews": [
      "Perfect post-pub pie",
      "Open late thank god"
    ],
    "description": "Scottish pies available until the wee hours"
  },
  {
    "name": "National Museum of Scotland",
    "category": "free",
    "address": "Chambers Street, EH1 1JF",
    "lat": 55.946945,
    "lng": -3.190000,
    "priceRange": 0,
    "tags": ["museum", "free-entry", "history", "science", "cultural"],
    "hours": {
      "mon": "10:00-17:00",
      "tue": "10:00-17:00",
      "wed": "10:00-17:00",
      "thu": "10:00-17:00",
      "fri": "10:00-17:00",
      "sat": "10:00-17:00",
      "sun": "10:00-17:00"
    },
    "reviews": [
      "Dolly the sheep is fascinating",
      "World-class collections, free entry"
    ],
    "description": "8,000+ objects spanning natural world to Scottish history"
  },
  {
    "name": "Scottish National Gallery",
    "category": "free",
    "address": "The Mound, EH2 2EL",
    "lat": 55.9509,
    "lng": -3.1957,
    "priceRange": 0,
    "tags": ["art-gallery", "free-entry", "european-art", "masterpieces", "cultural"],
    "hours": {
      "mon": "10:00-17:00",
      "tue": "10:00-17:00",
      "wed": "10:00-17:00",
      "thu": "10:00-17:00",
      "fri": "10:00-17:00",
      "sat": "10:00-17:00",
      "sun": "10:00-17:00"
    },
    "reviews": [
      "Vermeer, Rembrandt, Van Gogh for free!",
      "Rooftop terrace views are amazing"
    ],
    "description": "European masterpieces from Renaissance to Impressionists"
  },
  {
    "name": "Scottish National Portrait Gallery",
    "category": "free",
    "address": "1 Queen Street, EH2 1JD",
    "lat": 55.9565,
    "lng": -3.1940,
    "priceRange": 0,
    "tags": ["art-gallery", "free-entry", "portraits", "scottish-history", "cultural"],
    "hours": {
      "mon": "10:00-17:00",
      "tue": "10:00-17:00",
      "wed": "10:00-17:00",
      "thu": "10:00-17:00",
      "fri": "10:00-17:00",
      "sat": "10:00-17:00",
      "sun": "10:00-17:00"
    },
    "reviews": [
      "Zodiac ceiling is breathtaking",
      "World's first purpose-built portrait gallery"
    ],
    "description": "Scotland's story through faces in spectacular Neo-Gothic palace"
  },
  {
    "name": "Scottish National Gallery of Modern Art",
    "category": "free",
    "address": "75 Belford Road, EH4 3DR",
    "lat": 55.9509,
    "lng": -3.2287,
    "priceRange": 0,
    "tags": ["art-gallery", "free-entry", "modern-art", "sculpture", "contemporary"],
    "hours": {
      "mon": "10:00-17:00",
      "tue": "10:00-17:00",
      "wed": "10:00-17:00",
      "thu": "10:00-17:00",
      "fri": "10:00-17:00",
      "sat": "10:00-17:00",
      "sun": "10:00-17:00"
    },
    "reviews": [
      "Charles Jencks landscape is incredible",
      "Picasso, Warhol, Hockney with sculpture park"
    ],
    "description": "Modern art from Picasso to Warhol with striking landscape feature"
  },
  {
    "name": "Museum of Edinburgh",
    "category": "free",
    "address": "142-146 Canongate, Royal Mile, EH8 8DD",
    "lat": 55.9525,
    "lng": -3.1780,
    "priceRange": 0,
    "tags": ["museum", "free-entry", "history", "local-history", "cultural"],
    "hours": {
      "mon": "10:00-17:00",
      "tue": "10:00-17:00",
      "wed": "10:00-17:00",
      "thu": "10:00-17:00",
      "fri": "10:00-17:00",
      "sat": "10:00-17:00",
      "sun": "12:00-17:00"
    },
    "reviews": [
      "Edinburgh's treasure box of history",
      "Greyfriars Bobby's collar is here!"
    ],
    "description": "City history in 16th century building with Greyfriars Bobby artifacts"
  },
  {
    "name": "The Writers' Museum",
    "category": "free",
    "address": "Lady Stair's Close, Lawnmarket, EH1 2PA",
    "lat": 55.9497,
    "lng": -3.1943,
    "priceRange": 0,
    "tags": ["museum", "free-entry", "literature", "cultural", "history"],
    "hours": {
      "mon": "10:00-17:00",
      "tue": "10:00-17:00",
      "wed": "10:00-17:00",
      "thu": "10:00-17:00",
      "fri": "10:00-17:00",
      "sat": "10:00-17:00",
      "sun": "12:00-17:00"
    },
    "reviews": [
      "Literary legends come alive here",
      "Burns' writing desk is incredible"
    ],
    "description": "Burns, Scott & Stevenson celebrated with rare books and manuscripts"
  },
  {
    "name": "St Giles' Cathedral",
    "category": "free",
    "address": "High Street, Royal Mile, EH1 1RE",
    "lat": 55.9494,
    "lng": -3.1908,
    "priceRange": 0,
    "tags": ["cathedral", "free-entry", "history", "architecture", "cultural"],
    "hours": {
      "mon": "10:00-18:00",
      "tue": "10:00-18:00",
      "wed": "10:00-18:00",
      "thu": "10:00-18:00",
      "fri": "10:00-18:00",
      "sat": "09:00-17:00",
      "sun": "13:00-17:00"
    },
    "reviews": [
      "Crown spire is iconic Edinburgh",
      "Thistle Chapel is exquisite"
    ],
    "description": "12th century High Kirk with stunning Gothic architecture"
  },
  {
    "name": "Arthur's Seat",
    "category": "free",
    "address": "Holyrood Park, EH8 8HG",
    "lat": 55.944083,
    "lng": -3.161833,
    "priceRange": 0,
    "tags": ["viewpoint", "hiking", "volcano", "outdoor", "historic-site"],
    "hours": {
      "mon": "00:00-23:59",
      "tue": "00:00-23:59",
      "wed": "00:00-23:59",
      "thu": "00:00-23:59",
      "fri": "00:00-23:59",
      "sat": "00:00-23:59",
      "sun": "00:00-23:59"
    },
    "reviews": [
      "Breathtaking panoramic views of the city",
      "A must-do hike, easy to moderate climb"
    ],
    "description": "Ancient extinct volcano with 360° panoramic city views"
  },
  {
    "name": "Calton Hill",
    "category": "free",
    "address": "Regent Road, EH7 5AA",
    "lat": 55.955276,
    "lng": -3.182222,
    "priceRange": 0,
    "tags": ["viewpoint", "historic-site", "monument", "outdoor", "unesco"],
    "hours": {
      "mon": "00:00-23:59",
      "tue": "00:00-23:59",
      "wed": "00:00-23:59",
      "thu": "00:00-23:59",
      "fri": "00:00-23:59",
      "sat": "00:00-23:59",
      "sun": "00:00-23:59"
    },
    "reviews": [
      "Athens of the North with stunning views",
      "Perfect sunset spot with monuments"
    ],
    "description": "Iconic hilltop with Greek-style monuments and sweeping vistas"
  },
  {
    "name": "Princes Street Gardens",
    "category": "free",
    "address": "Princes Street, EH2 2HG",
    "lat": 55.951389,
    "lng": -3.193889,
    "priceRange": 0,
    "tags": ["park", "garden", "outdoor", "historic-site", "monument"],
    "hours": {
      "mon": "06:00-22:00",
      "tue": "06:00-22:00",
      "wed": "06:00-22:00",
      "thu": "06:00-22:00",
      "fri": "06:00-22:00",
      "sat": "06:00-22:00",
      "sun": "06:00-22:00"
    },
    "reviews": [
      "Beautiful gardens beneath the castle",
      "The flower clock is delightful"
    ],
    "description": "Gardens separating Old and New Town with castle views"
  },
  {
    "name": "Royal Botanic Garden Edinburgh",
    "category": "free",
    "address": "Arboretum Place, EH3 5NZ",
    "lat": 55.9650,
    "lng": -3.2089,
    "priceRange": 0,
    "tags": ["garden", "free-entry", "botanic", "nature", "outdoor"],
    "hours": {
      "mon": "10:00-18:00",
      "tue": "10:00-18:00",
      "wed": "10:00-18:00",
      "thu": "10:00-18:00",
      "fri": "10:00-18:00",
      "sat": "10:00-18:00",
      "sun": "10:00-18:00"
    },
    "reviews": [
      "World-renowned plant collections",
      "Peaceful oasis near city centre"
    ],
    "description": "70 acres with 10,000+ plant species across 350 years"
  },
  {
    "name": "Holyrood Park",
    "category": "free",
    "address": "Queen's Drive, EH8 8HG",
    "lat": 55.9525,
    "lng": -3.1714,
    "priceRange": 0,
    "tags": ["park", "outdoor", "hiking", "historic-site", "viewpoint"],
    "hours": {
      "mon": "00:00-23:59",
      "tue": "00:00-23:59",
      "wed": "00:00-23:59",
      "thu": "00:00-23:59",
      "fri": "00:00-23:59",
      "sat": "00:00-23:59",
      "sun": "00:00-23:59"
    },
    "reviews": [
      "Wild highland landscape in the city",
      "Multiple trails for all abilities"
    ],
    "description": "650 acres of royal park with volcanic hills"
  },
  {
    "name": "Dean Village",
    "category": "free",
    "address": "Dean Path, EH4 3BH",
    "lat": 55.952267,
    "lng": -3.218433,
    "priceRange": 0,
    "tags": ["historic-site", "outdoor", "scenic", "village", "architecture"],
    "hours": {
      "mon": "00:00-23:59",
      "tue": "00:00-23:59",
      "wed": "00:00-23:59",
      "thu": "00:00-23:59",
      "fri": "00:00-23:59",
      "sat": "00:00-23:59",
      "sun": "00:00-23:59"
    },
    "reviews": [
      "Hidden gem, picturesque and charming",
      "Like stepping back in time"
    ],
    "description": "800-year-old former milling village with cobbled streets"
  },
  {
    "name": "Grassmarket",
    "category": "free",
    "address": "Grassmarket, EH1 2HT",
    "lat": 55.9476,
    "lng": -3.195,
    "priceRange": 0,
    "tags": ["historic-site", "outdoor", "market", "viewpoint", "architecture"],
    "hours": {
      "mon": "00:00-23:59",
      "tue": "00:00-23:59",
      "wed": "00:00-23:59",
      "thu": "00:00-23:59",
      "fri": "00:00-23:59",
      "sat": "10:00-17:00",
      "sun": "00:00-23:59"
    },
    "reviews": [
      "Historic square with castle views",
      "Vibrant atmosphere day and night"
    ],
    "description": "500-year-old marketplace beneath Edinburgh Castle"
  },
  {
    "name": "Greyfriars Kirkyard",
    "category": "free",
    "address": "Candlemaker Row, EH1 2QQ",
    "lat": 55.9469,
    "lng": -3.1916,
    "priceRange": 0,
    "tags": ["historic-site", "outdoor", "cemetery", "monument", "harry-potter"],
    "hours": {
      "mon": "00:00-23:59",
      "tue": "00:00-23:59",
      "wed": "00:00-23:59",
      "thu": "00:00-23:59",
      "fri": "00:00-23:59",
      "sat": "00:00-23:59",
      "sun": "00:00-23:59"
    },
    "reviews": [
      "Famous Greyfriars Bobby and Harry Potter",
      "Atmospheric and peaceful historic graveyard"
    ],
    "description": "16th-century cemetery with famous monuments and Greyfriars Bobby"
  },
  {
    "name": "Cabaret Voltaire",
    "category": "huzz",
    "address": "36-38 Blair Street, EH1 1QR",
    "lat": 55.9498,
    "lng": -3.1868,
    "priceRange": 2,
    "tags": ["underground", "techno", "historic-venue", "electronic-music", "club"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "closed",
      "thu": "19:00-03:00",
      "fri": "19:00-03:00",
      "sat": "17:00-03:00",
      "sun": "closed"
    },
    "reviews": [
      "Legendary underground club",
      "Proper techno cave"
    ],
    "description": "Historic subterranean Edinburgh vaults hosting cutting-edge electronic music"
  },
  {
    "name": "The Bongo Club",
    "category": "huzz",
    "address": "66 Cowgate, EH1 1JX",
    "lat": 55.9490,
    "lng": -3.1880,
    "priceRange": 2,
    "tags": ["eclectic", "live-music", "student-friendly", "dancing", "alternative"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "22:00-03:00",
      "thu": "22:00-03:00",
      "fri": "22:00-03:00",
      "sat": "22:00-03:00",
      "sun": "closed"
    },
    "reviews": [
      "Diverse music policy",
      "Sweaty dance floor energy"
    ],
    "description": "Alternative club with live bands and eclectic DJ nights"
  },
  {
    "name": "Sneaky Pete's",
    "category": "huzz",
    "address": "73 Cowgate, EH1 1JW",
    "lat": 55.9495,
    "lng": -3.1900,
    "priceRange": 1,
    "tags": ["nightclub", "live-music", "indie-venue", "electronic-music", "alternative"],
    "hours": {
      "mon": "19:00-03:00",
      "tue": "19:00-03:00",
      "wed": "19:00-03:00",
      "thu": "19:00-03:00",
      "fri": "19:00-03:00",
      "sat": "19:00-03:00",
      "sun": "19:00-03:00"
    },
    "reviews": [
      "Electric atmosphere, cutting edge acts",
      "Best underground club in Edinburgh"
    ],
    "description": "Legendary 100-capacity underground club with cutting-edge acts"
  },
  {
    "name": "Golden Hare Books",
    "category": "free",
    "address": "68 St Stephen Street, EH3 5AQ",
    "lat": 55.9589,
    "lng": -3.2066,
    "priceRange": 2,
    "tags": ["bookshop", "independent", "literary-fiction", "childrens-books"],
    "hours": {
      "mon": "10:00-18:00",
      "tue": "10:00-18:00",
      "wed": "10:00-18:00",
      "thu": "10:00-18:00",
      "fri": "10:00-18:00",
      "sat": "10:00-18:00",
      "sun": "10:00-18:00"
    },
    "reviews": [
      "UK Independent Bookshop of Year 2019",
      "Beautiful facade, woodburning stove"
    ],
    "description": "Award-winning independent bookshop with curated fiction in Stockbridge"
  },
  {
    "name": "Stockbridge Market",
    "category": "free",
    "address": "Saunders Street, EH3 6TQ",
    "lat": 55.9613,
    "lng": -3.2089,
    "priceRange": 1,
    "tags": ["market", "farmers-market", "street-food", "artisan"],
    "hours": {
      "mon": "closed",
      "tue": "closed",
      "wed": "closed",
      "thu": "closed",
      "fri": "closed",
      "sat": "closed",
      "sun": "10:00-16:00"
    },
    "reviews": [
      "Foodie heaven with creative crafts",
      "Beautiful Water of Leith setting"
    ],
    "description": "Sunday market with artisan food and handmade crafts by Water of Leith"
  },
  {
    "name": "Divino Enoteca",
    "category": "drinks",
    "address": "5 Merchant Street, EH1 2QD",
    "lat": 55.9488,
    "lng": -3.1868,
    "priceRange": 2,
    "tags": ["natural-wine", "wine-cellar", "bottle-shop", "cheese-bar"],
    "hours": {
      "mon": "15:00-22:00",
      "tue": "15:00-22:00",
      "wed": "15:00-22:00",
      "thu": "12:00-23:00",
      "fri": "12:00-23:00",
      "sat": "12:00-00:00",
      "sun": "12:00-19:00"
    },
    "reviews": [
      "Exceptional wine and atmosphere",
      "Natural and biodynamic wine cellar"
    ],
    "description": "New Town wine cellar with curated natural and biodynamic wines"
  },
  {
    "name": "Spry",
    "category": "drinks",
    "address": "1 Haddington Place, EH7 4AE",
    "lat": 55.9592,
    "lng": -3.1839,
    "priceRange": 3,
    "tags": ["wine-bar", "natural-wine", "organic-wine", "bottle-shop", "fine-dining"],
    "hours": {
      "mon": "closed",
      "tue": "13:00-22:00",
      "wed": "13:00-22:00",
      "thu": "13:00-22:00",
      "fri": "13:00-22:00",
      "sat": "13:00-22:00",
      "sun": "13:00-22:00"
    },
    "reviews": [
      "Michelin-level experience",
      "Natural wine paradise"
    ],
    "description": "Michelin Guide and Star Wine List recognition for natural wines"
  },
  {
    "name": "Smith & Gertrude",
    "category": "drinks",
    "address": "26 Hamilton Place, Stockbridge, EH3 5AU",
    "lat": 55.9593,
    "lng": -3.2058,
    "priceRange": 2,
    "tags": ["wine-bar", "cheese-bar", "natural-wine", "bottle-shop", "stockbridge"],
    "hours": {
      "mon": "closed",
      "tue": "16:00-22:00",
      "wed": "16:00-22:00",
      "thu": "16:00-22:00",
      "fri": "16:00-23:00",
      "sat": "12:00-23:00",
      "sun": "12:00-22:00"
    },
    "reviews": [
      "Excellent wine selection",
      "Perfect Stockbridge wine and cheese spot"
    ],
    "description": "Stockbridge wine bar specializing in natural wines and artisan cheeses"
  }
].map((venue, index) => ({ ...venue, id: index })) as Venue[];

export { VENUES_DATA };
export default VENUES_DATA;