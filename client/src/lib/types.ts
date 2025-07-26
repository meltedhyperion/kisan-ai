import { z } from 'zod';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  age: number;
  preferredLanguage: 'English' | 'हिन्दी' | 'मराठी';
  location: {
    village: string;
    district: string;
    state: string;
    pincode: string;
  };
}

export interface Farm {
  id: string;
  ownerId: string;
  farmName: string;
  farmName_hi: string;
  address: string;
  crop: string;
  crop_hi: string;
  area: number;
}

export interface Alert {
  id: string;
  userId: string;
  title: string;
  title_hi: string;
  message: string;
  message_hi: string;
  severity: 'critical' | 'warning' | 'info';
  status: 'read' | 'unread';
  createdAt: Date;
}

export interface SensorReading {
  timestamp: Date;
  soilMoisture: number;
  temperature: number;
  lightIntensity: number;
  rainfall: number;
}

export interface BandhuDevice {
    id: string;
    farmId: string;
    status: 'online' | 'offline' | 'error';
}

export interface ExploreCard {
  id: string;
  headline: string;
  headline_hi: string;
  summary: string;
  summary_hi: string;
  source: string;
  redirectUrl: string;
}

// Conversational Agent Types
export const ChatWithAgentInputSchema = z.object({
  message: z.string().describe('The user\'s message to the agent.'),
  language: z.string().describe('The language for the agent to respond in (e.g., "English", "हिन्दी").'),
  history: z.array(z.any()).optional().describe('The conversation history.'),
});
export type ChatWithAgentInput = z.infer<typeof ChatWithAgentInputSchema>;

export const ChatWithAgentOutputSchema = z.object({
  response: z.string().describe('The agent\'s response.'),
});
export type ChatWithAgentOutput = z.infer<typeof ChatWithAgentOutputSchema>;
