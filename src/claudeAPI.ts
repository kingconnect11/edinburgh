// Claude API Integration
import { Venue } from './data/venues';

const CLAUDE_MODEL = 'claude-sonnet-4-5';

// API endpoint - uses environment variable or defaults to relative path
// For local dev with proxy-server.js, set VITE_API_ENDPOINT=http://localhost:3002/api/claude in .env
// For Netlify: /.netlify/functions/claude
// For Vercel: /api/claude
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/.netlify/functions/claude';

/**
 * Generate an itinerary description using Claude AI
 */
export async function generateItineraryWithClaude(venues: Venue[]): Promise<string> {
  console.log('🔍 generateItineraryWithClaude called');
  console.log('📊 Number of venues:', venues.length);

  const venuesList = venues.map((v, idx) =>
    `${idx + 1}. ${v.name} - ${v.description} (${v.category}, ${v.tags.join(', ')})`
  ).join('\n');

  const prompt = `You are a witty British butler/concierge presenting your master's Edinburgh evening itinerary.

Selected venues:
${venuesList}

Describe this itinerary in 3-5 sentences with:
- Pompous British aristocratic formality with dry wit
- Subtle humor and playful exaggeration (inappropriate jokes welcome if contextually fitting)
- References to Edinburgh's charm (consider a Scottish/Gaelic phrase)
- Your professional opinion on the selections

Be concise but full of personality. Address your master appropriately.`;

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
 * Generate a concierge chat response using Claude AI with full conversation history
 */
export async function generateConciergeResponse(
  conversationHistory: Array<{role: string, content: string}>,
  venues: Venue[]
): Promise<string> {
  console.log('🔍 generateConciergeResponse called');
  console.log('📊 Number of venues:', venues.length);
  console.log('💬 Conversation history length:', conversationHistory.length);

  // Only send full venue list on FIRST message, compact summary after to save tokens
  const isFirstMessage = conversationHistory.length <= 2;
  console.log('🎯 First message?', isFirstMessage);

  const venuesList = isFirstMessage
    ? venues.map(v => `- ${v.name} (${v.category})`).join('\n')  // Simplified format without tags
    : `[You have access to all ${venues.length} venues from our previous exchange - ${venues.filter(v => v.category === 'drinks').length} drinks, ${venues.filter(v => v.category === 'meals').length} meals, ${venues.filter(v => v.category === 'quick-bites').length} quick-bites, ${venues.filter(v => v.category === 'hotels').length} hotels, ${venues.filter(v => v.category === 'huzz').length} huzz, ${venues.filter(v => v.category === 'free').length} free venues]`;

  console.log('📝 Venue list length:', venuesList.length, 'characters');

  const systemPrompt = `You are a witty British butler/concierge for Lord Lord in Edinburgh. Personality: impeccably polite with dry humor, subtle sarcasm, and aristocratic formality. Not afraid to be cheeky or inappropriate when contextually fitting. Sprinkle in Scottish/Gaelic phrases.

Approved establishments:
${venuesList}

GUIDELINES:
1. RECOMMENDATIONS: Suggest 2-3 matching venues FROM THE LIST ABOVE. Keep responses 2-5 sentences. Always include the EXACT venue names from the list.

2. FOLLOW-UPS: Interpret next logical steps (e.g., cocktail bar for date → romantic restaurant → hotel with cheeky comment). Make it natural, not forced.

3. OFF-LIST VENUES: If asked about unlisted places, say "I am not very familiar with this establishment, however I am told..." (share what you know) OR "That seems like an improper place for a man like yourself, how about..." (your recommendations).

4. CONFIRMATIONS: If user says "OK", "sounds good", "let's do it", etc., respond ONLY with:
   - Brief butler confirmation of the evening plan
   - Well wishes for the night
   - A funny/crude closing comment
   (Do NOT list venues or details - the itinerary will auto-populate)

Address them as "My Lord", "Sir", or "M'Lord".`;

  // Build messages array: system prompt + conversation history
  const messages = [
    { role: 'user', content: systemPrompt },
    { role: 'assistant', content: 'Understood, My Lord. I am ready to serve as your Edinburgh concierge.' },
    ...conversationHistory.slice(1) // Skip the initial welcome message from history
  ];

  console.log('📝 Total messages being sent:', messages.length);

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
        messages: messages
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
