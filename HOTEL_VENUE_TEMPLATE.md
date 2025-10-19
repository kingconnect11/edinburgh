# Hotel Venue Template

The app is now ready to accept hotel venues! Use this template when adding hotels to `src/data/venues.ts`.

## ✅ What's Been Updated

1. **New "Hotels" category added** to the circular menu (displays at 90° angle on the right)
2. **Hotel icon** imported from lucide-react
3. **Fallback descriptions** updated to handle hotel itineraries
4. **Claude AI prompts** will automatically understand hotel recommendations

## 🏨 Hotel Venue Template

Add hotels to the `VENUES_DATA` array in `src/data/venues.ts` using this format:

```json
{
  "name": "The Balmoral Hotel",
  "category": "hotels",
  "address": "1 Princes Street, Edinburgh, EH2 2EQ",
  "lat": 55.9533,
  "lng": -3.1895,
  "priceRange": 3,
  "tags": ["luxury", "five-star", "historic", "city-center", "romantic"],
  "hours": {
    "mon": "24/7",
    "tue": "24/7",
    "wed": "24/7",
    "thu": "24/7",
    "fri": "24/7",
    "sat": "24/7",
    "sun": "24/7"
  },
  "reviews": [
    "Iconic Edinburgh luxury with impeccable service",
    "The clock tower is a city landmark"
  ],
  "description": "Legendary five-star hotel beneath the iconic clock tower on Princes Street"
}
```

## 📋 Field Guidelines for Hotels

### `category`
- Always set to: `"hotels"`

### `priceRange`
- **0** = Budget/hostels (under £50/night)
- **1** = Mid-range (£50-£120/night)
- **2** = Upscale (£120-£250/night)
- **3** = Luxury (£250+/night)

### `tags` (Recommended tags for hotels)
Common tags to use:
- `"luxury"`, `"five-star"`, `"four-star"`, `"boutique"`
- `"historic"`, `"modern"`, `"traditional"`
- `"city-center"`, `"old-town"`, `"new-town"`, `"leith"`
- `"romantic"`, `"business"`, `"family-friendly"`
- `"spa"`, `"gym"`, `"restaurant"`, `"rooftop-bar"`
- `"pet-friendly"`, `"parking"`, `"airport-shuttle"`

### `hours`
For hotels, typically use:
```json
"hours": {
  "mon": "24/7",
  "tue": "24/7",
  "wed": "24/7",
  "thu": "24/7",
  "fri": "24/7",
  "sat": "24/7",
  "sun": "24/7"
}
```

Or if check-in has specific hours:
```json
"hours": {
  "mon": "Check-in: 15:00+",
  "tue": "Check-in: 15:00+",
  "wed": "Check-in: 15:00+",
  "thu": "Check-in: 15:00+",
  "fri": "Check-in: 15:00+",
  "sat": "Check-in: 15:00+",
  "sun": "Check-in: 15:00+"
}
```

### `reviews`
2-3 brief quotes about what makes the hotel special:
- Focus on atmosphere, service, location
- Mention unique features (views, history, amenities)
- Keep under 100 characters each

### `description`
One compelling sentence capturing the hotel's essence:
- Mention the style/vibe (luxury, boutique, historic, etc.)
- Include a unique selling point
- Reference location if notable

## 🗺️ Getting Coordinates

To get accurate lat/lng coordinates for hotels:

**Option 1: Google Maps**
1. Search for the hotel on Google Maps
2. Right-click on the location marker
3. Click the coordinates at the top to copy them
4. Format: First number = `lat`, Second number = `lng`

**Option 2: Address Search**
Use the existing venue coordinates as reference - Edinburgh city center is approximately:
- Lat: 55.9533
- Lng: -3.1895

## 🎯 Example Hotels to Add

Here are some iconic Edinburgh hotels you might want to include:

### Luxury (priceRange: 3)
- The Balmoral Hotel
- The Caledonian (Waldorf Astoria)
- Gleneagles Townhouse
- The Principal Edinburgh Charlotte Square

### Upscale (priceRange: 2)
- Hotel du Vin Edinburgh
- The Scotsman Hotel
- Kimpton Charlotte Square
- Radisson Collection Royal Mile

### Mid-Range (priceRange: 1)
- Grassmarket Hotel
- Stay Central Hotel
- Motel One Edinburgh-Royal
- ibis Styles Edinburgh Centre

### Boutique
- The Witchery by the Castle (luxury suites)
- The Balmoral Residence
- Fingal (floating hotel in Leith)

## 💡 Tips for Hotels Category

1. **Mix price ranges** - Include options from budget to luxury
2. **Diverse locations** - Cover Old Town, New Town, Leith, etc.
3. **Different vibes** - Historic, modern, boutique, chain hotels
4. **Special features** - Mention spas, rooftop bars, restaurants, views
5. **Use romantic/date-worthy tags** - Hotels often complete a date night itinerary!

## 🤖 How the Butler Will Handle Hotels

The Claude AI butler is already trained to:
- Suggest hotels as the "final destination" after dinner/drinks
- Make cheeky British jokes about "where to rest your head"
- Recommend hotels based on vibe (romantic, business, luxury, etc.)
- Include hotels in multi-stop itineraries

Example butler response:
> "Ah, an evening of cocktails at Bramble followed by dinner at The Witchery? How delightfully decadent, Sir. Might I suggest concluding your evening at The Balmoral Hotel, where you can rest your head beneath that rather magnificent clock tower. Should the evening prove... exceptionally successful, their suites offer commanding views of the castle. *ahem*"

---

## 🚀 Ready to Add Hotels!

Just edit `src/data/venues.ts` and add your hotel venues to the `VENUES_DATA` array. The app will automatically:
- Display them in the new "Hotels" category
- Show the hotel icon (🏨)
- Include them in butler recommendations
- Add them to itineraries with Google Maps integration

Happy hotel hunting! 🏨
