# Venue Data Import Format

Please provide the 100+ new venues in the following JSON format:

```json
[
  {
    "name": "Venue Name",
    "category": "drinks",
    "address": "Full address",
    "lat": 55.9489,
    "lng": -3.1948,
    "priceRange": 2,
    "tags": ["tag1", "tag2", "tag3"],
    "hours": {
      "mon": "12:00-23:00",
      "tue": "12:00-23:00",
      "wed": "12:00-23:00",
      "thu": "12:00-23:00",
      "fri": "12:00-01:00",
      "sat": "12:00-01:00",
      "sun": "12:00-22:00"
    },
    "reviews": [
      "First review quote",
      "Second review quote"
    ],
    "description": "One-line description of the venue"
  }
]
```

## Field Guidelines

### category (required)
One of: `"drinks"`, `"meals"`, `"quick-bites"`, `"huzz"`, `"free"`
- **drinks**: Bars, pubs, cafes, juice bars
- **meals**: Restaurants, fine dining
- **quick-bites**: Fast food, takeaway, bakeries
- **huzz**: Nightlife, clubs, live music venues
- **free**: Parks, museums, free attractions

### priceRange (required)
- `0` = Free
- `1` = £ (budget, under £10)
- `2` = ££ (moderate, £10-30)
- `3` = £££ (expensive, £30+)

### tags (required, 2-5 tags)
Examples: `"romantic"`, `"fireplace"`, `"cozy"`, `"cocktails"`, `"locals-only"`, `"whisky"`, `"casual"`, `"scenic"`, `"hiking"`, `"hidden"`, `"speakeasy"`, `"live-music"`, `"vegan-friendly"`, `"outdoor-seating"`

Use lowercase with hyphens for multi-word tags.

### hours (required)
Format: `"HH:MM-HH:MM"` in 24-hour time, or `"closed"` for closed days.

### lat/lng (required)
Decimal coordinates for Edinburgh. You can find these on Google Maps.

### reviews (2-3 recommended)
Short, punchy review quotes that capture the vibe. Keep them under 50 characters.

### description (required)
One compelling sentence (50-100 characters) that sells the venue.

## Save As

Save the file as: `new-venues.json`

Then provide it to me and I'll import them into the app automatically.
