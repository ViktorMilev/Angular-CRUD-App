import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './file-upload/file-upload.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet, RouterLink, RouterModule, RouterLinkActive, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = "Angular-CRUD-App";
  title1 = `💾 Приложение за изпълняване на `;
  title2 = `операции`;

  userID: number = 0;
  urlPath: string = "";

  constructor(private route: ActivatedRoute, private location: Location, router: Router) {
    this.userID = +this.route.snapshot.params['id'];

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.urlPath = String(this.location.path());
      }
    });
  }

  ngOnInit(): void {}
}