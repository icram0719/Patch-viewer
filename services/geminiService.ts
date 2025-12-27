import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FetchResult, PatchNotes, GroundingSource } from "../types";

// Lazy initialization of Gemini Client to prevent crash on load if key is missing
let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please configure process.env.API_KEY.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

// Simple in-memory cache
const cache = new Map<string, { timestamp: number, result: FetchResult }>();
const CACHE_DURATION_MS = 1000 * 60 * 30; // 30 minutes cache

const patchSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    gameName: { type: Type.STRING },
    headlineVersion: { type: Type.STRING, description: "The major version number, e.g. '14.5'" },
    headlineDate: { type: Type.STRING, description: "Date of the major update" },
    overallSummary: { type: Type.STRING, description: "Brief overview of the current state of the game" },
    updates: {
      type: Type.ARRAY,
      description: "List of the major update and any subsequent hotfixes or mid-patch updates",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "e.g., 'Patch 14.5' or 'Mid-Patch Update'" },
          date: { type: Type.STRING },
          isHotfix: { type: Type.BOOLEAN },
          summary: { type: Type.STRING },
          changes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { 
                  type: Type.STRING, 
                  enum: ['New Content', 'Buff', 'Nerf', 'Adjustment', 'Bug Fix'] 
                },
                importance: {
                  type: Type.STRING,
                  enum: ['High', 'Medium', 'Low']
                }
              },
              required: ['title', 'description', 'type', 'importance']
            }
          }
        },
        required: ['title', 'date', 'isHotfix', 'summary', 'changes']
      }
    }
  },
  required: ['gameName', 'headlineVersion', 'headlineDate', 'overallSummary', 'updates']
};

export const fetchLatestPatchNotes = async (gameName: string): Promise<FetchResult> => {
  // Check Cache
  const now = Date.now();
  if (cache.has(gameName)) {
    const cachedEntry = cache.get(gameName)!;
    if (now - cachedEntry.timestamp < CACHE_DURATION_MS) {
      console.log(`[Cache Hit] Returning cached data for ${gameName}`);
      return cachedEntry.result;
    } else {
      cache.delete(gameName);
    }
  }

  try {
    // Initialize client here safely
    const ai = getAiClient();
    const modelId = "gemini-3-flash-preview";
    
    // Updated prompt for exhaustive detail, verification, and separation of hotfixes
    const prompt = `
      Find the absolute latest patch notes for ${gameName}. 
      
      CRITICAL VERIFICATION INSTRUCTION:
      - Search specifically for the OFFICIAL game website (e.g., leagueoflegends.com, ea.com/games/apex-legends, warframe.com) to verify the latest version.
      - Do not rely on third-party news sites unless the official site is unavailable.
      - Ensure you are not Hallucinating old patch notes as new ones. Check the Year (2024/2025).

      Task:
      1. Identify the most recent MAJOR update.
      2. ALSO identify any smaller HOTFIXES or "B" patches released *after* that major update.
      3. Structure the response to separate the Main Update from any Hotfixes.
      4. Extract specific changes with exact numbers (Base damage 50 -> 60).
      5. Do not summarize vaguely. Be precise.
      6. If there are no hotfixes, just provide the main update in the updates list.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: patchSchema,
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No content generated");
    }

    const patchData: PatchNotes = JSON.parse(resultText);

    // Extract grounding metadata
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    // Deduplicate sources
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i);

    const result: FetchResult = {
      data: patchData,
      sources: uniqueSources,
    };

    // Store in cache
    cache.set(gameName, { timestamp: now, result });

    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      data: null,
      sources: [],
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
