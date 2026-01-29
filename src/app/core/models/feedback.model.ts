export interface Feedback {
  id?: string; // Wird von Firebase automatisch generiert
  content: string; // Der eigentliche Text des Mitarbeiters
  sentiment?: string; // Wird später von der KI berechnet (z.B. "positiv")
  category?: string; // Von KI erkannt (z.B. "IT", "Kantine")
  createdAt: number; // Zeitstempel für die Sortierung
}
