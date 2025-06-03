'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatically assigning translator levels based on performance data.
 *
 * The flow uses an AI model to analyze translator performance and assign a level (Expert, Legend, Top Performer, Regular, Newcomer).
 *
 * @exports {
 *   analyzeTranslatorLevel,
 *   AnalyzeTranslatorLevelInput,
 *   AnalyzeTranslatorLevelOutput
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTranslatorLevelInputSchema = z.object({
  name: z.string().describe('The name of the translator.'),
  weeklyBalance: z.number().describe('The translator weekly balance.'),
  weeklyActions: z.number().describe('The number of actions performed by the translator this week.'),
  monthlyBalance: z.number().describe('The translator monthly balance.'),
});
export type AnalyzeTranslatorLevelInput = z.infer<typeof AnalyzeTranslatorLevelInputSchema>;

const AnalyzeTranslatorLevelOutputSchema = z.object({
  level: z
    .enum(['Expert', 'Legend', 'Top Performer', 'Regular', 'Newcomer'])
    .describe('The assigned level of the translator.'),
});
export type AnalyzeTranslatorLevelOutput = z.infer<typeof AnalyzeTranslatorLevelOutputSchema>;

export async function analyzeTranslatorLevel(
  input: AnalyzeTranslatorLevelInput
): Promise<AnalyzeTranslatorLevelOutput> {
  return analyzeTranslatorLevelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTranslatorLevelPrompt',
  input: {schema: AnalyzeTranslatorLevelInputSchema},
  output: {schema: AnalyzeTranslatorLevelOutputSchema},
  prompt: `You are an expert in analyzing translator performance and assigning appropriate levels.

  Based on the translator's weekly balance: {{{weeklyBalance}}}, weekly actions: {{{weeklyActions}}}, monthly balance: {{{monthlyBalance}}}, and name: {{{name}}},
  determine the most suitable level for the translator. The possible levels are: Expert, Legend, Top Performer, Regular, and Newcomer.

  Consider these general guidelines, but use your best judgment:
  - Expert: Consistently high performance in all metrics.
  - Legend: Exceptional performance, a leader in the community.
  - Top Performer: Above average performance in most metrics.
  - Regular: Consistent, average performance.
  - Newcomer: Limited performance data available.

  Return the level directly, do not include any other text.`,
});

const analyzeTranslatorLevelFlow = ai.defineFlow(
  {
    name: 'analyzeTranslatorLevelFlow',
    inputSchema: AnalyzeTranslatorLevelInputSchema,
    outputSchema: AnalyzeTranslatorLevelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
