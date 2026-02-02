import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../core/services/feedback';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
})
export class AdminDashboard {
  public feedbackService = inject(FeedbackService);
  feedbacks$ = this.feedbackService.getFeedbacks();

  userInput = '';

  currentFilter = signal<'ALLE' | 'POSITIV' | 'NEGATIV' | 'NEUTRAL'>('ALLE');

  searchTerm = signal<string>('');

  getFilteredFeedbacks(feedbacks: any[] | null) {
    if (!feedbacks) return [];

    const filter = this.currentFilter();
    const search = this.searchTerm().toLowerCase().trim();

    return feedbacks.filter((item) => {
      const matchesFilter = filter === 'ALLE' || item.sentiment === filter;

      const matchesSearch =
        !search ||
        item.content.toLowerCase().includes(search) ||
        (item.summary && item.summary.toLowerCase().includes(search));

      return matchesFilter && matchesSearch;
    });
  }

  updateSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  setFilter(filter: 'ALLE' | 'POSITIV' | 'NEGATIV' | 'NEUTRAL') {
    this.currentFilter.set(filter);
  }

  getCount(feedbacks: any[] | null, sentiment: string): number {
    if (!feedbacks) return 0;
    return feedbacks.filter((item) => item.sentiment === sentiment).length;
  }

  async submitFeedback() {
    if (!this.userInput.trim()) return;
    await this.feedbackService.sendTestFeedbackWithAI(this.userInput);
    this.userInput = '';
  }

  deleteItem(id: string | undefined) {
    if (!id) return;
    if (confirm('Möchtest du dieses Feedback wirklich löschen?')) {
      this.feedbackService.deleteFeedback(id);
    }
  }

  getEmoji(sentiment: string): string {
    switch (sentiment) {
      case 'POSITIV':
        return '✅';
      case 'NEGATIV':
        return '🚨';
      case 'NEUTRAL':
        return '⚖️';
      default:
        return '❓';
    }
  }

  getBorderColor(sentiment: string): string {
    switch (sentiment) {
      case 'POSITIV':
        return '6px solid #4caf50';
      case 'NEGATIV':
        return '6px solid #f44336';
      case 'NEUTRAL':
        return '6px solid #ffeb3b';
      default:
        return '6px solid #ccc';
    }
  }

  triggerAiTest() {
    const testTexte = [
      'Das neue Dashboard von Olyze ist echt intuitiv, toll gemacht!',
      'Ich finde die Ladezeiten der App aktuell viel zu langsam.',
      'Der Support war freundlich, aber konnte mein Problem nicht lösen.',
    ];
    const randomText = testTexte[Math.floor(Math.random() * testTexte.length)];
    this.feedbackService.sendTestFeedbackWithAI(randomText);
  }
}
