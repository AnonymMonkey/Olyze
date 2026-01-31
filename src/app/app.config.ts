import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import * as envFile from '../environments/environment';

const environment = envFile.environment as any;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

provideFirebaseApp(() => initializeApp(environment.firebase)),
provideFirestore(() => getFirestore()),
  ],
};
