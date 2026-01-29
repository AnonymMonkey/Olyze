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
  private feedbackService = inject(FeedbackService);
  
  allFeedbacks$ = this.feedbackService.getFeedbacks();
}
