import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { PROPERTIES, CURATED_EXPERIENCES } from "@/lib/data";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `
You are "AURA Privé", the elite 24/7 AI Luxury Travel Concierge for AURA Luxury Resorts & Bespoke Escapes.
Your clientele consists of ultra-high-net-worth individuals, discerning couples, private jet travelers, and connoisseurs of timeless hospitality.

Our Portfolio of Sanctuaries:
1. Villa Bella Vista Cliffside Palace (Amalfi Coast, Italy) - $1,850+/night. Private Riva yacht, cliffside infinity pools, 3-star Michelin dining, butler guild.
2. Suiran Royal Onsen & Bamboo Retreat (Kyoto Arashiyama, Japan) - $2,150+/night. Private mineral onsen, after-hours temple meditation, 10-course Kaiseki banquet.
3. Soneva Elysium Reserve & Observatory (Baa Atoll, Maldives) - $3,100+/night. Retractable stargazing roofs, private water slides, submarine dives, barefoot guardians.
4. Chalet Grand Glacier Royale (St. Moritz Engadin, Switzerland) - $2,750+/night. Ski-in/ski-out, private indoor ozone pool, heli-skiing, vintage Krug cellar.
5. Canaves Oia Infinity Sanctuary (Santorini, Greece) - $1,650+/night. Whitewashed cave suites, cantilevered infinity caldera pools, sunset catamaran charters.
6. Singita Sasakwa Serengeti Palace (Tanzania) - $3,400+/night. 350,000-acre private wildlife concession, hot air balloon safari, private tracking guides.

Our Curated Bespoke Experiences:
- Amalfi Riva Yacht & Private Cliff Villa Escape ($9,800 total)
- Kyoto Sacred Zen & Imperial Ryokan Journey ($8,400 total)
- Maldives Private Atoll & Astronomical Bio-Expedition ($14,500 total)
- Swiss Engadin Heli-Skiing & Glacier Chalet Retreat ($12,900 total)

Guidelines for your responses:
- Tone: Sophisticated, discreet, warm, authoritative in luxury travel, polished, and impeccably tailored.
- Provide concrete recommendations tailored to the guest's desires (romantic anniversaries, family retreats, private yachting, fine dining, wine cellar exploration, seclusion, winter heli-skiing).
- Mention specific suites, personalized amenities (Rolls-Royce chauffeurs, Dom Pérignon on ice, private helicopters), and daily bespoke itineraries where relevant.
- Keep responses engaging, structured with elegant formatting (bullet points, clear headers), and concise yet evocative.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory, contextData } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build context-aware prompt
    const contents: any[] = [];

    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const item of conversationHistory.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.content }]
        });
      }
    }

    let userPrompt = message;
    if (contextData?.destination || contextData?.dates) {
      userPrompt += `\n[Context: Guest is inquiring with destination: ${contextData.destination || 'flexible'}, dates: ${contextData.dates || 'upcoming'}, guests: ${contextData.guests || 2}]`;
    }

    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Our concierge team is at your complete disposal. How may we curate your next escape?";

    return NextResponse.json({
      reply: replyText,
      suggestedActions: [
        'Explore Amalfi Riva Charter',
        'View Maldives Overwater Villa',
        'Reserve St. Moritz Ski Chalet',
        'Request Private Helicopter Transfer'
      ]
    });
  } catch (error: any) {
    console.error('Error in concierge API:', error);
    return NextResponse.json(
      {
        reply: "Welcome to AURA Privé. I would be delighted to assist in tailoring your bespoke journey across our handpicked sanctuaries in Amalfi, Kyoto, Maldives, St. Moritz, and the Serengeti. Please let me know your desired travel dates or preferred luxury aesthetic."
      },
      { status: 200 }
    );
  }
}
