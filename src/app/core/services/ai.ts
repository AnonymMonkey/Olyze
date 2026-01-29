import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AiService {
  private genAI = new GoogleGenerativeAI((environment as any).geminiApiKey);
  private model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async analyzeFeedback(text: string) {
    try {
      const prompt = `Analysiere dieses Feedback: "${text}". Antworte nur mit einem Wort: POSITIV, NEGATIV oder NEUTRAL.`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return {
        sentiment: response.text().trim(),
        summary: 'KI-Analyse erfolgreich',
      };
    } catch (e) {
      console.error('KI-Fehler:', e);
      return { sentiment: 'NEUTRAL', summary: 'Fehler bei der Analyse' };
    }
  }
}
