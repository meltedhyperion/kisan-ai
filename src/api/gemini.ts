import path from 'path';
import { VertexAI } from '@google-cloud/vertexai';

const creds = require(path.resolve('service.json'));

const vertexAI = new VertexAI({
  project: creds.project_id,
  location: 'us-central1',
});


// Load the Gemini model
const model = vertexAI.getGenerativeModel({
  model: 'gemini-pro', 
});

export async function callGemini(prompt: string): Promise<string> {
  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  });

  const response = result.response;
  return response.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

callGemini('What is the weather today?');