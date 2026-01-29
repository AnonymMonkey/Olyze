import { inject, Injectable, signal } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AiService } from './ai';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private firestore = inject(Firestore);
  private ai = inject(AiService);

  lastActionStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  async sendTestFeedbackWithAI(text: string) {
    if (!text) return;

    this.lastActionStatus.set('sending');
    try {
      const aiResult = await this.ai.analyzeFeedback(text);
      const colRef = collection(this.firestore, 'feedbacks');

      await addDoc(colRef, {
        content: text,
        sentiment: aiResult.sentiment,
        summary: aiResult.summary,
        timestamp: Date.now(),
      });

      this.lastActionStatus.set('success');
    } catch (e) {
      this.lastActionStatus.set('error');
      console.error(e);
    }
  }

  getFeedbacks(): Observable<any[]> {
    const colRef = collection(this.firestore, 'feedbacks');
    const q = query(colRef, orderBy('timestamp', 'desc'));
    return collectionData(q, { idField: 'id' });
  }
}
