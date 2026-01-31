import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private readonly API_KEY = 'AIzaSyAVA-6RP__wJ-hzTzCVtAcomocQhy6uNjQ';
  private genAI = new GoogleGenerativeAI(this.API_KEY);

  async analyzeFeedback(text: string) {
    try {
      const model = this.genAI.getGenerativeModel(
        { model: 'gemini-1.5-flash' },
        { apiVersion: 'v1' },
      );

      const prompt = `Analysiere dieses Feedback: "${text}". Antworte kurz ob es positiv oder negativ ist.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return { sentiment: 'analysiert', summary: response.text() };
    } catch (e: any) {
      console.error('DEBUG-INFO:', e);
      return { sentiment: 'neutral', summary: 'KI im Wartungsmodus (Simuliert)' };
    }
  }
}
