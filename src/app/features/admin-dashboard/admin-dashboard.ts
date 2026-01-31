import { Component, inject } from '@angular/core';
import { FeedbackService } from '../../core/services/feedback';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
<<<<<<< Updated upstream
  private feedbackService = inject(FeedbackService);
  
  allFeedbacks$ = this.feedbackService.getFeedbacks();
=======
  public feedbackService = inject(FeedbackService);
  feedbacks$ = this.feedbackService.getFeedbacks();

  userInput = '';

  async submitFeedback() {
    if (!this.userInput.trim()) return; 

    console.log("Sende Benutzereingabe an KI:", this.userInput);
    
    await this.feedbackService.sendTestFeedbackWithAI(this.userInput);
    
    this.userInput = '';
  }

  deleteItem(id: string) {
  if (confirm('Möchtest du dieses Feedback wirklich löschen?')) {
    this.feedbackService.deleteFeedback(id);
  }
}

  getEmoji(sentiment: string): string {
  switch (sentiment) {
    case 'POSITIV': return '✅';
    case 'NEGATIV': return '🚨';
    case 'NEUTRAL': return '⚖️';
    default: return '❓';
  }
}

getBorderColor(sentiment: string): string {
  switch (sentiment) {
    case 'POSITIV': return '6px solid #4caf50'; // Grün
    case 'NEGATIV': return '6px solid #f44336'; // Rot
    case 'NEUTRAL': return '6px solid #ffeb3b'; // Gelb
    default: return '6px solid #ccc';
  }
}

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
>>>>>>> Stashed changes
}
