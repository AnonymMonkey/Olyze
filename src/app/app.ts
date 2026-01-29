import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedbackService } from './core/services/feedback';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('olyze');
  private feedbackService = inject(FeedbackService);

  feedbacks$ = this.feedbackService.getFeedbacks();

  status = this.feedbackService.lastActionStatus;

  triggerTest() {
    const messages = [
      'Das neue Design ist super intuitiv!',
      'Ich finde die Ladezeiten der App etwas zu lang.',
      'Könnten wir ein dunkles Design (Dark Mode) bekommen?',
      'Der Support war heute extrem hilfreich, danke!',
    ];
    // Sucht zufällig eine Nachricht aus
    const randomText = messages[Math.floor(Math.random() * messages.length)];
    this.feedbackService.sendTestFeedbackWithAI(randomText);
  }
}
