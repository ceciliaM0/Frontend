import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyDHFf-NusGpwNpUgTWyup-G3gUkM-ltRsk",
  authDomain: "expense-tracker-540a8.firebaseapp.com",
  projectId: "expense-tracker-540a8",
  storageBucket: "expense-tracker-540a8.firebasestorage.app",
  messagingSenderId: "1090067833187",
  appId: "1:1090067833187:web:609c691918a5f45ddb7356",
  measurementId: "G-43KMFWGQW6"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
  ],
};
