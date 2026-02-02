import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const key = (environment as any).geminiApiKey;
    this.genAI = new GoogleGenerativeAI(key);
  }

  async analyzeFeedback(text: string) {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Analysiere dieses Feedback: "${text}". Antworte nur mit SENTIMENT: [POSITIV/NEGATIV] und einer SUMMARY.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      let sentiment = 'NEUTRAL';
      if (responseText.toUpperCase().includes('POSITIV')) sentiment = 'POSITIV';
      else if (responseText.toUpperCase().includes('NEGATIV')) sentiment = 'NEGATIV';

      return {
        sentiment,
        summary: responseText.split('SUMMARY:')[1]?.trim() || responseText,
      };
    } catch (e: any) {
      console.error('KI-Dienst Fehler:', e);
      return { sentiment: 'NEUTRAL', summary: 'Fehler: ' + e.message };
    }
  }
}
