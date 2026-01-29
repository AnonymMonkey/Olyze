import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// 1. Importiere die Datei direkt
import * as envFile from '../environments/environment';

// 2. Erstelle eine Konstante, die TypeScript "zwingt", die Struktur zu akzeptieren
const environment = envFile.environment as any;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // 3. Nutze die Konstante
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyAxMW6Hi7gaJ5_o3A9MPjR5iiXNZtE6DeE',
        authDomain: 'olyze-56d41.firebaseapp.com',
        projectId: 'olyze-56d41',
        storageBucket: 'olyze-56d41.firebasestorage.app',
        messagingSenderId: '810776018525',
        appId: '1:810776018525:web:5f19148a9e0ecef93097b4',
      }),
    ),
    provideFirestore(() => {
      const firestore = getFirestore();
      return firestore;
    }),
  ],
};
