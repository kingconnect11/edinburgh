// Claude API Integration
import { Venue } from './data/venues';

const CLAUDE_MODEL = 'claude-sonnet-4-5';

// API endpoint - uses environment variable or defaults to relative path for Vercel
// For local dev with proxy-server.js, set VITE_API_ENDPOINT=http://localhost:3002/api/claude in .env
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/api/claude';

/**
 * Generate an itinerary description using Claude AI
 */
export async function generateItineraryWithClaude(venues: Venue[]): Promise<string> {
  console.log('🔍 generateItineraryWithClaude called');
  console.log('📊 Number of venues:', venues.length);

  const venuesList = venues.map((v, idx) =>
    `${idx + 1}. ${v.name} - ${v.description} (${v.address})`
  ).join('\n');

  const prompt = `You are a delightfully humorous British butler/concierge with impeccable manners and a dry wit.

Your master is planning an evening out in Edinburgh and you must describe their itinerary in 3-5 sentences with:
- A touch of pompous British aristocratic formality
- Subtle humor and playful exaggeration (a dirty or inappropriate joke is always welcome when it works contextually)
- References to Edinburgh's charm and character (a gaelic/scottish phrase may be good here)
- Your own professional opinion on the selections
- Follow up questions making sure to interpret what would be appropriate next after the location selected (example: if master asks for a cocktail bar for a date, you might suggest a nearby restaurant which matches the vibe, and then once restaurant is selected you can suggest a nearby five star hotel to take the date if it goes well, throw in a funny comment after) 
- A final message when the user confirms with OK, sounds like a plan or "sounds good" or similar, and in this message give each of the agreed upon recommendations with a direct Google Maps link, one sentence about each, and their hours. 
-If master asks about an establishment not on the list, respond with I am not very familiar with this establishment, however I am told it..." Followed by whatever knowledge you can glean about that spot. If you know nothing of the mentioned establishment, just say "That seems like an improper place for a man like yourself, how about (insert your recommendations here)?"

The approved establishments are:
${venuesList}

Write the description as if you're presenting this itinerary to your master. Keep it concise (5 sentences maximum) but full of personality.`;

  console.log('📝 Itinerary prompt length:', prompt.length);

  try {
    console.log('🌐 Making fetch request to API for itinerary...');
    console.log('🔗 API Endpoint:', API_ENDPOINT);
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    console.log('📡 Itinerary response status:', response.status);
    console.log('📡 Itinerary response OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Itinerary API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Itinerary API Response received');
    console.log('💬 Itinerary response text:', data.content[0].text);
    return data.content[0].text;
  } catch (error) {
    console.error('❌ Error generating description with Claude:', error);
    return getFallbackDescription(venues);
  }
}

/**
 * Generate a concierge chat response using Claude AI
 */
export async function generateConciergeResponse(userMessage: string, venues: Venue[]): Promise<string> {
  console.log('🔍 generateConciergeResponse called');
  console.log('📊 Number of venues:', venues.length);

  const venuesList = venues.map(v =>
    `- ${v.name}: ${v.description} (${v.category}, ${v.tags.join(', ')})`
  ).join('\n');

  const prompt = `You are a delightfully humorous British butler/concierge serving Lord Lord in Edinburgh.

Your personality:
- Impeccably polite with subtle sarcasm
- Dry British wit and playful formality
- Professional but not afraid to gently tease your master
- Deep knowledge of Edinburgh's establishments

Available venues:
${venuesList}

User's request: "${userMessage}"

Respond as the butler would - helpful, witty, and charming. Recommend 2-3 venues that match their request. Keep it conversational (2-4 sentences). Address them as "My Lord" or "Sir".`;

  console.log('📝 Prompt length:', prompt.length);

  try {
    console.log('🌐 Making fetch request to API...');
    console.log('🔗 API Endpoint:', API_ENDPOINT);
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API Response received:', data);
    console.log('💬 Response text:', data.content[0].text);
    return data.content[0].text;
  } catch (error) {
    console.error('❌ Error generating concierge response with Claude:', error);
    return '';
  }
}

/**
 * Fallback description generator if API fails
 */
function getFallbackDescription(venues: Venue[]): string {
  const categories = [...new Set(venues.map(v => v.category))];

  let description = "Experience the best of Edinburgh with ";

  if (categories.includes('drinks') && categories.includes('meals')) {
    description += "a curated journey through fine dining and craft cocktails";
  } else if (categories.includes('huzz')) {
    description += "an unforgettable night of entertainment and nightlife";
  } else if (categories.includes('hotels')) {
    description += "a selection of Edinburgh's finest accommodations";
  } else if (categories.includes('drinks')) {
    description += "a tour of Edinburgh's finest bars and beverage experiences";
  } else if (categories.includes('meals')) {
    description += "a culinary adventure through the city's top restaurants";
  } else {
    description += "your personalized Edinburgh experience";
  }

  description += `. This ${venues.length}-stop itinerary showcases `;

  if (venues.some(v => v.tags.includes('romantic') || v.tags.includes('date-worthy'))) {
    description += "romantic atmospheres and intimate settings";
  } else if (venues.some(v => v.tags.includes('locals-only') || v.tags.includes('hidden'))) {
    description += "hidden gems known only to locals";
  } else {
    description += "the authentic heart of Dùn Èideann";
  }

  description += ".";

  return description;
}
