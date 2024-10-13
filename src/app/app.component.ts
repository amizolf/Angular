
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ResumeService } from './resume.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-resume-app';
  resumeData: any;
  activeTab: number = 0;
  googleMapUrl: SafeResourceUrl; // Use SafeResourceUrl for the map URL

  constructor(private resumeService: ResumeService, private sanitizer: DomSanitizer) {
    // Initialize googleMapUrl to avoid TypeScript initialization error
    this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit() {
    this.resumeService.getResumeData().subscribe({
      next: (data) => {
        this.resumeData = data;
        if (this.resumeData?.contact?.mapUrl) {
          // Sanitize the Google map URL
          this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resumeData.contact.mapUrl);
        }
      },
      error: (error) => {
        console.error('Error loading resume data', error);
      }
    });
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }
}
