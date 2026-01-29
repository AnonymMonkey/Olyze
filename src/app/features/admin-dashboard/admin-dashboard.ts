import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../core/services/feedback';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  public feedbackService = inject(FeedbackService);

  triggerAiTest() {
    const testTexte = [
      'Das neue Dashboard von Olyze ist echt intuitiv, toll gemacht!',
      'Ich finde die Ladezeiten der App aktuell viel zu langsam.',
      'Der Support war freundlich, aber konnte mein Problem nicht lösen.',
    ];

    const randomText = testTexte[Math.floor(Math.random() * testTexte.length)];

    console.log('Sende Test-Text an KI:', randomText);
    this.feedbackService.sendTestFeedbackWithAI(randomText);
  }
}
