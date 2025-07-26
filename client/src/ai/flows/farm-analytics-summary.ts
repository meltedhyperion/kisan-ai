'use server';

/**
 * @fileOverview Summarizes the latest analytics for a specific farm using AI.
 *
 * - summarizeFarmAnalytics - A function that takes farmId as input and returns a summary of the latest analytics.
 * - SummarizeFarmAnalyticsInput - The input type for the summarizeFarmAnalytics function.
 * - SummarizeFarmAnalyticsOutput - The return type for the summarizeFarmAnalytics function.
 */

import {ai} from '@/ai/genkit';
import {getFarmById, getSensorReadings} from '@/lib/data';
import {SensorReading} from '@/lib/types';
import {z} from 'genkit';

const SummarizeFarmAnalyticsInputSchema = z.object({
  farmId: z.string().describe('The ID of the farm to summarize analytics for.'),
  farmName: z.string().describe('The name of the farm.'),
  crop: z.string().describe('The crop being grown on the farm.'),
  language: z.string().describe('The language for the summary (e.g., "English", "हिन्दी").'),
  sensorReadings: z.array(z.any()).optional().describe('Optional sensor readings data for the farm.'),
});
export type SummarizeFarmAnalyticsInput = z.infer<typeof SummarizeFarmAnalyticsInputSchema>;

const SummarizeFarmAnalyticsOutputSchema = z.object({
  summary: z.string().describe('A concise, layman-friendly summary of the latest analytics for the farm.'),
});
export type SummarizeFarmAnalyticsOutput = z.infer<typeof SummarizeFarmAnalyticsOutputSchema>;

export async function summarizeFarmAnalytics(input: Pick<SummarizeFarmAnalyticsInput, 'farmId' | 'crop' | 'language'>): Promise<SummarizeFarmAnalyticsOutput> {
  return summarizeFarmAnalyticsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeFarmAnalyticsPrompt',
  input: {schema: SummarizeFarmAnalyticsInputSchema},
  output: {schema: SummarizeFarmAnalyticsOutputSchema},
  prompt: `You are an AI assistant providing a simple, easy-to-understand summary of farm conditions for a farmer.

  The summary is for the farm named "{{farmName}}", which is growing "{{crop}}".
  Here is the recent sensor data:
  \`\`\`json
  {{{json sensorReadings}}}
  \`\`\`

  Please provide a summary in very simple, non-technical language, in {{language}}.
  Do not use numbers or percentages.
  Focus on whether things are good or if there are any potential problems a farmer should look into (like the soil being too dry, too wet, or if it's too hot).
  If everything looks fine for the "{{crop}}", just give a short, reassuring confirmation.
  Keep the summary brief and to the point.
  `,
});

const summarizeFarmAnalyticsFlow = ai.defineFlow(
  {
    name: 'summarizeFarmAnalyticsFlow',
    inputSchema: z.object({ farmId: z.string(), crop: z.string(), language: z.string() }),
    outputSchema: SummarizeFarmAnalyticsOutputSchema,
  },
  async input => {
    const farm = await getFarmById(input.farmId);
    if (!farm) {
      throw new Error(`Farm not found: ${input.farmId}`);
    }

    const sensorReadings = await getSensorReadings(input.farmId);
    
    const {output} = await prompt({
        farmId: input.farmId,
        farmName: farm.farmName,
        crop: farm.crop,
        sensorReadings: sensorReadings,
        language: input.language,
    });
    return output!;
  }
);
