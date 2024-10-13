import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config'; // Assuming you have the config
import { routes } from './app/app.routes'; // Assuming you have routes defined
//import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // Enables fetch for better performance with server-side rendering
    provideRouter(routes), // Provide your routing if needed, use `routes` from your app.routes.ts if defined
    { provide: 'AppConfig', useValue: appConfig } // Providing the app config
  ]
})
  .catch(err => console.error(err));
