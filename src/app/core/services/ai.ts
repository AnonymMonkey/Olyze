import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AiService {
  private apiUrl = '/api/sentiment';

  async analyzeFeedback(text: string) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Fehler ${response.status}: ${errText}`);
      }

      const result = await response.json();

      return {
        sentiment: result.sentiment,
        summary: `Score: ${result.score}`,
      };
    } catch (e: any) {
      console.error('KI Fehler:', e);
      return { sentiment: 'FEHLER', summary: e.message };
    }
  }
}
