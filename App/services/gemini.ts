
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionInput, PredictionResult } from "../types";

const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getPrediction = async (input: PredictionInput): Promise<PredictionResult> => {
  const prompt = `Act as a Machine Learning model trained on NYC Uber dataset. 
  Based on the following parameters, predict the fare_amount and determine if it's a "Good" or "Bad" fare (Good means reasonable/expected, Bad means outlier or high traffic surcharge).
  
  Parameters:
  - Location: (${input.pickupLatitude}, ${input.pickupLongitude}) to (${input.dropoffLatitude}, ${input.dropoffLongitude})
  - Distance: ${input.distance} miles
  - Weather: ${input.weather}
  - Traffic: ${input.trafficCondition}
  - Passenger Count: ${input.passengerCount}
  - Hour: ${input.hour}
  - Day of Week: ${input.weekday}
  
  Provide the result in JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          predictedFare: { type: Type.NUMBER },
          status: { type: Type.STRING, enum: ["Good", "Bad"] },
          analysis: { type: Type.STRING }
        },
        required: ["predictedFare", "status", "analysis"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const getDashboardSummary = async (dataSummary: string) => {
  const prompt = `Based on these Uber dataset metrics: ${dataSummary}, provide a brief 2-sentence analytical summary for a dashboard.`;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });
  return response.text;
};
