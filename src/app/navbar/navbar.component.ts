import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  userID: number = 0;
  urlPath: string = "";

  constructor(private route: ActivatedRoute, private location: Location, router: Router) {
    this.userID = +this.route.snapshot.params['id'];

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.urlPath = location.path();
      }
    });
  }

  ngOnInit(): void {}
}