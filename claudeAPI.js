// Claude API Integration
import { CLAUDE_API_KEY } from './secrets/config.js';

/**
 * Generate an itinerary description using Claude AI
 * @param {Array} venues - Array of venue objects
 * @returns {Promise<string>} - Generated description
 */
export async function generateItineraryWithClaude(venues) {
  if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('Claude API key not configured');
    return getFallbackDescription(venues);
  }

  const venuesList = venues.map((v, idx) =>
    `${idx + 1}. ${v.name} - ${v.description} (${v.address})`
  ).join('\n');

  const prompt = `You are a delightfully humorous British butler/concierge with impeccable manners and a dry wit.

Your master has planned an evening out in Edinburgh and you must describe their itinerary in 2-3 sentences with:
- A touch of pompous British formality
- Subtle humor and playful exaggeration
- References to Edinburgh's charm and character
- Your own professional opinion on the selections (with characteristic butler restraint)

The evening's establishments are:
${venuesList}

Write the description as if you're presenting this itinerary to your master. Keep it concise (2-3 sentences maximum) but full of personality.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error generating description with Claude:', error);
    return getFallbackDescription(venues);
  }
}

/**
 * Fallback description generator if API fails
 */
function getFallbackDescription(venues) {
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
