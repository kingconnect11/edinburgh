import { Venue } from '../data/venues';

/**
 * Import venues from a JSON file
 * Usage: Place your new-venues.json file in the project root
 * Then update VENUES_DATA in src/data/venues.ts
 */
export function processVenueImport(jsonData: any[]): Venue[] {
  const maxId = Math.max(...jsonData.map((v: any) => v.id || 0));

  return jsonData.map((venue, index) => ({
    id: venue.id || maxId + index + 1,
    name: venue.name,
    category: venue.category,
    address: venue.address,
    lat: venue.lat,
    lng: venue.lng,
    priceRange: venue.priceRange,
    tags: venue.tags,
    hours: venue.hours,
    reviews: venue.reviews,
    description: venue.description,
  }));
}

// Helper function to generate TypeScript code from JSON
export function generateVenueCode(venues: Venue[]): string {
  return `export const VENUES_DATA: Venue[] = ${JSON.stringify(venues, null, 2)};`;
}
