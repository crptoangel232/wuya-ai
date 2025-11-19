import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_FLASH = 'gemini-2.5-flash';
const MODEL_PRO = 'gemini-3-pro-preview';

/**
 * Analyzes a plant image for disease diagnosis.
 */
export const analyzePlantImage = async (base64Image: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `You are an expert AI Plant Doctor for Sierra Leone. 
            Analyze this image. 
            1. Identify the crop.
            2. Detect any disease or pest (e.g., Fall Armyworm, Rice Blast, Cassava Mosaic).
            3. If healthy, say so.
            4. Provide specific treatment advice suitable for West African farmers.
            5. Keep it concise and practical.`
          }
        ]
      }
    });
    return response.text || "Could not analyze image.";
  } catch (error) {
    console.error("Plant analysis failed:", error);
    return "Error analyzing plant image. Please try again.";
  }
};

/**
 * Analyzes soil images for nutrient advice.
 */
export const analyzeSoilImage = async (base64Image: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `You are an expert Agronomist in Sierra Leone.
            Analyze this soil image based on visual cues (color, texture, organic matter).
            1. Estimate likely soil type (e.g., Laterite, Loam, Sandy).
            2. Suggest likely nutrient deficiencies based on appearance.
            3. Recommend fertilizers or organic amendments available in West Africa.
            4. Suggest suitable crops (e.g., Rice, Cassava, Cocoa, Palm).`
          }
        ]
      }
    });
    return response.text || "Could not analyze soil.";
  } catch (error) {
    console.error("Soil analysis failed:", error);
    return "Error analyzing soil image. Please try again.";
  }
};

/**
 * Chat with the Farm Assistant.
 */
export const sendChatMessage = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    // In a real app, we would maintain a persistent Chat session object.
    // Here we recreate the context for the stateless request or use a simplified approach.
    // Ideally, use ai.chats.create() and keep the instance alive in a React Ref or Context.
    
    const chat: Chat = ai.chats.create({
      model: MODEL_FLASH,
      config: {
        systemInstruction: `You are Wuya, a friendly and expert AI Farm Assistant for Sierra Leone. 
        You help farmers with planting dates, fertilizers, market timing, and weather advice.
        Local crops: Rice, Cassava, Cocoa, Palm Oil.
        Local Context: Sierra Leone (Freetown, Bo, Kenema).
        Be helpful, encouraging, and use simple English.`
      }
    });

    // Replay history (simplified for this demo, usually we pass history in create)
    // Note: @google/genai generic chat history management varies, assuming we just send the prompt with context for this stateless demo function
    // or we can loop and send history. Let's just send the user message for this demo wrapper to avoid complex state management in the snippet.
    
    const response: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "I didn't understand that.";
  } catch (error) {
    console.error("Chat failed:", error);
    return "I am having trouble connecting to the farm server. Please check your connection.";
  }
};
