
'use server';
/**
 * @fileOverview A conversational AI agent for the Kisan Saathi app.
 *
 * - chatWithAgent - A function that handles the conversational agent.
 */

import {ai} from '@/ai/genkit';
import { getFarms, getAlerts, getSensorReadings, getUserProfile, mockUser } from '@/lib/data';
import { ChatWithAgentInputSchema, type ChatWithAgentInput, ChatWithAgentOutputSchema, type ChatWithAgentOutput } from '@/lib/types';
import { z } from 'genkit';

// Define tools for the AI to use
const getFarmsTool = ai.defineTool(
    {
      name: 'getFarms',
      description: 'Get a list of all farms for the current user.',
      inputSchema: z.object({}),
      outputSchema: z.any(),
    },
    async () => await getFarms(mockUser.uid)
  );
  
  const getAlertsTool = ai.defineTool(
    {
      name: 'getAlerts',
      description: 'Get a list of all alerts for the current user.',
      inputSchema: z.object({}),
      outputSchema: z.any(),
    },
    async () => await getAlerts(mockUser.uid)
  );

  const getSensorReadingsTool = ai.defineTool(
    {
        name: 'getSensorReadings',
        description: 'Get recent sensor readings for a specific farm.',
        inputSchema: z.object({ farmId: z.string().describe('The ID of the farm.') }),
        outputSchema: z.any(),
    },
    async ({ farmId }) => await getSensorReadings(farmId)
  );

  const getUserProfileTool = ai.defineTool(
    {
        name: 'getUserProfile',
        description: 'Get the profile information for the current user.',
        inputSchema: z.object({}),
        outputSchema: z.any(),
    },
    async () => await getUserProfile(mockUser.uid)
  );


export async function chatWithAgent(input: ChatWithAgentInput): Promise<ChatWithAgentOutput> {
  return conversationalAgentFlow(input);
}

const conversationalAgentFlow = ai.defineFlow(
  {
    name: 'conversationalAgentFlow',
    inputSchema: ChatWithAgentInputSchema,
    outputSchema: ChatWithAgentOutputSchema,
  },
  async ({ message, language, history }) => {
    const prompt = `You are Kisan Saathi, a friendly and helpful AI assistant for farmers.
Your goal is to answer the user's questions about their farms, alerts, sensor data, and profile.
Use the available tools to find the information you need.
Keep your answers concise and easy to understand.
The user is currently communicating in ${language}. Please provide your response in ${language}.

Here is the user's profile, which you can use for context if needed:
{{run:getUserProfile}}

Here are the user's farms:
{{run:getFarms}}
`;

    const llmResponse = await ai.generate({
      prompt,
      history: history || [],
      tools: [getFarmsTool, getAlertsTool, getSensorReadingsTool, getUserProfileTool],
      input: message,
    });

    return { response: llmResponse.text };
  }
);
