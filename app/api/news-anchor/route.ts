import { NextResponse } from "next/server";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

// Simulated verified sources for Igbominaland & Osun State
const VERIFIED_SOURCES = [
  "Osun State Government Official Portal",
  "Ila-Orangun Community News",
  "OIBN Internal Reports",
  "Vanguard Osun Desk",
  "Punch News Nigeria"
];

export async function GET() {
  try {
    const prompt = `
      You are the Orisun Igbomina AI News Anchor. 
      Generate a concise "60-Second Daily Briefing" for today.
      Focus on:
      1. Infrastructure or agricultural updates in Ila-Orangun and surrounding Igbomina towns.
      2. Cultural festivals or royal news from the Orangun of Ila.
      3. A brief weather/market day update for the region.
      
      Structure:
      - Headline: Catchy and local.
      - Body: 3-4 bullet points of summarized news.
      - Sign-off: Use an Igbomina dialect greeting.

      Style: Authoritative, celebratory, and warm. 
      Format: JSON with fields: headline, summary_points[], sign_off.
    `;

    const { text } = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      maxTokens: 1000,
      prompt: prompt,
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const newsData = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      headline: "OIBN Daily Intelligence",
      summary_points: [
        "New agricultural initiatives launched in Ila-Orangun central.",
        "Cultural preparations begin for the annual heritage festival.",
        "OIBN extends broadcast reach to neighboring communities."
      ],
      sign_off: "E nle o, Igbomina a gbe wa!"
    };

    return NextResponse.json(newsData);
  } catch (error) {
    console.error("News Anchor API Error:", error);
    return NextResponse.json({ error: "Failed to fetch briefing" }, { status: 500 });
  }
}
