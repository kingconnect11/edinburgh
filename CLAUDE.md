# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Edinburgh Concierge is a single-page React application that serves as a curated guide to Edinburgh's venues. The app presents venue recommendations through three distinct visual metaphors: a circular menu (slate), an open book (guide), and a scroll (concierge chat).

## Architecture

### Single-File React Application

The entire application is contained in `edinburgh_concierge-2.tsx`. This is intentional - the app is designed as a self-contained component with no external dependencies beyond React and lucide-react icons.

**Key architectural decisions:**
- No build system required - this is a standalone TSX file meant to be integrated into a larger React project
- All data is hardcoded in the `VENUES_DATA` constant (lines 4-239)
- Three view states managed by `currentView` state: 'menu', 'guide', 'concierge'
- Pure React with inline SVG and data URI backgrounds for visual effects

### Data Structure

The `VENUES_DATA` array contains venue objects with this schema:
```typescript
{
  id: number,
  name: string,
  category: 'drinks' | 'meals' | 'quick-bites' | 'huzz' | 'free',
  address: string,
  lat: number,
  lng: number,
  priceRange: 0 | 1 | 2 | 3,
  tags: string[],
  hours: { mon: string, tue: string, ... },
  reviews: string[],
  description: string
}
```

Categories are defined in `CATEGORIES` constant (lines 241-247) with associated icons and arc positioning angles.

### View States

1. **Menu View (lines 320-380)**: Circular arrangement of category buttons around a central concierge button. Uses polar coordinates for button positioning based on angle values.

2. **Guide View (lines 384-503)**: Grid display of filtered venues with modal detail view. Clicking a venue opens a modal with full information and Google Maps integration.

3. **Concierge View (lines 507-573)**: Chat interface with basic keyword-based recommendation logic (lines 272-305). Not connected to any AI service - uses simple string matching.

## Development Notes

### Adding New Venues

Add entries to the `VENUES_DATA` array following the existing schema. Ensure coordinates are accurate as they're used for Google Maps integration.

### Modifying Categories

Update the `CATEGORIES` array. The `angle` property controls button placement in the circular menu (measured in degrees from vertical).

### Styling Approach

- Uses Tailwind-like utility classes (assumes Tailwind CSS is available in parent project)
- Visual theming: amber/brown color palette for old Edinburgh aesthetic
- Backgrounds use inline data URIs with SVG gradients for parchment/slate effects
- Font: Georgia serif for headings to reinforce classical aesthetic

### Concierge Logic

The concierge uses simple keyword matching (lines 281-296). To improve recommendations:
- Enhance keyword detection in `handleSendMessage` function
- Consider tag-based filtering beyond just category
- Current implementation is intentionally basic - suitable for demo purposes

### Google Maps Integration

Clicking "Get Directions" on venue details (line 493) opens Google Maps using lat/lng coordinates. Ensure venue coordinates are accurate when adding new entries.

## Key Functions

- `handleCategorySelect(categoryId)`: Filters venues and switches to guide view
- `handleConcierge()`: Initializes concierge chat view
- `handleSendMessage()`: Processes user input and generates recommendations
- `toggleFavorite(venueId)`: Manages favorite venues list (stored in component state only)

## Important Conventions

- Price ranges: 0 = free, 1 = £, 2 = ££, 3 = £££
- Hours format: "HH:MM-HH:MM" or "closed" for each day
- Tags: lowercase, hyphenated (e.g., "date-worthy", "locals-only")
- The title "Lord Lord" and subtitle "Dùn Èideann" (Gaelic for Edinburgh) are branding elements
