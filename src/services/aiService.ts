import { GoogleGenAI, Type } from "@google/genai";
import { CareerSuggestion, Roadmap } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getCareerSuggestions = async (skills: string, interests: string, education: string): Promise<CareerSuggestion[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Suggest 3-5 career paths for someone with the following profile:
    Skills: ${skills}
    Interests: ${interests}
    Education: ${education}
    
    Provide a match percentage, why it suits them, required skills, and which of those required skills they are likely missing based on their current skills.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            matchPercentage: { type: Type.NUMBER },
            whyItSuits: { type: Type.STRING },
            requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING },
          },
          required: ["title", "matchPercentage", "whyItSuits", "requiredSkills", "missingSkills", "description"],
        },
      },
    },
  });

  return JSON.parse(response.text || "[]");
};

export const getRoadmap = async (career: string, currentSkills: string): Promise<Roadmap> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a step-by-step career roadmap for becoming a ${career}. 
    The user currently has these skills: ${currentSkills}.
    Provide two plans: Plan A (Direct Path) and Plan B (Alternative/Gradual Path).
    Each plan should have 4-5 steps with title, description, action, and timeline.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          planA: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                action: { type: Type.STRING },
                timeline: { type: Type.STRING },
              },
              required: ["title", "description", "action", "timeline"],
            },
          },
          planB: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                action: { type: Type.STRING },
                timeline: { type: Type.STRING },
              },
              required: ["title", "description", "action", "timeline"],
            },
          },
        },
        required: ["planA", "planB"],
      },
    },
  });

  return JSON.parse(response.text || '{"planA": [], "planB": []}');
};

export const chatWithMentor = async (message: string, history: { role: "user" | "model", parts: { text: string }[] }[]) => {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are a wise and encouraging career mentor named Pathfinder. Your goal is to help users find their path, provide actionable advice, and explain complex career concepts simply. Be supportive but realistic.",
    },
  });

  // Note: sendMessage doesn't take history directly in the simple way, 
  // but we can use the chat object if we want to maintain state.
  // For simplicity in this app, we'll just send the message.
  const response = await chat.sendMessage({ message });
  return response.text;
};
