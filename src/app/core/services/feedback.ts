import { inject, Injectable, signal } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AiService } from './ai';

// Definiert die Struktur für ein Feedback-Objekt
export interface Feedback {
  id?: string;
  content: string;
  sentiment: string;
  summary: string;
  timestamp: number;
  version: string;
}

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private firestore = inject(Firestore) as any;
  private ai = inject(AiService);

  // Status-Signal für die UI (z.B. Lade-Spinner anzeigen)
  lastActionStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  /**
   * Sendet Feedback an die KI zur Analyse und speichert es dann in Firestore
   */
  async sendTestFeedbackWithAI(text: string) {
    if (!text) return;

    this.lastActionStatus.set('sending');
    try {
      // 1. KI-Analyse abwarten
      const aiResult = await this.ai.analyzeFeedback(text);

      // 2. Referenz zur Collection
      const colRef = collection(this.firestore, 'feedbacks');

      // 3. Daten in Firestore speichern
      await addDoc(colRef, {
        content: text,
        sentiment: aiResult.sentiment,
        summary: aiResult.summary,
        timestamp: Date.now(),
        version: 'Angular 21.1.2 + Gemini AI',
      });

      this.lastActionStatus.set('success');
      console.log('🔥 KI-Analyse & Speicherung erfolgreich!', aiResult);
    } catch (e) {
      this.lastActionStatus.set('error');
      console.error('❌ Fehler im FeedbackService:', e);
    }
  }

  /**
   * Gibt einen Echtzeit-Stream der Feedbacks zurück.
   * Wichtig für Partner A, um die Liste anzuzeigen.
   */
  getFeedbacks(): Observable<Feedback[]> {
    // Auch hier: 'this.firestore' wird jetzt als kompatibel akzeptiert
    const colRef = collection(this.firestore, 'feedbacks');
    const q = query(colRef, orderBy('timestamp', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Feedback[]>;
  }

  async deleteFeedback(id: string) {
  try {
    const docRef = doc(this.firestore, `feedbacks/${id}`);
    await deleteDoc(docRef);
    console.log("Dokument gelöscht:", id);
  } catch (e) {
    console.error("Fehler beim Löschen:", e);
  }

  async deleteFeedback(id: string) {
  try {
    const docRef = doc(this.firestore, `feedbacks/${id}`);
    await deleteDoc(docRef);
    console.log("Dokument gelöscht:", id);
  } catch (e) {
    console.error("Fehler beim Löschen:", e);
  }
}
}
}
